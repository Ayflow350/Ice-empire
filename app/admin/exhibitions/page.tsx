"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  X,
  Filter,
  MapPin,
  Calendar,
  Globe,
  Image as ImageIcon,
  MoreHorizontal,
  Trash2,
  UploadCloud,
  Loader2,
  Circle,
} from "lucide-react";

// --- TYPES (Unified Data Structure) ---
export type ExhibitionStatus = "Archived" | "Open Now" | "Upcoming";

export type Exhibition = {
  id: number;
  title: string;
  location: string;
  date: string; // e.g., "OCT 2024"
  status: ExhibitionStatus;
  coordinates: string;
  image: string;
  description: string;
};

// --- PORTAL COMPONENT ---
function Portal({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.body);
}

// --- MAIN PAGE COMPONENT ---
export default function AdminExhibitionsPage() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);

  // 1. MOCK FETCHING DATA
  useEffect(() => {
    const fetchExhibitions = async () => {
      // Simulate API delay
      setTimeout(() => {
        setExhibitions([
          {
            id: 1,
            title: "Entropy: First Drop",
            location: "Shibuya, Tokyo",
            date: "OCT 2024",
            status: "Archived",
            coordinates: "35.6591° N, 139.7006° E",
            image: "/exhibition/tokyo.jpg",
            description:
              "The genesis of our design language. A study in chaotic minimalism.",
          },
          {
            id: 3,
            title: "Protocol: Zero",
            location: "The Tate, London",
            date: "MAR 2026",
            status: "Open Now",
            coordinates: "51.5076° N, 0.0994° W",
            image: "/exhibition/london.jpg",
            description:
              "Current installation. A brutalist exploration of fabric resilience.",
          },
          {
            id: 4,
            title: "Eclipse Theory",
            location: "Paris, France",
            date: "DEC 2026",
            status: "Upcoming",
            coordinates: "48.8566° N, 2.3522° E",
            image: "/exhibition/paris.jpg",
            description:
              "The next evolution. Introducing the new winter silhouette.",
          },
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchExhibitions();
  }, []);

  // 2. CREATE HANDLER
  const handleCreate = (newExhibition: Exhibition) => {
    // In a real app, you would POST to API here
    setExhibitions([newExhibition, ...exhibitions]);
    setIsOverlayOpen(false);
  };

  // 3. DELETE HANDLER
  const handleDelete = (id: number) => {
    setExhibitions(exhibitions.filter((ex) => ex.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-[#E5E5E5]">
            Exhibition Protocol
          </h1>
          <p className="text-[#737373] text-xs tracking-widest uppercase mt-2">
            Database: <span className="text-[#E5E5E5]">Global Events</span>
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
            <Plus size={14} /> Create Event
          </button>
        </div>
      </div>

      {/* CONTENT LIST */}
      <div className="rounded-xl border border-[#333] bg-[#0A0A0A] overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center text-[#737373] gap-4">
            <Loader2 className="animate-spin" size={32} />
            <span className="text-xs uppercase tracking-widest">
              Fetching Archives...
            </span>
          </div>
        ) : (
          <div className="divide-y divide-[#1A1A1A]">
            {exhibitions.map((exhibition) => (
              <div
                key={exhibition.id}
                className="group flex flex-col md:flex-row items-center gap-6 p-6 hover:bg-[#151515] transition-colors"
              >
                {/* Image Thumbnail */}
                <div className="relative h-24 w-40 bg-[#1A1A1A] rounded-lg border border-[#333] overflow-hidden shrink-0">
                  <img
                    src={exhibition.image}
                    alt={exhibition.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  <div className="space-y-1">
                    <h3 className="text-[#E5E5E5] font-bold uppercase tracking-tight truncate">
                      {exhibition.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#737373]">
                      <MapPin size={12} />
                      <span>{exhibition.location}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#A3A3A3]">
                      <Calendar size={12} />
                      <span>{exhibition.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#525252]">
                      <Globe size={10} />
                      <span>{exhibition.coordinates}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <StatusBadge status={exhibition.status} />
                    <button
                      onClick={() => handleDelete(exhibition.id)}
                      className="p-2 text-[#525252] hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#333]">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter text-[#E5E5E5]">
                New Installation
              </h2>
              <p className="text-[#737373] text-[10px] tracking-widest uppercase mt-1">
                Configure Event Details
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
            <ExhibitionForm
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
const StatusBadge = ({ status }: { status: ExhibitionStatus }) => {
  const styles = {
    "Open Now": "bg-white text-black border-white animate-pulse",
    Upcoming: "bg-[#1A1A1A] text-[#E5E5E5] border-[#333]",
    Archived: "bg-transparent text-[#525252] border-[#333]",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${styles[status]}`}
    >
      {status === "Open Now" && <Circle size={6} fill="black" />}
      {status}
    </span>
  );
};

// --- EXHIBITION FORM COMPONENT ---
type ExhibitionFormProps = {
  onSubmit: (data: Exhibition) => void;
  onCancel: () => void;
};

const ExhibitionForm = ({ onSubmit, onCancel }: ExhibitionFormProps) => {
  const [form, setForm] = useState<Partial<Exhibition>>({
    status: "Upcoming",
    image: "",
  });

  // Simulate Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setForm({ ...form, image: url });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation (Basic)
    if (!form.title || !form.location) return;

    const newEvent: Exhibition = {
      id: Date.now(),
      title: form.title || "Untitled Event",
      location: form.location || "Unknown",
      date: form.date || "TBD",
      status: (form.status as ExhibitionStatus) || "Upcoming",
      coordinates: form.coordinates || "0.0° N, 0.0° E",
      image: form.image || "/placeholder.jpg",
      description: form.description || "No description provided.",
    };

    onSubmit(newEvent);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8 pb-32">
      {/* 1. General Info */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373]">
          Event Details
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="EXHIBITION TITLE (E.G. ENTROPY)"
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-4 text-[#E5E5E5] font-bold tracking-tight focus:border-[#E5E5E5] outline-none"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="LOCATION (CITY)"
              className="bg-[#151515] border border-[#333] rounded-lg p-3 text-sm text-[#E5E5E5] outline-none"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            <input
              type="text"
              placeholder="DATE (E.G. OCT 2026)"
              className="bg-[#151515] border border-[#333] rounded-lg p-3 text-sm text-[#E5E5E5] outline-none"
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <textarea
            rows={4}
            placeholder="Manifesto / Description..."
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-4 text-sm text-[#A3A3A3] outline-none"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
      </div>

      <div className="h-px bg-[#1A1A1A] w-full" />

      {/* 2. Technical Data */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373]">
          Technical Data
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-[#525252]">
              Status
            </label>
            <select
              className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 text-sm text-[#E5E5E5] outline-none"
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as ExhibitionStatus })
              }
              value={form.status}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Open Now">Open Now</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-[#525252]">
              Coordinates
            </label>
            <input
              type="text"
              placeholder="35.65° N, 139.70° E"
              className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 text-sm text-[#E5E5E5] font-mono outline-none"
              onChange={(e) =>
                setForm({ ...form, coordinates: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* 3. Visuals */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373]">
          Cover Visual
        </h3>
        <div className="relative h-40 w-full bg-[#151515] border-2 border-dashed border-[#333] rounded-xl flex flex-col items-center justify-center hover:border-[#737373] transition-colors overflow-hidden">
          {form.image ? (
            <img
              src={form.image}
              className="w-full h-full object-cover"
              alt="preview"
            />
          ) : (
            <>
              <ImageIcon className="text-[#333] mb-2" />
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

      {/* FOOTER ACTIONS */}
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
          <UploadCloud size={16} /> Publish
        </button>
      </div>
    </form>
  );
};
