//src/sections/About/NarthanaSection.jsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function NarthanaSection() {
  return (
    <section className="w-full py-10 sm:py-14 lg:py-20 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20 items-center">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <Image
                src="/about/narthana.jpeg"
                alt="Narthana Visuals"
                width={700}
                height={850}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >

            {/* SMALL TITLE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="w-10 h-[1px] bg-[#C28B36]" />

              <p className="uppercase tracking-[2px] text-[10px] font-semibold text-[#C28B36]">
                Our Classical Journey
              </p>
            </motion.div>

            {/* HEADING */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: .8, delay: .15 }}
              viewport={{ once: true }}
              className="text-[32px] sm:text-[40px] leading-[1.1] text-[#111]"
              style={{
                fontFamily: "Cormorant Garamond",
                fontWeight: 500,
              }}
            >
              Narthana Visuals
            </motion.h2>

            {/* SUBTITLE */}
            <p
              className="mt-1 mb-4 uppercase tracking-[2px] text-[#C28B36] text-[12px]"
              style={{ fontFamily: "Poppins" }}
            >
              Bharatanatyam & Arangetram Photography
            </p>

            {/* CONTENT */}
            <div
              className="space-y-3 text-[14px] leading-[2] text-[#555]"
              style={{
                fontFamily: "Poppins",
              }}
            >
              <p>
                Narthana is a celebration of Bharatanatyam through the art of visual storytelling. Every Arangetram is a once-in-a-lifetime milestone where years of discipline, devotion, and tradition come together on stage. We specialize in creating timeless artistic photographs that preserve every graceful movement, expressive emotion, intricate costume detail, and sacred moment with elegance and authenticity. Our approach blends classical aesthetics with contemporary visual craftsmanship, ensuring every frame reflects the soul of the performance.
              </p>

              <p>
                Led by Ramesh D. Ilakiyan is dedicated to transforming Bharatanatyam and Arangetram performances into enduring works of art. With a deep appreciation for Indian classical dance and a passion for cinematic photography, we create premium visual memories that honor every dancer&apos;s journey. Each image is thoughtfully composed to capture not just a performance, but a legacy that will be treasured for generations.
              </p>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}