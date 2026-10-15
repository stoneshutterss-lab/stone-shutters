// app/stoneadm/components/FrameFormModal.jsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  X,
  UploadCloud,
  Loader2,
  Trash2,
  AlertCircle,
  Frame as FrameIcon,
} from "lucide-react";
import { compressStudioImage } from "@/lib/imageCompressor";

export default function FrameFormModal({
  isOpen,
  onClose,
  onSuccess,
  initialData = null,
}) {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState(() => initialData?.title || "");
  const [desc, setDesc] = useState(() => initialData?.desc || "");
  const [image, setImage] = useState(() => initialData?.image || "");
  const [imagePublicId, setImagePublicId] = useState(
    () => initialData?.imagePublicId || ""
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStats, setProcessingStats] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setIsProcessing(true);

    try {
      setProcessingStats({
        stage: "Compressing",
        details: `${file.name} (${(file.size / (1024 * 1024)).toFixed(1)}MB)`,
      });

      const compressionResult = await compressStudioImage(file, {
        maxSizeMB: 1.0,
        maxWidthOrHeight: 2500,
      });

      setProcessingStats({
        stage: "Uploading to Cloudinary",
        details: `${file.name} (${compressionResult.compressedFormatted})`,
      });

      const formData = new FormData();
      formData.append("file", compressionResult.file);

      const res = await fetch("/api/admin/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to upload image");
      }

      const data = await res.json();
      setImage(data.secure_url);
      setImagePublicId(data.public_id);
    } catch (uploadErr) {
      console.error("Frame image upload failed:", uploadErr);
      setError(`Failed uploading image: ${uploadErr.message}`);
    } finally {
      setIsProcessing(false);
      setProcessingStats(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = () => {
    setImage("");
    setImagePublicId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please provide a frame name");
      return;
    }
    if (!desc.trim()) {
      setError("Please provide a description");
      return;
    }
    if (!image) {
      setError("Please upload a frame image");
      return;
    }

    setSaving(true);

    try {
      const endpoint = isEditing
        ? `/api/admin/frames/${initialData.id}`
        : "/api/admin/frames";
      const method = isEditing ? "PUT" : "POST";

      const payload = {
        title: title.trim(),
        desc: desc.trim(),
        image,
        imagePublicId: imagePublicId || null,
      };

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save frame");
      }

      onSuccess(data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      style={{
        fontFamily: "'Poppins', 'Open Sans', sans-serif",
      }}
    >
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🖼️</span>
            <h2 className="text-base font-bold text-slate-900">
              {isEditing ? "Edit Frame" : "Create New Frame"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Frame Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Frame Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=""
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#c28b36] focus:ring-1 focus:ring-[#c28b36]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder=""
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#c28b36] focus:ring-1 focus:ring-[#c28b36] resize-none"
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Frame Image *
            </label>

            {image ? (
              <div className="relative w-full h-56 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 group">
                <Image
                  src={image}
                  alt={title || "Frame preview"}
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 bg-white text-slate-800 text-xs font-semibold rounded-lg shadow-sm hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1.5 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-[#c28b36] rounded-2xl p-8 text-center cursor-pointer bg-slate-50 hover:bg-slate-100/60 transition-all group flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#c28b36]/10 text-[#c28b36] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isProcessing}
            />

            {/* Processing Indicator */}
            {isProcessing && (
              <div className="mt-3 p-3 bg-[#c28b36]/10 border border-[#c28b36]/20 rounded-xl flex items-center gap-2.5 text-xs text-slate-700">
                <Loader2 className="w-4 h-4 text-[#c28b36] animate-spin flex-shrink-0" />
                <span>
                  {processingStats?.stage || "Processing"}... {processingStats?.details || ""}
                </span>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={saving || isProcessing}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || isProcessing}
              className="px-6 py-2.5 bg-[#c28b36] hover:bg-[#b47828] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Create Frame"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
