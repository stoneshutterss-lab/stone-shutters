import ServicesHero from "@/sections/Services/ServicesHero";
import ServicesList from "@/sections/Services/ServicesList";

export default function ServicesPage() {
  return (
    <div className="bg-white overflow-hidden">
      <ServicesHero />
      <ServicesList />
    </div>
  );
}