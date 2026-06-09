// src/sections/BabyShoot/BabyShootIntro.jsx

export default function BabyShootIntro() {
  return (
    <section className="bg-white py-8 md:py-14">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <span
          className="uppercase tracking-[0.35em] text-[#C28B36] text-xs md:text-sm"
          style={{
            fontFamily: "Poppins",
          }}
        >
          Capturing Childhood
        </span>

        <h2
          className="mt-4 text-[#111] text-3xl md:text-5xl lg:text-6xl"
          style={{
            fontFamily: "Cormorant Garamond",
          }}
        >
          Every Little Moment
          <br />
          Deserves To Be Remembered
        </h2>

        <p
          className="mt-8 text-[#555] leading-8 text-sm md:text-base max-w-3xl mx-auto"
          style={{
            fontFamily: "Poppins",
          }}
        >
          From adorable smiles and playful expressions to milestone
          celebrations, we create timeless memories that families will cherish
          forever. Our baby photography sessions are designed to preserve every
          precious stage of childhood with warmth, creativity, and elegance.
        </p>
      </div>
    </section>
  );
}