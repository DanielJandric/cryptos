"use client";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useI18n } from "@/hooks/useI18n";
// import { useUIStore } from "@/lib/store";

const OverviewTab = dynamic(() => import("./tabs/OverviewTab"), { ssr: false });
const CyclesTabsContainer = dynamic(() => import("./CyclesTabsContainer"), { ssr: false });
const HitRateSection = dynamic(() => import("./HitRateSection"), { ssr: false });
const TheorySection = dynamic(() => import("./TheorySection"), { ssr: false });
const DataTab = dynamic(() => import("./tabs/DataTab"), { ssr: false });

export default function MainTabs() {
  const params = useSearchParams();
  const router = useRouter();
  const { msg } = useI18n();
  const tab = params.get("tab") ?? "overview";

  const tabs = useMemo(
    () => [
      { id: "overview", label: msg("Vue d’ensemble", "Overview"), Comp: OverviewTab },
      { id: "analysis", label: msg("Analyse", "Analysis"), Comp: CyclesTabsContainer },
      { id: "stats", label: msg("Statistiques", "Stats"), Comp: HitRateSection },
      { id: "theory", label: msg("Théorie", "Theory"), Comp: TheorySection },
      { id: "data", label: "Data", Comp: DataTab },
    ],
    [msg]
  );

  useEffect(() => {
    if (!params.get("tab")) {
      router.replace(`?tab=${tab}`);
    }
  }, [params, router, tab]);

  const Active = tabs.find((t) => t.id === tab)?.Comp ?? OverviewTab;

  return (
    <section className="mt-4">
      <div className="sticky top-16 z-20 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((t) => {
            const is = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => router.replace(`?tab=${t.id}`)}
                className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${
                  is ? "bg-white text-slate-900" : "text-slate-300 hover:text-white border border-slate-700"
                }`}
                aria-pressed={is}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <Active />
      </div>
    </section>
  );
}
