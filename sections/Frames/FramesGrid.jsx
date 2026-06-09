//src/sections/Frames/FramesGrid.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { frames } from "./frameData";
import { useState } from "react";
import FrameInquiryModal from "./FrameInquiryModal";

export default function FramesGrid({
  onOpenInquiry,
}) {
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
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
          {frames.map((frame, index) => (
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
              "
            >
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={frame.image}
                  alt={frame.title}
                  fill
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    25vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-110
                  "
                />
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
                 onClick={() => onOpenInquiry(frame.title)}
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
