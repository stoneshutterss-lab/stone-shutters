//src/sections/Portfolio/PortfolioGrid.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import portfolioData from "./portfolioData";

export default function PortfolioGrid() {
  return (
    <section className="bg-[#f8f8f8] pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-12 lg:gap-y-20">
          {portfolioData.map((item, index) => (
            <Link href={`/portfolio/${item.slug}`} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="group relative overflow-hidden cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Premium Dark Overlay */}
                  <div
                    className="
    absolute
    inset-0
    bg-gradient-to-t
    from-black/45
    via-black/15
    to-black/10
    group-hover:from-black/55
    group-hover:via-black/20
    group-hover:to-black/15
    transition-all
    duration-500
  "
                  />

                  {/* Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2
                      className="
        font-cormorant
        font-regular
        text-white
        text-[32px]
        md:text-[40px]
        lg:text-[48px]
        leading-none
        text-center
        px-6
        drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]
      "
                    >
                      {item.title}
                    </h2>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
