// src/app/layout.js

import {
  Cormorant_Garamond,
  Cormorant_SC,
  Poppins,
} from "next/font/google";
import "./globals.css";

import LayoutWrapper from "@/components/LayoutWrapper";
import SiteProtection from "@/components/SiteProtection";


const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantSC = Cormorant_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "Stone Shutters",
  description: "Wedding Studio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.className}
    ${poppins.variable}
    ${cormorantSC.variable} min-h-screen flex flex-col bg-white`}
      >
         <SiteProtection />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}