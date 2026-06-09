import Image from "next/image";
import Link from "next/link";

const specialties = [
  {
    title: "Wedding Photoshoots",
    image: "/home/specialties/wedding.png",
    link: "/services",
  },

  {
    title: "Baby Photoshoots",
    image: "/home/specialties/baby.png",
    link: "/baby-shoot",
  },

  {
    title: "Photo Frames",
    image: "/home/specialties/frames.png",
    link: "/frames",
  },
];

export default function HomeSpecialties() {
  return (
    <section className="bg-white py-1 md:py-2">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

        {/* Heading */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4 md:mb-8">

          <div>
            <span
              className="
                uppercase
                tracking-[0.35em]
                text-[#C28B36]
                text-[10px]
                md:text-[12px]
              "
              style={{
                fontFamily: "Poppins",
              }}
            >
              Services
            </span>

            <h2
              className="
                mt-3
                text-[#111]
                text-3xl
                md:text-4xl
              "
              style={{
                fontFamily: "Cormorant Garamond",
              }}
            >
              Our Specialties
            </h2>

            <p
              className="
                mt-1
                md:mt-2
                text-[#666]
                text-[15px]
                md:text-[18px]
              "
              style={{
                fontFamily: "Poppins",
              }}
            >
              Wedding photography, baby shoots, cinematic memories, and premium handcrafted frames.
            </p>
          </div>

          <Link
  href="/services"
  className="
    hidden md:inline-flex
    items-center
    justify-center
    px-6
    py-3
    bg-[#C28B36]
    text-white
    rounded-[8px]
    transition-all
    duration-300
    hover:opacity-90
  "
>
  Explore Our Services →
</Link>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-2 md:gap-6">

          {specialties.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[8px]">

                <div className="relative h-[300px] md:h-[400px] overflow-hidden ">

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                      rounded-[8px]
                    "
                  />

                </div>

                {/* Overlay */}

                <div
                  className="
                    absolute inset-0
                    bg-black/15
                    group-hover:bg-black/25
                    transition-all duration-500
                  "
                />

                {/* Title */}

                <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                  <h3
                    className="
                      text-white
                      text-2xl
                      md:text-3xl
                    "
                    style={{
                      fontFamily: "Cormorant Garamond",
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

              </div>
            </Link>
            
          ))}

        </div>
        <div className="flex justify-center mt-4 md:hidden">
  <Link
    href="/services"
    className="
      inline-flex
      items-center
      justify-center
      px-6
      py-3
      bg-[#C28B36]
      text-white
      rounded-[8px]
      transition-all
      duration-300
      hover:opacity-90
    "
  >
    Explore Our Services →
  </Link>
</div>

      </div>
    </section>
  );
}