// app/pages/site/sitePage.tsx
"use client";

import Gallery from "@/components/site/Gallery";
import ServicesSection from "@/components/site/ServicesSection";
import AboutSection from "@/components/site/AboutSection";
import BookingCTA from "@/components/site/BookingCTA";
import CustomCursor from "@/components/site/CustomCursor";
import HeroSection from "@/components/site/HeroSection";

export default function SitePage() {
  return (
    <div className="bg-obsidian min-h-screen selection:bg-gold selection:text-obsidian transition-colors duration-500">
      <CustomCursor />
      <HeroSection />
      <Gallery />
      <ServicesSection />
      <AboutSection />
      <BookingCTA />
    </div>
  );
}
