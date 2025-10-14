"use client";

import { useEffect } from "react";
import { useUIStore } from "@/lib/store";

export default function useScrollSpy(ids: string[], offset = 120) {
  const setActive = useUIStore((s) => s.setActiveSection);

  useEffect(() => {
    const handler = () => {
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom >= offset) {
          current = id;
          break;
        }
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids.join("|"), offset, setActive]);
}


