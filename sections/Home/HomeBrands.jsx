// src/sections/Home/HomeSubBrands.jsx

import Image from "next/image";
import Link from "next/link";

export default function HomeSubBrands() {
  return (
    <section className="bg-[#1F1F1F] border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16">
        <div className="relative grid grid-cols-2 items-center">
          
          {/* Divider Desktop Only */}

          <div
            className="
              hidden md:block
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-px
              h-[50px]
              bg-[#3A3A3A]
            "
          />

          {/* First Feet */}

          <Link
            href="/baby-shoot"
            className="
              flex
  flex-row
  items-center
  justify-center
  gap-2
  md:gap-4
  py-1
              transition-all
              duration-300
              hover:opacity-90
            "
          >
            <Image
              src="/brands/first-feet.png"
              alt="First Feet Baby Studio"
              width={350}
              height={150}
              priority
              className="
                h-[28px]
                md:h-[55px]
                lg:h-[60px]
                w-auto
                object-contain
                transition-all
                duration-300
                hover:scale-105
              "
            />

            <h3
              className="
                text-[#D4A14A]
                text-[8px]
                md:text-[12px]
                lg:text-[18px]
                text-center
                leading-none
              "
              style={{
                fontFamily: "Cormorant Garamond",
                fontWeight: 500,
              }}
            >
              First Feet Baby Studio
            </h3>
          </Link>

          {/* Yuvan */}

          <Link
            href="/frames"
            className="
              flex
  flex-row
  items-center
  justify-center
  gap-2
  md:gap-4
  py-1
              transition-all
              duration-300
              hover:opacity-90
            "
          >
            <Image
              src="/brands/yuvan-frames.png"
              alt="Yuvan Frames & Gifts"
              width={350}
              height={150}
              priority
              className="
                h-[28px]
                md:h-[55px]
                lg:h-[60px]
                w-auto
                object-contain
                transition-all
                duration-300
                hover:scale-105
              "
            />

            <h3
              className="
                text-[#D4A14A]
                text-[8px]
                md:text-[12px]
                lg:text-[18px]
                text-center
                leading-none
              "
              style={{
                fontFamily: "Cormorant Garamond",
                fontWeight: 500,
              }}
            >
              Yuvan Frames & Gifts
            </h3>
          </Link>
        </div>
      </div>
    </section>
  );
}