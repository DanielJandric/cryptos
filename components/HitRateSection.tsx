import HitRateCard from "./HitRateCard";
import { computeModelHitRate, computeDailyConsistency, computeCycle3RepeatProbability } from "@/lib/chartData";
import { useMemo } from "react";
import ConsistencySparkline from "./ConsistencySparkline";

export default function HitRateSection() {
  const hr = computeModelHitRate();
  const daily = useMemo(() => computeDailyConsistency(), []);
  const prob = useMemo(() => computeCycle3RepeatProbability(), []);
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
    </section>
  );
}


