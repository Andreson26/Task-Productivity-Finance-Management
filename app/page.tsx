import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 font-sans">
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
