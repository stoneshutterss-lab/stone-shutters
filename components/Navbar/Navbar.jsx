//src/components/Navbar/Navbar.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Baby Shoots", href: "/baby-shoot" },
  { name: "Frames", href: "/frames" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 border-b border-[#dddddd]
transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            : "bg-white"
        }`}
      >
        {/* CONTAINER */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-20 xl:px-24">
          {/* NAVBAR */}
          <div className="h-[64px] lg:h-[72px] flex items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="relative z-50 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Stone Shutters"
                width={230}
                height={80}
                priority
                className="w-[140px] sm:w-[170px] xl:w-[200px] h-auto object-contain"
              />
            </Link>

            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link, index) => {
                const isActive =
  link.href === "/portfolio"
    ? pathname.startsWith("/portfolio")
    : link.href === "/baby-shoot"
      ? pathname.startsWith("/baby-shoot")
      : pathname === link.href;

                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={`relative text-[19px] font-semibold pb-[6px]
                    transition-all duration-300
                    ${
                      isActive
                        ? "text-[#CE8123]"
                        : "text-[#111111] hover:text-[#CE8123]"
                    }`}
                    style={{
                      fontFamily: "Cormorant Garamond",
                    }}
                  >
                    {link.name}

                    {/* ACTIVE LINE */}
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{
                        width: isActive ? "100%" : "0%",
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeInOut",
                      }}
                      className="absolute left-0 bottom-0 h-[1.5px] bg-[#CE8123]"
                    />

                    {/* HOVER LINE */}
                    {!isActive && (
                      <span
                        className="absolute left-0 bottom-0 w-0 h-[1.5px]
                        bg-[#CE8123]
                        transition-all duration-300
                        hover:w-full"
                      ></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenu((prev) => !prev);
              }}
              className="lg:hidden flex items-center justify-center relative z-[70]"
            >
              {mobileMenu ? (
                <X size={32} strokeWidth={1.7} className="text-[#111111]" />
              ) : (
                <Menu size={30} strokeWidth={1.7} className="text-[#111111]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed lg:hidden inset-0 bg-black/20 z-30 touch-auto"
              onClick={() => setMobileMenu(false)}
            />

            {/* FULLSCREEN MENU */}
            <motion.div
              initial={{
                opacity: 0,
                y: -25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
              style={{
                transformOrigin: "top",
              }}
              className="fixed lg:hidden top-[64px] lg:top-[72px] left-0 w-full
h-[calc(100vh-64px)] lg:h-[calc(100vh-72px)]
bg-white z-40"
            >
              {/* MENU CENTER */}
              <div
                className="h-full flex flex-col items-center
justify-center gap-8 pb-20"
              >
                {navLinks.map((link, index) => {
                  const isActive =
  link.href === "/portfolio"
    ? pathname.startsWith("/portfolio")
    : link.href === "/baby-shoot"
      ? pathname.startsWith("/baby-shoot")
      : pathname === link.href;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.6,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenu(false)}
                        className={`text-[24px] tracking-[4px]
                  uppercase transition-all duration-300
                  ${
                    isActive
                      ? "text-[#CE8123]"
                      : "text-[#111111] hover:text-[#CE8123]"
                  }`}
                        style={{
                          fontFamily: "Cormorant Garamond",
                          fontWeight: 500,
                        }}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
