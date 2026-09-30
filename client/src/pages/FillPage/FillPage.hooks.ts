import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildAnswerSchema } from "@oak-forms/shared";
import { buildDefaultAnswers } from "./FillPage.utils";
import { useCreateSubmissionMutation, useFormQuery } from "@/api";

export function useFillPage() {
  const [submitted, setSubmitted] = useState(false);
  const { id: formId = "" } = useParams<{ id: string }>();
  const createSubmission = useCreateSubmissionMutation(formId);
  const { data: form, isPending, isError, error } = useFormQuery(formId);

  const answerSchema = form ? buildAnswerSchema(form) : null;

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Record<string, unknown>>({
    resolver: answerSchema ? zodResolver(answerSchema) : undefined,
    defaultValues: {},
    mode: "onBlur",
  });

  useEffect(() => {
    if (form) {
      reset(buildDefaultAnswers(form));
      setSubmitted(false);
    }
  }, [form, reset]);

  const onSubmit = handleSubmit((answers) => {
    createSubmission.mutate(
      { answers: answers as Record<string, string | number | string[]> },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast.add({ title: "Response recorded", type: "success" });
        },
        onError: () => {
          toast.add({
            title: "Could not submit",
            description: "Please try again.",
            type: "error",
          });
        },
      },
    );
  });

  return {
    form,
    error,
    formId,
    isError,
    control,
    onSubmit,
    submitted,
    isLoading: isPending,
    isSubmitting: isSubmitting || createSubmission.isPending,
  };
}
