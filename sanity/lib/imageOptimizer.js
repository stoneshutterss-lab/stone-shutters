// src/sanity/lib/imageOptimizer.js

import imageCompression from "browser-image-compression";
import { hasTransparency } from "./imageTransparency";

/**
 * Optimize an image before uploading to Cloudinary.
 *
 * Rules:
 * - JPG/JPEG -> Compress and keep JPEG
 * - PNG with transparency -> Compress and keep PNG
 * - PNG without transparency -> Convert to JPEG and compress
 */

export async function optimizeImage(file) {
  const fileType = file.type;

  // Compression options
  const IMAGE_OPTIMIZER_CONFIG = {
  maxSizeMB: 2,
  initialQuality: 0.92,
  useWebWorker: true,
};

  // JPG / JPEG
  if (fileType === "image/jpeg" || fileType === "image/jpg") {
    return await imageCompression(file, {
  ...IMAGE_OPTIMIZER_CONFIG,
  fileType: "image/jpeg",
});
  }

  // PNG
  if (fileType === "image/png") {
    const transparent = await hasTransparency(file);

    // Keep transparent PNG
    if (transparent) {
      return await imageCompression(file, {
        ...IMAGE_OPTIMIZER_CONFIG,
        fileType: "image/png",
      });
    }

    // Convert normal PNG to JPEG
    return await imageCompression(file, {
      ...IMAGE_OPTIMIZER_CONFIG,
      fileType: "image/jpeg",
    });
  }

  // Other image formats
  return file;
}