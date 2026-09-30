import { z } from "zod";
import { optionSchema } from "./option";
import { QUESTION_TYPES } from "./questionTypes";

const questionBaseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  required: z.boolean(),
});

const shortTextQuestionSchema = questionBaseSchema.extend({
  type: z.literal("short_text"),
});

const paragraphQuestionSchema = questionBaseSchema.extend({
  type: z.literal("paragraph"),
});

const numberQuestionSchema = questionBaseSchema.extend({
  type: z.literal("number"),
});

const dateQuestionSchema = questionBaseSchema.extend({
  type: z.literal("date"),
});

const selectQuestionSchema = questionBaseSchema.extend({
  type: z.literal("select"),
  options: z.array(optionSchema).min(1),
});

const multiSelectQuestionSchema = questionBaseSchema.extend({
  type: z.literal("multi_select"),
  options: z.array(optionSchema).min(1),
});

const checkboxesQuestionSchema = questionBaseSchema.extend({
  type: z.literal("checkboxes"),
  options: z.array(optionSchema).min(1),
});

const ratingQuestionSchema = questionBaseSchema.extend({
  type: z.literal("rating"),
  max: z.number().int().min(1).max(10).default(5),
});

export const questionSchema = z.discriminatedUnion("type", [
  shortTextQuestionSchema,
  paragraphQuestionSchema,
  numberQuestionSchema,
  dateQuestionSchema,
  selectQuestionSchema,
  multiSelectQuestionSchema,
  checkboxesQuestionSchema,
  ratingQuestionSchema,
]);

export type Question = z.infer<typeof questionSchema>;

export const questionTypeSchema = z.enum(QUESTION_TYPES);

export function createDefaultQuestion(type: Question["type"], id: string): Question {
  const base = { id, title: "Untitled question", required: false };
  switch (type) {
    case "short_text":
      return { ...base, type: "short_text" };
    case "paragraph":
      return { ...base, type: "paragraph" };
    case "number":
      return { ...base, type: "number" };
    case "date":
      return { ...base, type: "date" };
    case "select":
    case "multi_select":
    case "checkboxes":
      return {
        ...base,
        type,
        options: [
          { id: `${id}-opt-1`, label: "Option 1" },
          { id: `${id}-opt-2`, label: "Option 2" },
        ],
      };
    case "rating":
      return { ...base, type: "rating", max: 5 };
    default:
      return { ...base, type: "short_text" };
  }
}
