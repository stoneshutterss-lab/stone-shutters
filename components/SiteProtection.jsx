"use client";

import { useEffect } from "react";

export default function SiteProtection() {
  useEffect(() => {
    // Disable Right Click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable Dragging Images
    const handleDragStart = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    // Disable Keyboard Shortcuts
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }

      // Ctrl + U, Ctrl + S, Ctrl + P
      if (
        e.ctrlKey &&
        ["u", "s", "p"].includes(key)
      ) {
        e.preventDefault();
        return;
      }

      // Ctrl + Shift + I, J, C
      if (
        e.ctrlKey &&
        e.shiftKey &&
        ["i", "j", "c"].includes(key)
      ) {
        e.preventDefault();
        return;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}