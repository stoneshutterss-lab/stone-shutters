"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="w-full py-8 sm:py-10 lg:py-10 overflow-hidden">

      <div
        className="max-w-[1600px] mx-auto
        px-4 sm:px-6 lg:px-16 xl:px-20"
      >

        <div className="grid lg:grid-cols-2 gap-4 md:gap-12 lg:gap-14 xl:gap-20 items-start">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
          >

            {/* SMALL TITLE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-10 h-[1px] bg-[#C28B36]"></div>

              <p
                className="uppercase tracking-[2px]
                text-[12px] text-[#C28B36] font-semibold"
              >
                About Us
              </p>
            </motion.div>

            {/* HEADING */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
              }}
              viewport={{ once: true }}
              className="text-[34px] sm:text-[46px] lg:text-[48px]
              leading-[1.1] text-[#111111]"
              style={{
                fontFamily: "Cormorant Garamond",
                fontWeight: 400,
              }}
            >
              Stone Shutters Wedding Studioz
            </motion.h1>

            {/* TAGS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 mt-7 mb-8"
            >

              {[
                "Est. 2011",
                "Tirupur, Tamil Nadu",
                "Wedding Photography",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.3 },
                  }}
                  className="border border-[#d8c6ab]
                  px-4 py-2 text-[13px]
                  tracking-[2px] uppercase
                  text-[#111111] bg-white"
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>

            {/* PARAGRAPHS */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.4,
              }}
              viewport={{ once: true }}
              className="space-y-4 text-[16px] sm:text-[15px]
              leading-[2] text-[#555555]"
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
              }}
            >
              <p>
                Welcome to Stone Shutters Wedding Studioz — a trusted name in
                wedding and artistic photography rooted in the heart of Tirupur
                District, Tamil Nadu. Since 2011, we have been preserving
                beautiful love stories, heartfelt emotions, and unforgettable
                celebrations with creativity and passion.
              </p>

              <p>
                We believe every moment holds a story worth telling. From grand
                weddings and sacred traditional ceremonies to candid smiles and
                artistic portraits, our team transforms precious memories into
                timeless visual treasures that endure for generations.
              </p>

              <p>
                Through a seamless blend of modern photography techniques,
                cinematic storytelling, and artistic vision, we craft
                photographs and films that breathe with real emotion and
                authentic human connection. Our dedication to quality,
                creativity, and client satisfaction has made us one of the most
                preferred wedding photography studios in Tamil Nadu.
              </p>
            </motion.div>

            {/* QUOTE BOX */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.01,
              }}
              className="mt-10 bg-[#EEE5D7]
              border-l-[4px] border-[#C28B36]
              px-6 sm:px-8 py-6"
            >
              <p
                className="text-[14px] sm:text-[16px]
                leading-[1.8] text-[#B0721D]"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                }}
              >
                “From the grandest celebrations to the quietest glances —
                every frame we take is guided by emotion, not just technique.”
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="relative"
          >

            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              transition={{
                duration: 0.6,
              }}
              className="relative overflow-hidden"
            >
              <Image
                src="/about/about-main.png"
                alt="Stone Shutters"
                width={700}
                height={900}
                priority
                loading="eager"
                className="w-full h-[500px] sm:h-[620px] lg:h-[760px]
                object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}