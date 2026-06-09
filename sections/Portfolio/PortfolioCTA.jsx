//src/sections/Portfolio/PortfolioCTA.jsx
"use client";

import { motion } from "framer-motion";

export default function PortfolioCTA() {
  return (
    <section className="bg-white py-16 md:py-18">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.35em] text-[#C28B36] text-sm"
        >
          Let's Create Something Beautiful
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-6 font-serif text-[#111] text-4xl md:text-5xl"
        >
          Ready To Capture Your Story?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-[#666] text-lg leading-relaxed max-w-2xl mx-auto"
        >
          From intimate moments to grand celebrations, we transform memories
          into timeless photographs you'll cherish forever.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="
  mt-10
  px-8
  py-4
  rounded-full
  bg-[#C28B36]
  border
  border-[#C28B36]
  text-white
  hover:bg-[#b57d2d]
  hover:border-[#b57d2d]
  hover:shadow-[0_10px_25px_rgba(194,139,54,0.25)]
  transition-all
  duration-300
"
        >
          Book Your Session
        </motion.button>
      </div>
    </section>
  );
}