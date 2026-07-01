import Image from "next/image";
import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { homeGalleryQuery } from "@/sanity/lib/homeQueries";

export default async function HomeGallery() {
  const data = await client.fetch(homeGalleryQuery);

  // Portfolio Images
  const portfolioImages =
    data.portfolio?.flatMap((project) =>
      (project.galleryImages || []).map((image) => ({
        image,
        href: `/portfolio/${project.category}/${project.slug}`,
        title: project.projectName,
      }))
    ) || [];

  // Baby Shoot Images
  const babyImages =
    data.babyShoots?.flatMap((project) =>
      (project.galleryImages || []).map((image) => ({
        image,
        href: `/baby-shoot/${project.slug}`,
        title: project.childName,
      }))
    ) || [];

  // More Portfolio Images
  const selectedPortfolio = [...portfolioImages]
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);

  // Fewer Baby Shoot Images
  const selectedBaby = [...babyImages]
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  const galleryImages = [...selectedPortfolio, ...selectedBaby].sort(
    () => Math.random() - 0.5
  );

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-10">
        {/* Heading */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4 md:mb-10">
          <div>
            <span
              className="
                uppercase
                text-[#C28B36]
                text-[10px]
                md:text-[11px]
                tracking-[0.35em]
                font-medium
              "
              style={{
                fontFamily: "Poppins",
              }}
            >
              Photo Gallery
            </span>

            <h2
              className="mt-[4px] md:mt-[10px] text-[#111]"
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: "clamp(36px, 4vw, 40px)",
                lineHeight: "1.1",
              }}
            >
              Selected Works
            </h2>

            <p
              className="
                mt-2
                md:mt-3
                text-[#666]
                text-sm
                md:text-base
              "
              style={{
                fontFamily: "Poppins",
              }}
            >
              A showcase of our recent photography projects
            </p>
          </div>

          <Link
            href="/portfolio"
            className="
              hidden md:inline-flex
              items-center
              gap-[6px]
              bg-[#C28B36]
              text-white
              px-[20px]
              md:px-[24px]
              py-[10px]
              md:py-[11px]
              rounded-[8px]
              transition-all
              duration-300
              hover:bg-[#b57d2d]
              hover:-translate-y-[2px]
              hover:shadow-[0_8px_20px_rgba(194,139,54,0.25)]
            "
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            View Full Portfolio →
          </Link>
        </div>

        {/* Gallery */}

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            gap-[6px]
            md:gap-2
          "
        >
          {galleryImages.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block group"
            >
              <div
                className="
                  relative
                  overflow-hidden
                  h-[180px]
                  sm:h-[220px]
                  md:h-[400px]
                "
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Button */}

        <div className="flex justify-center mt-4 md:hidden">
          <Link
            href="/portfolio"
            className="
              inline-flex
              items-center
              gap-[6px]
              bg-[#C28B36]
              text-white
              px-[20px]
              py-[10px]
              rounded-[8px]
              transition-all
              duration-300
              hover:bg-[#b57d2d]
            "
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            View Full Portfolio →
          </Link>
        </div>
      </div>
    </section>
  );
}