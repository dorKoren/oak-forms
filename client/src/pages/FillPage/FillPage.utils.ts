import type { Form } from "@oak-forms/shared";

export function buildDefaultAnswers(form: Form): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const question of form.questions) {
    switch (question.type) {
      case "checkboxes":
      case "multi_select":
        values[question.id] = [];
        break;
      case "number":
      case "rating":
        values[question.id] = undefined;
        break;
      default:
        values[question.id] = "";
    }
  }
  return values;
}
