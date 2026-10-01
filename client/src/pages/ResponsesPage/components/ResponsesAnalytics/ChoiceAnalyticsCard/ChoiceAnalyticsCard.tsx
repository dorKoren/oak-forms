import { MetricCard } from "../MetricCard";
import { Progress } from "@/components/ui/progress";
import { formatResponseCount } from "../../../ResponsesPage.utils";
import type { ChoiceQuestionAnalytics } from "../../../ResponsesPage.analytics";

type ChoiceAnalyticsCardProps = {
  item: ChoiceQuestionAnalytics;
};

export default function ChoiceAnalyticsCard({ item }: ChoiceAnalyticsCardProps) {
  return (
    <MetricCard
      label="Answer distribution"
      title={item.title}
      titleClassName="text-base font-medium"
      className="sm:col-span-2"
    >
      <div className="space-y-3">
        {item.options.map((option) => (
          <div key={option.label} className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="truncate">{option.label}</span>
              <span className="shrink-0 tabular-nums text-muted-foreground">
                {option.count} ({option.percent}%)
              </span>
            </div>
            <Progress
              value={option.percent}
              className="w-full [&_[data-slot=progress-track]]:h-2"
            />
          </div>
        ))}
        <p className="text-sm text-muted-foreground">{formatResponseCount(item.count)}</p>
      </div>
    </MetricCard>
  );
}
