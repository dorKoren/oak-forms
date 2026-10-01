import type { Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Question } from "@oak-forms/shared";
import type { ComponentPropsWithoutRef } from "react";
import { FillQuestionField } from "../FillQuestionField";

type FillQuestionsFormProps = {
  questions: Question[];
  control: Control<Record<string, unknown>>;
  isSubmitting: boolean;
  onSubmit: NonNullable<ComponentPropsWithoutRef<"form">["onSubmit"]>;
};

export default function FillQuestionsForm({
  questions,
  control,
  isSubmitting,
  onSubmit,
}: FillQuestionsFormProps) {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
      {questions.map((question) => (
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
  );
}
