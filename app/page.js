//src/app/page.js

import HomeBrands from "@/sections/Home/HomeBrands";
import HomeHero from "@/sections/Home/HomeHero";
import HomeAbout from "@/sections/Home/HomeAbout";
import HomeSpecialties from "@/sections/Home/HomeSpecialties";
import HomeGallery from "@/sections/Home/HomeGallery";
import HomeTestimonials from "@/sections/Home/HomeTestimonials";

export default function Home() {
  return (
    <>
      <HomeBrands />
      <HomeHero />
      <HomeAbout />
      <HomeSpecialties />
      <HomeGallery />
      <HomeTestimonials />
    </>
  );
}