"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  CreditCard,
  Layers,
  MonitorPlay,
  Settings,
  ChevronDown,
  LogOut,
  ChevronRight,
} from "lucide-react";

export const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const pathname = usePathname();
  const [productMenuOpen, setProductMenuOpen] = useState(true);

  // Helper to check active state
  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={`relative z-20 flex flex-col border-r border-[#333] bg-[#0A0A0A]/95 backdrop-blur-xl transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* --- LOGO --- */}
      <div className="flex h-20 items-center justify-between px-6 border-b border-[#333]">
        {isOpen ? (
          <span className="text-xl font-black tracking-tighter uppercase text-[#E5E5E5]">
            Vanguard<span className="text-[#525252]">.OS</span>
          </span>
        ) : (
          <span className="text-xl font-black text-[#E5E5E5]">V.</span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#737373] hover:text-[#E5E5E5]"
        >
          {isOpen ? (
            <ChevronRight size={20} className="rotate-180" />
          ) : (
            <ChevronRight size={20} />
          )}
        </button>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 overflow-y-auto py-6 space-y-2 px-3">
        <NavLink
          href="/admin/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Overview"
          isOpen={isOpen}
          active={isActive("/admin/dashboard")}
        />

        {/* PRODUCTS DROPDOWN */}
        <div className="space-y-1">
          <button
            onClick={() => isOpen && setProductMenuOpen(!productMenuOpen)}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-[#1A1A1A] hover:text-[#E5E5E5] ${
              !isOpen && "justify-center"
            } text-[#A3A3A3]`}
          >
            <div className="flex items-center gap-3">
              <Package size={20} />
              {isOpen && <span>Inventory</span>}
            </div>
            {isOpen && (
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  productMenuOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {/* SUBMENU */}
          {isOpen && productMenuOpen && (
            <div className="ml-4 border-l border-[#333] pl-4 space-y-1">
              <SubNavLink
                href="/admin/products"
                label="All Products"
                active={isActive("/admin/products")}
              />
              <SubNavLink
                href="/admin/products/male"
                label="Male Archives"
                active={isActive("/admin/products/male")}
              />
              <SubNavLink
                href="/admin/products/female"
                label="Female Archives"
                active={isActive("/admin/products/female")}
              />
            </div>
          )}
        </div>

        <NavLink
          href="/admin/collections"
          icon={<Layers size={20} />}
          label="Collections"
          isOpen={isOpen}
          active={isActive("/admin/collections")}
        />
        <NavLink
          href="/admin/exhibitions"
          icon={<MonitorPlay size={20} />}
          label="Exhibitions"
          isOpen={isOpen}
          active={isActive("/admin/exhibitions")}
        />
        <NavLink
          href="/admin/finance"
          icon={<CreditCard size={20} />}
          label="Payments"
          isOpen={isOpen}
          active={isActive("/admin/finance")}
        />
        <NavLink
          href="/admin/users"
          icon={<Users size={20} />}
          label="Clientele"
          isOpen={isOpen}
          active={isActive("/admin/users")}
        />
      </nav>

      {/* --- FOOTER --- */}
      <div className="border-t border-[#333] p-4 space-y-2">
        <NavLink
          href="/admin/settings"
          icon={<Settings size={20} />}
          label="System Settings"
          isOpen={isOpen}
          active={isActive("/admin/settings")}
        />
        <button
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-400 hover:bg-red-900/10 transition-colors ${
            !isOpen && "justify-center"
          }`}
        >
          <LogOut size={20} />
          {isOpen && <span>Terminate</span>}
        </button>
      </div>
    </aside>
  );
};

// --- Sub Components ---
interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  active: boolean;
}

const NavLink = ({ href, icon, label, isOpen, active }: NavLinkProps) => (
  <Link
    href={href}
    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
      !isOpen && "justify-center"
    } ${
      active
        ? "bg-[#E5E5E5] text-black shadow-[0_0_15px_rgba(229,229,229,0.2)]"
        : "text-[#A3A3A3] hover:bg-[#1A1A1A] hover:text-[#E5E5E5]"
    }`}
  >
    {icon}
    {isOpen && <span>{label}</span>}
  </Link>
);

interface SubNavLinkProps {
  href: string;
  label: string;
  active: boolean;
}

const SubNavLink = ({ href, label, active }: SubNavLinkProps) => (
  <Link
    href={href}
    className={`flex w-full items-center rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
      active
        ? "text-[#E5E5E5] bg-[#1A1A1A]"
        : "text-[#737373] hover:text-[#E5E5E5] hover:bg-[#1A1A1A]"
    }`}
  >
    <div
      className={`mr-3 h-1 w-1 rounded-full ${
        active ? "bg-[#E5E5E5]" : "bg-[#525252]"
      }`}
    ></div>
    {label}
  </Link>
);
