"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="w-full text-center py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-200 text-xs md:text-sm mb-4">
          <span className="size-2 rounded-full bg-blue-400 animate-pulse" />
          Modèle prédictif Bitcoin
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-hero-gradient bg-clip-text text-transparent animate-gradient">
          Cycles Bitcoin 1064/364
        </h1>
        <p className="mt-4 text-slate-300/90 text-base md:text-lg">
          Analyse des cycles historiques, projections du cycle en cours et insights
          macro basés sur la psychologie de marché, la liquidité et le halving.
        </p>
      </motion.div>
    </section>
  );
}

export default Hero;


