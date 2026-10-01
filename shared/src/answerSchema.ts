import { z } from "zod";
import type { Form } from "./form";
import type { Question } from "./question";

function schemaForQuestion(question: Question): z.ZodTypeAny {
  switch (question.type) {
    case "short_text":
    case "paragraph":
    case "date":
    case "select":
    case "radio": {
      const base = z.string();
      return question.required ? base.min(1, "Required") : base.optional();
    }
    case "number": {
      const base = z.coerce.number({ invalid_type_error: "Enter a number" });
      return question.required ? base : base.optional();
    }
    case "multi_select":
    case "checkboxes": {
      const base = z.array(z.string());
      if (question.required) {
        return base.min(1, "Select at least one option");
      }
      return base.optional();
    }
    case "rating": {
      const max = question.max ?? 5;
      const base = z.coerce
        .number()
        .int()
        .min(1, "Select a rating")
        .max(max, `Rating must be at most ${max}`);
      return question.required ? base : base.optional();
    }
    default:
      return z.unknown();
  }
}

export function buildAnswerSchema(form: Form) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const question of form.questions) {
    shape[question.id] = schemaForQuestion(question);
  }
  return z.object(shape);
}

export type FormAnswers = z.infer<ReturnType<typeof buildAnswerSchema>>;
