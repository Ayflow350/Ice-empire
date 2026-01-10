"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Tag,
  Check,
} from "lucide-react";

// ================= 1. STATIC DATA =================

// Standard RTW Color Palette
const colors = [
  { name: "Obsidian Black", id: "black", hex: "#0a0a0a" },
  { name: "Sienna Dust", id: "brown", hex: "#7B3F00" },
  { name: "Forest Void", id: "green", hex: "#0F3D2E" },
  { name: "Amber Signal", id: "yellow", hex: "#C9A227" },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

// Simplified Variants: One image per color (Ready-To-Wear)
const productVariants = [
  { colorId: "black", image: "/products/black/1.jpg" },
  { colorId: "brown", image: "/products/brown/4.jpg" },
  { colorId: "green", image: "/products/green/1.jpg" },
  { colorId: "yellow", image: "/products/yellow/1.jpg" },
];

const productInfo = {
  name: "Vanguard Bomber", // Removed "Stealth" to sound more like a standard fashion item
  collection: "Midnight Series // Drop 01",
  price: 350.0,
  originalPrice: 450.0,
  rating: 4.9,
  reviews: 128,
  // Added material to description since it's not selectable
  description:
    "Forged for the shadows. This heavyweight architectural piece is crafted from premium full-grain Italian leather. Features reinforced articulated elbows, a water-resistant nano-coating, and our signature magnetic storm-closure system.",
  thumbnails: [
    "/products/black/1.jpg",
    "/products/brown/4.jpg",
    "/products/green/1.jpg",
    "/products/yellow/1.jpg",
  ],
};

const ProductDetailPage = () => {
  // ================= 2. STATE MANAGEMENT =================
  const [selectedSize, setSelectedSize] = useState(sizes[2]); // Default L
  const [selectedColor, setSelectedColor] = useState(colors[0]); // Default Black

  // Calculate Image based on Color only
  const variantImage = useMemo(() => {
    return (
      productVariants.find((variant) => variant.colorId === selectedColor.id)
        ?.image || productVariants[0].image
    );
  }, [selectedColor]);

  const [displayImage, setDisplayImage] = useState(variantImage);

  // Sync image when color changes
  useEffect(() => {
    setDisplayImage(variantImage);
  }, [variantImage]);

  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState("");

  // ================= 3. LOGIC =================
  type QuantityAction = "inc" | "dec";

  const handleQuantity = (type: QuantityAction) => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc" && quantity < 10) setQuantity(quantity + 1);
  };

  const addToCart = () => {
    console.log(
      `Added to cart: ${quantity} x ${selectedColor.name} (${selectedSize})`
    );
  };

  const goBack = () => {
    window.history.back();
  };

  // ================= 4. RENDER =================
  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden font-sans text-white selection:bg-zinc-500/30">
      {/* ================= BACKGROUND AMBIENCE ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
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
        {/* Return Button */}
        <div className="mb-8">
          <button
            onClick={goBack}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
              Return to Collection
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* LEFT: IMAGE GALLERY */}
          <div className="flex flex-col gap-6">
            <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden border border-white/10 group bg-zinc-900">
              <img
                key={displayImage}
                src={displayImage}
                alt={productInfo.name}
                className="w-full h-full object-cover grayscale-[0.1] transition-transform duration-700 group-hover:scale-105 animate-[fadeIn_0.5s_ease-in-out]"
              />

              {/* Overlays */}
              <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-white/20 transition-colors duration-500 rounded-sm"></div>

              {/* Discount Tag */}
              <div className="absolute top-6 right-6 bg-white border border-white px-3 py-1 text-xs font-bold tracking-widest text-black uppercase rounded-sm">
                -22% OFF
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {productInfo.thumbnails.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setDisplayImage(img)}
                  className={`relative aspect-square rounded-sm overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    displayImage === img
                      ? "border-white opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={img}
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex flex-col h-full">
            <div className="mb-8 border-b border-white/10 pb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
                  {productInfo.collection}
                </span>
                <div className="h-px w-8 bg-gradient-to-r from-zinc-500 to-transparent"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 drop-shadow-lg">
                {productInfo.name}
              </h1>

              <div className="flex items-end gap-4">
                <span className="text-3xl font-light tracking-wide text-white">
                  ${productInfo.price.toFixed(2)}
                </span>
                <span className="text-lg text-zinc-600 line-through decoration-zinc-500/50 mb-1">
                  ${productInfo.originalPrice.toFixed(2)}
                </span>
                <div className="ml-auto flex items-center gap-1 text-sm text-zinc-400">
                  <Star className="w-4 h-4 text-white fill-white" />
                  <span>{productInfo.rating}</span>
                  <span className="text-zinc-600">
                    ({productInfo.reviews} Reviews)
                  </span>
                </div>
              </div>
            </div>

            <p className="text-zinc-400 font-light leading-relaxed mb-10 text-sm md:text-base">
              {productInfo.description}
            </p>

            {/* ================= SELECTORS ================= */}
            <div className="space-y-8 mb-10">
              {/* 1. COLOR SELECTION */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-xs font-bold tracking-[0.2em] text-zinc-300 uppercase">
                    Select Color
                  </span>
                  <span className="text-xs text-zinc-400 uppercase tracking-widest">
                    {selectedColor.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`group relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        selectedColor.id === color.id
                          ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {/* For very dark colors, add a slight border so they are visible against black bg */}
                      {color.hex === "#0a0a0a" && (
                        <div className="absolute inset-0 rounded-full border border-white/20"></div>
                      )}

                      {selectedColor.id === color.id && (
                        <Check
                          className={`w-4 h-4 ${
                            // Use black checkmark for light colors (if you add white/yellow), white for dark
                            color.id === "yellow" ? "text-black" : "text-white"
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. SIZE SELECTION */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-xs font-bold tracking-[0.2em] text-zinc-300 uppercase">
                    Select Size
                  </span>
                  <span className="text-xs text-zinc-500 underline cursor-pointer hover:text-white">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border rounded-sm flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        selectedSize === size
                          ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                          : "bg-transparent border-white/10 text-zinc-500 hover:border-white hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= CART ACTIONS ================= */}
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Quantity */}
                <div className="flex items-center justify-between border border-white/20 rounded-sm px-4 py-3 w-full md:w-32 bg-black/40">
                  <button
                    onClick={() => handleQuantity("dec")}
                    className="text-zinc-500 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-mono">{quantity}</span>
                  <button
                    onClick={() => handleQuantity("inc")}
                    className="text-zinc-500 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={addToCart}
                  className="relative flex-1 group overflow-hidden bg-white rounded-sm py-4 transition-all hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3 text-black font-black uppercase tracking-widest text-sm">
                    <ShoppingBag className="w-5 h-5" /> Add To Cart - $
                    {(productInfo.price * quantity).toFixed(2)}
                  </span>
                </button>
              </div>

              {/* Coupon */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="ENTER COUPON CODE"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-sm py-2 pl-10 pr-4 text-xs tracking-widest text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors uppercase"
                  />
                </div>
                <button className="px-4 py-2 border border-white/20 rounded-sm text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white hover:border-white transition-all">
                  Apply
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

      {/* Animation Styles */}
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
};

export default ProductDetailPage;
