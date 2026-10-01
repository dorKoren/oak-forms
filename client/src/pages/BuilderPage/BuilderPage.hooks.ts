import { useParams } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import { isFormPublished } from "@oak-forms/shared";
import { useEffect, useRef, useState } from "react";
import type { Form, QuestionType } from "@oak-forms/shared";
import { useFormQuery, useUpdateFormMutation } from "@/api";
import {
  addQuestion,
  moveQuestion,
  removeQuestion,
  updateQuestion,
  changeQuestionType,
  questionHasOptions,
} from "./BuilderPage.utils";

function formContentKey(form: Pick<Form, "title" | "questions">): string {
  return JSON.stringify({ title: form.title, questions: form.questions });
}

export function useBuilderPage() {
  const { id: formId = "" } = useParams<{ id: string }>();
  const { data, isPending, isError, error } = useFormQuery(formId);
  const updateForm = useUpdateFormMutation(formId);
  const [draft, setDraft] = useState<Form | null>(null);
  const hydrated = useRef(false);
  const savedContentKey = useRef<string | null>(null);

  // Route changed: drop the previous form’s draft so we re-hydrate from the new query result.
  useEffect(() => {
    hydrated.current = false;
    savedContentKey.current = null;
    setDraft(null);
  }, [formId]);

  // First fetch for this formId: seed local draft and the baseline used for dirty detection.
  useEffect(() => {
    if (data && !hydrated.current) {
      setDraft(data);
      savedContentKey.current = formContentKey(data);
      hydrated.current = true;
    }
  }, [data]);

  const isDirty =
    draft !== null &&
    savedContentKey.current !== null &&
    formContentKey(draft) !== savedContentKey.current;

  const hasQuestions = (draft?.questions.length ?? 0) > 0;
  const canShare = draft !== null && isFormPublished(draft) && !isDirty && hasQuestions;

  const saveForm = () => {
    if (!draft || !formId || draft.questions.length === 0) return;

    updateForm.mutate(
      {
        title: draft.title,
        questions: draft.questions,
        status: "published",
      },
      {
        onSuccess: (saved) => {
          savedContentKey.current = formContentKey(saved);
          setDraft(saved);
          toast.add({ title: "Form saved", type: "success" });
        },
        onError: () => {
          toast.add({
            title: "Could not save",
            description: "Your changes may not have been saved.",
            type: "error",
          });
        },
      },
    );
  };

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
    if (!canShare) return;
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
    isDirty,
    canShare,
    isLoading: isPending,
    isSaving: updateForm.isPending,
    saveForm,
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
