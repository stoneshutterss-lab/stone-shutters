"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FounderSection() {
  return (
    <section className="w-full pt-4 sm:pt-8 lg:pt-16 pb-10 sm:pb-14 lg:pb-24 overflow-hidden">

      <div
        className="max-w-[1600px] mx-auto
        px-4 sm:px-6 lg:px-16 xl:px-20"
      >

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-16 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >

            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              transition={{
                duration: 0.6,
              }}
              className="overflow-hidden"
            >
              <Image
                src="/about/founder.png"
                alt="Founder"
                width={700}
                height={850}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>

          {/* CONTENT */}
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
                The Visionary
              </p>
            </motion.div>

            {/* NAME */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
              }}
              viewport={{ once: true }}
              className="text-[34px] sm:text-[46px]
              text-[#111111] leading-[1.1]"
              style={{
                fontFamily: "Cormorant Garamond",
                fontWeight: 500,
              }}
            >
              Ramesh D. Ilakiyan
            </motion.h2>

            {/* ROLE */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              viewport={{ once: true }}
              className="text-[#C28B36] text-[16px]
              mt-3 mb-7 tracking-[2px] uppercase"
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
              }}
            >
              Founder & Creative Director
            </motion.p>

            {/* TAGS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              {[
                "Artistic Photographer",
                "Fashion Photographer",
                "Writer",
                "Poet",
                "Artist",
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
                  bg-white text-[#111111]"
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
                delay: 0.5,
              }}
              viewport={{ once: true }}
              className="space-y-4 text-[14px] sm:text-[15px]
              leading-[2] text-[#555555]"
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
              }}
            >
              <p>
                Stone Shutters Wedding Studioz was founded by
                Ramesh.D.Ilakiyan, a passionate visual artist
                with a deep love for storytelling through
                photography and art. With years of creative
                experience and artistic vision, he brings
                emotion, elegance, and originality into every
                frame.
              </p>

              <p>
                Beyond photography, he is also known as a poet,
                writer, and artist, blending creativity and
                imagination into his work to create unique and
                meaningful visual experiences. His artistic
                approach and dedication to perfection have
                helped Stone Shutters Wedding Studioz build a
                strong identity and trusted reputation since
                2011.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}