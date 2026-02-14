"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  uniqueId: string; // generated ID (productId + variantId + size)
  productId: string;
  variantId: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "uniqueId">) => void;
  removeFromCart: (uniqueId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("iceempire_cart");
    if (savedCart) {
      try {
        queueMicrotask(() => setCartItems(JSON.parse(savedCart)));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    queueMicrotask(() => setIsLoaded(true));
  }, []);

  // 2. Save to LocalStorage whenever cart changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("iceempire_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (newItem: Omit<CartItem, "uniqueId">) => {
    setCartItems((prev) => {
      // Create a unique ID based on product, color, and size
      const uniqueId = `${newItem.productId}-${newItem.variantId}-${newItem.size}`;

      const existingItemIndex = prev.findIndex(
        (item) => item.uniqueId === uniqueId,
      );

      if (existingItemIndex > -1) {
        // Item exists (same size/color), just update quantity
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      } else {
        // Add new item
        return [...prev, { ...newItem, uniqueId }];
      }
    });
  };

  const removeFromCart = (uniqueId: string) => {
    setCartItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Derived state
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
