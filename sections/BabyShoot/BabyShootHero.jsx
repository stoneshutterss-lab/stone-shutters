// src/sections/BabyShoot/BabyShootHero.jsx

import Image from "next/image";

export default function BabyShootHero() {
  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      <Image
        src="/baby-shoot/hero.png"
        alt="Baby Shoot"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="text-center">
          <span
            className="uppercase tracking-[0.4em] text-white text-xs md:text-sm"
            style={{
              fontFamily: "Poppins",
            }}
          >
            Tiny Smiles • Big Memories
          </span>

          <h1
            className="mt-4 text-white text-5xl md:text-7xl lg:text-8xl leading-none"
            style={{
              fontFamily: "Cormorant Garamond",
            }}
          >
            Baby Shoots
          </h1>
        </div>
      </div>
    </section>
  );
}