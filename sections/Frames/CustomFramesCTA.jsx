//src/sections/Frames/CustomFramesCTA.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";



export default function CustomFramesCTA({
  onOpenInquiry,
}) {
  return (
    <section className="pb-20 bg-white">
      <div className="container-custom">
        <div
          className="
            border
            border-[#ececec]
            rounded-[28px]
            bg-white
            shadow-[0_15px_45px_rgba(0,0,0,0.06)]
            overflow-hidden
          "
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid lg:grid-cols-[1.15fr_0.85fr] items-center"
          >
            {/* Left Content */}
            <div
              className="
                p-6
                sm:p-8
                md:p-12
                lg:p-16
                flex
                flex-col
                justify-center
              "
            >
              {/* Icon + Heading */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="
                  flex
                  flex-col
                  lg:flex-row
                  items-center
                  justify-center
                  gap-4
                  lg:gap-6
                  mb-8
                "
              >
                {/* Icon */}
                <div
                  className="
                    w-[72px]
                    h-[72px]
                    rounded-full
                    border
                    border-[#E8D7BC]
                    flex
                    items-center
                    justify-center
                    relative
                    shrink-0
                  "
                >
                  <div
                    className="
                      absolute
                      inset-[6px]
                      rounded-full
                      border
                      border-dashed
                      border-[#E8D7BC]
                    "
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#C28B36"
                    strokeWidth="1.5"
                    className="relative z-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4"
                    />
                  </svg>
                </div>

                {/* Heading */}
                <h2
                  className="
                    text-[28px]
                    sm:text-[38px]
                    md:text-[46px]
                    lg:text-[46px]
                    xl:text-[52px]
                    leading-none
                    font-medium
                    text-[#111111]
                    font-['Cormorant_Garamond']
                    text-center
                    lg:text-left
                    lg:whitespace-nowrap
                  "
                >
                  Custom Frames{" "}
                  <span className="text-[#C28B36]">
                    Available
                  </span>
                </h2>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.8 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                }}
                className="flex justify-center mb-8"
              >
                <div className="flex items-center">
                  <div className="w-[70px] sm:w-[120px] lg:w-[140px] h-[1px] bg-[#D9C09A]" />

                  <div className="mx-4 text-[#C28B36] text-[18px]">
                    ✦
                  </div>

                  <div className="w-[70px] sm:w-[120px] lg:w-[140px] h-[1px] bg-[#D9C09A]" />
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                }}
                className="
                  text-[#5E5E5E]
                  text-center
                  text-[15px]
                  sm:text-[17px]
                  md:text-[18px]
                  leading-[28px]
                  md:leading-[34px]
                  max-w-[500px]
                  mb-10
                  mx-auto
                  font-['Poppins']
                "
              >
                Customized sizes and designs made to fit your memories
                perfectly.
              </motion.p>

              {/* Button */}
              <div className="w-full flex justify-center">
                <motion.button
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() => onOpenInquiry("")}
                  className="
                    flex
                    items-center
                    gap-3
                    px-8
                    py-3.5
                    rounded-xl
                    border
                    border-[#C28B36]
                    text-[#C28B36]
                    text-[18px]
                    font-medium
                    font-['Itim']
                    transition-all
                    duration-300
                    hover:bg-[#C28B36]
                    hover:text-white
                  "
                >
                  <span>✎</span>
                  Customize Now
                </motion.button>
              </div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                h-[250px]
                sm:h-[320px]
                md:h-[400px]
                lg:h-[450px]
              "
            >
              <Image
                src="/frames/custom-frame.png"
                alt="Custom Frames"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  object-contain
                  transition-transform
                  duration-700
                  hover:scale-[1.03]
                "
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}