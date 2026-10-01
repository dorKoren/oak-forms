import { MetricCard } from "../MetricCard";
import { formatResponseCount } from "../../../ResponsesPage.utils";
import type { NumberQuestionAnalytics } from "../../../ResponsesPage.analytics";

type NumberAnalyticsCardProps = {
  item: NumberQuestionAnalytics;
};

export default function NumberAnalyticsCard({ item }: NumberAnalyticsCardProps) {
  return (
    <MetricCard label="Number summary" title={item.title} titleClassName="text-base font-medium">
      <div className="space-y-2 text-sm">
        <p>
          Average: <span className="font-medium tabular-nums">{item.average.toFixed(2)}</span>
        </p>
        <p className="text-muted-foreground">
          Min {item.min} · Max {item.max} · {formatResponseCount(item.count)}
        </p>
      </div>
    </MetricCard>
  );
}
