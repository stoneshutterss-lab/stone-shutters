//src/components/LayoutWrapper.jsx

"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import FloatingContact from "@/components/FloatingContact/FloatingContact";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isStudio = pathname.startsWith("/studio");

  return (
    <>
      {!isStudio && <Navbar />}

      <main className={isStudio ? "" : "flex-1 pt-[64px] lg:pt-[72px]"}>
        {children}
      </main>

      {!isStudio && <FloatingContact />}

      {!isStudio && <Footer />}
    </>
  );
}