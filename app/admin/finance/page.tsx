"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Filter,
  Download,
  Search,
  X,
  CreditCard,
  ArrowUpRight,
  User,
  Calendar,
  FileText,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

// --- TYPES ---
export type TransactionStatus = "Paid" | "Pending" | "Failed" | "Refunded";

export type TransactionItem = {
  name: string;
  variant: string;
  price: number;
  image: string;
};

export type Transaction = {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  method: string; // e.g. "Visa **** 4242"
  items: TransactionItem[];
};

// --- PORTAL HELPER (With Fix) ---
function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  if (!mounted || typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

// --- MAIN PAGE COMPONENT ---
export default function FinancePage() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 1. MOCK DATA LOAD
  useEffect(() => {
    setTransactions([
      {
        id: "TRX-8892-X",
        customerName: "Alexei V.",
        customerEmail: "alexei@vanguard.com",
        amount: 450.0,
        date: "2026-01-12 14:30",
        status: "Paid",
        method: "Visa •••• 4242",
        items: [
          {
            name: "Midnight Vanguard Parka",
            variant: "Obsidian / L",
            price: 450.0,
            image: "/clothes/001.jpg",
          },
        ],
      },
      {
        id: "TRX-8891-A",
        customerName: "Sarah J.",
        customerEmail: "sarah.j@gmail.com",
        amount: 125.0,
        date: "2026-01-12 13:15",
        status: "Pending",
        method: "PayPal",
        items: [
          {
            name: "Ash Bone Tee",
            variant: "Bone / M",
            price: 125.0,
            image: "/clothes/002.jpg",
          },
        ],
      },
      {
        id: "TRX-8890-F",
        customerName: "Davido K.",
        customerEmail: "david.k@outlook.com",
        amount: 890.0,
        date: "2026-01-11 09:45",
        status: "Failed",
        method: "Mastercard •••• 8821",
        items: [
          {
            name: "Protocol: Zero Boots",
            variant: "Black / 42",
            price: 890.0,
            image: "/clothes/003.jpg",
          },
        ],
      },
    ]);
  }, []);

  // 2. HANDLERS
  const openDetails = (trx: Transaction) => {
    setSelectedTransaction(trx);
    document.body.style.overflow = "hidden";
  };

  const closeDetails = () => {
    setSelectedTransaction(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-[#E5E5E5]">
            Financial Ledger
          </h1>
          <p className="text-[#737373] text-xs tracking-widest uppercase mt-2">
            Database:{" "}
            <span className="text-[#E5E5E5]">Global Transactions</span>
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525252]"
              size={14}
            />
            <input
              type="text"
              placeholder="SEARCH ID..."
              className="bg-[#0A0A0A] border border-[#333] rounded-lg py-2 pl-9 pr-4 text-xs text-[#E5E5E5] outline-none focus:border-[#737373] w-48"
            />
          </div>
          <button className="px-4 py-2 border border-[#333] text-[#A3A3A3] text-xs font-bold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white flex items-center gap-2 transition-colors">
            <Filter size={14} /> Filter
          </button>
          <button className="px-6 py-2 bg-[#E5E5E5] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border border-[#333] bg-[#0A0A0A] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#111]">
            <tr className="text-[#525252] uppercase text-xs tracking-wider">
              <th className="py-4 pl-6 font-medium">Transaction ID</th>
              <th className="py-4 font-medium">Customer</th>
              <th className="py-4 font-medium">Date</th>
              <th className="py-4 font-medium">Method</th>
              <th className="py-4 font-medium">Amount</th>
              <th className="py-4 font-medium text-right pr-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {transactions.map((trx) => (
              <tr
                key={trx.id}
                onClick={() => openDetails(trx)}
                className="group hover:bg-[#151515] transition-colors cursor-pointer"
              >
                <td className="py-4 pl-6">
                  <span className="font-mono text-[#E5E5E5] text-xs group-hover:underline decoration-[#525252] underline-offset-4">
                    #{trx.id}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#222] border border-[#333] flex items-center justify-center text-[10px] text-[#737373]">
                      {trx.customerName.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#E5E5E5] font-bold text-xs">
                        {trx.customerName}
                      </span>
                      <span className="text-[#525252] text-[10px]">
                        {trx.customerEmail}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-[#737373] font-mono text-xs">
                  {trx.date}
                </td>
                <td className="py-4 text-[#A3A3A3] text-xs flex items-center gap-2">
                  <CreditCard size={12} /> {trx.method}
                </td>
                <td className="py-4 font-mono text-[#E5E5E5]">
                  ${trx.amount.toFixed(2)}
                </td>
                <td className="py-4 text-right pr-6">
                  <StatusBadge status={trx.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- DETAIL OVERLAY --- */}
      <Portal>
        <div
          className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            selectedTransaction ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closeDetails}
        />

        <div
          className={`fixed inset-y-0 right-0 z-[9999] w-full max-w-md bg-[#0A0A0A] border-l border-[#333] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 ease-out flex flex-col ${
            selectedTransaction ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#333]">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter text-[#E5E5E5]">
                Receipt
              </h2>
              <p className="text-[#737373] text-[10px] tracking-widest uppercase mt-1 font-mono">
                ID: {selectedTransaction?.id}
              </p>
            </div>
            <button
              onClick={closeDetails}
              className="p-2 text-[#737373] hover:text-[#E5E5E5] hover:bg-[#1A1A1A] rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Content */}
          {selectedTransaction && (
            <div className="flex-1 overflow-y-auto">
              {/* Total Section */}
              <div className="p-8 bg-[#111] border-b border-[#333] flex flex-col items-center justify-center gap-2">
                <span className="text-xs uppercase tracking-widest text-[#737373]">
                  Total Paid
                </span>
                <h1 className="text-4xl font-mono font-black text-[#E5E5E5] tracking-tight">
                  ${selectedTransaction.amount.toFixed(2)}
                </h1>
                <StatusBadge status={selectedTransaction.status} />
              </div>

              {/* Meta Data Grid */}
              <div className="grid grid-cols-2 border-b border-[#333] divide-x divide-[#333]">
                <div className="p-6 space-y-1">
                  <span className="text-[10px] uppercase text-[#525252] flex items-center gap-1">
                    <Calendar size={10} /> Date
                  </span>
                  <p className="text-xs font-mono text-[#A3A3A3]">
                    {selectedTransaction.date}
                  </p>
                </div>
                <div className="p-6 space-y-1">
                  <span className="text-[10px] uppercase text-[#525252] flex items-center gap-1">
                    <CreditCard size={10} /> Method
                  </span>
                  <p className="text-xs font-mono text-[#A3A3A3]">
                    {selectedTransaction.method}
                  </p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="p-6 border-b border-[#333] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373]">
                  Customer Profile
                </h3>
                <div className="flex items-center gap-4 bg-[#151515] p-4 rounded-lg border border-[#333]">
                  <div className="h-10 w-10 rounded-full bg-[#222] flex items-center justify-center text-[#E5E5E5] font-bold">
                    {selectedTransaction.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#E5E5E5]">
                      {selectedTransaction.customerName}
                    </p>
                    <p className="text-xs text-[#737373]">
                      {selectedTransaction.customerEmail}
                    </p>
                  </div>
                  <button className="ml-auto text-[#737373] hover:text-[#E5E5E5]">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373]">
                  Itemized Breakdown
                </h3>
                <div className="space-y-3">
                  {selectedTransaction.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="h-16 w-12 bg-[#1A1A1A] rounded border border-[#333] overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          className="w-full h-full object-cover opacity-70"
                          alt="item"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-sm font-bold text-[#E5E5E5]">
                          {item.name}
                        </p>
                        <p className="text-xs text-[#737373] font-mono uppercase">
                          {item.variant}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center text-right">
                        <p className="text-sm font-mono text-[#E5E5E5]">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-[#333] bg-[#0A0A0A] grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#333] text-[#737373] text-xs font-bold uppercase tracking-widest hover:text-red-400 hover:border-red-900/30 transition-colors">
              <RotateCcw size={14} /> Refund
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#E5E5E5] text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-colors">
              <FileText size={14} /> Invoice
            </button>
          </div>
        </div>
      </Portal>
    </div>
  );
}

// --- HELPER: STATUS BADGE ---
const StatusBadge = ({ status }: { status: TransactionStatus }) => {
  const styles = {
    Paid: "bg-green-900/30 text-green-400 border-green-900/50",
    Pending: "bg-orange-900/20 text-orange-400 border-orange-900/30",
    Failed: "bg-red-900/20 text-red-400 border-red-900/30",
    Refunded: "bg-[#1A1A1A] text-[#737373] border-[#333]",
  };

  const icons = {
    Paid: <CheckCircle size={10} />,
    Pending: <Clock size={10} />,
    Failed: <AlertCircle size={10} />,
    Refunded: <RotateCcw size={10} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
};
