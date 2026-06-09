"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Manikandan E",
    review:
      "My daughter puberty album is very nice... Cute posses nice clicks.. Your team is very friendly and comfortable",
  },
  {
    name: "Rocky karthi",
    review:
      "Extraordinary work bro. Painting frame result is heart touching quality. I will refer your studio to my all friends.",
  },
  {
    name: "Sreevishnu Gopal",
    review:
      "The album was really fantastic and the clippings captured was really fabulous. Thank you for making our big day a memorable one.",
  },
  {
    name: "Raghul J",
    review:
      "Stone Shutters Wedding Studio is amazing! My friend wedding day was flawless, and the photos were stunning. Highly recommend!",
  },
  {
    name: "Nivetha Aruchamy",
    review:
      "Photography was amazing. All shots were beautifully taken. I personally suggest this studio for further memories to be captured.",
  },
  {
    name: "Prabavathy MP",
    review:
      "Awesome work ji. My daughter puberty album is very beautiful. I can't expect this quality and quick delivery. Price is very affordable. Thanks a lot",
  },
];

export default function HomeTestimonials() {
  return (
    <section className="bg-white pt-[10px] pb-[10px] md:pt-[20px] md:pb-[80px]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-10">
        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[30px] mb-[20px] md:mb-[40px]">
          <div>
            <span
              className="uppercase tracking-[0.35em] text-[#C28B36]"
              style={{
                fontFamily: "Poppins",
                fontSize: "clamp(10px,1vw,12px)",
                fontWeight: 500,
              }}
            >
              Testimonials
            </span>

            <h2
              className="mt-[6px] md:mt-[12px] text-[#111]"
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: "clamp(24px,5vw,34px)",
                lineHeight: "1.1",
              }}
            >
              Happy Memories, Happy Clients
            </h2>

            <p
              className="mt-[8px] md:mt-[14px] text-[#666] max-w-[650px]"
              style={{
                fontFamily: "Poppins",
                fontSize: "clamp(15px,1.5vw,12px)",
                lineHeight: "1.8",
              }}
            >
              From weddings to baby shoots, our clients cherish every frame we
              create.
            </p>
          </div>

          {/* Navigation */}

          <div className="hidden lg:flex items-center gap-[12px]">
            <button
              className="
                testimonial-prev
                w-[42px]
                h-[42px]
                md:w-[52px]
                md:h-[52px]
                rounded-full
                border
                border-[#222]
                flex
                items-center
                justify-center
                hover:bg-[#C28B36]
                hover:border-[#C28B36]
                hover:text-white
                transition-all
                duration-300
              "
            >
              <ChevronLeft size={18} />
            </button>

            <button
              className="
                testimonial-next
                w-[42px]
                h-[42px]
                md:w-[52px]
                md:h-[52px]
                rounded-full
                border
                border-[#222]
                flex
                items-center
                justify-center
                hover:bg-[#C28B36]
                hover:border-[#C28B36]
                hover:text-white
                transition-all
                duration-300
              "
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Slider */}

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next",
          }}
          spaceBetween={24}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div
                className="
                  bg-white
                  border
                  border-[#ededed]
                  shadow-sm
                  p-[24px]
                  md:p-[32px]
                  h-[320px]
                  md:h-[380px]
                  flex
                  flex-col
                "
              >
                {/* Quote */}

                <div
                  className="text-[#C28B36]"
                  style={{
                    fontFamily: "Cormorant Garamond",
                    fontSize: "60px",
                    lineHeight: "1",
                  }}
                >
                  “
                </div>

                {/* Review */}

                <p
                  className="mt-[24px] text-[#555] flex-1"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "clamp(14px,1.2vw,16px)",
                    lineHeight: "1.9",
                  }}
                >
                  {item.review}
                </p>

                {/* Bottom */}

                <div className="mt-auto">
                  <div className="w-[48px] h-[1px] bg-[#C28B36] mb-[24px]" />

                  <h3
                    className="uppercase tracking-[0.2em] text-[#111]"
                    style={{
                      fontFamily: "Cormorant Garamond",
                      fontSize: "clamp(12px,1vw,14px)",
                    }}
                  >
                    {item.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Mobile Navigation */}

<div className="flex justify-end gap-[12px] mb-[20px] mt-[20px] lg:hidden">
  <button
    className="
      testimonial-prev
      w-[42px]
      h-[42px]
      rounded-full
      border
      border-[#222]
      flex
      items-center
      justify-center
      hover:bg-[#C28B36]
      hover:border-[#C28B36]
      hover:text-white
      transition-all
      duration-300
    "
  >
    <ChevronLeft size={18} />
  </button>

  <button
    className="
      testimonial-next
      w-[42px]
      h-[42px]
      rounded-full
      border
      border-[#222]
      flex
      items-center
      justify-center
      hover:bg-[#C28B36]
      hover:border-[#C28B36]
      hover:text-white
      transition-all
      duration-300
    "
  >
    <ChevronRight size={18} />
  </button>
</div>
      </div>
    </section>
  );
}