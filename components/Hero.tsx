"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero({
  badge = "Modèle prédictif Bitcoin",
  title = "Modèle prédictif 1064/364 Bitcoin",
  subtitle =
    "Analyse des cycles historiques, projections du cycle en cours et insights macro basés sur la psychologie de marché, la liquidité et le halving.",
}: {
  badge?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative w-full text-center py-12 md:py-16 overflow-hidden">
      {/* Translucent bitcoin background behind the hero (provide /public/images/bitcoin-bg.png) */}
      <div aria-hidden className="pointer-events-none select-none absolute inset-0 flex items-center justify-center">
        <Image
          src="/images/OIP.png"
          alt=""
          width={900}
          height={900}
          className="opacity-10 md:opacity-15 blur-[1px] mix-blend-screen"
          style={{
            maskImage: "radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0.0))",
            WebkitMaskImage: "radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0.0))",
          }}
          priority
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-200 text-sm md:text-base mb-3 md:mb-4">
          <span className="size-2 rounded-full bg-blue-400 animate-pulse" />
          {badge}
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight bg-hero-gradient bg-clip-text text-transparent animate-gradient">
          {title}
        </h1>
        <p className="mt-4 text-slate-300/90 text-base md:text-lg">{subtitle}</p>
      </motion.div>
    </section>
  );
}

export default Hero;


