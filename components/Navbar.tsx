"use client";

import { useEffect, useState } from "react";
import { HelpCircle, Languages, Menu, ChevronDown } from "lucide-react";
import { useUIStore } from "@/lib/store";
import GlossaryModal from "./GlossaryModal";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";

export default function Navbar() {
  const active = useUIStore((s) => s.activeSectionId);
  const setActiveTab = useUIStore((s) => s.setActiveTab);
  const router = useRouter();
  const { msg } = useI18n();
  const [open, setOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(true);

  useEffect(() => {
    // close on route/tab change via hash or query changes could be handled here
  }, [active]);

  const goTab = (tab: string) => {
    router.replace(`?tab=${tab}`);
    setOpen(false);
  };
  const goAnalysis = (sub: "graph" | "cycles" | "comparison") => {
    router.replace(`?tab=analysis`);
    setActiveTab(sub);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-slate-800/60 bg-slate-950/60">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between relative">
        <a href="#top" className="font-bold text-slate-100">Cycles 1064/364</a>
        <div className="flex-1" />
        <button
          onClick={() => useUIStore.getState().toggleTour()}
          className="inline-flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-md border border-blue-500/40 text-blue-200 hover:bg-blue-500/10 mr-1 md:mr-3"
          aria-label="Démarrer le tour"
        >
          <HelpCircle className="size-4" />
          <span className="hidden md:inline">{msg("Démarrer le tour","Start tour")}</span>
        </button>
        <button
          onClick={() => useUIStore.getState().toggleLanguage && useUIStore.getState().toggleLanguage!()}
          className="inline-flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-md border border-slate-700 text-slate-200 hover:bg-slate-800 mr-1"
          aria-label="Toggle language"
        >
          <Languages className="size-4" /> EN/FR
        </button>
        <div className="ml-2 hidden md:inline-block">
          <GlossaryModal />
        </div>
        <button
          className="ml-2 inline-flex items-center justify-center size-9 rounded-md border border-slate-700 hover:bg-slate-800"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <Menu className="size-5" />
        </button>

        {open && (
          <div className="absolute right-2 top-14 w-72 card p-2 border border-slate-700 bg-slate-900/95">
            <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-800" onClick={() => goTab("theory")}>
              {msg("Théorie","Theory")}
            </button>
            <div className="px-1">
              <button
                className="w-full text-left px-2 py-2 rounded hover:bg-slate-800 inline-flex items-center justify-between"
                onClick={() => setAnalysisOpen((v) => !v)}
                aria-expanded={analysisOpen}
              >
                <span>{msg("Analyse","Analysis")}</span>
                <ChevronDown className={`size-4 transition-transform ${analysisOpen ? "rotate-180" : "rotate-0"}`} />
              </button>
              {analysisOpen && (
                <div className="pl-3 pb-2 flex flex-col gap-1">
                  <button className="text-left px-2 py-1.5 rounded hover:bg-slate-800" onClick={() => goAnalysis("graph")}>
                    {msg("Graphiques","Charts")}
                  </button>
                  <button className="text-left px-2 py-1.5 rounded hover:bg-slate-800" onClick={() => goAnalysis("cycles")}>
                    {msg("Cycles","Cycles")}
                  </button>
                  <button className="text-left px-2 py-1.5 rounded hover:bg-slate-800" onClick={() => goAnalysis("comparison")}>
                    {msg("Comparaisons","Comparison")}
                  </button>
                </div>
              )}
            </div>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-800" onClick={() => goTab("stats")}>Hit rate</button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-800" onClick={() => goTab("data")}>Data</button>
          </div>
        )}
      </nav>
    </header>
  );
}


