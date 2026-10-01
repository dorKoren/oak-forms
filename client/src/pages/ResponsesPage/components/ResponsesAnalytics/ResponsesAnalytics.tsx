import { SummaryKpis } from "./SummaryKpis";
import type { Form, Submission } from "@oak-forms/shared";
import { RatingAnalyticsCard } from "./RatingAnalyticsCard";
import { NumberAnalyticsCard } from "./NumberAnalyticsCard";
import { ChoiceAnalyticsCard } from "./ChoiceAnalyticsCard";
import { buildQuestionAnalytics } from "../../ResponsesPage.analytics";

type ResponsesAnalyticsProps = {
  form: Form;
  submissions: Submission[];
};

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
                return <RatingAnalyticsCard key={item.questionId} item={item} />;
              case "number":
                return <NumberAnalyticsCard key={item.questionId} item={item} />;
              case "choice":
                return <ChoiceAnalyticsCard key={item.questionId} item={item} />;
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
