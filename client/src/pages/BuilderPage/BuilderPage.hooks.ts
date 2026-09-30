import { useParams } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import { useEffect, useRef, useState } from "react";
import type { Form, QuestionType } from "@oak-forms/shared";
import { useFormQuery, useUpdateFormMutation } from "@/api";
import { useDebounce } from "@/hooks/useDebounce";
import {
  addQuestion,
  moveQuestion,
  removeQuestion,
  updateQuestion,
  changeQuestionType,
  questionHasOptions,
} from "./BuilderPage.utils";

const SAVE_DEBOUNCE_MS = 600;

export function useBuilderPage() {
  const { id: formId = "" } = useParams<{ id: string }>();
  const { data, isPending, isError, error } = useFormQuery(formId);
  const updateForm = useUpdateFormMutation(formId);
  const [draft, setDraft] = useState<Form | null>(null);
  const debouncedDraft = useDebounce(draft, SAVE_DEBOUNCE_MS);
  const hydrated = useRef(false);

  useEffect(() => {
    hydrated.current = false;
    setDraft(null);
  }, [formId]);

  useEffect(() => {
    if (data && !hydrated.current) {
      setDraft(data);
      hydrated.current = true;
    }
  }, [data]);

  useEffect(() => {
    if (!debouncedDraft || !formId || !hydrated.current) return;
    if (debouncedDraft.id !== formId) return;

    updateForm.mutate(
      { title: debouncedDraft.title, questions: debouncedDraft.questions },
      {
        onError: () => {
          toast.add({
            title: "Could not save",
            description: "Your changes may not have been saved.",
            type: "error",
          });
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- save when debounced draft settles; mutate is stable
  }, [debouncedDraft, formId]);

  const setTitle = (title: string) => {
    setDraft((prev) => (prev ? { ...prev, title } : prev));
  };

  const addQuestionOfType = (type: QuestionType) => {
    setDraft((prev) => (prev ? { ...prev, questions: addQuestion(prev.questions, type) } : prev));
  };

  const removeQuestionById = (questionId: string) => {
    setDraft((prev) =>
      prev ? { ...prev, questions: removeQuestion(prev.questions, questionId) } : prev,
    );
  };

  const moveQuestionById = (questionId: string, direction: "up" | "down") => {
    setDraft((prev) =>
      prev ? { ...prev, questions: moveQuestion(prev.questions, questionId, direction) } : prev,
    );
  };

  const setQuestionTitle = (questionId: string, title: string) => {
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            questions: updateQuestion(prev.questions, questionId, (q) => ({
              ...q,
              title,
            })),
          }
        : prev,
    );
  };

  const setQuestionRequired = (questionId: string, required: boolean) => {
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            questions: updateQuestion(prev.questions, questionId, (q) => ({
              ...q,
              required,
            })),
          }
        : prev,
    );
  };

  const setQuestionType = (questionId: string, type: QuestionType) => {
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            questions: updateQuestion(prev.questions, questionId, (q) =>
              changeQuestionType(q, type),
            ),
          }
        : prev,
    );
  };

  const setQuestionRatingMax = (questionId: string, max: number) => {
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            questions: updateQuestion(prev.questions, questionId, (q) =>
              q.type === "rating" ? { ...q, max } : q,
            ),
          }
        : prev,
    );
  };

  const setOptionLabel = (questionId: string, optionId: string, label: string) => {
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            questions: updateQuestion(prev.questions, questionId, (q) => {
              if (!questionHasOptions(q)) return q;
              return {
                ...q,
                options: q.options.map((opt) => (opt.id === optionId ? { ...opt, label } : opt)),
              };
            }),
          }
        : prev,
    );
  };

  const addOption = (questionId: string) => {
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            questions: updateQuestion(prev.questions, questionId, (q) => {
              if (!questionHasOptions(q)) return q;
              const optionId = crypto.randomUUID();
              return {
                ...q,
                options: [...q.options, { id: optionId, label: "New option" }],
              };
            }),
          }
        : prev,
    );
  };

  const removeOption = (questionId: string, optionId: string) => {
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            questions: updateQuestion(prev.questions, questionId, (q) => {
              if (!questionHasOptions(q) || q.options.length <= 1) return q;
              return {
                ...q,
                options: q.options.filter((opt) => opt.id !== optionId),
              };
            }),
          }
        : prev,
    );
  };

  const copyShareLink = async () => {
    const url = `${window.location.origin}/forms/${formId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.add({ title: "Link copied", type: "success" });
    } catch {
      toast.add({ title: "Could not copy link", type: "error" });
    }
  };

  return {
    draft,
    error,
    formId,
    isError,
    isLoading: isPending,
    isSaving: updateForm.isPending,
    setTitle,
    addOption,
    removeOption,
    copyShareLink,
    setOptionLabel,
    setQuestionType,
    moveQuestionById,
    setQuestionTitle,
    addQuestionOfType,
    removeQuestionById,
    setQuestionRequired,
    setQuestionRatingMax,
  };
}
