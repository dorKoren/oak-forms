import type { AnswerValue, Form, Question, Submission } from "@oak-forms/shared";

export type RatingQuestionAnalytics = {
  kind: "rating";
  questionId: string;
  title: string;
  average: number;
  max: number;
  count: number;
};

export type NumberQuestionAnalytics = {
  kind: "number";
  questionId: string;
  title: string;
  average: number;
  min: number;
  max: number;
  count: number;
};

export type ChoiceOptionStat = {
  label: string;
  count: number;
  percent: number;
};

export type ChoiceQuestionAnalytics = {
  kind: "choice";
  questionId: string;
  title: string;
  options: ChoiceOptionStat[];
  count: number;
};

export type QuestionAnalytics =
  | RatingQuestionAnalytics
  | NumberQuestionAnalytics
  | ChoiceQuestionAnalytics;

function valuesForQuestion(submissions: Submission[], questionId: string): AnswerValue[] {
  return submissions
    .map((s) => s.answers[questionId])
    .filter((value): value is AnswerValue => value !== undefined && value !== "");
}

function analyticsForQuestion(
  question: Question,
  submissions: Submission[],
): QuestionAnalytics | null {
  const values = valuesForQuestion(submissions, question.id);
  const count = values.length;

  if (count === 0) {
    return null;
  }

  switch (question.type) {
    case "rating": {
      const numbers = values.map((v) => Number(v)).filter((n) => !Number.isNaN(n));
      if (numbers.length === 0) {
        return null;
      }
      const sum = numbers.reduce((acc, n) => acc + n, 0);
      return {
        kind: "rating",
        questionId: question.id,
        title: question.title,
        average: sum / numbers.length,
        max: question.max ?? 5,
        count: numbers.length,
      };
    }
    case "number": {
      const numbers = values.map((v) => Number(v)).filter((n) => !Number.isNaN(n));
      if (numbers.length === 0) {
        return null;
      }
      const sum = numbers.reduce((acc, n) => acc + n, 0);
      return {
        kind: "number",
        questionId: question.id,
        title: question.title,
        average: sum / numbers.length,
        min: Math.min(...numbers),
        max: Math.max(...numbers),
        count: numbers.length,
      };
    }
    case "select":
    case "multi_select":
    case "checkboxes": {
      const optionCounts = new Map<string, number>();
      for (const option of question.options) {
        optionCounts.set(option.id, 0);
      }

      for (const value of values) {
        if (Array.isArray(value)) {
          for (const optionId of value) {
            optionCounts.set(optionId, (optionCounts.get(optionId) ?? 0) + 1);
          }
        } else {
          const optionId = String(value);
          optionCounts.set(optionId, (optionCounts.get(optionId) ?? 0) + 1);
        }
      }

      const options: ChoiceOptionStat[] = question.options.map((option) => {
        const optionCount = optionCounts.get(option.id) ?? 0;
        return {
          label: option.label,
          count: optionCount,
          percent: count === 0 ? 0 : Math.round((optionCount / count) * 100),
        };
      });

      return {
        kind: "choice",
        questionId: question.id,
        title: question.title,
        options,
        count,
      };
    }
    default:
      return null;
  }
}

export function buildQuestionAnalytics(
  form: Form,
  submissions: Submission[],
): QuestionAnalytics[] {
  if (submissions.length === 0) {
    return [];
  }

  return form.questions
    .map((question) => analyticsForQuestion(question, submissions))
    .filter((item): item is QuestionAnalytics => item !== null);
}

export function buildResponseSummary(submissions: Submission[]) {
  const total = submissions.length;
  const latest =
    total === 0
      ? null
      : submissions.reduce((latestSoFar, submission) =>
          new Date(submission.createdAt) > new Date(latestSoFar.createdAt)
            ? submission
            : latestSoFar,
        );

  return {
    total,
    latestSubmittedAt: latest?.createdAt ?? null,
  };
}
