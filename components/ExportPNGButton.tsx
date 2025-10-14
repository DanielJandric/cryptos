"use client";

import { useCallback } from "react";
import { Camera } from "lucide-react";

export default function ExportPNGButton({ targetId = "main-chart" }: { targetId?: string }) {
  const onExport = useCallback(async () => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const { toPng } = await import("html-to-image");
    const dataUrl = await toPng(el, { pixelRatio: 2, cacheBust: true, skipFonts: true, backgroundColor: "#0b1220" });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "bitcoin-cycles-chart.png";
    a.click();
  }, [targetId]);

  return (
    <button
      onClick={onExport}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-700 text-slate-200 hover:bg-slate-800"
      aria-label="Exporter le graphique en PNG"
    >
      <Camera className="size-4" /> Export PNG
    </button>
  );
}


