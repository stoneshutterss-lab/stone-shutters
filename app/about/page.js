import AboutHero from "@/sections/About/AboutHero";
import NarthanaSection from "@/sections/About/NarthanaSection";
import FounderSection from "@/sections/About/FounderSection";
import SpecialtiesSection from "@/sections/About/SpecialtiesSection";

export default function AboutPage() {
  return (
    <div className="bg-white overflow-hidden">
      <AboutHero />
      <NarthanaSection />
      <FounderSection />
      <SpecialtiesSection />
    </div>
  );
}