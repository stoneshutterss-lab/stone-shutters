// app/stoneadm/components/DeleteConfirmModal.jsx
"use client";

import { AlertTriangle, Trash2, Loader2 } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  isDeleting,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
      style={{
        fontFamily: "'Poppins', 'Open Sans', sans-serif",
      }}
    >
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {title || "Delete Item"}
            </h3>
            <p className="text-xs text-slate-500">
              Irreversible action with automatic Cloudinary storage cleanup
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6 text-sm text-slate-600">
          <p>
            Are you sure you want to delete{" "}
            <strong className="text-slate-900 font-semibold">&quot;{itemName}&quot;</strong>?
          </p>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1.5 font-medium">
            <p>✅ Removed from SQLite database</p>
            <p>
              ✅ All associated photos permanently destroyed on Cloudinary to
              conserve free tier storage
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Purging Assets...
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                Permanently Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
