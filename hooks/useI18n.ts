"use client";

import { useUIStore } from "@/lib/store";

export function useI18n() {
  const lang = useUIStore((s) => s.language ?? "fr");
  const msg = (fr: string, en: string) => (lang === "fr" ? fr : en);
  return { lang, msg };
}


