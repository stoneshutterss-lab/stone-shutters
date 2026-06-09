import BabyShootHero from "@/sections/BabyShoot/BabyShootHero";
import BabyShootIntro from "@/sections/BabyShoot/BabyShootIntro";
import BabyShootGrid from "@/sections/BabyShoot/BabyShootGrid";
import BabyShootCTA from "@/sections/BabyShoot/BabyShootCTA";

export default function BabyShootPage() {
  return (
    <>
      <BabyShootHero />
      <BabyShootIntro />
      <BabyShootGrid />
      <BabyShootCTA />
    </>
  );
}