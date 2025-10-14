"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ChevronDown } from "lucide-react";

type AccordionKey = "principe" | "donnees" | "mecanismes" | "limites" | "details";

function Accordion({
  id,
  title,
  open,
  onToggle,
  children,
  accent,
}: {
  id: AccordionKey;
  title: string;
  open: boolean;
  onToggle: (id: AccordionKey) => void;
  children: React.ReactNode;
  accent?: "red" | "green" | "blue" | "amber";
}) {
  const borderColor =
    accent === "red"
      ? "border-rose-500/40"
      : accent === "green"
      ? "border-emerald-500/40"
      : accent === "amber"
      ? "border-amber-500/40"
      : "border-blue-500/30";
  return (
    <div className={`card p-0 overflow-hidden ${borderColor}`}>
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/40 transition-colors"
        onClick={() => onToggle(id)}
        aria-expanded={open}
        aria-controls={`${id}-content`}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-content`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-4 pt-1 text-sm text-slate-300/90">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TheorySection() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [open, setOpen] = useState<Record<AccordionKey, boolean>>({
    principe: false,
    donnees: false,
    mecanismes: false,
    limites: false,
    details: false,
  });

  const toggle = (id: AccordionKey) =>
    setOpen((s) => ({ ...s, [id]: !s[id] }));

  const expandAll = () => {
    if (!showAll) {
      setOpen({ principe: true, donnees: true, mecanismes: true, limites: true, details: true });
    } else {
      setOpen({ principe: false, donnees: false, mecanismes: false, limites: false, details: false });
    }
    setShowAll((v) => !v);
  };

  return (
    <section className="card p-5 md:p-6 bg-slate-900/60 border border-blue-500/30">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-blue-500/15 border border-blue-500/30">
          <GraduationCap className="size-6 text-blue-300" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold">LA THÉORIE DES CYCLES 1064/364</h2>
          <p className="mt-2 text-slate-300/90">
            Le modèle 1064/364 est une théorie d&apos;analyse technique du Bitcoin qui postule
            l&apos;existence de cycles temporels récurrents et prévisibles dans l&apos;évolution du prix.
            Selon ce modèle, le Bitcoin alterne des phases de hausse d&apos;environ
            <strong> 1064 jours</strong> et des phases de baisse d&apos;environ <strong>364 jours</strong>,
            pour un cycle complet proche de <strong>1428 jours</strong>.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={expandAll}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-blue-500/40 text-blue-200 hover:bg-blue-500/10 transition-colors"
            >
              {showAll ? "Réduire" : "En savoir plus"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <Accordion id="principe" title="🔢 Principe de base" open={open.principe} onToggle={toggle}>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-emerald-300">Phase haussière (~1064 jours)</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Du creux au sommet absolu</li>
                <li>Croissance exponentielle du prix</li>
                <li>Psychologie: euphorie progressive, FOMO</li>
                <li>Liquidité en hausse</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-rose-300">Phase baissière (~364 jours)</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Du sommet au prochain creux</li>
                <li>Correction marquée (70–84% de baisse)</li>
                <li>Psychologie: capitulation, peur, désintérêt</li>
                <li>Liquidité en baisse</li>
              </ul>
            </div>
          </div>
        </Accordion>

        <Accordion id="donnees" title="📊 Données historiques" open={open.donnees} onToggle={toggle}>
          <div className="space-y-2">
            <div>
              <p className="font-medium">Cycle 1 (2015–2018)</p>
              <ul className="list-disc list-inside">
                <li>Creux: 14 jan 2015 → <strong>$152</strong></li>
                <li>Sommet: 17 déc 2017 → <strong>$19,783</strong> (+13,000%)</li>
                <li>Durée hausse: <strong>1,068 jours</strong></li>
                <li>Creux suivant: 15 déc 2018 → <strong>$3,191</strong> (−84%)</li>
                <li>Durée baisse: <strong>363 jours</strong></li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Cycle 2 (2018–2022)</p>
              <ul className="list-disc list-inside">
                <li>Creux: 15 déc 2018 → <strong>$3,191</strong></li>
                <li>Sommet: 10 nov 2021 → <strong>$69,044</strong> (+2,063%)</li>
                <li>Durée hausse: <strong>1,061 jours</strong></li>
                <li>Creux suivant: 9 nov 2022 → <strong>$15,476</strong> (−78%)</li>
                <li>Durée baisse: <strong>364 jours</strong></li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Cycle 3 (2022–2026, en cours)</p>
              <ul className="list-disc list-inside">
                <li>Creux: 9 nov 2022 → <strong>$15,476</strong></li>
                <li>Sommet: 6 oct 2025 → <strong>$125,482</strong> (+711%)</li>
                <li>Durée hausse: <strong>1,062 jours</strong></li>
                <li>Creux projeté: 5 oct 2026 → <strong>~$35,000</strong> (−72% estimé)</li>
                <li>Durée baisse projetée: <strong>364 jours</strong></li>
              </ul>
            </div>
          </div>
        </Accordion>

        <Accordion id="mecanismes" title="⚙️ Mécanismes sous-jacents" open={open.mecanismes} onToggle={toggle}>
          <div className="space-y-3">
            <div>
              <p className="font-semibold">1. Halving Bitcoin</p>
              <ul className="list-disc list-inside">
                <li>Récompense des mineurs divisée par deux ~tous les 4 ans</li>
                <li>Réduction de l&apos;offre nouvelle → choc d&apos;offre</li>
                <li>Alignement temporel avec le cycle 1064/364</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">2. Psychologie de marché</p>
              <ul className="list-disc list-inside">
                <li>Accumulation → Phase publique → Euphorie → Capitulation → Ennui</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">3. Cycles de liquidité</p>
              <ul className="list-disc list-inside">
                <li>Montée du capital → Sommet (max liquidité) → Fuite → Creux</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">4. Modèles fractals</p>
              <ul className="list-disc list-inside">
                <li>Patterns auto-similaires, ratios (ex: φ ≈ 1.618)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Formules (croissance/décroissance exponentielle)</p>
              <pre className="whitespace-pre-wrap text-xs bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
Prix(t) = Prix_creux × (Prix_sommet / Prix_creux)^(t / 1064)
Prix(t) = Prix_sommet × (Prix_creux / Prix_sommet)^(t / 364)
              </pre>
            </div>
          </div>
        </Accordion>

        <Accordion id="limites" title="⚠️ Limites et critiques" open={open.limites} onToggle={toggle} accent="red">
          <div className="space-y-2">
            <ul className="list-disc list-inside space-y-1">
              <li>Échantillon statistique limité (3 cycles)</li>
              <li>Évolution constante du marché (acteurs, régulations, innovations)</li>
              <li>Paradoxe de l&apos;auto-réalisation</li>
              <li>Facteurs externes non pris en compte (régulations, cygnes noirs, etc.)</li>
              <li>Biais de confirmation et modèles concurrents</li>
            </ul>
          </div>
        </Accordion>

        <Accordion id="details" title="📖 Détails avancés (précision, implications, validité, conclusion)" open={open.details} onToggle={toggle}>
          <div className="space-y-3">
            <div>
              <p className="font-semibold">Précision du modèle</p>
              <ul className="list-disc list-inside">
                <li>Répétition du ratio 1064/364 sur 3 cycles (variance &lt; 1%)</li>
                <li>Sommet du 6 oct. 2025 anticipé au jour près</li>
                <li>Durées de phases cohérentes malgré l&apos;évolution du marché</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Implications pour les investisseurs</p>
              <ul className="list-disc list-inside">
                <li>Correction oct. 2025 → oct. 2026; creux ~5 oct. 2026 (~$35k ±20%)</li>
                <li>Prochain cycle haussier: dès Q4 2026; sommet possible fin 2028/début 2029</li>
                <li>Stratégies: DCA, accumulation vers les creux, prises de profits progressives</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Validité scientifique</p>
              <ul className="list-disc list-inside">
                <li className="text-emerald-300">Pour: cohérence, alignement halving, bases psychologiques</li>
                <li className="text-rose-300">Contre: échantillon réduit, causalité non prouvée, marché mouvant</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Conclusion</p>
              <p>
                Modèle utile pour cadrer et contextualiser; ne pas l&apos;ériger en vérité absolue.
                Ne remplace pas une stratégie diversifiée ni ne garantit des résultats futurs.
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Cette théorie est fournie à des fins éducatives; elle ne constitue pas un conseil
                financier. Faites toujours vos propres recherches (DYOR).
              </p>
            </div>
          </div>
        </Accordion>
      </div>
    </section>
  );
}


