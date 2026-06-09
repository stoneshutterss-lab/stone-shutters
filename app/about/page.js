//src/app/about/page.js

import AboutHero from "@/sections/About/AboutHero";
import FounderSection from "@/sections/About/FounderSection";
import SpecialtiesSection from "@/sections/About/SpecialtiesSection";

export default function AboutPage() {
  return (
    <div className="bg-white overflow-hidden">
      <AboutHero />
      <FounderSection />
      <SpecialtiesSection />
    </div>
  );
}