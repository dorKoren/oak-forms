import { useFillPage } from "./FillPage.hooks";
import { Button } from "@/components/ui/button";
import { ClipboardListIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { isFormPublished } from "@oak-forms/shared";
import { FillPageShell } from "./components/FillPageShell";
import { FillFormHeader } from "./components/FillFormHeader";
import { FillQuestionField } from "./components/FillQuestionField";
import { FillSubmittedView } from "./components/FillSubmittedView";
import { LoadErrorCard, PageLoadingSkeleton, PageStatus } from "@/components/feedback";
import {
  Empty,
  EmptyMedia,
  EmptyTitle,
  EmptyHeader,
  EmptyDescription,
} from "@/components/ui/empty";

export default function FillPage() {
  const { formId, form, isLoading, isError, error, submitted, control, onSubmit, isSubmitting } =
    useFillPage();

  if (!formId) {
    return <PageStatus>Missing form id.</PageStatus>;
  }

  if (isLoading || !form) {
    return <PageLoadingSkeleton variant="fill" className="max-w-3xl" />;
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

  if (!isFormPublished(form)) {
    return (
      <FillPageShell>
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ClipboardListIcon />
            </EmptyMedia>
            <EmptyTitle>Form not available</EmptyTitle>
            <EmptyDescription>
              This form is still a draft. The owner needs to save it in the builder before you can
              respond.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </FillPageShell>
    );
  }

  return (
    <FillPageShell>
      <FillFormHeader title={form.title} questionCount={form.questions.length} />

      {form.questions.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ClipboardListIcon />
            </EmptyMedia>
            <EmptyTitle>No questions yet</EmptyTitle>
            <EmptyDescription>
              The form owner needs to add questions in the builder before you can submit answers.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
          {form.questions.map((question) => (
            <FillQuestionField key={question.id} question={question} control={control} />
          ))}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner data-icon="inline-start" className="size-3.5" />
                Submitting…
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      )}
    </FillPageShell>
  );
}
