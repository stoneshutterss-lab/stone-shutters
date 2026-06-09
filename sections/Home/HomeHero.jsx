"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  "/home/hero/1.png",
  "/home/hero/2.png",
  "/home/hero/3.png",
  "/home/hero/4.png",
  "/home/hero/5.png",
  "/home/hero/6.png",
];

export default function HomeHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1,
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <section className="relative h-[60vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden">
      
      {/* Slides */}

      {slides.map((image, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 transition-opacity duration-[3000ms]
            ${
              current === index
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        >
          <Image
            src={image}
            alt={`Hero Slide ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/35" />
        </div>
      ))}

      {/* Content */}

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          
          <h1
            className="
              text-white
              text-4xl
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
              leading-tight
            "
            style={{
              fontFamily: "Cormorant Garamond",
              fontWeight: 400,
            }}
          >
            We Don't Just Capture Moments
          </h1>

          <p
            className="
              mt-4
              text-white/90
              text-sm
              md:text-lg
              max-w-2xl
              mx-auto
            "
            style={{
              fontFamily: "Poppins",
            }}
          >
            We Preserve Emotions Forever
          </p>

        </div>
      </div>

      {/* Left Arrow */}

      <button
        onClick={prevSlide}
        className="
          absolute
          left-4
          md:left-8
          top-1/2
          -translate-y-1/2
          text-white
          z-20
        "
      >
        <ChevronLeft size={40} strokeWidth={1.5} />
      </button>

      {/* Right Arrow */}

      <button
        onClick={nextSlide}
        className="
          absolute
          right-4
          md:right-8
          top-1/2
          -translate-y-1/2
          text-white
          z-20
        "
      >
        <ChevronRight size={40} strokeWidth={1.5} />
      </button>
    </section>
  );
}