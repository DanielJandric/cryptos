"use client";

import { useUIStore, type ActiveTab } from "@/lib/store";
import { motion } from "framer-motion";
import { cn } from "./utils";
import { useI18n } from "@/hooks/useI18n";

export default function Tabs() {
  const activeTab = useUIStore((s) => s.activeTab);
  const setActiveTab = useUIStore((s) => s.setActiveTab);
  const { msg } = useI18n();

  const tabs: { key: ActiveTab; label: string }[] = [
    { key: "graph", label: msg("Graphique", "Chart") },
    { key: "cycles", label: msg("Cycles", "Cycles") },
    { key: "comparison", label: msg("Comparaison", "Comparison") },
  ];

  return (
    <div className="relative inline-flex rounded-full border border-slate-800 bg-slate-900/50 p-1 touch-pan-x select-none">
      {tabs.map((t) => {
        const isActive = t.key === activeTab;
        return (
          <button
            key={t.key}
            className={cn(
              "relative z-10 px-4 py-2 text-sm rounded-full transition-colors",
              isActive ? "text-slate-900" : "text-slate-300 hover:text-white"
            )}
            onClick={() => setActiveTab(t.key)}
            aria-pressed={isActive}
            aria-label={`Onglet ${t.label}`}
          >
            {isActive && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 z-[-1] rounded-full bg-white"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}


