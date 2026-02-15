"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Filter, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { productApi, Product } from "@/lib/api/products";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- FETCH DATA ---
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // isLoading is already TRUE by default, showing skeletons immediately
        const data = await productApi.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        // Only remove skeletons when data is ready
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans text-white selection:bg-zinc-500/30">
      {/* ================= BACKGROUND AMBIENCE (PRESERVED) ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-100"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-zinc-700/10 blur-[120px] rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-white/5 blur-[120px] rounded-full animate-pulse delay-1000 opacity-20"></div>
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="h-32 md:h-40"></div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 container mx-auto px-6 pb-20">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 drop-shadow-lg">
              Global <br />
              <span className="text-zinc-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Inventory
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-400 pb-2">
            <Filter className="w-4 h-4" />
            <span>All Categories</span>
          </div>
        </div>

        {/* ================= PRODUCT GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {isLoading
            ? // ================= SKELETON LOADER (Shows Immediately) =================
              // We create an array of 8 items to simulate a full grid
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-4 animate-pulse">
                  {/* Image Skeleton */}
                  <div className="w-full aspect-[3/4] bg-zinc-900 border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer" />
                  </div>
                  {/* Text Skeletons */}
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-zinc-900 rounded-sm"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-3 w-1/4 bg-zinc-900 rounded-sm"></div>
                      <div className="h-3 w-1/3 bg-zinc-900 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              ))
            : // ================= REAL PRODUCT CARDS =================
              products.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  className="group flex flex-col gap-4 cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-950 border border-white/10 group-hover:border-white/30 transition-all duration-500 rounded-sm">
                    {/* Image */}
                    {product.variants[0]?.imageUrl ? (
                      <img
                        src={product.variants[0].imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700 text-xs tracking-widest">
                        NO VISUAL
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Floating Action Button */}
                    <div className="absolute bottom-4 right-4 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <div className="bg-white text-black p-2 rounded-full">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider group-hover:text-zinc-300 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/10 pt-2 mt-1">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">
                        {product.collectionName || "General"}
                      </span>
                      <span className="text-xs font-mono text-zinc-300">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </main>

      {/* ================= DECORATIVE FOOTER ================= */}
      <div className="w-full h-32 border-t border-white/5 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(255,255,255,0.02))] pointer-events-none mt-12">
        <div
          className="w-full h-full opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "100px 100%",
          }}
        ></div>
      </div>
    </div>
  );
}
