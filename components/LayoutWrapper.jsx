//src/components/LayoutWrapper.jsx

"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import FloatingContact from "@/components/FloatingContact/FloatingContact";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/stoneadm") || pathname.startsWith("/studio");

  return (
    <>
      {!isAdmin && <Navbar />}

      <main className={isAdmin ? "" : "flex-1 pt-[64px] lg:pt-[72px]"}>
        {children}
      </main>

      {!isAdmin && <FloatingContact />}

      {!isAdmin && <Footer />}
    </>
  );
}