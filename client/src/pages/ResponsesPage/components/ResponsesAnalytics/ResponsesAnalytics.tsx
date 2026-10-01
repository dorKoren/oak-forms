import { Progress } from "@/components/ui/progress";
import type { Form, Submission } from "@oak-forms/shared";
import { formatSubmissionDateTime } from "../../ResponsesPage.utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  buildResponseSummary,
  buildQuestionAnalytics,
  type ChoiceQuestionAnalytics,
  type NumberQuestionAnalytics,
  type RatingQuestionAnalytics,
} from "../../ResponsesPage.analytics";

type ResponsesAnalyticsProps = {
  form: Form;
  submissions: Submission[];
};

function SummaryKpis({ submissions }: { submissions: Submission[] }) {
  const { total, latestSubmittedAt } = buildResponseSummary(submissions);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="shadow-none">
        <CardHeader className="pb-2">
          <CardDescription>Total responses</CardDescription>
          <CardTitle className="text-3xl font-normal tabular-nums">{total}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="shadow-none">
        <CardHeader className="pb-2">
          <CardDescription>Latest response</CardDescription>
          <CardTitle className="text-lg font-normal">
            {latestSubmittedAt ? formatSubmissionDateTime(latestSubmittedAt) : "—"}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

function RatingCard({ item }: { item: RatingQuestionAnalytics }) {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <CardDescription>Average rating</CardDescription>
        <CardTitle className="text-base font-medium">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-2xl tabular-nums">
          {item.average.toFixed(1)}
          <span className="text-base text-muted-foreground"> / {item.max}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Based on {item.count} response{item.count === 1 ? "" : "s"}
        </p>
      </CardContent>
    </Card>
  );
}

function NumberCard({ item }: { item: NumberQuestionAnalytics }) {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <CardDescription>Number summary</CardDescription>
        <CardTitle className="text-base font-medium">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>
          Average: <span className="font-medium tabular-nums">{item.average.toFixed(2)}</span>
        </p>
        <p className="text-muted-foreground">
          Min {item.min} · Max {item.max} · {item.count} response{item.count === 1 ? "" : "s"}
        </p>
      </CardContent>
    </Card>
  );
}

function ChoiceCard({ item }: { item: ChoiceQuestionAnalytics }) {
  return (
    <Card className="shadow-none sm:col-span-2">
      <CardHeader className="pb-2">
        <CardDescription>Answer distribution</CardDescription>
        <CardTitle className="text-base font-medium">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
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
        <p className="text-sm text-muted-foreground">
          {item.count} response{item.count === 1 ? "" : "s"}
        </p>
      </CardContent>
    </Card>
  );
}

export default function ResponsesAnalytics({ form, submissions }: ResponsesAnalyticsProps) {
  const questionAnalytics = buildQuestionAnalytics(form, submissions);

  return (
    <section className="flex flex-col gap-6" aria-labelledby="responses-analytics-heading">
      <h2 id="responses-analytics-heading" className="text-lg font-medium">
        Summary
      </h2>
      <SummaryKpis submissions={submissions} />
      {questionAnalytics.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {questionAnalytics.map((item) => {
            switch (item.kind) {
              case "rating":
                return <RatingCard key={item.questionId} item={item} />;
              case "number":
                return <NumberCard key={item.questionId} item={item} />;
              case "choice":
                return <ChoiceCard key={item.questionId} item={item} />;
              default:
                return null;
            }
          })}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          This form has no rating, number, or choice questions with answers to summarize yet.
        </p>
      )}
    </section>
  );
}
