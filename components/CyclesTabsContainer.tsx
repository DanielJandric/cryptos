"use client";

import Tabs from "./ui/Tabs";
import ChartSection from "./ChartSection";
import CycleCards from "./CycleCards";
import ComparisonCharts from "./ComparisonCharts";
import { useUIStore } from "@/lib/store";

export default function CyclesTabsContainer() {
  const activeTab = useUIStore((s) => s.activeTab);
  return (
    <section className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-center">
        <Tabs />
      </div>
      {activeTab === "graph" && <ChartSection />}
      {activeTab === "cycles" && <CycleCards />}
      {activeTab === "comparison" && <ComparisonCharts />}
      {/* HitRate moved to main Stats tab */}
    </section>
  );
}


