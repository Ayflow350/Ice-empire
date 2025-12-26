"use client";

import React, { useState, useEffect } from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  ChevronRight,
  ArrowLeft,
  Zap,
  Tag,
  Check,
} from "lucide-react";
import Footer from "../components/footer";

const ProductDetailPage = () => {
  // ================= 1. DATA DEFINITIONS (The Matrix Strategy) =================

  // A. Define the Available Options for UI Buttons
  const colors = [
    { name: "Obsidian Black", id: "black", hex: "#0a0a0a" },
    { name: "Cyber cyan", id: "cyan", hex: "#7B3F00" },
    { name: "Plasma green", id: "white", hex: "#0F3D2E" },
    { name: "Crimson yellow", id: "red", hex: "#C9A227" }, // Added 4th color
  ];

  const materials = [
    { name: "Obsidian Leather", id: "leather" },
    { name: "Void Mesh", id: "mesh" },
    { name: "Carbon Fiber Weave", id: "carbon" },
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];

  // B. Define the "Variants Matrix"
  // This defines the specific image for every Color + Material combination.
  // NOTE: I am using distinct placeholder images to demonstrate the change.
  // In a real app, these would be accurate photos of "cyan Leather", "Red Mesh", etc.
  const productVariants = [
    // --- BLACK VARIANTS ---
    {
      colorId: "black",
      materialId: "leather",
      image: "products/black/1.jpg",
    },
    {
      colorId: "black",
      materialId: "mesh",
      image: "products/black/2.jpg",
    }, // More textured/mesh look
    {
      colorId: "black",
      materialId: "carbon",
      image: "products/black/1.jpg",
    }, // Technical/carbon look

    // --- cyan VARIANTS ---
    {
      colorId: "cyan",
      materialId: "leather",
      image: "products/brown/4.jpg",
    },
    {
      colorId: "cyan",
      materialId: "mesh",
      image: "products/brown/2.jpg",
    }, // Brighter/mesh vibe
    {
      colorId: "cyan",
      materialId: "carbon",
      image: "products/brown/2.jpg",
    }, // Sporty/tech vibe

    // --- WHITE VARIANTS ---
    {
      colorId: "white",
      materialId: "leather",
      image: "products/green/1.jpg",
    },
    {
      colorId: "white",
      materialId: "mesh",
      image: "products/green/3.jpg",
    },
    {
      colorId: "white",
      materialId: "carbon",
      image: "products/green/2.jpg",
    },

    // --- RED VARIANTS ---
    {
      colorId: "red",
      materialId: "leather",
      image: "products/yellow/1.jpg",
    },
    {
      colorId: "red",
      materialId: "mesh",
      image: "products/yellow/2.jpg",
    },
    {
      colorId: "red",
      materialId: "carbon",
      image: "products/yellow/3.jpg",
    },
  ];

  // Base Product Info
  const productInfo = {
    name: "Vanguard Stealth Bomber",
    collection: "Midnight Series // Drop 01",
    price: 350.0,
    originalPrice: 450.0,
    rating: 4.9,
    reviews: 128,
    description:
      "Forged for the shadows. This heavyweight architectural piece features reinforced articulated elbows, a water-resistant nano-coating, and our signature magnetic storm-closure system.",
    // Thumbnails show different angles, not different variants
    thumbnails: [
      "products/black/1.jpg",
      "products/brown/4.jpg",
      "products/green/1.jpg",
      "products/yellow/1.jpg",
    ],
  };

  // ================= 2. STATE MANAGEMENT =================
  // Initialize with the first options in the arrays
  const [selectedSize, setSelectedSize] = useState(sizes[2]); // Default L
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);

  // The main image is derived from the selected color and material, but can be overridden by thumbnail click
  const [displayImage, setDisplayImage] = useState(() => {
    const matchedVariant = productVariants.find(
      (variant) =>
        variant.colorId === selectedColor.id &&
        variant.materialId === selectedMaterial.id
    );
    return matchedVariant ? matchedVariant.image : productVariants[0].image;
  });

  useEffect(() => {
    const matchedVariant = productVariants.find(
      (variant) =>
        variant.colorId === selectedColor.id &&
        variant.materialId === selectedMaterial.id
    );
    setDisplayImage(
      matchedVariant ? matchedVariant.image : productVariants[0].image
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor, selectedMaterial]);

  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [isAnimatingCart, setIsAnimatingCart] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  // ================= 3. LOGIC & EFFECTS =================

  interface ColorOption {
    name: string;
    id: string;
    hex: string;
  }

  interface MaterialOption {
    name: string;
    id: string;
  }

  interface ProductVariant {
    colorId: string;
    materialId: string;
    image: string;
  }

  interface ProductInfo {
    name: string;
    collection: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    description: string;
    thumbnails: string[];
  }

  type QuantityAction = "inc" | "dec";

  const handleQuantity = (type: QuantityAction) => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc" && quantity < 10) setQuantity(quantity + 1);
  };

  const addToCart = () => {
    setCartCount((prev) => prev + quantity);
    setIsAnimatingCart(true);
    setTimeout(() => setIsAnimatingCart(false), 300);
    console.log(
      `Added to cart: Size:${selectedSize}, Color:${selectedColor.name}, Material:${selectedMaterial.name}, Qty:${quantity}`
    );
  };

  const goBack = () => {
    window.history.back();
  };

  // ================= 4. RENDER =================
  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden font-sans text-white selection:bg-cyan-500/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-black to-black"></div>
        <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-cyan-900/10 blur-[120px] rounded-full animate-pulse"></div>
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-50 w-full flex justify-between items-center py-6 px-6 md:px-12 border-b border-white/5 backdrop-blur-sm sticky top-0 bg-black/80">
        <div className="flex flex-col">
          <div className="text-xl font-bold tracking-[0.2em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            ICEMPIRE
          </div>
        </div>

        {/* Cart Indicator */}
        <div className="relative group cursor-pointer p-2">
          <ShoppingBag
            className={`w-6 h-6 text-gray-300 group-hover:text-cyan-400 transition-colors ${
              isAnimatingCart ? "scale-110" : "scale-100"
            } duration-200`}
          />
          {cartCount > 0 && (
            <span
              className={`absolute top-0 right-0 bg-cyan-500 text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] ${
                isAnimatingCart ? "animate-ping" : ""
              }`}
            >
              {cartCount}
            </span>
          )}
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-cyan-500 text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Return Button */}
        <div className="mb-8">
          <button
            onClick={goBack}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
              Return to Collection
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* LEFT: IMAGE GALLERY */}
          <div className="flex flex-col gap-6">
            {/* Main Image Viewer (Dynamic based on state) */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group bg-gray-900">
              {/* Image fade animation key helps trigger redraw on src change */}
              <img
                key={displayImage}
                src={displayImage}
                alt={productInfo.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-[fadeIn_0.5s_ease-in-out]"
              />

              {/* Tech Overlays */}
              <div className="absolute inset-0 pointer-events-none border border-cyan-500/0 group-hover:border-cyan-500/30 transition-colors duration-500 rounded-2xl"></div>
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50"></div>

              <div className="absolute top-6 right-6 bg-black backdrop-blur-md border border-cyan-500/50 px-3 py-1 text-xs font-bold tracking-widest text-white uppercase rounded-sm">
                -22% OFF
              </div>
            </div>

            {/* Thumbnails (Alternative angles) */}
            <div className="grid grid-cols-4 gap-4">
              {productInfo.thumbnails.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setDisplayImage(img)} // Clicking thumbnail temporarily shows that angle
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    displayImage === img
                      ? "border-cyan-500 opacity-100"
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

          {/* RIGHT: PRODUCT DETAILS & FORM */}
          <div className="flex flex-col h-full">
            {/* Title Block */}
            <div className="mb-8 border-b border-white/10 pb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold tracking-[0.2em] text-cyan-500 uppercase">
                  {productInfo.collection}
                </span>
                <div className="h-px w-8 bg-gradient-to-r from-cyan-500 to-transparent"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 drop-shadow-lg">
                {productInfo.name}
              </h1>

              <div className="flex items-end gap-4">
                <span className="text-3xl font-light tracking-wide text-white">
                  ${productInfo.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through decoration-red-500/50 mb-1">
                  ${productInfo.originalPrice.toFixed(2)}
                </span>

                <div className="ml-auto flex items-center gap-1 text-sm text-gray-400">
                  <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                  <span>{productInfo.rating}</span>
                  <span className="text-gray-600">
                    ({productInfo.reviews} Reviews)
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-400 font-light leading-relaxed mb-10 text-sm md:text-base">
              {productInfo.description}
            </p>

            {/* ================= SELECTORS ================= */}
            <div className="space-y-8 mb-10">
              {/* 1. COLOR SELECTION */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase">
                    Select Color
                  </span>
                  <span className="text-xs text-cyan-400 uppercase tracking-widest">
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
                          ? "ring-2 ring-cyan-500 ring-offset-2 ring-offset-black scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {(color.id === "black" || color.id === "grey") && (
                        <div className="absolute inset-0 rounded-full border border-white/20"></div>
                      )}
                      {selectedColor.id === color.id && (
                        <Check
                          className={`w-4 h-4 ${
                            color.id === "white" ? "text-black" : "text-white"
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. MATERIAL SELECTION */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase">
                    Select Material
                  </span>
                  <span className="text-xs text-cyan-400 uppercase tracking-widest">
                    {selectedMaterial.name}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {materials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`py-3 px-2 border rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        selectedMaterial.id === mat.id
                          ? "bg-cyan-900/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                          : "bg-transparent border-white/10 text-gray-500 hover:border-gray-500 hover:text-white"
                      }`}
                    >
                      {mat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. SIZE SELECTION */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase">
                    Select Size
                  </span>
                  <span className="text-xs text-gray-500 underline cursor-pointer hover:text-cyan-400">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        selectedSize === size
                          ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                          : "bg-transparent border-white/10 text-gray-400 hover:border-cyan-500 hover:text-cyan-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CART ACTIONS */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex items-center justify-between border border-white/20 rounded-xl px-4 py-3 w-full md:w-32 bg-black/40">
                  <button
                    onClick={() => handleQuantity("dec")}
                    className="text-gray-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-mono">{quantity}</span>
                  <button
                    onClick={() => handleQuantity("inc")}
                    className="text-gray-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={addToCart}
                  className="relative flex-1 group overflow-hidden bg-cyan-500 rounded-xl py-4 transition-all hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3 text-black font-black uppercase tracking-widest text-sm">
                    <ShoppingBag className="w-5 h-5" /> Add To Cart - $
                    {(productInfo.price * quantity).toFixed(2)}
                  </span>
                </button>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="ENTER COUPON CODE"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs tracking-widest text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors uppercase"
                  />
                </div>
                <button className="px-4 py-2 border border-white/20 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:border-white transition-all">
                  Apply
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-gray-300">
                    Secure Checkout
                  </span>
                  <span className="text-[10px] text-gray-600">
                    Encrypted 256-bit
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                <Truck className="w-5 h-5 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-gray-300">
                    Fast Shipping
                  </span>
                  <span className="text-[10px] text-gray-600">
                    Global Priority
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add keyframes for the image fade-in effect in your global CSS or tailwind config */}
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
