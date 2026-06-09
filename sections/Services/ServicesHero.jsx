"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section className="w-full pt-8 sm:pt-14 lg:pt-10 pb-10 md:pb-20 overflow-hidden">
      <div
        className="max-w-[1600px] mx-auto
        px-4 sm:px-6 lg:px-16 xl:px-20"
      >
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-24 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="will-change-transform"
          >

            {/* SMALL TITLE */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="w-12 h-[1px] bg-[#C28B36]"></div>

              <p
                className="text-[#C28B36]
                text-[13px] tracking-[2px]"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                }}
              >
                Tirupur, Tamil Nadu
              </p>
            </motion.div>

            {/* HEADING */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[30px] sm:text-[42px]
              lg:text-[54px] leading-[1.15]
              tracking-[-1px]
              text-[#111111]"
              style={{
                fontFamily: "Cormorant Garamond",
                fontWeight: 400,
              }}
            >
              Capturing Moments With

              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.35,
                  duration: 0.8,
                }}
                className="block text-[#C28B36]"
                style={{
                  fontFamily: "Cormorant Garamond",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                Creativity & Emotion
              </motion.span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.25,
                duration: 0.75,
                ease: "easeOut",
              }}
              className="mt-4 text-[16px] sm:text-[17px]
              leading-[2] text-[#444444]
              max-w-[620px]"
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
              }}
            >
              From weddings and baby shoots to cinematic storytelling and custom
              frames, Stone Shutters Wedding Studioz creates timeless memories
              filled with elegance, emotion, and artistic perfection.
            </motion.p>

            {/* BUTTON */}
            <motion.button
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.35,
                duration: 0.7,
                ease: "easeOut",
              }}
              whileHover={{
                y: -3,
                scale: 1.02,
                boxShadow: "0px 12px 30px rgba(194,139,54,0.25)",
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="mt-8 bg-[#C28B36]
              hover:bg-[#b57928]
              text-white px-8 py-4
              rounded-[6px]
              text-[15px]
              transition-colors duration-300
              will-change-transform"
              style={{
                fontFamily: "Inter",
                fontWeight: 500,
              }}
            >
              Explore Our Projects →
            </motion.button>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative will-change-transform"
          >
            <motion.div
              whileHover={{
                y: -6,
                scale: 1.01,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="overflow-hidden rounded-[16px]"
            >

              <Image
                src="/services/store.png"
                alt="Stone Shutters"
                width={900}
                height={700}
                priority
                className="w-full h-[280px]
                sm:h-[420px] lg:h-[520px]
                object-cover"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}