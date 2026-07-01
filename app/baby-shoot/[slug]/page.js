// src/app/baby-shoot/[slug]/page.js

import Image from "next/image";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import CategoryGallery from "@/sections/Portfolio/CategoryGallery";

const query = `
*[_type == "babyProject" && slug.current == $slug][0]{
  _id,
  childName,
  tagLine,
  coverImage,
  galleryImages
}
`;

export default async function BabyShootDetailsPage({ params }) {
  const { slug } = await params;

  const project = await client.fetch(query, {
    slug,
  });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Project Not Found
      </div>
    );
  }

  return (
    <main>
      {/* HERO */}

      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <Image
          src={urlFor(project.coverImage)
  .width(1800)
  .height(1000)
  .fit("crop")
  .url()}
          alt={project.childName}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

       <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
  <h1
    className="text-white text-4xl md:text-6xl lg:text-7xl"
    style={{
      fontFamily: "Cormorant Garamond",
    }}
  >
    {project.childName}
  </h1>

  {project.tagLine && (
    <p
      className="mt-4 text-white/90 text-lg md:text-2xl italic"
      style={{
        fontFamily: "Cormorant Garamond",
      }}
    >
      {project.tagLine}
    </p>
  )}
</div>
      </section>

      {/* INTRO */}

      <section className="py-8 md:py-10 bg-white">
  <div className="max-w-4xl mx-auto px-6 text-center">

    <span
      className="
        uppercase
        tracking-[0.35em]
        text-[#C28B36]
        text-xs
        md:text-sm
      "
      style={{
        fontFamily: "Poppins",
      }}
    >
      Baby Shoot Gallery
    </span>

    <h2
      className="
        mt-4
        text-[#111]
        text-3xl
        md:text-5xl
        lg:text-6xl
      "
      style={{
        fontFamily: "Cormorant Garamond",
      }}
    >
      Precious Moments of {project.childName}
    </h2>

    <div className="flex items-center justify-center mt-8">
      <div className="h-px bg-[#d8d8d8] w-20" />
      <span className="mx-4 text-[#C28B36] text-xl">✦</span>
      <div className="h-px bg-[#d8d8d8] w-20" />
    </div>

  </div>
</section>

      {/* GALLERY */}

      <section className="pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          {project.galleryImages?.length > 0 ? (
            <CategoryGallery images={project.galleryImages} />
          ) : (
            <div
              className="
          flex
          flex-col
          items-center
          justify-center
          text-center
          py-20
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
                Gallery Updating
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
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
