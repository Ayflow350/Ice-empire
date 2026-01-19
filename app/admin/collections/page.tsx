"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  X,
  Filter,
  Layers,
  Image as ImageIcon,
  MoreHorizontal,
  Trash2,
  UploadCloud,
  Loader2,
  Calendar,
  Hash,
} from "lucide-react";

// --- TYPES ---
export type CollectionStatus = "Active" | "Draft" | "Archived";

export type Collection = {
  id: number;
  title: string; // e.g. "Midnight Vanguard"
  subtitle: string; // e.g. "Men's Outerwear"
  dropCode: string; // e.g. "DROP 01"
  status: CollectionStatus;
  image: string;
  itemCount: number;
  releaseDate: string;
};

// --- PORTAL HELPER ---
function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  React.useLayoutEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

// --- MAIN PAGE COMPONENT ---
export default function AdminCollectionsPage() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState<Collection[]>([]);

  // 1. MOCK FETCH
  useEffect(() => {
    // Simulate fetching from API
    setTimeout(() => {
      setCollections([
        {
          id: 1,
          title: "Midnight Vanguard",
          subtitle: "Men's Outerwear",
          dropCode: "DROP 01",
          status: "Active",
          image: "/clothes/001.jpg",
          itemCount: 12,
          releaseDate: "2024-10-15",
        },
        {
          id: 2,
          title: "Neon Valkyrie",
          subtitle: "Women's Techwear",
          dropCode: "DROP 02",
          status: "Draft",
          image: "/clothes/002.jpg",
          itemCount: 8,
          releaseDate: "2025-01-20",
        },
        {
          id: 3,
          title: "Obsidian Relics",
          subtitle: "Accessories",
          dropCode: "DROP 03",
          status: "Archived",
          image: "/clothes/003.jpg",
          itemCount: 24,
          releaseDate: "2023-11-05",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // 2. CREATE HANDLER
  const handleCreate = (newCollection: Collection) => {
    setCollections([newCollection, ...collections]);
    setIsOverlayOpen(false);
  };

  // 3. DELETE HANDLER
  const handleDelete = (id: number) => {
    setCollections(collections.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-[#E5E5E5]">
            Collection Archives
          </h1>
          <p className="text-[#737373] text-xs tracking-widest uppercase mt-2">
            Database: <span className="text-[#E5E5E5]">Seasonal Drops</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-[#333] text-[#A3A3A3] text-xs font-bold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white flex items-center gap-2 transition-colors">
            <Filter size={14} /> Filter
          </button>
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="px-6 py-2 bg-[#E5E5E5] text-black text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2"
          >
            <Plus size={14} /> New Drop
          </button>
        </div>
      </div>

      {/* GRID LIST */}
      {isLoading ? (
        <div className="flex h-64 w-full items-center justify-center border border-[#333] rounded-xl bg-[#0A0A0A]">
          <div className="flex flex-col items-center gap-4 text-[#737373]">
            <Loader2 className="animate-spin" size={32} />
            <span className="text-xs uppercase tracking-widest">
              Syncing Archives...
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative rounded-xl border border-[#333] bg-[#0A0A0A] overflow-hidden hover:border-[#737373] transition-all duration-300"
            >
              {/* Image Area */}
              <div className="relative h-48 w-full bg-[#151515] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4">
                  <StatusBadge status={collection.status} />
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-[#E5E5E5] border border-white/10">
                  {collection.dropCode}
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#737373] mb-1">
                      {collection.subtitle}
                    </p>
                    <h3 className="text-xl font-black uppercase text-[#E5E5E5] tracking-tight">
                      {collection.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleDelete(collection.id)}
                    className="text-[#333] hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-[#1A1A1A] pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[#525252]">
                      Items
                    </span>
                    <span className="text-sm font-mono text-[#A3A3A3]">
                      {collection.itemCount} Units
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[#525252]">
                      Launch
                    </span>
                    <span className="text-sm font-mono text-[#A3A3A3]">
                      {collection.releaseDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- SLIDING DRAWER FORM --- */}
      <Portal>
        <div
          className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isOverlayOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsOverlayOpen(false)}
        />

        <div
          className={`fixed inset-y-0 right-0 z-[9999] w-full max-w-xl bg-[#0A0A0A] border-l border-[#333] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 ease-out flex flex-col ${
            isOverlayOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#333]">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter text-[#E5E5E5]">
                Initiate Drop
              </h2>
              <p className="text-[#737373] text-[10px] tracking-widest uppercase mt-1">
                Configure New Collection
              </p>
            </div>
            <button
              onClick={() => setIsOverlayOpen(false)}
              className="p-2 text-[#737373] hover:text-[#E5E5E5] hover:bg-[#1A1A1A] rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* FORM */}
          <div className="flex-1 overflow-y-auto">
            <CollectionForm
              onSubmit={handleCreate}
              onCancel={() => setIsOverlayOpen(false)}
            />
          </div>
        </div>
      </Portal>
    </div>
  );
}

// --- HELPER: STATUS BADGE ---
const StatusBadge = ({ status }: { status: CollectionStatus }) => {
  const styles = {
    Active: "bg-green-900/30 text-green-400 border-green-900/50",
    Draft: "bg-[#1A1A1A] text-[#737373] border-[#333]",
    Archived: "bg-red-900/10 text-red-400 border-red-900/20",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${styles[status]}`}
    >
      {status}
    </span>
  );
};

// --- COLLECTION FORM COMPONENT ---
type CollectionFormProps = {
  onSubmit: (data: Collection) => void;
  onCancel: () => void;
};

const CollectionForm = ({ onSubmit, onCancel }: CollectionFormProps) => {
  const [form, setForm] = useState<Partial<Collection>>({
    status: "Draft",
    image: "",
  });

  // Mock Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setForm({ ...form, image: url });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.dropCode) return;

    const newCollection: Collection = {
      id: Date.now(),
      title: form.title || "Untitled",
      subtitle: form.subtitle || "General Collection",
      dropCode: form.dropCode || "DROP XX",
      status: (form.status as CollectionStatus) || "Draft",
      image: form.image || "/placeholder.jpg",
      itemCount: 0,
      releaseDate: form.releaseDate || new Date().toISOString().split("T")[0],
    };

    onSubmit(newCollection);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8 pb-32">
      {/* 1. Identity */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373] flex items-center gap-2">
          <Layers size={14} /> Identity
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="COLLECTION TITLE (E.G. MIDNIGHT VANGUARD)"
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-4 text-[#E5E5E5] font-bold tracking-tight focus:border-[#E5E5E5] outline-none text-lg"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Subtitle (e.g. Men's Outerwear)"
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 text-sm text-[#E5E5E5] outline-none"
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          />
        </div>
      </div>

      <div className="h-px bg-[#1A1A1A] w-full" />

      {/* 2. Configuration */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373] flex items-center gap-2">
          <Hash size={14} /> Configuration
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-[#525252]">
              Drop Code
            </label>
            <input
              type="text"
              placeholder="DROP 01"
              className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 text-sm text-[#E5E5E5] font-mono outline-none"
              onChange={(e) => setForm({ ...form, dropCode: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-[#525252]">
              Release Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 text-sm text-[#E5E5E5] outline-none appearance-none"
                onChange={(e) =>
                  setForm({ ...form, releaseDate: e.target.value })
                }
              />
              <Calendar
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#525252] pointer-events-none"
                size={14}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase text-[#525252]">Status</label>
          <select
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 text-sm text-[#E5E5E5] outline-none"
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as CollectionStatus })
            }
            value={form.status}
          >
            <option value="Draft">Draft (Internal)</option>
            <option value="Active">Active (Public)</option>
            <option value="Archived">Archived (Hidden)</option>
          </select>
        </div>
      </div>

      {/* 3. Assets */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373] flex items-center gap-2">
          <ImageIcon size={14} /> Key Visual
        </h3>
        <div className="relative h-48 w-full bg-[#151515] border-2 border-dashed border-[#333] rounded-xl flex flex-col items-center justify-center hover:border-[#737373] transition-colors overflow-hidden">
          {form.image ? (
            <img
              src={form.image}
              className="w-full h-full object-cover"
              alt="preview"
            />
          ) : (
            <>
              <UploadCloud className="text-[#333] mb-2" />
              <span className="text-xs text-[#737373] font-bold">
                UPLOAD COVER IMAGE
              </span>
            </>
          )}
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#0A0A0A] border-t border-[#333] flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-[#333] text-[#737373] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-[#E5E5E5] text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2"
        >
          <UploadCloud size={16} /> Launch Drop
        </button>
      </div>
    </form>
  );
};
