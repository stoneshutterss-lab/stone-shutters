"use client";

import { useState } from "react";
import { Phone, Minus, Plus } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingContact() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="
        fixed
        right-4
        md:right-5
        bottom-5
        md:bottom-6
        z-[999]
        flex
        flex-col
        items-center
        gap-3
      "
    >
      {open && (
        <>
          {/* Phone */}

          <a
            href="tel:+919876543210"
            className="
              w-12 h-12
              md:w-10 md:h-10
              rounded-full
              bg-[#C28B36]
              text-white
              flex
              items-center
              justify-center
              shadow-md
              hover:scale-105
              transition-all
              duration-300
            "
          >
            <Phone size={20} />
          </a>

          {/* WhatsApp */}

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-12 h-12
              md:w-10 md:h-10
              rounded-full
              bg-[#25D366]
              text-white
              flex
              items-center
              justify-center
              shadow-md
              hover:scale-105
              transition-all
              duration-300
            "
          >
            <FaWhatsapp size={24} />
          </a>
        </>
      )}

      {/* Toggle */}

      <button
        onClick={() => setOpen(!open)}
        className="
          w-12 h-12
          md:w-10 md:h-10
          rounded-full
          bg-white
          text-[#222]
          border
          border-[#e5e5e5]
          shadow-md
          flex
          items-center
          justify-center
          hover:scale-105
          transition-all
          duration-300
        "
      >
        {open ? <Minus size={20} /> : <Plus size={20} />}
      </button>
    </div>
  );
}