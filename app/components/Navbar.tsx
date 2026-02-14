"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
// 1. Import the Overlay
import CartOverlay from "../components/CartOverlay";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // 2. Add State for Cart Overlay
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Collections", href: "/Collection" },
    { name: "About Us", href: "/AboutUs" },
    { name: "Exhibition", href: "/exhibition" },
    { name: "Contact", href: "/ContactUs" },
  ];

  const { cartCount } = useCart();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border-white/10 py-4"
            : "bg-transparent border-transparent py-6 md:py-10"
        }`}
      >
        <div className="w-full px-6 md:px-16 lg:px-24 flex items-center justify-between">
          {/* ================= LOGO SECTION ================= */}
          <div className="flex-shrink-0 z-50">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group flex flex-col cursor-pointer relative items-start"
            >
              <h1 className="logo-text text-2xl md:text-3xl lg:text-4xl font-black tracking-[0.2em] relative z-10">
                ICEEMPIRE
              </h1>
              <div className="absolute inset-0 bg-cyan-500/20 blur-[20px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
              <span className="text-[8px] md:text-[10px] text-zinc-500 tracking-[0.4em] mt-2 uppercase pl-1 group-hover:text-white transition-colors duration-500">
                Dominion Est. 2025
              </span>
            </Link>
          </div>

          {/* ================= DESKTOP NAV LINKS ================= */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-16">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group py-2"
              >
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 group-hover:text-white transition-colors duration-300">
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-white group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
              </Link>
            ))}
          </nav>

          {/* ================= ICONS & ACTIONS ================= */}
          <div className="flex items-center gap-6 md:gap-8 flex-shrink-0 z-50">
            <div className="hidden md:flex items-center gap-8 border-r border-white/20 pr-8 mr-2">
              <Link
                href="/signin"
                className="text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 border border-white/20 text-xs font-bold tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>

            {/* 3. Updated Cart Button */}
            <button
              className="relative group"
              onClick={() => setIsCartOpen(true)} // Opens the overlay
            >
              <ShoppingCart
                className="w-5 h-5 text-white relative z-10 hover:text-cyan-400 transition-colors"
                strokeWidth={1.5}
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 bg-cyan-500 text-[10px] font-bold text-black flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-cyan-400 transition-colors p-1"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X strokeWidth={1.5} size={28} />
              ) : (
                <Menu strokeWidth={1.5} size={28} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ================= CART OVERLAY ================= */}
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-950 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black"></div>

        <div className="h-full flex flex-col pt-32 pb-10 px-8 relative overflow-y-auto">
          <div className="flex flex-col gap-6 relative z-10">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center justify-between border-b border-white/10 pb-6"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                    0{index + 1}
                  </span>
                  <span className="text-3xl font-black uppercase tracking-tighter text-zinc-300 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                    {link.name}
                  </span>
                </div>
                <ArrowRight className="text-zinc-600 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-10 flex flex-col gap-4 relative z-10">
            <Link
              href="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 bg-white text-black text-center text-sm font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors"
            >
              Start Journey (Sign Up)
            </Link>
            <Link
              href="/signin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 border border-zinc-700 text-zinc-400 text-center text-sm font-bold uppercase tracking-widest hover:text-white hover:border-white transition-colors"
            >
              Account Access
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
              ICEEMPIRE © 2025
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-text {
          background-image: url("/textures/snowball.jpeg");
          background-size: cover;
          background-position: center;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.5));
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
            filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.5));
          }
          50% {
            transform: translateY(-4px);
            filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.3));
          }
          100% {
            transform: translateY(0px);
            filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.5));
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
