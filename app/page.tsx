"use client";
import CyclesTabsContainer from "@/components/CyclesTabsContainer";
import Hero from "@/components/Hero";
import StatusBanner from "@/components/StatusBanner";
import TheorySection from "@/components/TheorySection";
import ModelExplanation from "@/components/ModelExplanation";
import Countdown from "@/components/Countdown";
import KeyTakeaways from "@/components/KeyTakeaways";
import Warning from "@/components/Warning";
import ScrollSpyController from "@/components/ScrollSpyController";
import HitRateCard from "@/components/HitRateCard";
import CorrelationCard from "@/components/CorrelationCard";

import { useUIStore } from "@/lib/store";

export default function Home() {
  const lang = useUIStore((s) => s.language ?? "fr");
  const t = lang === "en";
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-5 md:space-y-7">
      <ScrollSpyController ids={["theorie", "graphique", "compte", "points", "avertissement"]} offset={120} />
      <Hero
        badge={t ? "Predictive model" : "Modèle prédictif Bitcoin"}
        title={t ? "Predictive 1064/364 Bitcoin model" : "Modèle prédictif 1064/364 Bitcoin"}
        subtitle={
          t
            ? "Historic cycles analysis, current cycle projections, and macro insights (psychology, liquidity, halving)."
            : "Analyse des cycles historiques, projections du cycle en cours et insights macro basés sur la psychologie de marché, la liquidité et le halving."
        }
      />
      <StatusBanner />
      <div id="theorie"><TheorySection /></div>
      <ModelExplanation />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <HitRateCard />
        <CorrelationCard />
      </div>
      <div id="graphique"><CyclesTabsContainer /></div>
      <div id="compte"><Countdown /></div>
      <div id="points"><KeyTakeaways /></div>
      <div id="avertissement"><Warning /></div>
    </div>
  );
}


