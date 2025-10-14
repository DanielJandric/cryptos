"use client";

import { useEffect } from "react";
import { HelpCircle } from "lucide-react";
import { useUIStore } from "@/lib/store";

const links = [
  { href: "#top", label: "Accueil" },
  { href: "#theorie", label: "Théorie" },
  { href: "#graphique", label: "Graphique" },
  { href: "#cycles", label: "Cycles" },
  { href: "#comparaison", label: "Comparaison" },
  { href: "#compte", label: "Compte à rebours" },
  { href: "#points", label: "Points clés" },
  { href: "#avertissement", label: "Avertissement" },
];

export default function Navbar() {
  const active = useUIStore((s) => s.activeSectionId);
  useEffect(() => {
    // sync highlight on section change
  }, [active]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-slate-800/60 bg-slate-950/60">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#top" className="font-bold text-slate-100">Cycles 1064/364</a>
        <div className="flex-1" />
        <button
          onClick={() => useUIStore.getState().toggleTour()}
          className="inline-flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-md border border-blue-500/40 text-blue-200 hover:bg-blue-500/10 mr-1 md:mr-3"
          aria-label="Démarrer le tour"
        >
          <HelpCircle className="size-4" />
          <span className="hidden md:inline">Démarrer le tour</span>
        </button>
        <div className="hidden md:flex items-center gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`text-sm transition-colors ${active === l.href.replace('#','') ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}


