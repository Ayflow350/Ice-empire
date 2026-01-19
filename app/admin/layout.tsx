"use client";

import React, { useState } from "react";
// Make sure this path points to where you saved your Sidebar component
import { Sidebar } from "./components/admin/Sidebar";
import { Search, Bell, ChevronRight } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#050505] font-sans text-[#E5E5E5] selection:bg-[#E5E5E5]/30 overflow-hidden">
      {/* Global Noise Texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col overflow-hidden">
        {/* --- GLOBAL HEADER --- */}
        <header className="flex h-20 items-center justify-between border-b border-[#333] bg-[#050505]/80 backdrop-blur-md px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-4 text-sm text-[#737373]">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="text-[#E5E5E5] uppercase tracking-wider">
              Console
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525252]"
                size={16}
              />
              <input
                type="text"
                placeholder="SEARCH DATABASE..."
                className="h-10 w-64 rounded-full border border-[#333] bg-[#0A0A0A] pl-10 pr-4 text-xs font-bold tracking-wider text-[#E5E5E5] placeholder-[#525252] focus:border-[#E5E5E5] focus:outline-none focus:ring-1 focus:ring-[#E5E5E5]"
              />
            </div>

            {/* Notifications */}
            <button className="relative text-[#A3A3A3] hover:text-[#E5E5E5]">
              <Bell size={20} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            </button>

            {/* Avatar */}
            <div className="h-8 w-8 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-xs font-bold">
              AD
            </div>
          </div>
        </header>

        {/* --- DYNAMIC PAGE CONTENT --- */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#050505]">
          {children}
        </div>
      </main>
    </div>
  );
}
