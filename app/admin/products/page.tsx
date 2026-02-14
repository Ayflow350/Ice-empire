"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Filter,
  Plus,
  X,
  UploadCloud,
  Trash2,
  DollarSign,
  Layers,
  Tag,
  Image as ImageIcon,
  Loader2,
  Archive,
  RefreshCcw,
} from "lucide-react";

// --- IMPORTS: API & TYPES ---
import { productApi, Product } from "@/lib/api/products";
import { collectionApi, Collection } from "@/lib/api/collections";

// --- LOCAL TYPES ---
// Tracks the form state for variants (files vs existing URLs)
type VariantState = {
  id: string;
  colorName: string;
  colorHex: string;
  imagePreview: string | null; // Display URL (Blob or Remote)
  imageFile: File | null; // Actual File object for upload
  stock: number;
};

// --- PORTAL COMPONENT ---
function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  React.useLayoutEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

// --- MAIN PAGE COMPONENT ---
export default function AllProductsPage() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // 1. FETCH PRODUCTS (GET)
  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    loadProducts();
    document.body.style.overflow = isOverlayOpen ? "hidden" : "unset";
  }, [isOverlayOpen]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsOverlayOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsOverlayOpen(true);
  };

  // 2. DELETE PRODUCT
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure? This will delete the product and its images."))
      return;
    try {
      await productApi.delete(id);
      // Optimistic Update: Remove from UI immediately
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  // 3. TOGGLE ARCHIVE STATUS
  const handleToggleArchive = async (
    id: string,
    currentStatus: boolean,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    try {
      await productApi.toggleArchive(id, !currentStatus);
      // Optimistic Update: Update specific item in UI
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, isArchived: !currentStatus } : p,
        ),
      );
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="space-y-8 p-8 bg-black min-h-screen text-white">
      {/* HEADER */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-[#E5E5E5]">
            Global Inventory
          </h1>
          <p className="text-[#737373] text-xs tracking-widest uppercase mt-2">
            Database: <span className="text-[#E5E5E5]">All Categories</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-[#333] text-[#A3A3A3] text-xs font-bold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white flex items-center gap-2 transition-colors">
            <Filter size={14} /> Filter
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-6 py-2 bg-[#E5E5E5] text-black text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2"
          >
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border border-[#333] bg-[#0A0A0A] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#111]">
            <tr className="text-[#525252] uppercase text-xs tracking-wider">
              <th className="py-4 pl-6 font-medium">Product Name</th>
              <th className="py-4 font-medium">Category</th>
              <th className="py-4 font-medium">Stock</th>
              <th className="py-4 font-medium">Price</th>
              <th className="py-4 font-medium text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#525252]">
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="animate-spin" size={16} /> syncing
                    database...
                  </div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#525252]">
                  No artifacts found. Initialize a new product.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  onClick={() => handleOpenEdit(product)}
                  className="group hover:bg-[#151515] transition-colors cursor-pointer"
                >
                  <td className="py-4 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-[#222] rounded border border-[#333] overflow-hidden relative">
                        {product.variants[0]?.imageUrl ? (
                          <img
                            src={product.variants[0].imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#111] text-[#333]">
                            <ImageIcon size={16} />
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-[#E5E5E5]">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-[#A3A3A3]">
                    {product.collectionName}
                  </td>
                  <td className="py-4 text-[#E5E5E5]">
                    {product.totalStock} Units
                  </td>
                  <td className="py-4 font-mono text-[#E5E5E5]">
                    ${product.price}
                  </td>
                  <td className="py-4 text-right pr-6">
                    <div
                      className="flex items-center justify-end gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) =>
                          handleToggleArchive(
                            product._id,
                            product.isArchived,
                            e,
                          )
                        }
                        className={`p-2 rounded border transition-all ${
                          product.isArchived
                            ? "bg-red-900/20 border-red-900/50 text-red-400"
                            : "bg-green-900/20 border-green-900/50 text-green-400"
                        }`}
                        title={product.isArchived ? "Activate" : "Archive"}
                      >
                        {product.isArchived ? (
                          <RefreshCcw size={14} />
                        ) : (
                          <Archive size={14} />
                        )}
                      </button>
                      <button
                        onClick={(e) => handleDelete(product._id, e)}
                        className="p-2 text-[#525252] hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* OVERLAY & FORM */}
      <Portal>
        <div
          className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isOverlayOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsOverlayOpen(false)}
        />

        <div
          className={`fixed inset-y-0 right-0 z-[9999] w-full max-w-2xl bg-[#0A0A0A] border-l border-[#333] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 ease-out flex flex-col ${
            isOverlayOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-[#333]">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter text-[#E5E5E5]">
                {editingProduct ? "Update Artifact" : "Initialize Artifact"}
              </h2>
              <p className="text-[#737373] text-[10px] tracking-widest uppercase mt-1">
                {editingProduct ? "Edit Existing Entry" : "New Database Entry"}
              </p>
            </div>
            <button
              onClick={() => setIsOverlayOpen(false)}
              className="p-2 text-[#737373] hover:text-[#E5E5E5] hover:bg-[#1A1A1A] rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* 4. RENDER FORM */}
            <ProductForm
              initialData={editingProduct}
              onClose={() => setIsOverlayOpen(false)}
              onSuccess={loadProducts}
            />
          </div>
        </div>
      </Portal>
    </div>
  );
}

// --- PRODUCT FORM COMPONENT ---
type ProductFormProps = {
  initialData: Product | null;
  onClose: () => void;
  onSuccess: () => void;
};

const ProductForm = ({ initialData, onClose, onSuccess }: ProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [collectionOptions, setCollectionOptions] = useState<Collection[]>([]);

  // Form State Groups
  const [identity, setIdentity] = useState({
    name: "",
    collection: "",
    description: "",
  });

  const [pricing, setPricing] = useState({
    price: "",
    originalPrice: "",
  });

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["M", "L"]);

  const [variants, setVariants] = useState<VariantState[]>([
    {
      id: "1",
      colorName: "Obsidian Black",
      colorHex: "#0a0a0a",
      imagePreview: null,
      imageFile: null,
      stock: 10,
    },
  ]);

  // --- INITIALIZE DATA FOR EDITING ---
  useEffect(() => {
    if (initialData) {
      setIdentity({
        name: initialData.name,
        collection: initialData.collectionName,
        description: initialData.description,
      });
      setPricing({
        price: initialData.price.toString(),
        originalPrice: initialData.originalPrice?.toString() || "",
      });
      setSelectedSizes(initialData.sizes);

      // Map API Variants to Form State
      setVariants(
        initialData.variants.map((v) => ({
          id: v.id || Math.random().toString(),
          colorName: v.colorName,
          colorHex: v.colorHex,
          imagePreview: v.imageUrl, // Existing URL from DB
          imageFile: null, // No new file yet
          stock: v.stock,
        })),
      );
    }
  }, [initialData]);

  // --- LOAD COLLECTIONS ---
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await collectionApi.getAll();
        setCollectionOptions(data);

        // Auto-select first collection if new product
        if (!initialData && data.length > 0) {
          setIdentity((prev) =>
            prev.collection ? prev : { ...prev, collection: data[0].title },
          );
        }
      } catch (err) {
        console.error("Error loading collections");
      }
    };
    fetchCollections();
  }, [initialData]);

  // --- INPUT HANDLERS ---
  const handleIdentityChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setIdentity({ ...identity, [e.target.name]: e.target.value });
  };

  const handlePricingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPricing({ ...pricing, [e.target.name]: e.target.value });
  };

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // --- VARIANT HANDLERS ---
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: Date.now().toString(),
        colorName: "New Color",
        colorHex: "#333333",
        imagePreview: null,
        imageFile: null,
        stock: 0,
      },
    ]);
  };

  const updateVariant = (
    index: number,
    field: keyof VariantState,
    value: string | number | File | null,
  ) => {
    const newVariants = [...variants];
    // @ts-expect-error: dynamic assignment
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file); // Create local preview

      const newVariants = [...variants];
      newVariants[index].imageFile = file;
      newVariants[index].imagePreview = url;
      setVariants(newVariants);
    }
  };

  // --- 5. SAVE HANDLER (CREATE & UPDATE) ---
  const handleSave = async () => {
    // Validation
    if (!identity.name || !pricing.price) {
      alert("Please fill in Product Name and Price.");
      return;
    }
    if (!identity.collection) {
      alert("Please select a Collection.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Construction: FormData for Multipart
      const formData = new FormData();

      // JSON Payload (non-file data)
      const payload = {
        name: identity.name,
        collection: identity.collection,
        description: identity.description,
        price: pricing.price,
        originalPrice: pricing.originalPrice,
        sizes: selectedSizes,
        variants: variants.map((v) => ({
          id: v.id,
          colorName: v.colorName,
          colorHex: v.colorHex,
          stock: v.stock,
          // IMPORTANT: Send the preview URL so backend keeps it if no new file is sent
          image: v.imagePreview,
        })),
      };

      formData.append("payload", JSON.stringify(payload));

      // Append Files
      variants.forEach((v, i) => {
        if (v.imageFile) {
          // Key format: 'variant_image_0', 'variant_image_1', etc.
          formData.append(`variant_image_${i}`, v.imageFile);
        }
      });

      // API Call
      if (initialData) {
        await productApi.update(initialData._id, formData);
      } else {
        await productApi.create(formData);
      }

      onSuccess(); // Refresh parent list
      onClose(); // Close modal
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Operation failed";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 space-y-8 pb-32">
      {/* IDENTITY */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373] flex items-center gap-2">
          <Layers size={14} /> Artifact Identity
        </h3>

        <div className="space-y-4">
          <input
            name="name"
            value={identity.name}
            onChange={handleIdentityChange}
            placeholder="PRODUCT NAME"
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-4 text-[#E5E5E5] font-bold text-lg outline-none focus:border-white"
          />

          <select
            name="collection"
            value={identity.collection}
            onChange={handleIdentityChange}
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 text-[#E5E5E5] text-sm outline-none focus:border-white"
          >
            <option value="">Select Collection</option>
            {collectionOptions.map((c) => (
              <option key={c._id} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>
          {collectionOptions.length === 0 && (
            <p className="text-[10px] text-red-400">
              No collections found. Please create a collection first.
            </p>
          )}

          <textarea
            name="description"
            value={identity.description}
            onChange={handleIdentityChange}
            placeholder="Description / Lore..."
            rows={4}
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-4 text-[#A3A3A3] text-sm outline-none focus:border-white"
          />
        </div>
      </section>

      <div className="h-px bg-[#1A1A1A] w-full" />

      {/* PRICING */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373] flex items-center gap-2">
          <DollarSign size={14} /> Valuation
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            value={pricing.price}
            onChange={handlePricingChange}
            placeholder="Price"
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 text-[#E5E5E5] font-mono outline-none focus:border-white"
          />
          <input
            name="originalPrice"
            type="number"
            value={pricing.originalPrice}
            onChange={handlePricingChange}
            placeholder="Original Price"
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 text-[#A3A3A3] font-mono outline-none focus:border-white"
          />
        </div>
      </section>

      <div className="h-px bg-[#1A1A1A] w-full" />

      {/* VARIANTS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373] flex items-center gap-2">
            <Tag size={14} /> Variants
          </h3>
          <button
            onClick={addVariant}
            className="text-xs text-[#E5E5E5] hover:underline flex items-center gap-1"
          >
            <Plus size={12} /> Add
          </button>
        </div>

        <div className="space-y-4">
          {variants.map((variant, idx) => (
            <div
              key={variant.id}
              className="p-4 bg-[#151515] border border-[#333] rounded-xl space-y-4 group"
            >
              <div className="flex gap-4 items-start">
                <div className="relative h-20 w-20 bg-[#0A0A0A] border-2 border-dashed border-[#333] rounded-lg flex items-center justify-center shrink-0 overflow-hidden hover:border-[#737373] transition-colors">
                  {variant.imagePreview ? (
                    <img
                      src={variant.imagePreview}
                      className="w-full h-full object-cover"
                      alt="variant"
                    />
                  ) : (
                    <ImageIcon className="text-[#333]" size={20} />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleVariantImageUpload(idx, e)}
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={variant.colorName}
                      onChange={(e) =>
                        updateVariant(idx, "colorName", e.target.value)
                      }
                      className="flex-1 bg-[#0A0A0A] border border-[#333] rounded-md p-2 text-xs text-[#E5E5E5] outline-none focus:border-white"
                      placeholder="Color Name"
                    />
                    <div className="flex items-center gap-2 bg-[#0A0A0A] border border-[#333] rounded-md px-2 w-24">
                      <div
                        className="w-3 h-3 rounded-full border border-[#333]"
                        style={{ backgroundColor: variant.colorHex }}
                      ></div>
                      <input
                        type="text"
                        value={variant.colorHex}
                        onChange={(e) =>
                          updateVariant(idx, "colorHex", e.target.value)
                        }
                        className="w-full bg-transparent text-[10px] text-[#A3A3A3] outline-none font-mono uppercase"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#737373]">
                      <span>Stock:</span>
                      <input
                        type="number"
                        value={variant.stock}
                        onChange={(e) =>
                          updateVariant(idx, "stock", parseInt(e.target.value))
                        }
                        className="w-16 bg-[#0A0A0A] border border-[#333] rounded-md p-1 text-center text-[#E5E5E5] outline-none focus:border-white"
                      />
                    </div>
                    {variants.length > 1 && (
                      <button
                        onClick={() => removeVariant(idx)}
                        className="text-[#525252] hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-[#1A1A1A] w-full" />

      {/* SIZING */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373]">
          Available Sizing
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`h-10 w-12 rounded-lg text-xs font-bold transition-all border ${
                selectedSizes.includes(size)
                  ? "bg-[#E5E5E5] text-black border-[#E5E5E5]"
                  : "bg-transparent text-[#525252] border-[#333] hover:border-[#737373]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#0A0A0A] border-t border-[#333] flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              identity.name && pricing.price ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span className="text-[10px] uppercase tracking-widest text-[#737373]">
            {identity.name && pricing.price
              ? "Ready to Deploy"
              : "Incomplete Data"}
          </span>
        </div>
        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className="px-8 py-3 bg-[#E5E5E5] text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <UploadCloud size={16} />
          )}
          {isSubmitting
            ? "Processing..."
            : initialData
              ? "Update Artifact"
              : "Deploy to Live"}
        </button>
      </div>
    </div>
  );
};
