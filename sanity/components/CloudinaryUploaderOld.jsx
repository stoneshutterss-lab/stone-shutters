//src/sanity/components/CloudinaryUploader.jsx
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { set, unset } from "sanity";

export default function CloudinaryUploader(props) {
  const { value = [], onChange } = props;

  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      setUploading(true);

      try {
        const uploadedUrls = [];

        for (const file of acceptedFiles) {
          const formData = new FormData();

          formData.append("file", file);
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          );

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dus0posaj/image/upload",
            {
              method: "POST",
              body: formData,
            },
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data?.error?.message || "Cloudinary upload failed");
          }

          uploadedUrls.push(data.secure_url);
        }

        const updatedUrls = [...value, ...uploadedUrls];

        onChange(updatedUrls.length ? set(updatedUrls) : unset());
      } catch (error) {
        console.error(error);
        alert("Upload failed");
      }

      setUploading(false);
    },
    [value, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
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
          }}
        >
          Upload Images
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
          Uploading Images...
        </p>
      )}

      {/* Count */}

      {value?.length > 0 && (
        <p
          style={{
            marginTop: "20px",
            fontWeight: "600",
          }}
        >
          ✓ {value.length} Image
          {value.length > 1 ? "s" : ""} Uploaded
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
