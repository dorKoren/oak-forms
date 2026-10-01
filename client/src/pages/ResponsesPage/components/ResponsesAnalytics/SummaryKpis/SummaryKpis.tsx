import { MetricCard } from "../MetricCard";
import type { Submission } from "@oak-forms/shared";
import { buildResponseSummary } from "../../../ResponsesPage.analytics";
import { formatSubmissionDateTime } from "../../../ResponsesPage.utils";

type SummaryKpisProps = {
  submissions: Submission[];
};

export default function SummaryKpis({ submissions }: SummaryKpisProps) {
  const { total, latestSubmittedAt } = buildResponseSummary(submissions);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <MetricCard
        label="Total responses"
        title={total}
        titleClassName="text-3xl font-normal tabular-nums"
      />
      <MetricCard
        label="Latest response"
        title={latestSubmittedAt ? formatSubmissionDateTime(latestSubmittedAt) : "—"}
        titleClassName="text-lg font-normal"
      />
    </div>
  );
}
