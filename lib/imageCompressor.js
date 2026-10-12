// lib/imageCompressor.js
import imageCompression from "browser-image-compression";

/**
 * Format bytes to human readable format (MB / KB)
 */
export function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * High-performance client-side compressor
 * Compresses 30MB - 50MB camera files down to ~1MB without sacrificing visual resolution
 */
export async function compressStudioImage(file, options = {}) {
  // If already under 1MB, still optimize slightly if large, or return
  const originalSize = file.size;

  const defaultOptions = {
    maxSizeMB: 1.0, // Target size ~1MB
    maxWidthOrHeight: 3840, // 4K max dimension - keeps high-res crispness
    useWebWorker: true,
    initialQuality: 0.88, // Crisp photographic quality
    fileType: file.type === "image/png" ? "image/png" : "image/jpeg",
    alwaysKeepResolution: true,
    ...options,
  };

  try {
    const compressedBlob = await imageCompression(file, defaultOptions);

    // Create a new File from compressed blob with original name
    const compressedFile = new File([compressedBlob], file.name, {
      type: compressedBlob.type,
      lastModified: Date.now(),
    });

    const compressedSize = compressedFile.size;
    const ratio = Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100));

    return {
      file: compressedFile,
      originalSize,
      compressedSize,
      ratio, // e.g. 97% savings
      originalFormatted: formatBytes(originalSize),
      compressedFormatted: formatBytes(compressedSize),
    };
  } catch (error) {
    console.warn("Fast compression fallback triggered:", error);
    // Return original file safely if compression library errors on uncommon format
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      ratio: 0,
      originalFormatted: formatBytes(originalSize),
      compressedFormatted: formatBytes(originalSize),
    };
  }
}
