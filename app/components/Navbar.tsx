"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, ArrowUpRight } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
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
        <div className="w-full px-6 md:px-16 lg:px-24 flex items-center justify-between">
          {/* ================= LOGO SECTION ================= */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="group flex flex-col cursor-pointer z-50 relative items-start"
            >
              {/* THE SNOWBALL EFFECT:
                 1. We use the image as the background.
                 2. We clip the background to the text.
                 3. We animate the whole block to 'float'.
              */}
              <h1 className="logo-text text-3xl md:text-4xl font-black tracking-[0.2em] relative z-10">
                ICEEMPIRE
              </h1>

              {/* Glow behind the text to simulate "Sky Atmosphere" */}
              <div className="absolute inset-0 bg-cyan-500/20 blur-[20px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>

              <span className="text-[10px] text-zinc-500 tracking-[0.4em] mt-2 uppercase pl-1 group-hover:text-white transition-colors duration-500">
                Dominion Est. 2025
              </span>
            </Link>
          </div>

          {/* ================= NAV LINKS ================= */}
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
                <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-white group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
              </Link>
            ))}
          </nav>

          {/* ================= ICONS ================= */}
          <div className="flex items-center gap-8 flex-shrink-0 z-50">
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

            <button className="relative group">
              <ShoppingCart
                className="w-5 h-5 text-white relative z-10"
                strokeWidth={1.5}
              />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-slate-200 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-slate-300 transition-colors"
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
        className={`fixed inset-0 z-40 bg-black transition-transform duration-700 ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="h-full flex flex-col justify-center px-8 md:px-12 relative overflow-hidden">
          {/* Mobile menu content same as before */}
          <div className="flex flex-col gap-6 relative z-10">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center gap-4 text-3xl md:text-5xl font-black uppercase tracking-tighter text-white"
              >
                <span className="text-sm font-normal text-neutral-600 tracking-widest group-hover:text-white">
                  0{index + 1}
                </span>
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ================= CUSTOM STYLES (The Magic) ================= */}
      <style jsx>{`
        .logo-text {
          /* 1. Use the Snowball Image as the text color */
          background-image: url("/textures/snowball.jpeg"); /* REPLACE WITH YOUR IMAGE PATH */

          /* 2. Position it to show the cratered texture */
          background-size: cover;
          background-position: center;

          /* 3. Clip the background to the text */
          -webkit-background-clip: text;
          background-clip: text;

          /* 4. Make text transparent so image shows through */
          color: transparent;

          /* 5. Add slight drop shadow to separate from space background */
          filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.5));

          /* 6. The Suspension Animation */
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
            filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.5));
          }
          50% {
            transform: translateY(-6px); /* Moves up */
            filter: drop-shadow(
              0px 15px 10px rgba(0, 0, 0, 0.3)
            ); /* Shadow moves away */
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
