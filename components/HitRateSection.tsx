import HitRateCard from "./HitRateCard";
import { computeModelHitRate, computeDailyConsistency, computeCycle3RepeatProbability, computeCycleRepeatHitRate, robustnessAcrossThresholds, halvingContext } from "@/lib/chartData";
import { useMemo } from "react";
import ConsistencySparkline from "./ConsistencySparkline";

export default function HitRateSection() {
  const hr = computeModelHitRate();
  const daily = useMemo(() => computeDailyConsistency(), []);
  const prob = useMemo(() => computeCycle3RepeatProbability(), []);
  const repeat = useMemo(() => computeCycleRepeatHitRate(), []);
  const robust = useMemo(() => robustnessAcrossThresholds(), []);
  const halv = useMemo(() => halvingContext(), []);
  return (
    <section className="flex flex-col gap-3">
      <HitRateCard />
      <div className="card p-4">
        <h4 className="font-semibold mb-2">Détails</h4>
        <ul className="text-sm list-disc list-inside text-slate-300/90 space-y-1">
          <li>Cycles considérés: {hr.cycles} (historiques)</li>
          <li>Critère d&apos;accord: erreur ≤ 2% de la durée attendue (bull 1064 / bear 364)</li>
          <li>Hits bull: {hr.bullDurationHits}/{hr.cycles} • erreur moyenne {hr.bullAvgErrorDays}j</li>
          <li>Hits bear: {hr.bearDurationHits}/{hr.cycles} • erreur moyenne {hr.bearAvgErrorDays}j</li>
          <li>Note: le cycle en cours n&apos;est pas pris en compte dans ce calcul.</li>
        </ul>
      </div>
      <div className="card p-4">
        <h4 className="font-semibold mb-2">Consistance jour par jour (Cycle 3 vs cycles 1&2)</h4>
        <p className="text-sm text-slate-300/90">Cumul: {daily.cumulative}% d&apos;accord sur {daily.daySinceBottom} jours.</p>
        <ConsistencySparkline />
      </div>
      <div className="card p-4">
        <h4 className="font-semibold mb-2">Probabilité de répétition (aujourd&apos;hui)</h4>
        <ul className="text-sm list-disc list-inside text-slate-300/90 space-y-1">
          <li>Accord de phase aujourd&apos;hui: {prob.phaseAgreementPctToday}%</li>
          <li>Probabilité que la baisse survive jusqu&apos;à aujourd&apos;hui: {prob.bearSurvivalProb}%</li>
          <li>Probabilité de creux à ~364j (±2%): {prob.bottomByTargetProb}%</li>
        </ul>
      </div>
      <div className="card p-4">
        <h4 className="font-semibold mb-2">Hit rate global (égaler cycles précédents)</h4>
        <p className="text-sm text-slate-300/90">
          Tolérance: ±{Math.round(repeat.tolPct * 100)}%. Bull (C3) = {repeat.bullFixed ? "ok" : "hors tolérance"};
          probabilité que la baisse respecte ~364j: {Math.round(repeat.bearPredictive * 100)}%.
        </p>
        <p className="text-sm text-slate-300/90 mt-1">Probabilité conjointe (bull déjà fixé × bear prédictive):
          <span className="ml-1 font-semibold">{Math.round(repeat.jointProb * 100)}%</span>
        </p>
        <p className="text-xs text-slate-400 mt-1">Réf.: {repeat.context.refs} cycles, hits bull: {repeat.context.bullHitsRef}, hits bear: {repeat.context.bearHitsRef}.</p>
      </div>
      <div className="card p-4">
        <h4 className="font-semibold mb-2">Méthodologie & Rationnels</h4>
        <ul className="text-sm list-disc list-inside text-slate-300/90 space-y-1">
          <li>
            <span className="font-medium">Seuil ±2%:</span> marge opérationnelle pour les écarts de calendrier (jours ouvrés/UTC),
            cohérente avec des variations historiques mineures autour de 1064/364.
          </li>
          <li>
            <span className="font-medium">Hit bull/bear (durées):</span> on compare les durées observées des cycles
            passés à 1064/364 et on comptabilise un hit si l&apos;écart en jours est ≤ 2%.
          </li>
          <li>
            <span className="font-medium">Consistance quotidienne:</span> pour chaque jour t depuis le creux, on vérifie si le
            cycle 3 est dans la même phase (bull/bear) que la majorité des cycles de référence; la courbe
            reflète ce taux d&apos;accord au fil des jours.
          </li>
          <li>
            <span className="font-medium">Survie bear:</span> si aujourd&apos;hui est en phase bear, on évalue la proportion de cycles
            historiques dont la phase bear a duré au moins aussi longtemps (jours depuis le top), ce qui
            fournit une intuition de probabilité conditionnelle.
          </li>
          <li>
            <span className="font-medium">Creux cible 364j:</span> probabilité que la durée bear historique soit dans [364±2%],
            ce qui cadre une fenêtre temporelle plausible pour le creux si le schéma se répète.
          </li>
          <li>
            <span className="font-medium">Limites:</span> faible taille d&apos;échantillon (n=2 réf.), non‑indépendance potentielle des cycles,
            absence d&apos;événements exogènes majeurs dans le modèle, corrélation ≠ causalité.
          </li>
          <li>
            <span className="font-medium">Améliorations possibles:</span> bande de confiance par bootstrap sur les durées, test
            de robustesse avec seuils ±1%/±3%, et intégration d&apos;indices macro (liquidité, halving).
          </li>
        </ul>
      </div>
      <div className="card p-4">
        <h4 className="font-semibold mb-2">Robustesse (±1% / ±2% / ±3%)</h4>
        <ul className="text-sm list-disc list-inside text-slate-300/90 space-y-1">
          {robust.map((r) => (
            <li key={r.tolPct}>±{Math.round(r.tolPct * 100)}% → prob. conjointe (moyenne bootstrap): {Math.round(r.bootstrap.mean * 100)}% [CI95%: {Math.round(r.bootstrap.ci95[0] * 100)}%–{Math.round(r.bootstrap.ci95[1] * 100)}%]</li>
          ))}
        </ul>
      </div>
      <div className="card p-4">
        <h4 className="font-semibold mb-2">Contexte halving</h4>
        <p className="text-sm text-slate-300/90">Dernier: {halv.lastHalving.toISOString().slice(0,10)} • Prochain (approx): {halv.nextHalvingApprox.toISOString().slice(0,10)}</p>
        <p className="text-xs text-slate-400">Jours depuis: {halv.daysSince} • Jours jusqu&apos;au prochain (approx): {halv.daysToNextApprox}</p>
      </div>
    </section>
  );
}


