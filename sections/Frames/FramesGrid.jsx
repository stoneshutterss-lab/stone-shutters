//src/sections/Frames/FramesGrid.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

function SafeFrameImage({ src, alt }) {
  const [hasError, setHasError] = useState(false);
  const imageSrc = hasError || !src ? "/frames/custom-frame.png" : src;

  return (
    <Image
      src={imageSrc}
      alt={alt || "Studio Frame"}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}

export default function FramesGrid({ onOpenInquiry, onFramesLoaded }) {
  const [framesList, setFramesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchFrames = async () => {
      try {
        const res = await fetch("/api/frames", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (ignore) return;

        const list = data.frames || [];
        setFramesList((prev) => {
          const isSame =
            prev.length === list.length &&
            prev.every(
              (item, idx) =>
                item.id === list[idx]?.id &&
                item.title === list[idx]?.title &&
                item.desc === list[idx]?.desc &&
                item.image === list[idx]?.image &&
                item.order === list[idx]?.order
            );

          if (!isSame) {
            if (onFramesLoaded) {
              onFramesLoaded(list);
            }
            return list;
          }
          return prev;
        });
      } catch (err) {
        console.error("Failed to sync frames:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    // 1. Initial fetch
    fetchFrames();

    // 2. Instant cross-tab BroadcastChannel sync
    let channel = null;
    if (typeof window !== "undefined" && window.BroadcastChannel) {
      try {
        channel = new BroadcastChannel("stone_shutters_sync");
        channel.onmessage = (event) => {
          if (event.data?.target === "frames" || event.data?.target === "all") {
            fetchFrames();
          }
        };
      } catch (e) {
        // BroadcastChannel unsupported/failed
      }
    }

    // 3. Storage event sync
    const onStorage = (e) => {
      if (e.key === "stone_shutters_sync_ping") {
        fetchFrames();
      }
    };
    window.addEventListener("storage", onStorage);

    // 4. Background auto-polling (every 2.5 seconds)
    const pollInterval = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        fetchFrames();
      }
    }, 2500);

    // 5. Window focus & visibility listeners
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchFrames();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("focus", fetchFrames);

    return () => {
      ignore = true;
      clearInterval(pollInterval);
      if (channel) channel.close();
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("focus", fetchFrames);
    };
  }, [onFramesLoaded]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  if (!loading && framesList.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
          {framesList.map((frame, index) => (
            <motion.div
              key={frame.id}
              onClick={() => onOpenInquiry(frame.title)}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              className="
                bg-white
                rounded-2xl
                overflow-hidden
                border
                border-[#ececec]
                shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]
                transition-shadow
                duration-300
                group
                flex
                flex-col
                h-full
                cursor-pointer
              "
            >
              {/* Image */}
              <div className="relative h-[220px] bg-slate-50 overflow-hidden">
                <SafeFrameImage src={frame.image} alt={frame.title} />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3
                  className="
                    text-[16px]
                    sm:text-[17px]
                    md:text-[16px]
                    font-medium
                    text-[#111827]
                    leading-snug
                    mb-2
                    font-['Poppins']
                  "
                >
                  {frame.title}
                </h3>

                <p
                  className="
                    text-[#6b7280]
                    text-[14px]
                    leading-relaxed
                    mb-4
                    font-['Poppins']
                    flex-1
                  "
                >
                  {frame.desc}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenInquiry(frame.title);
                  }}
                  className="
                    mt-auto
                    flex
                    items-center
                    gap-2
                    text-[#C28B36]
                    font-medium
                    text-[15px]
                    font-['Itim']
                    transition-all
                    duration-300
                    hover:gap-3
                    cursor-pointer
                  "
                >
                  Customize Your Frame
                  <ArrowRight
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
