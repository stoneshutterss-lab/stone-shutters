//src/sections/portfolio/portfolioprojectgrid.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

export default function PortfolioProjectGrid({ projects, category }) {
  return (
    <section className="pb-8 md:pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Link
            key={project._id}
            href={`/portfolio/${category}/${project.slug}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="group cursor-pointer overflow-hidden rounded-xl bg-white"
            >
              {/* Cover Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={urlFor(project.coverImage)
                    .width(800)
                    .height(1000)
                    .fit("crop")
                    .url()}
                  alt={project.projectName}
                  fill
                  quality={100}
                  sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent transition-all duration-500 group-hover:from-black/70" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h2
                    className="text-white text-2xl md:text-3xl leading-tight"
                    style={{
                      fontFamily: "Cormorant Garamond",
                    }}
                  >
                    {project.projectName}
                  </h2>

                  {project.tagLine && (
                    <p
                      className="mt-2 text-white/90 text-sm md:text-lg italic leading-relaxed"
                      style={{
                        fontFamily: "Cormorant Garamond",
                      }}
                    >
                      {project.tagLine}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}