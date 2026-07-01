//src/sections/BabyShoot/BabyShootGrid.jsx
import Image from "next/image";
import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const query = `
*[_type == "babyProject"] | order(publishedAt desc){
  _id,
  childName,
  tagLine,
  "slug": slug.current,
  coverImage
}
`;

export default async function BabyShootGrid() {
  const projects = await client.fetch(query);

  return (
    <section className="bg-white py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-6">
        {/* Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/baby-shoot/${project.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-[4px]">
                {/* Image */}

                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={urlFor(project.coverImage).width(800).url()}
                    alt={project.childName}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* Dark Overlay */}

                <div
                  className="
                    absolute inset-0
                    bg-black/20
                    group-hover:bg-black/35
                    transition-all duration-500
                  "
                />

                {/* Child Name & Tag Line */}

                <div className="absolute bottom-6 left-6 right-6">
                  <h3
                    className="
      text-white
      text-3xl
      md:text-4xl
      leading-tight
    "
                    style={{
                      fontFamily: "Cormorant Garamond",
                    }}
                  >
                    {project.childName}
                  </h3>

                  {project.tagLine && (
                    <p
                      className="
        mt-2
        text-white/90
        text-sm
        md:text-lg
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
