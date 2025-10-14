import type { BtcHistory, BtcSpot } from "@/types";

// Chargement côté serveur de fichiers JSON statiques dans public/data
export async function loadBtcHistory(): Promise<BtcHistory | null> {
  try {
    const res = await fetch("/data/btc-history.json", { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as BtcHistory;
  } catch {
    return null;
  }
}

export async function loadBtcSpot(): Promise<BtcSpot | null> {
  try {
    const res = await fetch("/data/spot.json", { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as BtcSpot;
  } catch {
    return null;
  }
}


