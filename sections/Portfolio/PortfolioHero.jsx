//src/sections/Portfolio/PortfolioHero.jsx
"use client";

import { motion } from "framer-motion";

export default function PortfolioHero() {
  return (
    <section className="bg-[#f8f8f8] pt-10 md:pt-14 lg:pt-16 pb-8 md:pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="uppercase tracking-[0.35em] text-[#C28B36] text-sm font-medium">
              Our Portfolio
            </span>

            <h1 className="mt-5 font-cormorant text-[#111] leading-[0.9] text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
              Where Memories Become Timeless Art
            </h1>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-[#555] leading-relaxed text-lg md:text-xl">
              Every celebration has a story worth preserving. From weddings and
              candid moments to baby showers and birthday memories, our
              portfolio reflects genuine emotions, elegant compositions, and
              timeless storytelling.
            </p>

            <p className="mt-6 text-[#555] leading-relaxed text-lg md:text-xl">
              Explore our collections and experience the moments that define
              love, family, and life's most beautiful milestones.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
