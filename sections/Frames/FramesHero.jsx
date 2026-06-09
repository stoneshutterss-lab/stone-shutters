//src/sections/Frames/FramesHero.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FramesHero() {
  return (
    <section className="relative h-[450px] md:h-[550px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/frames/hero-banner.png"
        alt="Frames Collection"
        fill
        priority
        sizes="100vw"
        className="object-cover scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="container-custom">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="
        text-white
        text-[34px]
        sm:text-[44px]
        md:text-[56px]
        lg:text-[64px]
        leading-none
        font-medium
        font-['Cormorant_Garamond']
        mb-4
      "
          >
            Our Frame Collections
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
            className="
        text-white/90
        text-[10px]
        md:text-[14px]
        max-w-3xl
        mx-auto
        leading-relaxed
        tracking-[2px]
        font-['Poppins']
      "
          >
            Elegant frame sizes crafted beautifully for weddings, portraits,
            baby shoots and timeless memories.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
