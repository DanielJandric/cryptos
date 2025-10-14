"use client";

import { useEffect } from "react";
import { useUIStore } from "@/lib/store";

export default function LanguageInit() {
  const setLang = useUIStore((s) => s.toggleLanguage);
  const lang = useUIStore((s) => s.language ?? "fr");
  useEffect(() => {
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
      if (saved && (saved === "fr" || saved === "en") && saved !== lang) {
        // flip until we match saved
        setLang && setLang();
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);
  return null;
}


