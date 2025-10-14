"use client";

import { Home, BookOpen, LineChart, Timer, ListChecks, AlertTriangle } from "lucide-react";

const items = [
  { href: "#top", label: "Accueil", Icon: Home },
  { href: "#theorie", label: "Théorie", Icon: BookOpen },
  { href: "#graphique", label: "Graphique", Icon: LineChart },
  { href: "#compte", label: "Compte", Icon: Timer },
  { href: "#points", label: "Points", Icon: ListChecks },
  { href: "#avertissement", label: "Alerte", Icon: AlertTriangle },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <ul className="grid grid-cols-6 max-w-6xl mx-auto">
        {items.map(({ href, label, Icon }) => (
          <li key={href} className="text-center">
            <a href={href} className="flex flex-col items-center py-2 text-slate-300 hover:text-white text-[11px]">
              <Icon className="size-5 mb-0.5" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}


