import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Products"; // Ensure this matches your filename
import { uploadToCloudinary } from "@/lib/cloudinary";

// --- 1. Strong Typing for Incoming Data ---
interface IncomingVariant {
  id: string;
  colorName: string;
  colorHex: string;
  image: string | null;
  stock: number | string;
}

interface IncomingProduct {
  name: string;
  collection: string;
  description: string;
  price: number | string;
  originalPrice?: number | string;
  sizes: string[];
  variants: IncomingVariant[];
}

// --- 2. Helper Function: Slug Generator ---
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    // 1. Extract and Parse JSON Payload
    const payloadString = formData.get("payload") as string;
    if (!payloadString) {
      return NextResponse.json({ error: "Missing payload" }, { status: 400 });
    }

    const data = JSON.parse(payloadString) as IncomingProduct;

    // 2. Process Variants & Upload Images
    const variantsWithImages = await Promise.all(
      data.variants.map(async (variant: IncomingVariant, index: number) => {
        const imageFile = formData.get(`variant_image_${index}`);

        let finalImageUrl = variant.image;

        if (imageFile && imageFile instanceof File) {
          finalImageUrl = await uploadToCloudinary(
            imageFile,
            "clothing-store/products"
          );
        }

        return {
          id: variant.id,
          colorName: variant.colorName,
          colorHex: variant.colorHex,
          // FIX: Convert null to undefined to satisfy TypeScript/Mongoose
          imageUrl: finalImageUrl || undefined,
          stock: Number(variant.stock),
        };
      })
    );

    // 3. Logic: Calculate Total Stock & Slug
    const totalStock = variantsWithImages.reduce(
      (sum: number, v) => sum + v.stock,
      0
    );

    const slug = generateSlug(data.name);

    // 4. Create Product
    const newProduct = await Product.create({
      name: data.name,
      slug: slug,
      collectionName: data.collection,
      description: data.description,
      price: Number(data.price),
      originalPrice: data.originalPrice
        ? Number(data.originalPrice)
        : undefined,
      sizes: data.sizes,
      variants: variantsWithImages,
      totalStock: totalStock,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    console.error("Create Product Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to create product";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
