//src/app/portfolio/page.js
import PortfolioHero from "@/sections/Portfolio/PortfolioHero";
import PortfolioGrid from "@/sections/Portfolio/PortfolioGrid";
import PortfolioCTA from "@/sections/Portfolio/PortfolioCTA";

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioHero />

      {/* Divider */}
      <section className="bg-[#f8f8f8] pb-10 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center justify-center">
            <div className="h-px bg-[#d8d8d8] flex-1" />
            <span className="mx-6 text-[#C28B36] text-xl">✦</span>
            <div className="h-px bg-[#d8d8d8] flex-1" />
          </div>
        </div>
      </section>

      <PortfolioGrid />

      <PortfolioCTA />
    </main>
  );
}