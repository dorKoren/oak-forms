import { createDefaultQuestion, type Question, type QuestionType } from "@oak-forms/shared";

export function moveQuestion(
  questions: Question[],
  questionId: string,
  direction: "up" | "down",
): Question[] {
  const index = questions.findIndex((q) => q.id === questionId);
  if (index < 0) return questions;
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= questions.length) return questions;
  const next = [...questions];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function updateQuestion(
  questions: Question[],
  questionId: string,
  updater: (question: Question) => Question,
): Question[] {
  return questions.map((q) => (q.id === questionId ? updater(q) : q));
}

export function changeQuestionType(question: Question, type: QuestionType): Question {
  const defaults = createDefaultQuestion(type, question.id);
  return { ...defaults, title: question.title, required: question.required };
}

export function addQuestion(questions: Question[], type: QuestionType): Question[] {
  const id = crypto.randomUUID();
  return [...questions, createDefaultQuestion(type, id)];
}

export function removeQuestion(questions: Question[], questionId: string): Question[] {
  return questions.filter((q) => q.id !== questionId);
}

export function questionHasOptions(
  question: Question,
): question is Question & { options: { id: string; label: string }[] } {
  return (
    question.type === "select" ||
    question.type === "radio" ||
    question.type === "multi_select" ||
    question.type === "checkboxes"
  );
}
