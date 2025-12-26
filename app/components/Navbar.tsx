"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, ArrowUpRight } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collections", href: "/Collection" },
    { name: "About Us", href: "/AboutUs" },
    { name: "Exhibition", href: "/exhibition" },
    { name: "Contact", href: "/ContactUs" },
  ];
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border-white/10 py-4"
            : "bg-transparent border-transparent py-6 md:py-10"
        }`}
      >
        {/* CHANGED: Removed 'container mx-auto', added 'w-full' and larger padding for spacious look */}
        <div className="w-full px-6 md:px-16 lg:px-24 flex items-center justify-between">
          {/* ================= LOGO (Far Left) ================= */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="group flex flex-col cursor-pointer z-50 relative"
            >
              <h1 className="text-2xl font-bold tracking-[0.2em] text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] group-hover:text-white transition-colors duration-300">
                ICEMPIRE
              </h1>
              <span className="text-[10px] text-gray-500 tracking-[0.4em] mt-1 uppercase group-hover:text-cyan-400 transition-colors duration-300">
                Dominion Est. 2025
              </span>
            </Link>
          </div>

          {/* ================= DESKTOP NAV (Centered & Airy) ================= */}
          <nav className="hidden md:flex items-center gap-12 lg:gap-16">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group py-2"
              >
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 group-hover:text-white transition-colors duration-300">
                  {link.name}
                </span>
                {/* Center-Out Underline */}
                <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-white group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
              </Link>
            ))}
          </nav>

          {/* ================= ACTIONS (Far Right) ================= */}
          <div className="flex items-center gap-8 flex-shrink-0 z-50">
            {/* Desktop Auth Links */}
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

            {/* Cart Button */}
            <button className="relative group">
              <span className="absolute -inset-2 bg-white/0 group-hover:bg-white/10 rounded-full transition-colors duration-300"></span>
              <ShoppingCart
                className="w-5 h-5 text-white relative z-10"
                strokeWidth={1.5}
              />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-cyan-400 rounded-full box-shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-cyan-400 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X strokeWidth={1.5} />
              ) : (
                <Menu strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-transform duration-700 cubic-bezier(0.77, 0, 0.175, 1) ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="h-full flex flex-col justify-center px-8 md:px-12 relative overflow-hidden">
          {/* Large Background Texture */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[40vh] font-black text-neutral-900 pointer-events-none opacity-50 select-none">
            ICE
          </div>

          {/* Main Links */}
          <div className="flex flex-col gap-6 relative z-10">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center gap-4 text-3xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-700 hover:from-white hover:to-white transition-all duration-500"
              >
                <span className="text-sm font-normal text-cyan-500 tracking-widest group-hover:text-white transition-colors">
                  0{index + 1}
                </span>
                <span>{link.name}</span>
                <ArrowUpRight className="w-6 h-6 text-neutral-800 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500" />
              </Link>
            ))}

            {/* Mobile Auth Links */}
            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 w-full max-w-xs">
              <Link
                href="/signin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl text-neutral-400 hover:text-white font-bold tracking-widest uppercase"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl text-cyan-400 hover:text-white font-bold tracking-widest uppercase flex items-center gap-2"
              >
                Sign Up <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mobile Footer Info */}
          <div className="absolute bottom-12 left-8 md:left-12 right-8 flex justify-between items-end border-t border-white/10 pt-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500">
                Contact
              </span>
              <span className="text-sm text-white font-medium">
                hello@icempire.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
