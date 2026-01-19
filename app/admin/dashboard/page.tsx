"use client";

import React from "react";
import {
  CreditCard,
  Box,
  Users,
  MonitorPlay,
  TrendingUp,
  ArrowRight,
  Activity,
  AlertCircle,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-[#E5E5E5] leading-none">
            Command Center
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-[#737373] text-xs tracking-widest uppercase font-mono">
              System Online • v2.4.0
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-3 bg-[#E5E5E5] text-black text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2">
            + Initiate Drop
          </button>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Revenue"
          value="$124,500.00"
          trend="+12.5%"
          icon={<CreditCard size={20} className="text-[#E5E5E5]" />}
        />
        <StatCard
          label="Active Orders"
          value="48"
          trend="+4"
          icon={<Box size={20} className="text-[#E5E5E5]" />}
        />
        <StatCard
          label="Clientele"
          value="1,204"
          trend="+8%"
          icon={<Users size={20} className="text-[#E5E5E5]" />}
        />
        <StatCard
          label="Gallery Visits"
          value="8,902"
          trend="+24%"
          icon={<MonitorPlay size={20} className="text-[#E5E5E5]" />}
        />
      </div>

      {/* --- SPLIT LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Recent Transactions (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#A3A3A3] flex items-center gap-2">
              <Activity size={14} /> Live Transactions
            </h3>
            <button className="text-[10px] uppercase tracking-widest text-[#E5E5E5] border-b border-transparent hover:border-[#E5E5E5] transition-all">
              View All History
            </button>
          </div>

          <div className="rounded-xl border border-[#333] bg-[#0A0A0A] overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#111] border-b border-[#333]">
                <tr className="text-[#525252] uppercase text-[10px] tracking-wider">
                  <th className="py-3 pl-6 font-medium">Order ID</th>
                  <th className="py-3 font-medium">Client</th>
                  <th className="py-3 font-medium">Item</th>
                  <th className="py-3 font-medium">Status</th>
                  <th className="py-3 font-medium text-right pr-6">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr
                    key={i}
                    className="group hover:bg-[#151515] transition-colors cursor-pointer"
                  >
                    <td className="py-4 pl-6 font-mono text-[#737373] text-xs group-hover:text-[#E5E5E5]">
                      #ORD-09{i}
                    </td>
                    <td className="py-4 text-[#E5E5E5] font-medium">
                      Alexei V.
                    </td>
                    <td className="py-4 text-[#A3A3A3] text-xs uppercase tracking-wide">
                      Neon Valkyrie Vest
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-green-900/30 text-green-400 border border-green-900/50 uppercase tracking-wide">
                        Paid
                      </span>
                    </td>
                    <td className="py-4 text-right pr-6 font-mono text-[#E5E5E5]">
                      $450.00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: Quick Actions & Live Gallery (1/3 width) */}
        <div className="space-y-6">
          {/* Live Exhibition Card */}
          <div className="group relative h-64 w-full rounded-xl overflow-hidden border border-[#333] bg-[#000] cursor-pointer">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-[#1A1A1A]">
              {/* Simulating an image */}
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-widest font-bold animate-pulse">
                  ● Live Now
                </span>
                <ArrowRight className="text-[#E5E5E5] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>

              <div>
                <p className="text-[#737373] text-xs uppercase tracking-widest mb-1">
                  Current Exhibition
                </p>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                  Obsidian <br /> Relics
                </h3>
                <div className="mt-4 flex items-center gap-2 text-xs text-[#A3A3A3]">
                  <Users size={14} />
                  <span>142 Active Viewers</span>
                </div>
              </div>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#E5E5E5]/20 rounded-xl transition-all duration-300"></div>
          </div>

          {/* Inventory Alerts */}
          <div className="rounded-xl border border-[#333] bg-[#0A0A0A] p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#A3A3A3] mb-4 flex items-center gap-2">
              <AlertCircle size={14} className="text-orange-500" /> Stock Low
            </h3>
            <div className="space-y-4">
              <StockItem name="Midnight Parka (L)" stock={2} />
              <StockItem name="Ash Bone Tee (M)" stock={5} />
              <StockItem name="Tactical Vest 01" stock={0} />
            </div>
            <button className="w-full mt-6 py-2 border border-[#333] text-[#737373] text-[10px] uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-[#E5E5E5] transition-colors">
              Manage Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Local Components for cleaner code ---

type StatCardProps = {
  label: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
};

const StatCard = ({ label, value, trend, icon }: StatCardProps) => (
  <div className="group rounded-xl border border-[#333] bg-[#0A0A0A] p-6 transition-all hover:border-[#525252] hover:bg-[#0F0F0F]">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#737373] group-hover:text-[#A3A3A3] transition-colors">
          {label}
        </p>
        <h3 className="mt-2 text-2xl font-black text-[#E5E5E5] tracking-tight font-mono">
          {value}
        </h3>
      </div>
      <div className="rounded-lg bg-[#151515] p-2 border border-[#333] group-hover:border-[#525252] transition-colors">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-wider">
      <TrendingUp size={12} />
      <span>{trend} vs last week</span>
    </div>
  </div>
);

const StockItem = ({ name, stock }: { name: string; stock: number }) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-3">
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          stock === 0 ? "bg-red-500 animate-pulse" : "bg-orange-500"
        }`}
      ></div>
      <span className="text-xs text-[#D4D4D4] group-hover:text-white transition-colors">
        {name}
      </span>
    </div>
    <span
      className={`text-[10px] font-mono ${
        stock === 0 ? "text-red-400" : "text-[#737373]"
      }`}
    >
      {stock === 0 ? "OUT OF STOCK" : `${stock} LEFT`}
    </span>
  </div>
);
