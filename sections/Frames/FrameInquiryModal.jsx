//src/sections/Frames/FrameInquiryModal.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

export default function FrameInquiryModal({ isOpen, onClose, selectedFrame }) {
  const frameOptions = [
    "Frame (6×4 inch)",
    "Frame (8×6 inch)",
    "Frame (10×15 inch)",
    "Frame (12×8 inch)",
    "Frame (12×10 inch)",
    "Frame (12×15 inch)",
    "Frame (12×18 inch)",
    "Frame (20×16 inch)",
    "Frame (24×16 inch)",
    "Frame (20×30 inch)",
    "Frame (30×40 inch)",
    "Custom Size Frame",
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedType, setSelectedType] = useState(selectedFrame || "");

  useEffect(() => {
    setSelectedType(selectedFrame || "");
  }, [selectedFrame]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="sticky bottom-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              bg-black/40
              backdrop-blur-md
              z-[999]
            "
            onClick={onClose}
          />

          {/* Desktop Modal */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 30,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
    fixed
    inset-0

    md:inset-auto
    md:left-1/2
    md:top-1/2
    md:-translate-x-1/2
    md:-translate-y-1/2

    z-[1000]

    bg-white

    md:w-[92%]
    md:max-w-[900px]

   md:max-h-[85vh]

    overflow-y-auto
scrollbar-thin
scrollbar-thumb-[#d1d5db]
scrollbar-track-transparent

    md:rounded-[30px]

    shadow-none
    md:shadow-[0_30px_80px_rgba(0,0,0,0.18)]

    p-6
    md:p-10
  "
          >
            {/* Header */}

            <div className="flex justify-end mb-8">
              <button
                onClick={onClose}
                className="
      w-12
      h-12
      rounded-full
      border
      border-[#e5e5e5]
      flex
      items-center
      justify-center
      hover:bg-[#fafafa]
      transition-all
      duration-300
    "
              >
                <X size={20} />
              </button>
            </div>

            <h2
              className="
                text-[36px]
                md:text-[44px]
                mb-8
                font-['Cormorant_Garamond']
              "
            >
              Frame Inquiry
            </h2>

            <form className="space-y-5">
              <div>
                <label className="block mb-2 font-medium">Full Name</label>

                <input
                  placeholder="eg: Barry Allen"
                  className="
  w-full
  h-[56px]

  border
  border-[#DADADA]

  rounded-xl

  px-5

  bg-white

  text-[#444]

  transition-all
  duration-300

  focus:outline-none
  focus:border-[#9CA3AF]
"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Phone Number</label>

                  <input
                    placeholder="eg: 1234567890"
                    className="
  w-full
  h-[56px]

  border
  border-[#DADADA]

  rounded-xl

  px-5

  bg-white

  text-[#444]

  transition-all
  duration-300

  focus:outline-none
  focus:border-[#9CA3AF]
"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Location</label>

                  <input
                    placeholder="eg: Coimbatore"
                    className="
  w-full
  h-[56px]

  border
  border-[#DADADA]

  rounded-xl

  px-5

  bg-white

  text-[#444]

  transition-all
  duration-300

  focus:outline-none
  focus:border-[#9CA3AF]
"
                  />
                </div>
              </div>

              {/* Auto Filled Frame */}

              <div>
                <label
                  className="
      block
      mb-2
      font-medium
      text-[#444]
    "
                >
                  Type of Frame
                </label>

                <div className="relative">
                  {/* Trigger */}

                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="
        w-full
        h-[56px]

        px-5

        flex
        items-center
        justify-between

        bg-white

        border
        border-[#DADADA]

        rounded-xl

        text-left
        text-[#444]

        transition-all
        duration-300

        hover:border-[#BDBDBD]

        focus:outline-none

        focus:border-[#9CA3AF]
      "
                  >
                    <span>{selectedType || "Select Frame"}</span>

                    <motion.div
                      animate={{
                        rotate: isDropdownOpen ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  {/* Menu */}

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -10,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className="
            absolute
            left-0
            right-0
            top-full

            mt-2

            bg-white

            border
            border-[#ECECEC]

            rounded-xl

            overflow-hidden

            shadow-[0_12px_35px_rgba(0,0,0,0.08)]

            z-50
          "
                      >
                        <div
                          className="
              max-h-[280px]
              overflow-y-auto
              hide-scrollbar
            "
                        >
                          {frameOptions.map((frame) => (
                            <button
                              key={frame}
                              type="button"
                              onClick={() => {
                                setSelectedType(frame);
                                setIsDropdownOpen(false);
                              }}
                              className={`
                  w-full
                  text-left

                  px-5
                  py-3

                  text-[15px]

                  transition-all
                  duration-200

                  border-b
                  border-[#F4F4F4]

                  hover:bg-[#F8F8F8]

                  ${
                    selectedType === frame
                      ? "bg-[#F5F5F5] font-medium text-[#111]"
                      : "text-[#555]"
                  }
                `}
                            >
                              {frame}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Additional Details
                </label>

                <textarea
                  rows="5"
                  placeholder="Tell us more about frame requirements..."
                  className="
  w-full

  border
  border-[#DADADA]

  rounded-xl

  p-5

  resize-none

  transition-all
  duration-300

  focus:outline-none
  focus:border-[#9CA3AF]
"
                />
              </div>

              <button
                className="
                  w-full
                  h-[56px]
                  bg-[#C28B36]
                  text-white
                  rounded-xl
                  font-medium
                  transition-all
                  hover:bg-black
                "
              >
                Submit Inquiry
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
