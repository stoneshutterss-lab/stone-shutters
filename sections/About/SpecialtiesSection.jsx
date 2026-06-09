"use client";

import { motion } from "framer-motion";

import {
  Camera,
  Heart,
  ImageIcon,
  Shirt,
  Gem,
  Sparkles,
  Baby,
  BookImage,
} from "lucide-react";

const specialties = [
  {
    icon: Camera,
    title: "Wedding Photography & Cinematic Videography",
    desc: "Beautifully crafted memories with a cinematic touch.",
  },
  {
    icon: Heart,
    title: "Candid Wedding Moments",
    desc: "Unscripted emotions and timeless memories.",
  },
  {
    icon: ImageIcon,
    title: "Traditional & Artistic Portraits",
    desc: "Timeless portraits with elegance and personality.",
  },
  {
    icon: Shirt,
    title: "Fashion & Portfolio Shoots",
    desc: "Creative fashion photography to showcase your style.",
  },
  {
    icon: Gem,
    title: "Pre-Wedding & Post-Wedding Shoots",
    desc: "Magical storytelling before and after your big day.",
  },
  {
    icon: Sparkles,
    title: "Engagement & Reception Coverage",
    desc: "Covering your special moments beautifully.",
  },
  {
    icon: Baby,
    title: "Maternity & Baby Photography",
    desc: "Cherishing the most beautiful phases of life.",
  },
  {
    icon: BookImage,
    title: "Album Designing & Premium Prints",
    desc: "Exquisite albums and premium quality prints.",
  },
];

export default function SpecialtiesSection() {
  return (
    <section className="w-full pb-20 sm:pb-24 lg:pb-24 overflow-hidden">

      <div
        className="max-w-[1600px] mx-auto
        px-4 sm:px-6 lg:px-16 xl:px-20"
      >

        {/* TITLE */}
        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.6,
    ease: "easeOut",
  }}
  viewport={{ once: true }}
  className="text-center max-w-[900px] mx-auto"
>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0,
            }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <div className="w-12 h-[1px] bg-[#C28B36]"></div>

            <p
              className="uppercase tracking-[3px]
              text-[12px] text-[#C28B36] font-semibold"
            >
              What We Do
            </p>

            <div className="w-12 h-[1px] bg-[#C28B36]"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0,
            }}
            viewport={{ once: true }}
            className="text-[38px] sm:text-[46px] lg:text-[62px]
            leading-[1.05] text-[#111111]"
            style={{
              fontFamily: "Cormorant Garamond",
              fontWeight: 500,
            }}
          >
            Our <span className="text-[#C28B36]">Specialties</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0,
            }}
            viewport={{ once: true }}
            className="mt-6 text-[16px] sm:text-[17px]
            leading-[2] text-[#666666]"
            style={{
              fontFamily: "Poppins",
            }}
          >
            We capture emotions, tell your story and create
            timeless memories through professional photography
            & cinematic services.
          </motion.p>
        </motion.div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-6 xl:gap-6 mt-6 md:mt-10 lg:mt-12">

          {specialties.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
  type: "spring",
  stiffness: 260,
  damping: 20,
}}
                viewport={{ once: true }}
                whileHover={{
  y: -6,
  scale: 1.01,
}}
                className="bg-white border border-[#ece7df]
                p-8 sm:p-10 text-center
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]
                will-change-transform"
              >

                {/* ICON */}
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: 2,
                  }}
                  transition={{
  duration: 0.18,
  ease: "easeOut",
}}
                  className="w-24 h-24 rounded-full
                  bg-[#faf7f2] mx-auto
                  flex items-center justify-center"
                >
                  <Icon
                    size={42}
                    strokeWidth={1.2}
                    className="text-[#C28B36]"
                  />
                </motion.div>

                {/* TITLE */}
                <h3
                  className="mt-8 text-[24px]
                  leading-[1.4] text-[#111111]"
                  style={{
                    fontFamily: "Cormorant Garamond",
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </h3>

                {/* LINE */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  transition={{
  duration: 0.4,
  ease: "easeOut",
}}
                  viewport={{ once: true }}
                  className="h-[1px] bg-[#C28B36]
                  mx-auto my-5"
                ></motion.div>

                {/* DESC */}
                <p
                  className="text-[15px]
                  leading-[1.9] text-[#666666]"
                  style={{
                    fontFamily: "Poppins",
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}