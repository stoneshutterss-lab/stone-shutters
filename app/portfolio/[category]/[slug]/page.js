//src/app/portfolio/[category]/[slug]/page.js
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import CategoryGallery from "@/sections/Portfolio/CategoryGallery";
import { urlFor } from "@/sanity/lib/image";

const query = `
*[
  _type == "project" &&
  category == $category &&
  slug.current == $slug
][0]{
  _id,
  projectName,
  tagLine,
  coverImage,
  galleryImages
}
`;

const categoryTitles = {
  wedding: {
    label: "Wedding Gallery",
    heading: "Timeless Moments of",
  },

  "pre-post-wedding": {
    label: "Pre & Post Wedding Gallery",
    heading: "Beautiful Journey of",
  },

  candid: {
    label: "Candid Gallery",
    heading: "Candid Moments of",
  },

  "baby-shower": {
    label: "Baby Shower Gallery",
    heading: "Beautiful Memories of",
  },

  puberty: {
    label: "Puberty Ceremony Gallery",
    heading: "Special Moments of",
  },

  "birthday-shoot": {
    label: "Birthday Gallery",
    heading: "Celebrating",
  },

  bharatanatyam: {
    label: "Bharatanatyam Gallery",
    heading: "Graceful Moments of",
  },
};


export default async function ProjectPage({ params }) {
  const { category, slug } = await params;

  const pageTitle =
  categoryTitles[category] || {
    label: "Gallery",
    heading: "Moments of",
  };

  const project = await client.fetch(query, {
    category,
    slug,
  });

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1
          className="text-3xl text-gray-700"
          style={{ fontFamily: "Cormorant Garamond" }}
        >
          Project Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="bg-white">
      {/* Hero */}

      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <Image
  src={
    project.coverImage
      ? urlFor(project.coverImage)
          .width(1800)
          .height(1000)
          .fit("crop")
          .url()
      : "/portfolio/default-cover.jpg"
  }
          alt={project.projectName}
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
  <h1
    className="text-white text-4xl md:text-6xl lg:text-7xl"
    style={{
      fontFamily: "Cormorant Garamond",
    }}
  >
    {project.projectName}
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
      {pageTitle.label}
    </span>

    <h2
      className="
        mt-4
        text-[#111]
        text-[24px]
        md:text-[38px]
        lg:text-[46px]
      "
      style={{
        fontFamily: "Cormorant Garamond",
      }}
    >
      {pageTitle.heading} {project.projectName}
    </h2>

    {project.tagLine && (
      <p
        className="
          mt-4
          text-[#666]
          text-base
          md:text-xl
          italic
          leading-relaxed
        "
        style={{
          fontFamily: "Cormorant Garamond",
        }}
      >
        {project.tagLine}
      </p>
    )}

    <div className="flex items-center justify-center mt-4">
      <div className="h-px bg-[#d8d8d8] w-20" />
      <span className="mx-4 text-[#C28B36] text-xl">✦</span>
      <div className="h-px bg-[#d8d8d8] w-20" />
    </div>

  </div>
</section>

      {/* Gallery */}

      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <CategoryGallery images={project.galleryImages || []} />
        </div>
      </section>
    </main>
  );
}