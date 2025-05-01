import AboutMeSection from "@/components/home/AboutMeSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import HeroSection from "@/components/home/HeroSection";
import SkillsSection from "@/components/home/SkillsSection";

export default function Home() {
  return (
    <main className="container mx-auto px-2 lg:px-4">
      <HeroSection />
      <AboutMeSection />
      <ExperienceSection />
      <SkillsSection />
    </main>
  );
}
