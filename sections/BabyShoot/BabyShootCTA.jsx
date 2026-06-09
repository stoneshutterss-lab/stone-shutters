// src/sections/BabyShoot/BabyShootCTA.jsx

import Link from "next/link";

export default function BabyShootCTA() {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <span
          className="uppercase tracking-[0.35em] text-[#C28B36] text-xs md:text-sm"
          style={{
            fontFamily: "Poppins",
          }}
        >
          Let's Create Memories
        </span>

        <h2
          className="mt-4 text-[#111] text-4xl md:text-5xl lg:text-6xl"
          style={{
            fontFamily: "Cormorant Garamond",
          }}
        >
          Preserve Every Precious Moment
        </h2>

        <p
          className="mt-6 text-[#666] max-w-2xl mx-auto leading-8"
          style={{
            fontFamily: "Poppins",
          }}
        >
          Childhood passes quickly, but beautiful memories can last forever.
          Book a baby photography session and celebrate every smile, laugh, and
          milestone.
        </p>

        <Link
          href="/contact"
          className="
  inline-block
  mt-10
  px-8
  py-4
  bg-[#C28B36]
  border
  border-[#C28B36]
  text-white
  rounded-[15px]
  hover:bg-[#b57d2d]
  hover:border-[#b57d2d]
  hover:shadow-[0_10px_25px_rgba(194,139,54,0.25)]
  transition-all
  duration-300
"
        >
          Book Your Session
        </Link>
      </div>
    </section>
  );
}
