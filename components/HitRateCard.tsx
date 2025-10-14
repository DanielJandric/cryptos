import { computeModelHitRate } from "@/lib/chartData";

export default function HitRateCard() {
  const hr = computeModelHitRate();
  return (
    <div className="card p-4 border-emerald-500/30">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">Hit rate du modèle (durées)</p>
          <p className="text-2xl font-bold text-emerald-300">{hr.overallPct}%</p>
        </div>
        <div className="text-right text-sm">
          <p>Bull hits: <span className="font-semibold">{hr.bullDurationHits}/{hr.cycles}</span></p>
          <p>Bear hits: <span className="font-semibold">{hr.bearDurationHits}/{hr.cycles}</span></p>
        </div>
      </div>
      <div className="mt-2 text-xs text-slate-400">
        <p>Erreur moyenne Bull: {hr.bullAvgErrorDays} j • Bear: {hr.bearAvgErrorDays} j</p>
        <p>Critère: ±2% d&apos;écart toléré par phase (1064/364).</p>
      </div>
    </div>
  );
}


