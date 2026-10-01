export const QUESTION_TYPES = [
  "short_text",
  "paragraph",
  "number",
  "date",
  "select",
  "radio",
  "multi_select",
  "checkboxes",
  "rating",
] as const;

export type QuestionType = (typeof QUESTION_TYPES)[number];

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  short_text: "Short Text",
  paragraph: "Paragraph",
  number: "Number",
  date: "Date",
  select: "Select",
  radio: "Radio buttons",
  multi_select: "Multi-select",
  checkboxes: "Checkboxes",
  rating: "Rating",
};
