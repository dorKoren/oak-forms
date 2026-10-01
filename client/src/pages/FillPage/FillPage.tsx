import { isApiNotFound } from "@/api";
import { ViewTransition } from "react";
import { Link } from "react-router-dom";
import { useFillPage } from "./FillPage.hooks";
import { Button } from "@/components/ui/button";
import { ClipboardListIcon } from "lucide-react";
import { isFormPublished } from "@oak-forms/shared";
import { FillPageShell } from "./components/FillPageShell";
import { FillFormHeader } from "./components/FillFormHeader";
import { FillQuestionsForm } from "./components/FillQuestionsForm";
import { FillSubmittedView } from "./components/FillSubmittedView";
import {
  LoadErrorCard,
  PageEmptyState,
  FormNotFoundState,
  PageLoadingSkeleton,
} from "@/components/feedback";

export default function FillPage() {
  const { formId, form, isLoading, isError, error, submitted, control, onSubmit, isSubmitting } =
    useFillPage();

  if (!formId) {
    return (
      <FillPageShell>
        <PageEmptyState
          icon={<ClipboardListIcon />}
          title="Invalid form link"
          description="Use the share link from the form builder or pick a form from home."
        >
          <Button variant="outline" nativeButton={false} render={<Link to="/" />}>
            Back to home
          </Button>
        </PageEmptyState>
      </FillPageShell>
    );
  }

  if (isError) {
    if (isApiNotFound(error)) {
      return <FormNotFoundState />;
    }
    return (
      <FillPageShell>
        <LoadErrorCard
          error={error}
          title="Could not load form"
          className="max-w-none shadow-none"
        />
      </FillPageShell>
    );
  }

  if (isLoading || !form) {
    return (
      <FillPageShell gap="6">
        <PageLoadingSkeleton variant="fill" bare />
      </FillPageShell>
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
