import { useFillPage } from "./FillPage.hooks";
import { Button } from "@/components/ui/button";
import { LoadErrorCard, PageStatus } from "@/components/feedback";
import { FillFormHeader } from "./components/FillFormHeader";
import { FillPageShell } from "./components/FillPageShell";
import { FillQuestionField } from "./components/FillQuestionField";
import { FillSubmittedView } from "./components/FillSubmittedView";

export default function FillPage() {
  const { formId, form, isLoading, isError, error, submitted, control, onSubmit, isSubmitting } =
    useFillPage();

  if (!formId) {
    return <PageStatus>Missing form id.</PageStatus>;
  }

  if (isLoading || !form) {
    return <PageStatus>Loading form…</PageStatus>;
  }

  if (isError) {
    return (
      <LoadErrorCard
        error={error}
        title="Could not load form"
        className="mx-auto mt-12 max-w-3xl"
      />
    );
  }

  if (submitted) {
    return <FillSubmittedView formTitle={form.title} />;
  }

  return (
    <FillPageShell>
      <FillFormHeader title={form.title} questionCount={form.questions.length} />

      {form.questions.length === 0 ? (
        <p className="text-muted-foreground">
          The form owner needs to add questions in the builder.
        </p>
      ) : (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
          {form.questions.map((question) => (
            <FillQuestionField key={question.id} question={question} control={control} />
          ))}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting…" : "Submit"}
          </Button>
        </form>
      )}
    </FillPageShell>
  );
}
