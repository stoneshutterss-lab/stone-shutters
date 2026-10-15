// app/stoneadm/components/AdminDashboard.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  LogOut,
  ExternalLink,
  GripVertical,
  Edit2,
  Trash2,
  Search,
  Filter,
  Camera,
  Baby,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  Frame as FrameIcon,
} from "lucide-react";
import ProjectFormModal from "./ProjectFormModal";
import FrameFormModal from "./FrameFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "wedding", label: "Wedding" },
  { value: "pre-post-wedding", label: "Pre & Post Wedding" },
  { value: "candid", label: "Candid" },
  { value: "baby-shower", label: "Baby Shower & Maternity" },
  { value: "puberty", label: "Puberty Ceremony" },
  { value: "birthday-shoot", label: "Birthday Shoot" },
  { value: "bharatanatyam", label: "Bharatanatyam" },
  { value: "modeling", label: "Modeling" },
];

// Helper Image component with automatic fallback
function CardCoverImage({ src, alt }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden">
      {!hasError ? (
        <Image
          src={src || "/services/portrait.png"}
          alt={alt || "Project cover"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setHasError(true)}
          unoptimized
        />
      ) : (
        <Image
          src="/services/portrait.png"
          alt={alt || "Project cover"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
      )}
    </div>
  );
}

function notifyFrontendUpdate(type = "all") {
  if (typeof window !== "undefined") {
    try {
      if (window.BroadcastChannel) {
        const channel = new BroadcastChannel("stone_shutters_sync");
        channel.postMessage({ type: "UPDATE", target: type, timestamp: Date.now() });
        channel.close();
      }
      localStorage.setItem("stone_shutters_sync_ping", `${type}_${Date.now()}`);
    } catch (e) {
      // ignore
    }
  }
}

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("projects"); // "projects", "babyProjects", or "frames"
  const [projects, setProjects] = useState([]);
  const [babyProjects, setBabyProjects] = useState([]);
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal states
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Frame Modal states
  const [frameFormModalOpen, setFrameFormModalOpen] = useState(false);
  const [editingFrame, setEditingFrame] = useState(null);

  // Delete modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState("");

  // Drag and drop reordering refs
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Fetch data
  const fetchData = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const [projRes, babyRes, frameRes] = await Promise.all([
        fetch("/api/admin/projects"),
        fetch("/api/admin/baby-projects"),
        fetch("/api/admin/frames"),
      ]);

      if (projRes.ok) {
        const data = await projRes.json();
        setProjects(data.projects || []);
      }
      if (babyRes.ok) {
        const data = await babyRes.json();
        setBabyProjects(data.babyProjects || []);
      }
      if (frameRes.ok) {
        const data = await frameRes.json();
        setFrames(data.frames || []);
      }
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    Promise.all([
      fetch("/api/admin/projects").then((r) => r.json()),
      fetch("/api/admin/baby-projects").then((r) => r.json()),
      fetch("/api/admin/frames").then((r) => r.json()),
    ])
      .then(([projData, babyData, frameData]) => {
        if (!ignore) {
          setProjects(projData.projects || []);
          setBabyProjects(babyData.babyProjects || []);
          setFrames(frameData.frames || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch admin data:", err);
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  // Filtered lists
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tagLine && p.tagLine.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat =
      categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredBabyProjects = babyProjects.filter((p) => {
    return (
      p.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tagLine && p.tagLine.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const filteredFrames = frames.filter((f) => {
    return (
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Drag and drop reordering
  const handleDragStart = (e, index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = async () => {
    if (
      dragItem.current !== null &&
      dragOverItem.current !== null &&
      dragItem.current !== dragOverItem.current
    ) {
      if (activeTab === "projects") {
        const copy = [...projects];
        const draggedItem = copy.splice(dragItem.current, 1)[0];
        copy.splice(dragOverItem.current, 0, draggedItem);
        setProjects(copy);

        try {
          await fetch("/api/admin/projects", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: copy.map((p, idx) => ({ id: p.id, order: idx })),
            }),
          });
          showToast("Project order updated!");
        } catch (err) {
          console.error("Failed to update project order:", err);
        }
      } else if (activeTab === "babyProjects") {
        const copy = [...babyProjects];
        const draggedItem = copy.splice(dragItem.current, 1)[0];
        copy.splice(dragOverItem.current, 0, draggedItem);
        setBabyProjects(copy);

        try {
          await fetch("/api/admin/baby-projects", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: copy.map((p, idx) => ({ id: p.id, order: idx })),
            }),
          });
          showToast("Baby shoot order updated!");
        } catch (err) {
          console.error("Failed to update baby shoot order:", err);
        }
      } else if (activeTab === "frames") {
        const copy = [...frames];
        const draggedItem = copy.splice(dragItem.current, 1)[0];
        copy.splice(dragOverItem.current, 0, draggedItem);
        setFrames(copy);

        try {
          await fetch("/api/admin/frames", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: copy.map((f, idx) => ({ id: f.id, order: idx })),
            }),
          });
          showToast("Frame order updated!");
          notifyFrontendUpdate("frames");
        } catch (err) {
          console.error("Failed to update frame order:", err);
        }
      }
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // Delete project or frame
  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);

    try {
      const endpoint =
        itemToDelete.type === "frame" || activeTab === "frames"
          ? `/api/admin/frames/${itemToDelete.id}`
          : activeTab === "projects"
          ? `/api/admin/projects/${itemToDelete.id}`
          : `/api/admin/baby-projects/${itemToDelete.id}`;

      const res = await fetch(endpoint, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Delete failed");

      showToast(
        `"${
          itemToDelete.title || itemToDelete.projectName || itemToDelete.childName
        }" deleted & Cloudinary storage freed!`
      );
      setDeleteModalOpen(false);
      setItemToDelete(null);
      notifyFrontendUpdate(
        itemToDelete.type === "frame" || activeTab === "frames"
          ? "frames"
          : activeTab
      );
      fetchData();
    } catch (err) {
      alert(`Error deleting: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const totalProjectPhotos = projects.reduce(
    (acc, p) => acc + (p.images?.length || 0),
    0
  );
  const totalBabyPhotos = babyProjects.reduce(
    (acc, p) => acc + (p.images?.length || 0),
    0
  );

  return (
    <div
      className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-[#c28b36] selection:text-white"
      style={{
        fontFamily: "'Poppins', 'Open Sans', sans-serif",
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-300">
          <CheckCircle className="w-4 h-4 text-[#e0a84c]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="flex items-center gap-2">
              <div className="relative w-[140px] sm:w-[170px] h-[40px]">
                <Image
                  src="/logo.png"
                  alt="Stone Shutters"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#c28b36]/10 text-[#c28b36] border border-[#c28b36]/20 uppercase tracking-wider">
              Studio Admin
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-colors"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200/60 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-7">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                Portfolio Projects
              </p>
              <p className="text-2xl font-bold text-slate-900">{projects.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#c28b36]/10 text-[#c28b36] flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                Baby Shoot Projects
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {babyProjects.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Baby className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                Custom Frames
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {frames.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FrameIcon className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                Total Photos Managed
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {totalProjectPhotos + totalBabyPhotos}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ImageIcon className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1.5 rounded-2xl flex-wrap">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "projects"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Camera className="w-4 h-4 text-[#c28b36]" />
              <span>Portfolio Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("babyProjects")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "babyProjects"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Baby className="w-4 h-4 text-purple-600" />
              <span>Baby Shoots ({babyProjects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("frames")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "frames"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FrameIcon className="w-4 h-4 text-[#c28b36]" />
              <span>Frames ({frames.length})</span>
            </button>
          </div>

          {/* New Item Button */}
          <button
            onClick={() => {
              if (activeTab === "frames") {
                setEditingFrame(null);
                setFrameFormModalOpen(true);
              } else {
                setEditingItem(null);
                setFormModalOpen(true);
              }
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#c28b36] hover:bg-[#b47828] text-white font-medium text-xs rounded-xl shadow-sm transition-all cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>
              {activeTab === "projects"
                ? "New Portfolio Project"
                : activeTab === "babyProjects"
                ? "New Baby Shoot"
                : "New Frame"}
            </span>
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === "projects"
                  ? "Search projects by title or tagline..."
                  : activeTab === "babyProjects"
                  ? "Search baby shoots by child name..."
                  : "Search frames by name or description..."
              }
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#c28b36] focus:ring-1 focus:ring-[#c28b36] shadow-2xs"
            />
          </div>

          {activeTab === "projects" && (
            <div className="relative w-full sm:w-auto">
              <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full sm:w-[220px] bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#c28b36] shadow-2xs cursor-pointer"
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

        {/* Drag Tip */}
        <div className="text-xs text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <GripVertical className="w-4 h-4 text-[#c28b36]" />
            Drag cards by the handle to reorder website display order. Order changes auto-save.
          </span>
          <span className="font-medium text-slate-600">
            Showing{" "}
            {activeTab === "projects"
              ? filteredProjects.length
              : activeTab === "babyProjects"
              ? filteredBabyProjects.length
              : filteredFrames.length}{" "}
            items
          </span>
        </div>

        {/* Project List / Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#c28b36] animate-spin" />
            <p className="text-xs font-medium text-slate-500">Loading studio catalog...</p>
          </div>
        ) : activeTab === "projects" ? (
          filteredProjects.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-white">
              <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-800 mb-1">
                No Projects Found
              </h3>
              <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                {searchQuery || categoryFilter !== "all"
                  ? "Try adjusting your search terms or category filter."
                  : "Click 'New Portfolio Project' to upload your first shoot with built-in compression!"}
              </p>
              {!searchQuery && categoryFilter === "all" && (
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setFormModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#c28b36] hover:bg-[#b47828] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  + Add First Project
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((p, index) => (
                <div
                  key={p.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className="group relative bg-white border border-slate-200 hover:border-[#c28b36]/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  {/* Image Header with Fallback */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <CardCoverImage src={p.coverImage} alt={p.projectName} />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

                    {/* Drag Grip Handle */}
                    <div
                      title="Drag to reorder"
                      className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-slate-800 text-xs font-semibold flex items-center gap-1 cursor-grab active:cursor-grabbing hover:bg-[#c28b36] hover:text-white transition-colors shadow-xs"
                    >
                      <GripVertical className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-mono">#{index + 1}</span>
                    </div>

                    {/* Photo count badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-slate-800 text-[11px] font-semibold flex items-center gap-1 shadow-xs">
                      <ImageIcon className="w-3 h-3 text-[#c28b36]" />
                      <span>{p.images?.length || 0} photos</span>
                    </div>

                    {/* Category pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#c28b36] text-white shadow-xs">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-[#c28b36] transition-colors line-clamp-1 mb-1">
                        {p.projectName}
                      </h4>
                      {p.tagLine ? (
                        <p className="text-xs text-slate-500 italic line-clamp-2 mb-2">
                          {p.tagLine}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 italic mb-2">No subtitle</p>
                      )}
                      <p className="text-[11px] text-slate-400 font-mono">
                        /{p.category}/{p.slug}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100">
                      <Link
                        href={`/portfolio/${p.category}/${p.slug}`}
                        target="_blank"
                        className="text-xs font-medium text-slate-600 hover:text-[#c28b36] flex items-center gap-1 transition-colors"
                      >
                        Preview <ExternalLink className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingItem(p);
                            setFormModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          title="Edit project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setItemToDelete(p);
                            setDeleteModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                          title="Delete project & purge Cloudinary"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : activeTab === "babyProjects" ? (
          filteredBabyProjects.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-white">
              <Baby className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-800 mb-1">
                No Baby Shoots Found
              </h3>
              <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                {searchQuery
                  ? "Try adjusting your search terms."
                  : "Click 'New Baby Shoot' to upload a shoot."}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setFormModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#c28b36] hover:bg-[#b47828] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  + Add Baby Shoot
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBabyProjects.map((p, index) => (
                <div
                  key={p.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className="group relative bg-white border border-slate-200 hover:border-[#c28b36]/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  {/* Image Header with Fallback */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <CardCoverImage src={p.coverImage} alt={p.childName} />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

                    {/* Drag Grip Handle */}
                    <div
                      title="Drag to reorder"
                      className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-slate-800 text-xs font-semibold flex items-center gap-1 cursor-grab active:cursor-grabbing hover:bg-[#c28b36] hover:text-white transition-colors shadow-xs"
                    >
                      <GripVertical className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-mono">#{index + 1}</span>
                    </div>

                    {/* Photo count badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-slate-800 text-[11px] font-semibold flex items-center gap-1 shadow-xs">
                      <ImageIcon className="w-3 h-3 text-[#c28b36]" />
                      <span>{p.images?.length || 0} photos</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-[#c28b36] transition-colors line-clamp-1 mb-1">
                        {p.childName}
                      </h4>
                      {p.tagLine ? (
                        <p className="text-xs text-slate-500 italic line-clamp-2 mb-2">
                          {p.tagLine}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 italic mb-2">No subtitle</p>
                      )}
                      <p className="text-[11px] text-slate-400 font-mono">
                        /baby-shoot/{p.slug}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100">
                      <Link
                        href={`/baby-shoot/${p.slug}`}
                        target="_blank"
                        className="text-xs font-medium text-slate-600 hover:text-[#c28b36] flex items-center gap-1 transition-colors"
                      >
                        Preview <ExternalLink className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingItem(p);
                            setFormModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          title="Edit baby shoot"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setItemToDelete(p);
                            setDeleteModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                          title="Delete baby shoot & purge Cloudinary"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Frames Tab */
          filteredFrames.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-white">
              <FrameIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-800 mb-1">
                No Frames Found
              </h3>
              <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                {searchQuery
                  ? "Try adjusting your search terms."
                  : "Click 'New Frame' to add your first studio frame."}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => {
                    setEditingFrame(null);
                    setFrameFormModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#c28b36] hover:bg-[#b47828] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  + Add First Frame
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredFrames.map((frame, index) => (
                <div
                  key={frame.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className="group relative bg-white border border-slate-200 hover:border-[#c28b36]/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  {/* Image Header with Fallback */}
                  <div className="relative h-[220px] bg-slate-50 overflow-hidden">
                    <Image
                      src={frame.image || "/frames/custom-frame.png"}
                      alt={frame.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />

                    {/* Drag Grip Handle */}
                    <div
                      title="Drag to reorder"
                      className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-slate-800 text-xs font-semibold flex items-center gap-1 cursor-grab active:cursor-grabbing hover:bg-[#c28b36] hover:text-white transition-colors shadow-xs"
                    >
                      <GripVertical className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-mono">#{index + 1}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-[#c28b36] transition-colors line-clamp-1 mb-1">
                        {frame.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                        {frame.desc}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100">
                      <Link
                        href="/frames"
                        target="_blank"
                        className="text-xs font-medium text-slate-600 hover:text-[#c28b36] flex items-center gap-1 transition-colors"
                      >
                        Preview <ExternalLink className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingFrame(frame);
                            setFrameFormModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          title="Edit frame"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setItemToDelete({ ...frame, type: "frame" });
                            setDeleteModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                          title="Delete frame"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </main>

      {/* Project Form Modal (Create / Edit) */}
      {formModalOpen && (
        <ProjectFormModal
          key={editingItem ? `edit-${editingItem.id}` : `new-${activeTab}`}
          isOpen={formModalOpen}
          onClose={() => {
            setFormModalOpen(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            showToast(
              editingItem ? "Project updated successfully!" : "New project created!"
            );
            fetchData();
          }}
          projectType={
            editingItem
              ? editingItem.projectName !== undefined
                ? "project"
                : "babyProject"
              : activeTab === "projects"
              ? "project"
              : "babyProject"
          }
          initialData={editingItem}
        />
      )}

      {/* Frame Form Modal (Create / Edit) */}
      {frameFormModalOpen && (
        <FrameFormModal
          key={editingFrame ? `edit-frame-${editingFrame.id}` : "new-frame"}
          isOpen={frameFormModalOpen}
          onClose={() => {
            setFrameFormModalOpen(false);
            setEditingFrame(null);
          }}
          onSuccess={() => {
            showToast(
              editingFrame ? "Frame updated successfully!" : "New frame created!"
            );
            notifyFrontendUpdate("frames");
            fetchData();
          }}
          initialData={editingFrame}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        title={
          itemToDelete?.type === "frame" || activeTab === "frames"
            ? "Delete Frame"
            : activeTab === "projects"
            ? "Delete Portfolio Project"
            : "Delete Baby Shoot"
        }
        itemName={
          itemToDelete?.title ||
          itemToDelete?.projectName ||
          itemToDelete?.childName ||
          "this item"
        }
        isDeleting={isDeleting}
      />
    </div>
  );
}
