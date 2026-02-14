"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Tag,
  Check,
  Loader2,
} from "lucide-react";
import { productApi, Product, ProductVariant } from "@/lib/api/products";
import { useCart } from "../../context/CartContext"; // <--- Import Context

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart(); // <--- Get addToCart function

  // --- DATA STATE ---
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- SELECTION STATE ---
  // CHANGED: Now an array to hold multiple sizes
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState("");

  // --- FETCH DATA ---
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        if (params.id) {
          const data = await productApi.getById(params.id as string);
          setProduct(data);

          if (data.variants.length > 0) setSelectedVariant(data.variants[0]);
          // We don't auto-select sizes anymore to force user choice,
          // or you could auto-select the first one:
          // if (data.sizes.length > 0) setSelectedSizes([data.sizes[0]]);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [params.id]);

  // --- HANDLERS ---
  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc" && quantity < 10) setQuantity(quantity + 1);
  };

  // CHANGED: Toggle size selection logic
  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    // Validation
    if (selectedSizes.length === 0) {
      alert("Please select at least one size.");
      return;
    }

    if (selectedVariant.stock < quantity) {
      alert("Insufficient stock for this variant.");
      return;
    }

    // Loop through all selected sizes and add them to cart
    selectedSizes.forEach((size) => {
      addToCart({
        productId: product._id,
        variantId: selectedVariant.id,
        name: product.name,
        price: product.price,
        color: selectedVariant.colorName,
        size: size, // Add specific size
        quantity: quantity, // Add specific quantity
        image: selectedVariant.imageUrl || "",
      });
    });

    alert(`Added ${quantity * selectedSizes.length} items to cart`);

    // Optional: Reset selections
    // setSelectedSizes([]);
    // setQuantity(1);
  };

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-zinc-500" size={32} />
          <span className="text-xs uppercase tracking-widest text-zinc-600">
            Retrieving Artifact...
          </span>
        </div>
      </div>
    );
  }

  if (!product) return null; // Or Not Found UI

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden font-sans text-white selection:bg-zinc-500/30">
      {/* Background Ambience (Preserved) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black"></div>
        <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-zinc-700/10 blur-[120px] rounded-full animate-pulse"></div>
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="h-24 md:h-32"></div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
              Return
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* LEFT: IMAGE GALLERY (Same as before) */}
          <div className="flex flex-col gap-6">
            <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden border border-white/10 group bg-zinc-950">
              {selectedVariant?.imageUrl ? (
                <img
                  key={selectedVariant.imageUrl}
                  src={selectedVariant.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105 animate-[fadeIn_0.5s_ease-in-out]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs tracking-widest uppercase">
                  No Visual Data
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
              {product.variants.map((variant) => (
                <div
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`relative aspect-square rounded-sm overflow-hidden cursor-pointer border-2 transition-all duration-300 ${selectedVariant?.id === variant.id ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-80"}`}
                >
                  {variant.imageUrl && (
                    <img
                      src={variant.imageUrl}
                      alt={variant.colorName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex flex-col h-full">
            <div className="mb-8 border-b border-white/10 pb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
                  {product.collectionName || "General Collection"}
                </span>
                <div className="h-px w-8 bg-gradient-to-r from-zinc-500 to-transparent"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 drop-shadow-lg">
                {product.name}
              </h1>
              <div className="flex items-end gap-4">
                <span className="text-3xl font-light tracking-wide text-white">
                  ${product.price.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-zinc-400 font-light leading-relaxed mb-10 text-sm md:text-base whitespace-pre-line">
              {product.description}
            </p>

            <div className="space-y-8 mb-10">
              {/* COLOR SELECTION */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-xs font-bold tracking-[0.2em] text-zinc-300 uppercase">
                    Colorway
                  </span>
                  <span className="text-xs text-zinc-400 uppercase tracking-widest">
                    {selectedVariant?.colorName}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`group relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${selectedVariant?.id === variant.id ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110" : "hover:scale-105"}`}
                      style={{ backgroundColor: variant.colorHex }}
                    >
                      {selectedVariant?.id === variant.id && (
                        <Check className="w-4 h-4 text-white drop-shadow-md mix-blend-difference" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* CHANGED: MULTI-SIZE SELECTION */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-xs font-bold tracking-[0.2em] text-zinc-300 uppercase">
                      Select Sizes (Multi-Select)
                    </span>
                    <span className="text-xs text-zinc-500 underline cursor-pointer hover:text-white">
                      Size Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSizes.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`w-12 h-12 border rounded-sm flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            isSelected
                              ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                              : "bg-transparent border-white/10 text-zinc-500 hover:border-white hover:text-white"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                  {/* Helper text for multiple sizes */}
                  <p className="text-[10px] text-zinc-500 mt-2">
                    Tip: You can select multiple sizes to add to cart at once.
                  </p>
                </div>
              )}
            </div>

            {/* CART ACTIONS */}
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex items-center justify-between border border-white/20 rounded-sm px-4 py-3 w-full md:w-32 bg-black/40">
                  <button
                    onClick={() => handleQuantity("dec")}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-mono">{quantity}</span>
                  <button
                    onClick={() => handleQuantity("inc")}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={
                    !selectedVariant ||
                    selectedVariant.stock === 0 ||
                    selectedSizes.length === 0
                  }
                  className="relative flex-1 group overflow-hidden bg-white rounded-sm py-4 transition-all hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 text-black font-black uppercase tracking-widest text-sm">
                    <ShoppingBag className="w-5 h-5" />
                    {selectedSizes.length > 0
                      ? `Add ${selectedSizes.length * quantity} Items - $${(product.price * quantity * selectedSizes.length).toLocaleString()}`
                      : "Select Size"}
                  </span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 border border-white/5 rounded-sm bg-white/[0.02]">
                <ShieldCheck className="w-5 h-5 text-zinc-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-300">
                    Secure Checkout
                  </span>
                  <span className="text-[10px] text-zinc-600">
                    Encrypted 256-bit
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border border-white/5 rounded-sm bg-white/[0.02]">
                <Truck className="w-5 h-5 text-zinc-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-300">
                    Fast Shipping
                  </span>
                  <span className="text-[10px] text-zinc-600">
                    Global Priority
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0.5;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
