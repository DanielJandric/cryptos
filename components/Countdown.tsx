"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { COUNTDOWN_TARGET } from "@/lib/constants";

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(COUNTDOWN_TARGET);
  return (
    <section className="card p-5 bg-purple-pink text-white">
      <h3 className="text-lg font-semibold mb-3">Compte à rebours jusqu&apos;au 5 oct. 2026</h3>
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Jours", value: days },
          { label: "Heures", value: hours },
          { label: "Minutes", value: minutes },
          { label: "Secondes", value: seconds },
        ].map((b) => (
          <div key={b.label} className="card text-center bg-white/10 backdrop-blur">
            <p className="text-3xl font-bold" suppressHydrationWarning>{String(b.value).padStart(2, "0")}</p>
            <p className="text-xs uppercase tracking-wide/4 text-white/80">{b.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


