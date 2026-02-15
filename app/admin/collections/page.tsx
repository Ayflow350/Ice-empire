"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  X,
  Layers,
  Image as ImageIcon,
  Trash2,
  UploadCloud,
  Loader2,
  Hash,
  Pencil,
  Archive,
  RefreshCcw,
} from "lucide-react";
import { collectionApi, Collection } from "@/lib/api/collections";

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

  // Track which item we are editing (null = creating new)
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null,
  );

  // 1. FETCH DATA
  const loadCollections = async () => {
    try {
      setIsLoading(true);
      const data = await collectionApi.getAll();
      setCollections(data);
    } catch (error) {
      alert("Failed to load collections.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCollections();
  }, []);

  // 2. OPEN CREATE MODAL
  const openCreateModal = () => {
    setEditingCollection(null); // Reset edit state
    setIsOverlayOpen(true);
  };

  // 3. OPEN EDIT MODAL
  const openEditModal = (collection: Collection) => {
    setEditingCollection(collection); // Set data to fill form
    setIsOverlayOpen(true);
  };

  // 4. HANDLE SAVE (Create OR Update)
  const handleSave = async (formData: FormData) => {
    try {
      if (editingCollection) {
        // --- UPDATE MODE ---
        // Convert FormData to plain object for update if API expects Partial<Collection>
        const updateObj: Partial<Collection> = {
          title: formData.get("title") as string,
          subtitle: formData.get("subtitle") as string,
          dropCode: formData.get("dropCode") as string,
          status: formData.get("status") as
            | "Active"
            | "Draft"
            | "Archived"
            | undefined,
          releaseDate: formData.get("releaseDate") as string,
        };
        // Only add image if present
        const image = formData.get("image");
        if (image && image instanceof File && image.size > 0) {
          (updateObj as Partial<Collection> & { image?: File }).image = image;
        }
        await collectionApi.update(editingCollection._id, updateObj);
      } else {
        // --- CREATE MODE ---
        await collectionApi.create(formData);
      }

      // Refresh and close
      await loadCollections();
      setIsOverlayOpen(false);
    } catch (error: unknown) {
      alert(
        `Operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  // 5. DELETE HANDLER
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will permanently delete the collection."))
      return;
    try {
      await collectionApi.delete(id);
      setCollections((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      alert("Failed to delete.");
    }
  };

  // 6. TOGGLE STATUS (Active <-> Archived)
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "Archived" ? "Active" : "Archived";

      // We use a partial object here, API handles JSON update
      await collectionApi.update(id, {
        status: newStatus as "Active" | "Draft" | "Archived",
      });

      // Optimistic Update
      setCollections((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c)),
      );
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  return (
    <div className="space-y-8 p-8 bg-black min-h-screen text-white">
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
          <button
            onClick={openCreateModal}
            className="px-6 py-2 bg-[#E5E5E5] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2"
          >
            <Plus size={14} /> New Drop
          </button>
        </div>
      </div>

      {/* GRID LIST */}
      {isLoading ? (
        <div className="flex h-64 w-full items-center justify-center border border-[#333] rounded-xl bg-[#0A0A0A]">
          <Loader2 className="animate-spin text-[#737373]" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div
              key={collection._id}
              className={`group relative rounded-xl border bg-[#0A0A0A] overflow-hidden transition-all duration-300 ${
                collection.status === "Archived"
                  ? "border-red-900/30 opacity-75"
                  : "border-[#333] hover:border-[#737373]"
              }`}
            >
              {/* Image Area */}
              <div className="relative h-48 w-full bg-[#151515] overflow-hidden">
                <img
                  src={collection.imageUrl}
                  alt={collection.title}
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`backdrop-blur px-2 py-1 text-[10px] uppercase border ${
                      collection.status === "Active"
                        ? "bg-green-900/50 border-green-500/30 text-green-200"
                        : "bg-red-900/50 border-red-500/30 text-red-200"
                    }`}
                  >
                    {collection.status}
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-2 py-1 text-[10px] font-mono text-[#E5E5E5]">
                  {collection.dropCode}
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-widest text-[#737373] mb-1">
                    {collection.subtitle}
                  </p>
                  <h3 className="text-xl font-black uppercase text-[#E5E5E5] tracking-tight">
                    {collection.title}
                  </h3>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between border-t border-[#1A1A1A] pt-4">
                  <div className="flex gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => openEditModal(collection)}
                      className="p-2 bg-[#151515] text-[#A3A3A3] hover:text-white hover:bg-[#222] rounded transition-colors"
                      title="Edit Collection"
                    >
                      <Pencil size={14} />
                    </button>

                    {/* Status Toggle Button */}
                    <button
                      onClick={() =>
                        handleToggleStatus(collection._id, collection.status)
                      }
                      className="p-2 bg-[#151515] text-[#A3A3A3] hover:text-white hover:bg-[#222] rounded transition-colors"
                      title={
                        collection.status === "Active" ? "Archive" : "Activate"
                      }
                    >
                      {collection.status === "Active" ? (
                        <Archive size={14} />
                      ) : (
                        <RefreshCcw size={14} />
                      )}
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(collection._id)}
                    className="p-2 text-[#525252] hover:text-red-500 transition-colors"
                    title="Delete Permanently"
                  >
                    <Trash2 size={16} />
                  </button>
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
            <h2 className="text-xl font-black uppercase tracking-tighter text-[#E5E5E5]">
              {editingCollection ? "Update Configuration" : "Initiate Drop"}
            </h2>
            <button
              onClick={() => setIsOverlayOpen(false)}
              className="text-[#737373] hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* FORM */}
          <div className="flex-1 overflow-y-auto">
            <CollectionForm
              initialData={editingCollection}
              onSubmit={handleSave}
              onCancel={() => setIsOverlayOpen(false)}
            />
          </div>
        </div>
      </Portal>
    </div>
  );
}

// --- COLLECTION FORM COMPONENT ---
type CollectionFormProps = {
  initialData: Collection | null;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
};

const CollectionForm = ({
  initialData,
  onSubmit,
  onCancel,
}: CollectionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    dropCode: "",
    status: "Draft",
    releaseDate: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        subtitle: initialData.subtitle,
        dropCode: initialData.dropCode,
        status: initialData.status,
        releaseDate: initialData.releaseDate
          ? new Date(initialData.releaseDate).toISOString().split("T")[0]
          : "",
      });
      setImagePreview(initialData.imageUrl);
    } else {
      // Reset if creating new
      setForm({
        title: "",
        subtitle: "",
        dropCode: "",
        status: "Draft",
        releaseDate: "",
      });
      setImagePreview(null);
      setImageFile(null);
    }
  }, [initialData]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.title || !form.dropCode) {
      alert("Missing Title or Drop Code");
      return;
    }

    // If creating new, image is mandatory. If editing, it's optional.
    if (!initialData && !imageFile) {
      alert("Please upload a cover image.");
      return;
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("subtitle", form.subtitle);
      data.append("dropCode", form.dropCode);
      data.append("status", form.status);
      data.append("releaseDate", form.releaseDate);

      // Only append image if a new one was selected
      if (imageFile) {
        data.append("image", imageFile);
      }

      await onSubmit(data);
    } catch (error) {
      // Errors handled by parent
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8 pb-32 text-white">
      {/* 1. Identity */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373] flex items-center gap-2">
          <Layers size={14} /> Identity
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="COLLECTION TITLE"
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-4 text-[#E5E5E5] font-bold outline-none focus:border-white"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            value={form.title}
          />
          <input
            type="text"
            placeholder="Subtitle"
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 text-sm text-[#E5E5E5] outline-none focus:border-white"
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            value={form.subtitle}
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
          <input
            type="text"
            placeholder="DROP CODE"
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 text-sm text-[#E5E5E5] font-mono outline-none focus:border-white"
            onChange={(e) => setForm({ ...form, dropCode: e.target.value })}
            value={form.dropCode}
          />
          <input
            type="date"
            className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 text-sm text-[#E5E5E5] outline-none focus:border-white"
            onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
            value={form.releaseDate}
          />
        </div>

        <select
          className="w-full bg-[#151515] border border-[#333] rounded-lg p-3 text-sm text-[#E5E5E5] outline-none focus:border-white"
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          value={form.status}
        >
          <option value="Draft">Draft</option>
          <option value="Active">Active</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      {/* 3. Assets */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373] flex items-center gap-2">
          <ImageIcon size={14} /> Key Visual
        </h3>
        <div className="relative h-48 w-full bg-[#151515] border-2 border-dashed border-[#333] rounded-xl flex flex-col items-center justify-center hover:border-[#737373] transition-colors overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
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
          className="px-6 py-3 border border-[#333] text-[#737373] text-xs font-bold uppercase tracking-widest hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-[#E5E5E5] text-black text-xs font-black uppercase tracking-widest hover:bg-white flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <UploadCloud size={16} />
          )}
          {isLoading
            ? initialData
              ? "Updating..."
              : "Launching..."
            : initialData
              ? "Update Drop"
              : "Launch Drop"}
        </button>
      </div>
    </form>
  );
};
