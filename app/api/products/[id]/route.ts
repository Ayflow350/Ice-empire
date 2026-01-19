import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product, { IProduct, IVariant } from "@/models/Products";
import { sendLowStockAlert } from "@/lib/email";
import { uploadToCloudinary } from "@/lib/cloudinary";

// --- 1. Define Types for Incoming Data ---
interface VariantPayload {
  id?: string;
  colorName: string;
  colorHex: string;
  imageUrl?: string; // From DB/Cloudinary
  image?: string | null; // From Frontend state
  stock: number;
}

interface UpdatePayload {
  name?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  isArchived?: boolean;
  variants?: VariantPayload[];
  collection?: string;
}

// --- 2. Helper Functions (Consistent with POST) ---
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const calculateTotalStock = (variants: VariantPayload[]): number => {
  return variants.reduce((acc, v) => acc + Number(v.stock || 0), 0);
};

// --- API ROUTES ---

// GET: Fetch Single Product
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const product = await Product.findById<IProduct>(params.id);

    if (!product) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

// DELETE: Hard Delete
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deletedProduct = await Product.findByIdAndDelete(params.id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product permanently deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

// PATCH: Update Product
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const contentType = req.headers.get("content-type") || "";
    let updateData: UpdatePayload = {};

    // --- SCENARIO A: JSON UPDATE ---
    if (contentType.includes("application/json")) {
      updateData = (await req.json()) as UpdatePayload;
    }
    // --- SCENARIO B: FORM DATA (Multipart) ---
    else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const payloadString = formData.get("payload") as string;

      if (payloadString) {
        updateData = JSON.parse(payloadString) as UpdatePayload;
      }

      // Handle Image Uploads for Variants
      if (updateData.variants && Array.isArray(updateData.variants)) {
        updateData.variants = await Promise.all(
          updateData.variants.map(
            async (variant: VariantPayload, index: number) => {
              const imageFile = formData.get(`variant_image_${index}`);

              // If file exists, upload and update imageUrl
              if (imageFile && imageFile instanceof File) {
                const cloudUrl = await uploadToCloudinary(
                  imageFile,
                  "clothing-store/products"
                );
                return { ...variant, imageUrl: cloudUrl };
              }

              // If no new file, ensure imageUrl falls back to existing image string
              // pass explicit undefined if null to match Mongoose types
              return {
                ...variant,
                imageUrl: variant.image || variant.imageUrl || undefined,
              };
            }
          )
        );
      }
    }

    // 1. Fetch Existing Product
    const product = await Product.findById<IProduct>(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // 2. Apply Updates & Manual Calculations
    if (updateData.name) {
      product.name = updateData.name;
      product.slug = generateSlug(updateData.name); // Manual Slug Update
    }

    if (updateData.price !== undefined)
      product.price = Number(updateData.price);
    if (updateData.originalPrice !== undefined)
      product.originalPrice = Number(updateData.originalPrice);
    if (updateData.description) product.description = updateData.description;
    if (updateData.isArchived !== undefined)
      product.isArchived = updateData.isArchived;

    // Handle Variants & Total Stock
    if (updateData.variants) {
      // We need to cast the payload variants to match the Mongoose IVariant structure
      // This is safe because we processed images above
      product.variants = updateData.variants as unknown as IVariant[];
      product.totalStock = calculateTotalStock(updateData.variants); // Manual Stock Recalc
    }

    // 3. Save to DB
    const savedProduct = await product.save();

    // 4. Check Stock Notifications
    if (savedProduct.variants) {
      savedProduct.variants.forEach((variant: IVariant) => {
        if (variant.stock <= 5) {
          sendLowStockAlert(
            savedProduct.name,
            variant.colorName,
            variant.stock
          );
        }
      });
    }

    return NextResponse.json(savedProduct);
  } catch (error: unknown) {
    console.error("Update Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Update failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
