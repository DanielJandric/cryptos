import CyclesTabsContainer from "@/components/CyclesTabsContainer";
import Hero from "@/components/Hero";
import StatusBanner from "@/components/StatusBanner";
import TheorySection from "@/components/TheorySection";
import ModelExplanation from "@/components/ModelExplanation";
import Countdown from "@/components/Countdown";
import KeyTakeaways from "@/components/KeyTakeaways";
import Warning from "@/components/Warning";
import ScrollSpyController from "@/components/ScrollSpyController";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-5 md:space-y-7">
      <ScrollSpyController ids={["theorie", "graphique", "compte", "points", "avertissement"]} offset={120} />
      <Hero />
      <StatusBanner />
      <div id="theorie"><TheorySection /></div>
      <ModelExplanation />
      <div id="graphique"><CyclesTabsContainer /></div>
      <div id="compte"><Countdown /></div>
      <div id="points"><KeyTakeaways /></div>
      <div id="avertissement"><Warning /></div>
    </div>
  );
}


