//src/app/portfolio/[category]/page.js
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import categoryData from "@/sections/Portfolio/categoryData";
import PortfolioProjectGrid from "@/sections/Portfolio/PortfolioProjectGrid";
import { categoryImagesQuery } from "@/sanity/lib/queries";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const pageData = categoryData[category];

  const projects = await client.fetch(categoryImagesQuery, {
  category,
});

  

  return (
    <main className="bg-white">
      {/* HERO */}

      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <Image
  src={pageData.heroImage}
  alt={pageData.heading}
  fill
  sizes="100vw"
  quality={100}
  priority
  className="object-cover"
/>

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl text-center">
            {pageData.heading}
          </h1>
        </div>
      </section>

      {/* CONTENT */}

      <section className="bg-[#ffffff] py-12 md:py-18">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            {/* LEFT CONTENT */}

            <div>
              <h2
                className="
          uppercase
          text-[#444]
          tracking-wide
          text-[18px]
          md:text-[28px]
          leading-none
          mb-4
        "
                style={{
                  fontFamily: "Cormorant SC",
                  fontWeight: 500,
                }}
              >
                {pageData.heading}
              </h2>

              <h3
                className="
          text-[14px]
          md:text-[25px]
          leading-tight
          mb--4
          italic
          text-[#333]
        "
                style={{
                  fontFamily: "Cormorant Garamond",
                }}
              >
                {pageData.subtitle}{" "}
                <span className="text-[#C28B36]">{pageData.highlight}</span>
              </h3>

              <p
                className="
          text-[#333]
          whitespace-pre-line
          leading-[2]
          text-[12px]
          md:text-[14px]
        "
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                }}
              >
                {pageData.description}
              </p>
            </div>

            {/* RIGHT IMAGE */}

            <div
              className="
        relative
        aspect-[4/3]
        overflow-hidden
        rounded-[6px]
      "
            >
              <Image
  src={pageData.contentImage}
  alt={pageData.heading}
  fill
  sizes="(max-width: 1024px) 100vw, 50vw"
  quality={100}
  className="object-cover"
/>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}

      <section className="pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          {projects.length > 0 ? (
  <PortfolioProjectGrid
    projects={projects}
    category={category}
  />
) : (
            <div
              className="
          flex
          flex-col
          items-center
          justify-center
          text-center
          py-20
          md:py-32
        "
            >
              <span
                className="
            uppercase
            tracking-[0.35em]
            text-[#C28B36]
            text-sm
            mb-4
          "
              >
                Portfolio Updating
              </span>

              <h2
                className="
            text-[#111]
            text-4xl
            md:text-6xl
            mb-6
          "
                style={{
                  fontFamily: "Cormorant Garamond",
                }}
              >
                Coming Soon
              </h2>

              <p
                className="
            text-[#666]
            max-w-2xl
            mx-auto
            text-base
            md:text-lg
            leading-relaxed
          "
                style={{
                  fontFamily: "Poppins",
                }}
              >
                We are currently curating and uploading our latest work for this
                category. Please check back soon to explore beautiful moments,
                creative storytelling, and memorable photography collections.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
