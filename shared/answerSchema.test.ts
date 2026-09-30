import { describe, expect, it } from "vitest";
import { buildAnswerSchema } from "./src/answerSchema";
import type { Form } from "./src/form";

const baseForm = (questions: Form["questions"]): Form => ({
  id: "form-1",
  title: "Test",
  questions,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

describe("buildAnswerSchema", () => {
  it("requires non-empty short text when required", () => {
    const form = baseForm([
      { id: "q1", type: "short_text", title: "Name", required: true },
    ]);
    const schema = buildAnswerSchema(form);
    expect(schema.safeParse({ q1: "" }).success).toBe(false);
    expect(schema.safeParse({ q1: "Ada" }).success).toBe(true);
  });

  it("allows omitting optional fields", () => {
    const form = baseForm([
      { id: "q1", type: "short_text", title: "Name", required: false },
    ]);
    const schema = buildAnswerSchema(form);
    expect(schema.safeParse({}).success).toBe(true);
  });

  it("coerces number answers", () => {
    const form = baseForm([
      { id: "q1", type: "number", title: "Age", required: true },
    ]);
    const schema = buildAnswerSchema(form);
    const result = schema.safeParse({ q1: "42" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.q1).toBe(42);
    }
  });

  it("requires at least one checkbox when required", () => {
    const form = baseForm([
      {
        id: "q1",
        type: "checkboxes",
        title: "Pick",
        required: true,
        options: [
          { id: "a", label: "A" },
          { id: "b", label: "B" },
        ],
      },
    ]);
    const schema = buildAnswerSchema(form);
    expect(schema.safeParse({ q1: [] }).success).toBe(false);
    expect(schema.safeParse({ q1: ["a"] }).success).toBe(true);
  });

  it("enforces rating bounds", () => {
    const form = baseForm([
      { id: "q1", type: "rating", title: "Rate", required: true, max: 5 },
    ]);
    const schema = buildAnswerSchema(form);
    expect(schema.safeParse({ q1: 0 }).success).toBe(false);
    expect(schema.safeParse({ q1: 6 }).success).toBe(false);
    expect(schema.safeParse({ q1: 4 }).success).toBe(true);
  });

  it("accepts ISO date strings for date fields", () => {
    const form = baseForm([
      { id: "q1", type: "date", title: "When", required: true },
    ]);
    const schema = buildAnswerSchema(form);
    expect(schema.safeParse({ q1: "2025-10-01" }).success).toBe(true);
  });
});
