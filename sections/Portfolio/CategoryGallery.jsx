//src/sections/Portfolio/CategoryGallery.jsx
"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";

export default function CategoryGallery({ images }) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div
        className="
          columns-2
          lg:columns-3
          gap-1
          md:gap-1
        "
      >
        {images.map((image, i) => (
          <div
            key={i}
            className="
              mb-1
              md:mb-1
              break-inside-avoid
              overflow-hidden
              cursor-pointer
              group
            "
            onClick={() => setIndex(i)}
          >
            <img
              src={image}
              alt=""
              className="
  w-full
  h-auto
  block
  transition-transform
  duration-700
  ease-out
  group-hover:scale-[1.04]
"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((img) => ({
          src: img,
        }))}
      />
    </>
  );
}
