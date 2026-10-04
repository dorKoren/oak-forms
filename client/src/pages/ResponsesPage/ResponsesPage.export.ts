import type { Form, Submission } from "@oak-forms/shared";
import { formatAnswerForDisplay } from "./ResponsesPage.utils";

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

function answerCellForCsv(
  form: Form,
  submission: Submission,
  questionId: string,
): string {
  const question = form.questions.find((q) => q.id === questionId);
  const display = formatAnswerForDisplay(question, submission.answers[questionId]);
  return display === "—" ? "" : display;
}

export function buildResponsesCsv(form: Form, submissions: Submission[]): string {
  const header = ["Submitted", ...form.questions.map((q) => q.title)].map(escapeCsvCell).join(",");

  const rows = submissions.map((submission) => {
    const cells = [
      submission.createdAt,
      ...form.questions.map((question) => answerCellForCsv(form, submission, question.id)),
    ];
    return cells.map(escapeCsvCell).join(",");
  });

  return `\uFEFF${[header, ...rows].join("\r\n")}`;
}

function sanitizeFilename(title: string): string {
  const trimmed = title.trim() || "form";
  const safe = trimmed.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  return safe.slice(0, 80) || "form";
}

function waitForNextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

export async function downloadResponsesCsv(form: Form, submissions: Submission[]) {
  await waitForNextFrame();

  const csv = buildResponsesCsv(form, submissions);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${sanitizeFilename(form.title)}-responses.csv`;
  link.click();
  URL.revokeObjectURL(url);

  await waitForNextFrame();
}
