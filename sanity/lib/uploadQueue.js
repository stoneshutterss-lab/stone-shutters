// src/sanity/lib/uploadQueue.js

import { optimizeImage } from "./imageOptimizer";

/**
 * Upload Queue Configuration
 */
export const UPLOAD_CONFIG = {
  concurrency: 3,
};

/**
 * Processes files using a concurrent upload queue.
 *
 * @param {File[]} files
 * @param {Function} uploadFunction
 * @param {Object} callbacks
 *
 * callbacks:
 * - onOptimizing(index, total)
 * - onUploading(index, total)
 * - onSuccess(index, url)
 * - onError(index, error)
 *
 * @returns {Promise<string[]>}
 */

export async function processUploadQueue(
  files,
  uploadFunction,
  callbacks = {}
) {
  const results = new Array(files.length).fill(null);

  let currentIndex = 0;

  async function worker() {
    while (true) {
      const index = currentIndex++;

      if (index >= files.length) break;

      const file = files[index];

      try {
        // Notify Optimizing
        callbacks.onOptimizing?.(index, files.length);

        // Optimize image
        const optimizedFile = await optimizeImage(file);

        // Notify Uploading
        callbacks.onUploading?.(index, files.length);

        // Upload image
        const url = await uploadFunction(optimizedFile);

        results[index] = url;

        // Success callback
        callbacks.onSuccess?.(index, url);
      } catch (error) {
        console.error(`Failed to upload ${file.name}`, error);

        results[index] = null;

        // Error callback
        callbacks.onError?.(index, error);
      }
    }
  }

  const workers = Array.from(
    {
      length: Math.min(
        UPLOAD_CONFIG.concurrency,
        files.length
      ),
    },
    () => worker()
  );

  await Promise.all(workers);

  return results;
}