import Image from "next/image";
import Link from "next/link";

export default function HomeAbout() {
  return (
    <section className="bg-white py-10 md:py-18">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images */}

          <div className="order-2 lg:order-1 grid grid-cols-[0.8fr_1.2fr] gap-3 md:gap-4">
            {/* Left Column */}

            <div className="flex flex-col h-[300px] md:h-[450px] gap-3 md:gap-4">
              {/* Top Image */}

              <div className="relative flex-[2] overflow-hidden">
                <Image
                  src="/home/about/1.png"
                  alt="About"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Image */}

              <div className="relative flex-1 overflow-hidden">
                <Image
                  src="/home/about/2.png"
                  alt="About"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Tall Image */}

            <div className="relative h-[300px] md:h-[450px] overflow-hidden">
              <Image
                src="/home/about/3.png"
                alt="About"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}

          <div className="order-1 lg:order-2">
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
              About Us
            </span>

            <h2
              className="
                mt-4
                text-[#111]
                text-2xl
                md:text-3xl
              "
              style={{
                fontFamily: "Playfair Display",
              }}
            >
              Who We Are
            </h2>

            <h3
              className="
                mt-4
                text-[#222]
                text-2xl
                md:text-4xl
                leading-tight
              "
              style={{
                fontFamily: "Cormorant Garamond",
              }}
            >
              Every Love Story Deserves to Be{" "}
              <span className="text-[#C28B36]">Remembered Forever</span>
            </h3>

            <p
              className="
                mt-6
                text-[#555]
                leading-8
                text-sm
                md:text-base
              "
              style={{
                fontFamily: "Poppins",
              }}
            >
              At Stone Shutters Wedding Studioz, we capture more than photographs—we preserve emotions, love, and life's most cherished moments. From weddings and pre-wedding stories to newborns and family celebrations, every frame is crafted with creativity, passion, and elegance. Because years from now, your photos won't just show how you looked—they'll remind you how you felt.
            </p>

            <Link
              href="/about"
              className="
                inline-flex
                items-center
                gap-2
                mt-8
                text-[#C28B36]
                hover:text-[#b4772e]
                transition-colors
              "
              style={{
                fontFamily: "Poppins",
              }}
            >
              Know More About Us →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
