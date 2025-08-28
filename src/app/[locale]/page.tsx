import LandingSection from "./components/LandingSection";
import SectionHome1 from "./components/SectionHome1";
import SectionHome2 from "./components/SectionHome2";
import SectionHome3 from "./components/SectionHome3";
import SectionHome4 from "./components/SectionHome4";
export default function Home() {
  return (
    <main className="space-y-25">
      <LandingSection />
      <SectionHome2 />
      <SectionHome3 />
      <SectionHome1 />
      <SectionHome4/>
    </main>
  );
}
