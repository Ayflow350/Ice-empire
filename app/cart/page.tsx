"use client";

import React, { useState } from "react";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  ShoppingBag,
  ChevronRight,
  Zap,
  Lock,
  Unlock,
} from "lucide-react";

const CartPage = () => {
  // Mock Cart Data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Vanguard Stealth Bomber",
      size: "L",
      color: "Obsidian Black",
      price: 350.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Cyber-Mesh Cargo Pant",
      size: "32",
      color: "Gunmetal Grey",
      price: 180.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1551028919-ac7edd05b6fa?q=80&w=1000&auto=format&fit=crop",
    },
  ]);

  // CONFIGURATION
  const SHIPPING_COST = 25.0;
  const DISCOUNT_THRESHOLD = 800.0; // Goal to unlock discount
  const DISCOUNT_RATE = 0.05; // 5% Discount

  // Calculate Totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const isDiscountUnlocked = subtotal >= DISCOUNT_THRESHOLD;
  const discountAmount = isDiscountUnlocked ? subtotal * DISCOUNT_RATE : 0;
  const tax = (subtotal - discountAmount) * 0.08; // Tax calculated after discount
  const total = subtotal - discountAmount + tax + SHIPPING_COST;

  // Handlers
  interface CartItem {
    id: number;
    name: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
    image: string;
  }

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev: CartItem[]) =>
      prev.map((item: CartItem) => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  interface RemoveItemFn {
    (id: number): void;
  }

  const removeItem: RemoveItemFn = (id) => {
    setCartItems((prev: CartItem[]) =>
      prev.filter((item: CartItem) => item.id !== id)
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden font-sans text-white selection:bg-cyan-500/30">
      {/* ================= BACKGROUND AMBIENCE ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-black to-black"></div>
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* ================= HEADER ================= */}
      <header className="relative z-50 w-full flex justify-between items-center py-6 px-6 md:px-12 border-b border-white/5 backdrop-blur-sm sticky top-0 bg-black/80">
        <div className="text-xl font-bold tracking-[0.2em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
          ICEMPIRE
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 tracking-[0.3em] uppercase">
          <span>System</span> <ChevronRight className="w-3 h-3" />{" "}
          <span>Cargo Hold</span>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 container mx-auto px-4 md:px-6 py-12">
        {/* Title & Progress Bar */}
        <div className="mb-12 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-6">
            Cargo Hold{" "}
            <span className="text-gray-600 text-lg align-top ml-2">
              ({cartItems.length})
            </span>
          </h1>

          {/* DISCOUNT UNLOCK PROGRESS BAR */}
          {cartItems.length > 0 && (
            <div
              className={`border rounded-lg p-5 max-w-2xl transition-all duration-500 ${
                isDiscountUnlocked
                  ? "bg-cyan-900/10 border-cyan-500/50"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex justify-between items-end mb-3">
                <div className="flex flex-col">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                      isDiscountUnlocked ? "text-cyan-400" : "text-gray-400"
                    }`}
                  >
                    {isDiscountUnlocked
                      ? "ACCESS GRANTED"
                      : "LOCKED: DISCOUNT PROTOCOL"}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {isDiscountUnlocked
                      ? "5% VANGUARD DISCOUNT APPLIED"
                      : `ADD $${(DISCOUNT_THRESHOLD - subtotal).toFixed(
                          2
                        )} TO UNLOCK 5% OFF`}
                  </span>
                </div>
                {isDiscountUnlocked ? (
                  <Unlock className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-500" />
                )}
              </div>

              {/* The Bar */}
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden relative">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>

                <div
                  className={`h-full transition-all duration-700 ease-out ${
                    isDiscountUnlocked
                      ? "bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                      : "bg-gradient-to-r from-gray-600 to-gray-400"
                  }`}
                  style={{
                    width: `${Math.min(
                      (subtotal / DISCOUNT_THRESHOLD) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-20 border border-white/10 border-dashed rounded-2xl bg-white/[0.02]">
            <ShoppingBag className="w-16 h-16 text-gray-700 mb-6" />
            <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-2">
              System Idle
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Your cargo hold is empty.
            </p>
            <button className="px-8 py-3 bg-cyan-900/20 border border-cyan-500/50 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all">
              Re-enter Marketplace
            </button>
          </div>
        ) : (
          /* CART GRID */
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* LEFT: CART ITEMS */}
            <div className="w-full lg:w-2/3 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col md:flex-row gap-6 p-6 border border-white/10 bg-white/[0.02] rounded-2xl hover:border-cyan-500/30 transition-colors"
                >
                  {/* Product Image */}
                  <div className="w-full md:w-32 aspect-square rounded-xl overflow-hidden bg-gray-900 border border-white/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-1">
                          {item.name}
                        </h3>
                        <span className="text-lg font-mono text-cyan-400">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <span className="uppercase tracking-wider">
                            Size:
                          </span>
                          <span className="text-white font-bold">
                            {item.size}
                          </span>
                        </div>
                        <div className="w-px h-3 bg-gray-700"></div>
                        <div className="flex items-center gap-2">
                          <span className="uppercase tracking-wider">
                            Color:
                          </span>
                          <div className="flex items-center gap-1">
                            <div
                              className="w-2 h-2 rounded-full border border-white/20"
                              style={{
                                backgroundColor:
                                  item.color === "Obsidian Black"
                                    ? "#000"
                                    : "#4b5563",
                              }}
                            ></div>
                            <span className="text-white font-bold">
                              {item.color}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-4 bg-black/50 border border-white/10 rounded-lg px-3 py-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-gray-500 hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-gray-500 hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-500/70 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" /> Eject Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="w-full lg:w-1/3 sticky top-24">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                {/* Glow effect when unlocked */}
                {isDiscountUnlocked && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                )}

                <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">
                  Summary
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white font-mono">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Discount Row (Shows only when unlocked) */}
                  {isDiscountUnlocked && (
                    <div className="flex justify-between text-sm text-cyan-400">
                      <span className="flex items-center gap-2">
                        <Zap className="w-3 h-3" /> Vanguard Discount (5%)
                      </span>
                      <span className="font-mono">
                        -${discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Est. Tax (8%)</span>
                    <span className="text-white font-mono">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Shipping (Flat Rate)</span>
                    <span className="text-white font-mono">
                      ${SHIPPING_COST.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-end border-t border-white/10 pt-6 mb-8">
                  <span className="text-sm font-bold uppercase tracking-widest text-white">
                    Total
                  </span>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                      ${total.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                      USD
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="group relative w-full overflow-hidden bg-cyan-500 rounded-xl py-4 transition-all hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2 text-black font-black uppercase tracking-widest text-xs md:text-sm">
                    Initiate Secure Checkout{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                {/* Security Icons */}
                <div className="flex justify-center gap-4 mt-6 opacity-50">
                  <ShieldCheck className="w-5 h-5 text-gray-400" />
                  <CreditCard className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-center text-[10px] text-gray-600 mt-2 uppercase tracking-widest">
                  Encrypted 256-Bit SSL Connection
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
