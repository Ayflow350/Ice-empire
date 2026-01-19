"use client";

export type ProductData = {
  // Identity
  name: string;
  collection: string;
  description: string;

  // Pricing
  price: number;
  originalPrice: number;

  // Configuration
  sizes: string[];

  // Visuals & Logic (Mapped together for easier management)
  variants: {
    id: string; // generated ID
    colorName: string;
    colorHex: string;
    image: string | null; // URL
    stock: number;
  }[];
};

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Filter,
  Plus,
  X,
  UploadCloud,
  Trash2,
  Check,
  DollarSign,
  Layers,
  Tag,
  Image as ImageIcon,
} from "lucide-react";

// --- PORTAL COMPONENT ---
function Portal({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.body);
}

// --- MAIN PAGE COMPONENT ---
export default function AllProductsPage() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? "hidden" : "unset";
  }, [isOverlayOpen]);

  return (
    <div className="space-y-8">
      {/* HEADER & TABLE (Existing Code) */}
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
            onClick={() => setIsOverlayOpen(true)}
            className="px-6 py-2 bg-[#E5E5E5] text-black text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2"
          >
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-[#333] bg-[#0A0A0A] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#111]">
            <tr className="text-[#525252] uppercase text-xs tracking-wider">
              <th className="py-4 pl-6 font-medium">Product Name</th>
              <th className="py-4 font-medium">Category</th>
              <th className="py-4 font-medium">Stock</th>
              <th className="py-4 font-medium">Price</th>
              <th className="py-4 font-medium text-right pr-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            <tr className="group hover:bg-[#151515] transition-colors cursor-pointer">
              <td className="py-4 pl-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-[#222] rounded border border-[#333]"></div>
                  <span className="font-bold text-[#E5E5E5]">
                    Midnight Vanguard Parka
                  </span>
                </div>
              </td>
              <td className="py-4 text-[#A3A3A3]">Male / Outerwear</td>
              <td className="py-4 text-[#E5E5E5]">142 Units</td>
              <td className="py-4 font-mono text-[#E5E5E5]">$450.00</td>
              <td className="py-4 text-right pr-6">
                <span className="inline-block px-2 py-1 bg-green-900/20 text-green-400 text-[10px] uppercase tracking-wider rounded border border-green-900/50">
                  Active
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- SLIDING DRAWER FORM --- */}
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
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#333]">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter text-[#E5E5E5]">
                Initialize Artifact
              </h2>
              <p className="text-[#737373] text-[10px] tracking-widest uppercase mt-1">
                New Database Entry
              </p>
            </div>
            <button
              onClick={() => setIsOverlayOpen(false)}
              className="p-2 text-[#737373] hover:text-[#E5E5E5] hover:bg-[#1A1A1A] rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* FORM CONTENT */}
          <div className="flex-1 overflow-y-auto">
            <ProductForm onClose={() => setIsOverlayOpen(false)} />
          </div>
        </div>
      </Portal>
    </div>
  );
}

// --- PRODUCT FORM COMPONENT ---
const ProductForm = ({ onClose }: { onClose: () => void }) => {
  // 1. Identity State
  const [identity, setIdentity] = useState({
    name: "",
    collection: "Midnight Series // Drop 01",
    description: "",
  });

  // 2. Pricing State
  const [pricing, setPricing] = useState({
    price: "",
    originalPrice: "",
  });

  // 3. Sizing State
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["M", "L"]);

  // 4. Variants State (Color + Image + Stock)
  // This maps directly to the Frontend's need for Colors + Images
  const [variants, setVariants] = useState([
    {
      id: "1",
      colorName: "Obsidian Black",
      colorHex: "#0a0a0a",
      image: null as string | null,
      stock: 10,
    },
  ]);

  // --- HANDLERS ---

  const handleIdentityChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  // Variant Logic
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: Date.now().toString(),
        colorName: "New Color",
        colorHex: "#333333",
        image: null,
        stock: 0,
      },
    ]);
  };

  const updateVariant = (
    index: number,
    field: keyof (typeof variants)[number],
    value: string | number | null
  ) => {
    const newVariants = [...variants];
    //@ts-expect-error: Dynamic field assignment for variant properties
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // Simulating Image Upload per Variant
  const handleVariantImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      updateVariant(index, "image", url);
    }
  };

  const handleSave = () => {
    const payload = {
      ...identity,
      ...pricing,
      sizes: selectedSizes,
      variants: variants,
    };
    console.log("Unified Data Payload:", payload);
    onClose();
  };

  return (
    <div className="p-8 space-y-8 pb-32">
      {/* SECTION 1: IDENTITY */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373] flex items-center gap-2">
          <Layers size={14} /> Artifact Identity
        </h3>

        <div className="space-y-4">
          <div>
            <input
              name="name"
              value={identity.name}
              onChange={handleIdentityChange}
              placeholder="PRODUCT NAME (E.G. VANGUARD BOMBER)"
              className="w-full bg-[#151515] border border-[#333] rounded-lg p-4 text-[#E5E5E5] placeholder-[#525252] focus:border-[#E5E5E5] focus:outline-none transition-colors font-bold tracking-tight text-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="collection"
              value={identity.collection}
              onChange={handleIdentityChange}
              className="bg-[#151515] border border-[#333] rounded-lg p-3 text-[#E5E5E5] text-sm focus:border-[#E5E5E5] outline-none"
            >
              <option>Midnight Series // Drop 01</option>
              <option>Neon Valkyrie // Drop 02</option>
              <option>Obsidian Relics // Drop 03</option>
            </select>
          </div>

          <textarea
            name="description"
            value={identity.description}
            onChange={handleIdentityChange}
            placeholder="Description / Lore..."
            rows={4}
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-4 text-[#A3A3A3] text-sm placeholder-[#525252] focus:border-[#E5E5E5] focus:outline-none transition-colors"
          />
        </div>
      </section>

      <div className="h-px bg-[#1A1A1A] w-full" />

      {/* SECTION 2: PRICING */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373] flex items-center gap-2">
          <DollarSign size={14} /> Valuation
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#525252]">
              $
            </span>
            <input
              name="price"
              type="number"
              value={pricing.price}
              onChange={handlePricingChange}
              placeholder="Current Price"
              className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 pl-8 text-[#E5E5E5] font-mono focus:border-[#E5E5E5] outline-none"
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#525252]">
              $
            </span>
            <input
              name="originalPrice"
              type="number"
              value={pricing.originalPrice}
              onChange={handlePricingChange}
              placeholder="Original Price"
              className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 pl-8 text-[#A3A3A3] font-mono focus:border-[#E5E5E5] outline-none"
            />
          </div>
        </div>
      </section>

      <div className="h-px bg-[#1A1A1A] w-full" />

      {/* SECTION 3: VARIANTS (Colors + Images) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373] flex items-center gap-2">
            <Tag size={14} /> Variants (Color & Image)
          </h3>
          <button
            onClick={addVariant}
            className="text-xs text-[#E5E5E5] hover:underline flex items-center gap-1"
          >
            <Plus size={12} /> Add Variant
          </button>
        </div>

        <div className="space-y-4">
          {variants.map((variant, idx) => (
            <div
              key={variant.id}
              className="p-4 bg-[#151515] border border-[#333] rounded-xl space-y-4 group"
            >
              <div className="flex gap-4 items-start">
                {/* Image Upload Box */}
                <div className="relative h-20 w-20 bg-[#0A0A0A] border-2 border-dashed border-[#333] rounded-lg flex items-center justify-center shrink-0 overflow-hidden hover:border-[#737373] transition-colors">
                  {variant.image ? (
                    <img
                      src={variant.image}
                      className="w-full h-full object-cover"
                      alt="variant"
                    />
                  ) : (
                    <ImageIcon className="text-[#333]" size={20} />
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleVariantImageUpload(idx, e)}
                  />
                </div>

                {/* Inputs */}
                <div className="flex-1 space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={variant.colorName}
                      onChange={(e) =>
                        updateVariant(idx, "colorName", e.target.value)
                      }
                      className="flex-1 bg-[#0A0A0A] border border-[#333] rounded-md p-2 text-xs text-[#E5E5E5] focus:border-[#E5E5E5] outline-none"
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
                        className="w-16 bg-[#0A0A0A] border border-[#333] rounded-md p-1 text-center text-[#E5E5E5]"
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

      {/* SECTION 4: SIZING */}
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

      {/* FOOTER ACTIONS */}
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
          className="px-8 py-3 bg-[#E5E5E5] text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2"
        >
          <UploadCloud size={16} /> Deploy to Live
        </button>
      </div>
    </div>
  );
};
