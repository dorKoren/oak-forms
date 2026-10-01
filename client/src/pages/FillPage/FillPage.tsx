import { useFillPage } from "./FillPage.hooks";
import { isFormPublished } from "@oak-forms/shared";
import { FillPageShell } from "./components/FillPageShell";
import { FillFormHeader } from "./components/FillFormHeader";
import { FillEmptyState } from "./components/FillEmptyState";
import { FillQuestionsForm } from "./components/FillQuestionsForm";
import { FillSubmittedView } from "./components/FillSubmittedView";
import { LoadErrorCard, PageLoadingSkeleton, PageStatus } from "@/components/feedback";

export default function FillPage() {
  const { formId, form, isLoading, isError, error, submitted, control, onSubmit, isSubmitting } =
    useFillPage();

  if (!formId) return <PageStatus>Missing form id.</PageStatus>;

  if (isLoading || !form) return <PageLoadingSkeleton variant="fill" className="max-w-3xl" />;

  if (isError) {
    return (
      <LoadErrorCard
        error={error}
        title="Could not load form"
        className="mx-auto mt-12 max-w-3xl"
      />
    );
  }

  if (submitted) return <FillSubmittedView formTitle={form.title} />;

  if (!isFormPublished(form)) {
    return (
      <FillPageShell>
        <FillEmptyState
          title="Form not available"
          description="This form is still a draft. The owner needs to save it in the builder before you can respond."
        />
      </FillPageShell>
    );
  }

  return (
    <FillPageShell>
      <FillFormHeader title={form.title} questionCount={form.questions.length} />

      {form.questions.length === 0 ? (
        <FillEmptyState
          title="No questions yet"
          description="The form owner needs to add questions in the builder before you can submit answers."
        />
      ) : (
        <FillQuestionsForm
          control={control}
          onSubmit={onSubmit}
          questions={form.questions}
          isSubmitting={isSubmitting}
        />
      )}
    </FillPageShell>
  );
}
