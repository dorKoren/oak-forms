import { MetricCard } from "../MetricCard";
import { formatResponseCount } from "../../../ResponsesPage.utils";
import type { RatingQuestionAnalytics } from "../../../ResponsesPage.analytics";

type RatingAnalyticsCardProps = {
  item: RatingQuestionAnalytics;
};

export default function RatingAnalyticsCard({ item }: RatingAnalyticsCardProps) {
  return (
    <MetricCard label="Average rating" title={item.title} titleClassName="text-base font-medium">
      <div className="space-y-1">
        <p className="text-2xl tabular-nums">
          {item.average.toFixed(1)}
          <span className="text-base text-muted-foreground"> / {item.max}</span>
        </p>
        <p className="text-sm text-muted-foreground">Based on {formatResponseCount(item.count)}</p>
      </div>
    </MetricCard>
  );
}
