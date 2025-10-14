"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <a
      href="#top"
      className="fixed bottom-20 right-4 md:right-8 z-50 p-3 rounded-full bg-blue-600 text-white shadow-2xl hover:bg-blue-500 transition-colors"
      aria-label="Retour en haut"
    >
      <ArrowUp className="size-5" />
    </a>
  );
}


