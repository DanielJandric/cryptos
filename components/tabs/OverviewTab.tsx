import HitRateCard from "@/components/HitRateCard";
import CorrelationCard from "@/components/CorrelationCard";
import Countdown from "@/components/Countdown";
import ChartTLDR from "@/components/ChartTLDR";

export default function OverviewTab() {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6">
      <ChartTLDR />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <HitRateCard />
        <CorrelationCard />
      </div>
      <Countdown />
    </div>
  );
}
