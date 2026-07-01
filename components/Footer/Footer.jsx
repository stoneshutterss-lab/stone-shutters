//src/components/Footer/Footer.jsx
import Image from "next/image";
import Link from "next/link";

import {
  FaWhatsapp,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Baby Shoots", href: "/Baby-shoots" },
  { name: "Frames", href: "/frames" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="w-full mt-auto">
      {/* CONTAINER */}
      <div
  className="
    w-full
    bg-[#F9F8F5]
    border-t
    border-[#E7E0D4]
    rounded-t-[52px]
    shadow-[0_-4px_15px_rgba(0,0,0,0.04)]
  "
>
        <div
          className="max-w-[1600px] mx-auto
          px-4 sm:px-6 lg:px-16 xl:px-20
          py-10 lg:py-12"
        >
          {/* TOP */}
          <div
            className="flex flex-col lg:flex-row
items-center lg:items-center
text-center lg:text-left
lg:justify-between
gap-10"
          >
            {/* LOGO */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Stone Shutters"
                width={240}
                height={80}
                className="w-[180px] sm:w-[220px]
                h-auto object-contain"
              />
            </Link>

            {/* NAVIGATION */}
            <div
              className="flex flex-wrap justify-center
lg:justify-end items-center
gap-x-6 gap-y-4"
            >
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-[16px]
                  text-[#111111]
                  hover:text-[#CE8123]
                  transition-all duration-300"
                  style={{
                    fontFamily: "Cormorant Garamond",
                    fontWeight: 600,
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* LINE */}
          <div className="w-full h-[1px] bg-[#dddddd] my-8"></div>

          {/* BOTTOM */}
          <div
            className="flex flex-col-reverse sm:flex-row
  items-center sm:items-center
  text-center sm:text-left
  justify-between gap-6"
          >
            {/* COPYRIGHT */}
            <p
              className="text-[12px] uppercase
    tracking-[0.5px] text-[#111111]
    text-center sm:text-left"
            >
              STONE SHUTTERS WEDDING STUDIOZ © 2026. All rights reserved.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-5">
              <Link
                href="#"
                className="text-[#111111]
      hover:text-[#CE8123]
      transition-all duration-300"
              >
                <FaWhatsapp size={18} />
              </Link>

              <Link
                href="#"
                className="text-[#111111]
      hover:text-[#CE8123]
      transition-all duration-300"
              >
                <FaYoutube size={18} />
              </Link>

              <Link
                href="#"
                className="text-[#111111]
      hover:text-[#CE8123]
      transition-all duration-300"
              >
                <FaFacebookF size={16} />
              </Link>

              <Link
                href="#"
                className="text-[#111111]
      hover:text-[#CE8123]
      transition-all duration-300"
              >
                <FaInstagram size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
