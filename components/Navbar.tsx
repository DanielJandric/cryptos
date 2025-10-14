"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);
  const active = useUIStore((s) => s.activeSectionId);
  useEffect(() => {
    // close drawer when section changes via click/scroll
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-slate-800/60 bg-slate-950/60">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#top" className="font-bold text-slate-100">Cycles 1064/364</a>
        <div className="hidden md:flex items-center gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`text-sm transition-colors ${active === l.href.replace('#','') ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
              {l.label}
            </a>
          ))}
        </div>
        <button className="md:hidden p-2 rounded-lg border border-slate-700 hover:bg-slate-800" onClick={toggle} aria-label="Ouvrir le menu">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-slate-800/60 bg-slate-950/80">
          <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-1 gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="block px-3 py-2 rounded-md border border-slate-800/60 bg-slate-900/60 hover:bg-slate-800/60 text-slate-200"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}


