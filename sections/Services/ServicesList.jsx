"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    id: "SERVICE 01",
    title: "Wedding Photography",
    subtitle: "& Cinematic Videography",
    image: "/services/wedding.png",
    points: [
      "Candid Wedding Photography",
      "Traditional Wedding Coverage",
      "Cinematic Wedding Films",
      "Engagement & Reception Shoots",
      "Pre-Wedding & Post-Wedding Sessions",
      "Drone shoots and LED Wall display",
    ],
  },

  {
    id: "SERVICE 02",
    title: "Baby Photography &",
    subtitle: "Family Moments",
    image: "/services/baby.png",
    points: [
      "Newborn Baby Shoots",
      "Monthly Milestone Photography",
      "Creative Theme Baby Sessions",
      "Indoor & Outdoor Baby Shoots",
      "Parent & Family Portraits",
      "Customized Props & Setups",
    ],
  },
  {
    id: "SERVICE 03",
    title: "Barathanatiyam Artistic",
    subtitle: "photography",
    image: "/portfolio/Bharatanatyam.png",
    points: [
      "Salangai poojai",
      "Arangetram (Rangapravesam)",
      "Classical dance photo and video shoots",
      "10+ Years of Expertise in This Field",
    ],
  },

  {
    id: "SERVICE 04",
    title: "Artistic Photography &",
    subtitle: "Creative Portraits",
    image: "/services/portrait.png",
    points: [
      "Fashion, modeling & Portfolio Shoots",
      "Portrait Photography",
      "Couple & Lifestyle Shoots",
      "Artistic Indoor Sessions",
      "Creative Photo Editing",
      "Premium Retouching & Designs",
    ],
  },

  {
    id: "SERVICE 05",
    title: "Premium Frames &",
    subtitle: "Album Designing",
    image: "/services/frame.png",
    points: [
      "Customized Size Frames",
      "Wedding Photo Frames",
      "Baby and Family Photo Frames",
      "Canvas, LED, Acrylic frames.",
      "Album Designing & Printing",
      "Personalized Gift Frames",
    ],
  },
];

export default function ServicesList() {
  return (
    <section className="w-full pb-20 sm:pb-24 lg:pb-32 overflow-hidden">
      <div
        className="max-w-[1600px] mx-auto
        px-4 sm:px-6 lg:px-16 xl:px-20"
      >
        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center max-w-[900px] mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-16 h-[1px] bg-[#C28B36]"></div>

            <p
              className="uppercase tracking-[3px]
              text-[12px] text-[#C28B36]"
              style={{
                fontFamily: "Inter",
                fontWeight: 500,
              }}
            >
              Our Expertise
            </p>

            <div className="w-16 h-[1px] bg-[#C28B36]"></div>
          </div>

          <h2
            className="text-[25px] sm:text-[38px]
            lg:text-[54px]
            leading-[1.1]
            tracking-[-1px]
            text-[#111111]"
            style={{
              fontFamily: "Cormorant Garamond",
              fontWeight: 500,
            }}
          >
            Creating Memories That Last Forever
          </h2>

          <p
            className="mt-7 text-[15px] sm:text-[18px]
            leading-[2] text-[#555555]
            tracking-[1px]"
            style={{
              fontFamily: "Poppins",
              fontWeight: 400,
            }}
          >
            We blend creative photography, cinematic visuals, and premium frame
            designs to preserve your most special moments beautifully and
            meaningfully.
          </p>
        </motion.div>

        {/* SERVICES */}
        <div className="mt-10 lg:mt-20 space-y-10 lg:space-y-32">
          {services.map((service, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-15 items-center
                ${isReverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                {/* CONTENT */}
                <motion.div
                  className={`
                    order-2
                    ${isReverse ? "lg:order-2" : "lg:order-1"}
                  `}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.85,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* SERVICE TAG */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1,
                    }}
                    className="inline-flex items-center
                    border border-[#d8c6ab]
                    rounded-full
                    px-5 py-2
                    text-[#C28B36]
                    text-[12px]
                    tracking-[2px]
                    mb-4"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 500,
                    }}
                  >
                    {service.id}
                  </motion.div>

                  {/* TITLE */}
                  <motion.h3
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-[34px] sm:text-[48px]
                    lg:text-[56px]
                    leading-[1.15]
                    tracking-[-1px]
                    text-[#111111]"
                    style={{
                      fontFamily: "Cormorant Garamond",
                      fontWeight: 500,
                    }}
                  >
                    {service.title}

                    <span
                      className="block text-[#C28B36]"
                      style={{
                        fontFamily: "Cormorant Garamond",
                        fontStyle: "italic",
                        fontWeight: 500,
                      }}
                    >
                      {service.subtitle}
                    </span>
                  </motion.h3>

                  {/* LIST */}
                  <motion.ul
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.25,
                      ease: "easeOut",
                    }}
                    className="mt-6 space-y-4
                    text-[15px] sm:text-[17px]
                    tracking-[1px]
                    text-[#222222]"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {service.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-[10px] w-[6px] h-[6px] rounded-full bg-[#111111]"></span>

                        <span>{point}</span>
                      </li>
                    ))}
                  </motion.ul>

                  {/* LINK */}
                  <Link href="/contact">
                    <motion.span
                      whileHover={{
                        x: 6,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                      className="
      inline-block
      mt-8
      text-[#C28B36]
      underline
      underline-offset-4
      text-[16px]
      sm:text-[16px]
      lg:text-[20px]
      cursor-pointer
    "
                      style={{
                        fontFamily: "Times New Roman",
                      }}
                    >
                      Enquire about this service →
                    </motion.span>
                  </Link>
                </motion.div>

                {/* IMAGE */}
                <motion.div
                  className={`
                    order-1
                    ${isReverse ? "lg:order-1" : "lg:order-2"}
                  `}
                  initial={{ opacity: 0, scale: 1.08 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.div
                    whileHover={{
                      y: -6,
                      scale: 1.015,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 18,
                    }}
                    className="overflow-hidden rounded-[14px]
                    will-change-transform
                    transform-gpu"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={900}
                      height={700}
                      className="w-full
                      h-[300px]
                      sm:h-[420px]
                      lg:h-[560px]
                      object-cover
                      transition-transform duration-700 ease-out"
                    />
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
