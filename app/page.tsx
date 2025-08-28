import { NavigationBar } from "@/components/ui/complete-components/navigation-bar";
import { AboutSection } from "@/components/ui/sections/about-section";
import { ContactSection } from "@/components/ui/sections/contact-section";
import { FAQSection } from "@/components/ui/sections/FAQ-section";
import { FeaturesSection } from "@/components/ui/sections/features-section";
import { FooterSection } from "@/components/ui/sections/footer-section";
import { HeroSection } from "@/components/ui/sections/hero-section";
import { PricingSection } from "@/components/ui/sections/pricing-section";
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
      <AboutSection />
      <div className="h-24">
        <SectionDivider />
      </div>
      <FeaturesSection />
      <div className="h-24">
        <SectionDivider />
      </div>
      <FAQSection />
      <div className="h-24">
        <SectionDivider />
      </div>
      <PricingSection />
      <div className="h-24">
        <SectionDivider />
      </div>
      <ContactSection />



      <FooterSection />
    </main>

  );
}
