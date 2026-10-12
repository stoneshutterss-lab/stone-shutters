// app/stoneadm/components/ProjectFormModal.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  UploadCloud,
  Loader2,
  Trash2,
  Star,
  GripVertical,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Camera,
} from "lucide-react";
import { compressStudioImage } from "@/lib/imageCompressor";

const CATEGORIES = [
  { value: "wedding", label: "Wedding" },
  { value: "pre-post-wedding", label: "Pre & Post Wedding" },
  { value: "candid", label: "Candid" },
  { value: "baby-shower", label: "Baby Shower & Maternity" },
  { value: "puberty", label: "Puberty Ceremony" },
  { value: "birthday-shoot", label: "Birthday Shoot" },
  { value: "bharatanatyam", label: "Bharatanatyam & Arangetram" },
  { value: "modeling", label: "Modeling Photoshoot" },
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function ModalImagePreview({ src, alt }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!hasError ? (
        <Image
          src={src || "/services/portrait.png"}
          alt={alt || "Photo preview"}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
          unoptimized
          onError={() => setHasError(true)}
        />
      ) : (
        <Image
          src="/services/portrait.png"
          alt={alt || "Photo preview"}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
          unoptimized
        />
      )}
    </div>
  );
}

export default function ProjectFormModal({
  isOpen,
  onClose,
  onSuccess,
  projectType = "project",
  initialData = null,
}) {
  const isEditing = Boolean(initialData);

  // Form states initialized directly from initialData (remounted by key on open)
  const [name, setName] = useState(() => {
    if (!initialData) return "";
    return projectType === "project"
      ? initialData.projectName || ""
      : initialData.childName || "";
  });
  const [tagLine, setTagLine] = useState(() => initialData?.tagLine || "");
  const [slug, setSlug] = useState(() => initialData?.slug || "");
  const [category, setCategory] = useState(
    () => initialData?.category || (projectType === "project" ? "wedding" : "")
  );
  const [coverImage, setCoverImage] = useState(
    () => initialData?.coverImage || ""
  );
  const [coverPublicId, setCoverPublicId] = useState(
    () => initialData?.coverPublicId || ""
  );

  const [images, setImages] = useState(() => {
    if (!initialData) return [];
    const loadedImages = (initialData.images || []).map((img, index) => ({
      url: typeof img === "string" ? img : img.url,
      publicId: typeof img === "string" ? null : img.publicId,
      id: img.id || `init-${index}`,
    }));

    if (
      initialData.coverImage &&
      !loadedImages.some((img) => img.url === initialData.coverImage)
    ) {
      loadedImages.unshift({
        url: initialData.coverImage,
        publicId: initialData.coverPublicId || null,
        id: `cover-init`,
      });
    }

    return loadedImages;
  });
  const [deletedPublicIds, setDeletedPublicIds] = useState([]);

  // Upload & Compression status states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStats, setProcessingStats] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  if (!isOpen) return null;

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (!isEditing || !slug) {
      setSlug(slugify(val));
    }
  };

  // Upload multiple files with 30-50MB -> 1MB client-side compression
  const handleFilesSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    setError("");
    setIsProcessing(true);

    const uploadedResults = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      try {
        setProcessingStats({
          current: i + 1,
          total: selectedFiles.length,
          stage: "Compressing",
          details: `${file.name} (${(file.size / (1024 * 1024)).toFixed(1)}MB)`,
        });

        const compressionResult = await compressStudioImage(file, {
          maxSizeMB: 1.0,
          maxWidthOrHeight: 3840,
        });

        setProcessingStats({
          current: i + 1,
          total: selectedFiles.length,
          stage: "Uploading to Cloudinary",
          details: `${file.name} (${compressionResult.compressedFormatted}, saved ${compressionResult.ratio}%)`,
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
        uploadedResults.push({
          url: data.secure_url,
          publicId: data.public_id,
          id: `new-${Date.now()}-${i}`,
        });
      } catch (uploadErr) {
        console.error("File processing failed:", file.name, uploadErr);
        setError(`Failed uploading ${file.name}: ${uploadErr.message}`);
      }
    }

    if (uploadedResults.length > 0) {
      setImages((prev) => {
        const next = [...prev, ...uploadedResults];
        if (!coverImage && next.length > 0) {
          setCoverImage(next[0].url);
          setCoverPublicId(next[0].publicId);
        }
        return next;
      });
    }

    setIsProcessing(false);
    setProcessingStats(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Reorder Images Drag and Drop
  const handleDragStart = (e, index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (
      dragItem.current !== null &&
      dragOverItem.current !== null &&
      dragItem.current !== dragOverItem.current
    ) {
      const copy = [...images];
      const draggedItemContent = copy.splice(dragItem.current, 1)[0];
      copy.splice(dragOverItem.current, 0, draggedItemContent);
      setImages(copy);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // Delete image from gallery
  const handleRemoveImage = (img, index) => {
    if (img.publicId) {
      setDeletedPublicIds((prev) => [...prev, img.publicId]);
    }
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);

    if (coverImage === img.url) {
      if (updated.length > 0) {
        setCoverImage(updated[0].url);
        setCoverPublicId(updated[0].publicId || null);
      } else {
        setCoverImage("");
        setCoverPublicId("");
      }
    }
  };

  // Set image as cover
  const handleSetCover = (img) => {
    setCoverImage(img.url);
    setCoverPublicId(img.publicId || "");
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please provide a title/name");
      return;
    }
    if (!slug.trim()) {
      setError("Please provide a slug");
      return;
    }
    if (projectType === "project" && !category) {
      setError("Please select a category");
      return;
    }
    let finalCoverImage = coverImage;
    let finalCoverPublicId = coverPublicId;

    if (!finalCoverImage && images.length > 0) {
      finalCoverImage = images[0].url;
      finalCoverPublicId = images[0].publicId || null;
    }

    if (!finalCoverImage) {
      setError("Please upload at least one image to set as the cover image");
      return;
    }

    setSaving(true);

    try {
      const endpoint =
        projectType === "project"
          ? isEditing
            ? `/api/admin/projects/${initialData.id}`
            : "/api/admin/projects"
          : isEditing
          ? `/api/admin/baby-projects/${initialData.id}`
          : "/api/admin/baby-projects";

      const method = isEditing ? "PUT" : "POST";

      const payload = {
        [projectType === "project" ? "projectName" : "childName"]: name.trim(),
        tagLine: tagLine.trim() || null,
        slug: slug.trim(),
        coverImage: finalCoverImage,
        coverPublicId: finalCoverPublicId || null,
        images: images.map((img, idx) => ({
          url: img.url,
          publicId: img.publicId,
          order: idx,
        })),
        deletedImagePublicIds: deletedPublicIds,
      };

      if (projectType === "project") {
        payload.category = category;
      }

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save project");
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
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">
              {projectType === "project" ? "📸" : "👶"}
            </span>
            <h2 className="text-base font-bold text-slate-900">
              {isEditing ? "Edit" : "Create New"}{" "}
              {projectType === "project" ? "Portfolio Project" : "Baby Shoot"}
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Basic Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                {projectType === "project" ? "Project Name" : "Child Name"} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={handleNameChange}
                placeholder={
                  projectType === "project"
                    ? "e.g. Rahul & Sneha's Wedding"
                    : "e.g. Baby Aarav"
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#c28b36] focus:ring-1 focus:ring-[#c28b36]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Tag Line / Subtitle
              </label>
              <input
                type="text"
                value={tagLine}
                onChange={(e) => setTagLine(e.target.value)}
                placeholder="e.g. A Magical Royal Wedding in Chennai"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#c28b36] focus:ring-1 focus:ring-[#c28b36]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="e.g. rahul-and-sneha"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#c28b36] focus:ring-1 focus:ring-[#c28b36]"
              />
            </div>

            {projectType === "project" && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Category *
                </label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-[#c28b36] focus:ring-1 focus:ring-[#c28b36] cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Upload Section with Smart Compressor */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Gallery Images & Cover Selector ({images.length} photos)
              </label>
              <span className="text-[11px] text-[#c28b36] flex items-center gap-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Auto-Compressor (50MB → 1MB)
              </span>
            </div>

            {/* Dropzone Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-[#c28b36] rounded-2xl p-6 text-center cursor-pointer bg-slate-50 hover:bg-slate-100/60 transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFilesSelect}
                className="hidden"
                disabled={isProcessing}
              />
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#c28b36]/10 text-[#c28b36] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800 mb-1">
                  Click to select multiple photos or drag & drop here
                </p>
                <p className="text-xs text-slate-500 max-w-md">
                  Large raw camera exports (30MB – 50MB) are automatically compressed client-side to ~1MB high-res WebP/JPEG before uploading.
                </p>
              </div>
            </div>

            {/* Compression Progress Indicator */}
            {isProcessing && processingStats && (
              <div className="mt-4 p-4 bg-[#c28b36]/10 border border-[#c28b36]/20 rounded-2xl flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-[#c28b36] animate-spin flex-shrink-0" />
                <div className="flex-1 text-xs">
                  <div className="flex justify-between font-semibold text-slate-800 mb-1">
                    <span>
                      {processingStats.stage} ({processingStats.current}/
                      {processingStats.total})
                    </span>
                    <span className="text-[#c28b36]">
                      {Math.round(
                        (processingStats.current / processingStats.total) * 100
                      )}
                      %
                    </span>
                  </div>
                  <p className="text-slate-600 truncate">
                    {processingStats.details}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Images Grid with Drag Reordering & Cover Selector */}
          {images.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium">
                <span>
                  💡 <strong>Tip:</strong> Drag cards to reorder images. Click{" "}
                  <strong>⭐ Set as Cover</strong> to pick the project cover.
                </span>
                <span>{images.length} photos</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                {images.map((img, index) => {
                  const isCover = coverImage === img.url;

                  return (
                    <div
                      key={img.id || index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnter={(e) => handleDragEnter(e, index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => e.preventDefault()}
                      className={`relative group rounded-xl overflow-hidden border transition-all cursor-move select-none ${
                        isCover
                          ? "border-[#c28b36] ring-2 ring-[#c28b36]/40 shadow-sm"
                          : "border-slate-200 hover:border-slate-400"
                      } bg-slate-100 aspect-[4/3]`}
                    >
                      {/* Image Preview with Robust Fallback */}
                      <ModalImagePreview
                        src={img.url}
                        alt={`Photo ${index + 1}`}
                      />

                      {/* Cover Badge */}
                      {isCover && (
                        <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-[#c28b36] text-white text-[10px] font-semibold rounded-md shadow-xs flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white" /> Cover Photo
                        </div>
                      )}

                      {/* Drag Handle Icon */}
                      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded p-1 text-white/90">
                        <GripVertical className="w-3.5 h-3.5" />
                      </div>

                      {/* Image Action Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 gap-1.5">
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => handleSetCover(img)}
                            className={`text-[11px] px-2 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                              isCover
                                ? "bg-[#c28b36] text-white"
                                : "bg-white/90 hover:bg-[#c28b36] text-slate-800 hover:text-white"
                            }`}
                          >
                            <Star className="w-3 h-3" />
                            {isCover ? "Current Cover" : "Set Cover"}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(img, index)}
                            title="Delete photo (frees Cloudinary storage)"
                            className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              disabled={saving || isProcessing}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || isProcessing}
              className="px-6 py-2.5 bg-[#c28b36] hover:bg-[#b47828] text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Project...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  {isEditing ? "Save Changes" : "Create Project"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
