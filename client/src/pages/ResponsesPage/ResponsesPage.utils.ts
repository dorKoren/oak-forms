import type { AnswerValue, Form, Question, Submission } from "@oak-forms/shared";

export function formatResponseCount(count: number) {
  return `${count} response${count === 1 ? "" : "s"}`;
}

export function formatSubmissionDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function questionById(form: Form, questionId: string): Question | undefined {
  return form.questions.find((q) => q.id === questionId);
}

export function formatAnswerForDisplay(
  question: Question | undefined,
  value: AnswerValue | undefined,
): string {
  if (value === undefined || value === "") {
    return "—";
  }

  if (Array.isArray(value)) {
    if (!question || !("options" in question)) {
      return value.join(", ");
    }
    return value
      .map((id) => question.options.find((o) => o.id === id)?.label ?? id)
      .join(", ");
  }

  if (
    question &&
    "options" in question &&
    (question.type === "select" || question.type === "radio")
  ) {
    return question.options.find((o) => o.id === value)?.label ?? String(value);
  }

  if (question?.type === "rating") {
    return `${value} / ${question.max ?? 5}`;
  }

  return String(value);
}

export function sortSubmissionsNewestFirst(submissions: Submission[]) {
  return [...submissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
