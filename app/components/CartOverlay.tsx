"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Trash2, ShoppingBag, Minus, Plus } from "lucide-react";
import { useCart, CartItem } from "../context/CartContext";

type CartOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartOverlay = ({ isOpen, onClose }: CartOverlayProps) => {
  const { cartItems, removeFromCart, cartTotal, addToCart } = useCart();

  // Disable body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle outside click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Helper to increment quantity
  const handleIncrement = (item: CartItem) => {
    addToCart({
      productId: item.productId,
      variantId: item.variantId,
      name: item.name,
      price: item.price,
      color: item.color,
      size: item.size,
      image: item.image,
      quantity: 1, // Adds 1
    });
  };

  // Helper to decrement quantity
  const handleDecrement = (item: CartItem) => {
    if (item.quantity > 1) {
      addToCart({
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        price: item.price,
        color: item.color,
        size: item.size,
        image: item.image,
        quantity: -1, // Subtracts 1 (works because Context adds the value)
      });
    } else {
      removeFromCart(item.uniqueId); // Remove if qty is 1
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Slide-out Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[61] w-full max-w-md bg-[#0A0A0A] border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-black uppercase tracking-tighter text-white flex items-center gap-2">
            <ShoppingBag size={20} /> Your Artifacts
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-4">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-xs uppercase tracking-widest">
                Your inventory is empty
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 border border-zinc-800 text-white text-xs font-bold uppercase hover:bg-white hover:text-black transition-colors"
              >
                Explore Archives
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.uniqueId} className="flex gap-4 group">
                {/* Image */}
                <div className="h-24 w-20 bg-zinc-900 border border-white/10 overflow-hidden shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs">
                      IMG
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wide line-clamp-1">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.uniqueId)}
                        className="text-zinc-600 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
                      {item.color} / Size {item.size}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-white/10 rounded-sm">
                      <button
                        onClick={() => handleDecrement(item)}
                        className="p-1 px-2 text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 text-xs text-white font-mono min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(item)}
                        className="p-1 px-2 text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Total Price for this Item */}
                    <div className="text-right">
                      <span className="block text-sm font-mono text-white">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-zinc-600 block">
                          ${item.price.toLocaleString()} ea
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer: Totals & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-zinc-950">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                Subtotal
              </span>
              <span className="text-xl font-mono text-white">
                ${cartTotal.toLocaleString()}
              </span>
            </div>

            <p className="text-[10px] text-zinc-600 mb-4 text-center">
              Shipping & taxes calculated at checkout.
            </p>

            <Link
              href="/checkout"
              onClick={onClose}
              className="w-full block bg-white text-black py-4 text-center text-xs font-black uppercase tracking-widest hover:bg-cyan-400 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartOverlay;
