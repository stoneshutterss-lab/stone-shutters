// src/sanity/lib/imageTransparency.js

/**
 * Checks whether a PNG image contains any transparent pixels.
 *
 * @param {File} file
 * @returns {Promise<boolean>}
 */
export async function hasTransparency(file) {
  // Only PNG images can contain transparency.
  if (file.type !== "image/png") {
    return false;
  }

  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", {
          willReadFrequently: true,
        });

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

        const { data } = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        // Every pixel consists of:
        // R, G, B, A
        // Alpha channel is every 4th value.

        for (let i = 3; i < data.length; i += 4) {
          if (data[i] < 255) {
            URL.revokeObjectURL(image.src);
            resolve(true);
            return;
          }
        }

        URL.revokeObjectURL(image.src);
        resolve(false);
      } catch (error) {
        URL.revokeObjectURL(image.src);
        reject(error);
      }
    };

    image.onerror = () => {
      URL.revokeObjectURL(image.src);
      reject(new Error("Unable to load image."));
    };

    image.src = URL.createObjectURL(file);
  });
}