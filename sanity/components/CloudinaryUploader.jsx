//src/sanity/components/CloudinaryUploader.jsx
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { set, unset } from "sanity";

export default function CloudinaryUploader(props) {
  const { value = [], onChange } = props;

  const [uploading, setUploading] = useState(false);
const [uploadedCount, setUploadedCount] = useState(0);
const [totalCount, setTotalCount] = useState(0);
const [failedCount, setFailedCount] = useState(0);
const [uploadTime, setUploadTime] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles.length) return;
      const startTime = Date.now();

setFailedCount(0);
setUploadTime(0);

      setTotalCount(acceptedFiles.length);
setUploadedCount(0);

      setUploading(true);

      try {
        const uploadedUrls = [];

const uploadSingle = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append(
  "upload_preset",
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
);

  const response = await fetch(
  `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  {
    method: "POST",
    body: formData,
  }
);


const text = await response.text();
console.log(text);


if (!response.ok) {
  setFailedCount((prev) => prev + 1);
  return null;
}

const data = JSON.parse(text);

setUploadedCount((prev) => prev + 1);

return data.secure_url;

};

const CONCURRENT_UPLOADS = 3;

for (let i = 0; i < acceptedFiles.length; i += CONCURRENT_UPLOADS) {
  const batch = acceptedFiles.slice(i, i + CONCURRENT_UPLOADS);

  const urls = await Promise.all(
    batch.map((file) => uploadSingle(file))
  );

  uploadedUrls.push(...urls);
}

       const validUrls = uploadedUrls.filter(Boolean);

const updatedUrls = [...value, ...validUrls];

onChange(updatedUrls.length ? set(updatedUrls) : unset());

setUploadTime(((Date.now() - startTime) / 1000).toFixed(1));
      } catch (error) {
        console.error(error);
        alert("Upload failed");
      }

      finally {
  setUploading(false);
}
    },
    [value, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  accept: {
    "image/*": [],
  },
  multiple: true,
  disabled: uploading,
});

  const removeImage = (index) => {
    const updatedUrls = value.filter((_, i) => i !== index);

    onChange(updatedUrls.length ? set(updatedUrls) : unset());
  };

  return (
    <div>
      {/* Upload Box */}

      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #666",
          borderRadius: "12px",
          padding: "40px 20px",
          textAlign: "center",
          cursor: "pointer",
          background: isDragActive ? "#1f2937" : "#111827",
          transition: "0.3s",
        }}
      >
        <input {...getInputProps()} />

        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "10px",
            color: "red"
          }}
        >
           NEW UPLOADER
        </h3>

        <p>Drag & Drop Images Here</p>

        <p
          style={{
            marginTop: "8px",
            opacity: 0.8,
          }}
        >
          Click To Select Images
        </p>
      </div>

      {/* Upload Status */}

      {uploading && (
  <p
    style={{
      marginTop: "15px",
      fontWeight: "600",
    }}
  >
    Uploading {uploadedCount} of {totalCount} images...
  </p>
)}
      {/* Count */}

      {!uploading && totalCount > 0 && (
  <p
    style={{
      marginTop: "10px",
      color: failedCount ? "#d32f2f" : "#2e7d32",
      fontWeight: 600,
    }}
  >
    Uploaded {uploadedCount}/{totalCount}
    {failedCount > 0 && ` • Failed: ${failedCount}`}
    {uploadTime > 0 && ` • ${uploadTime}s`}
  </p>
)}

      {/* Preview Grid */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {value?.map((url, index) => (
          <div
            key={index}
            style={{
              position: "relative",
            }}
          >
            <img
              src={url}
              alt={`Image ${index}`}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <button
              disabled={uploading}
              type="button"
              onClick={() => removeImage(index)}
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background: "rgba(0,0,0,0.7)",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
