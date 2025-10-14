import CyclesTabsContainer from "@/components/CyclesTabsContainer";
import Hero from "@/components/Hero";
import StatusBanner from "@/components/StatusBanner";
import TheorySection from "@/components/TheorySection";
import ModelExplanation from "@/components/ModelExplanation";
import Countdown from "@/components/Countdown";
import KeyTakeaways from "@/components/KeyTakeaways";
import Warning from "@/components/Warning";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-6 md:space-y-8">
      <Hero />
      <StatusBanner />
      <TheorySection />
      <ModelExplanation />
      <CyclesTabsContainer />
      <Countdown />
      <KeyTakeaways />
      <Warning />
    </div>
  );
}


