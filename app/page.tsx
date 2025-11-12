import { NavigationBar } from "@/components/ui/complete-components/navigation-bar";
import { FooterSection } from "@/components/ui/sections/footer-section";
import { HeroSection } from "@/components/ui/sections/hero-section";
import { SectionDivider } from "@/components/ui/sections/section-divider";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-white">
      <NavigationBar />
      <div className="h-24">
        <SectionDivider />
      </div>
      <HeroSection />
      <div className="h-24">
        <SectionDivider />
      </div>
      <FooterSection />
    </main>
  );
}
