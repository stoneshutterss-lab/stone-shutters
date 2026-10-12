// lib/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extracts publicId from Cloudinary URL if publicId isn't stored directly
 * Example: https://res.cloudinary.com/dus0posaj/image/upload/v1741234567/stone-shutters/sample.jpg
 * Returns: "stone-shutters/sample"
 */
export function extractPublicId(urlOrId) {
  if (!urlOrId || typeof urlOrId !== "string") return null;

  // Already a clean public_id (no protocol)
  if (!urlOrId.startsWith("http://") && !urlOrId.startsWith("https://")) {
    return urlOrId;
  }

  try {
    const url = new URL(urlOrId);
    const pathParts = url.pathname.split("/");
    const uploadIndex = pathParts.findIndex((part) => part === "upload");

    if (uploadIndex === -1) return null;

    // Everything after /upload/ (skipping v123456 version number if present)
    const afterUpload = pathParts.slice(uploadIndex + 1);
    if (afterUpload[0] && afterUpload[0].startsWith("v") && !isNaN(Number(afterUpload[0].slice(1)))) {
      afterUpload.shift();
    }

    const fullPathWithExt = afterUpload.join("/");
    // Strip file extension
    const lastDotIndex = fullPathWithExt.lastIndexOf(".");
    return lastDotIndex !== -1 ? fullPathWithExt.substring(0, lastDotIndex) : fullPathWithExt;
  } catch (err) {
    console.error("Failed to parse public ID from URL:", urlOrId, err);
    return null;
  }
}

/**
 * Deletes an image from Cloudinary permanently to free storage
 */
export async function deleteFromCloudinary(publicIdOrUrl) {
  const publicId = extractPublicId(publicIdOrUrl);
  if (!publicId) return { success: false, reason: "No publicId found" };

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
      resource_type: "image",
    });
    console.log(`[Cloudinary Cleanup] Destroyed ${publicId}:`, result);
    return { success: result.result === "ok", result };
  } catch (err) {
    console.error(`[Cloudinary Cleanup Error] Failed to destroy ${publicId}:`, err);
    return { success: false, error: err.message };
  }
}

/**
 * Batch deletes multiple images from Cloudinary
 */
export async function batchDeleteFromCloudinary(urlsOrIds = []) {
  const publicIds = urlsOrIds.map(extractPublicId).filter(Boolean);
  if (!publicIds.length) return [];

  const results = await Promise.allSettled(
    publicIds.map((id) => deleteFromCloudinary(id))
  );

  return results;
}

export default cloudinary;
