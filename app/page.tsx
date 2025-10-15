"use client";
import Hero from "@/components/Hero";
import StatusBanner from "@/components/StatusBanner";
import Warning from "@/components/Warning";
import ScrollSpyController from "@/components/ScrollSpyController";
import MainTabs from "@/components/MainTabs";
import { Suspense } from "react";

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
      {/* Wrap MainTabs in Suspense to satisfy useSearchParams requirement */}
      <Suspense fallback={null}>
        <MainTabs />
      </Suspense>
      <div id="avertissement"><Warning /></div>
    </div>
  );
}


