import { ViewTransition } from "react";
import { useFillPage } from "./FillPage.hooks";
import { ClipboardListIcon } from "lucide-react";
import { isFormPublished } from "@oak-forms/shared";
import { FillPageShell } from "./components/FillPageShell";
import { FillFormHeader } from "./components/FillFormHeader";
import { FillQuestionsForm } from "./components/FillQuestionsForm";
import { FillSubmittedView } from "./components/FillSubmittedView";
import {
  PageStatus,
  LoadErrorCard,
  PageEmptyState,
  PageLoadingSkeleton,
} from "@/components/feedback";

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

  if (!isFormPublished(form)) {
    return (
      <FillPageShell>
        <PageEmptyState
          icon={<ClipboardListIcon />}
          title="Form not available"
          description="This form is still a draft. The owner needs to save it in the builder before you can respond."
        />
      </FillPageShell>
    );
  }

  return (
    <FillPageShell>
      {submitted ? (
        <ViewTransition enter="vt-fade" exit="vt-fade" default="none">
          <FillSubmittedView formTitle={form.title} />
        </ViewTransition>
      ) : (
        <ViewTransition enter="vt-fade" exit="vt-fade" default="none">
          <div className="flex flex-col gap-6">
            <FillFormHeader title={form.title} questionCount={form.questions.length} />

            {form.questions.length === 0 ? (
              <PageEmptyState
                icon={<ClipboardListIcon />}
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
          </div>
        </ViewTransition>
      )}
    </FillPageShell>
  );
}
