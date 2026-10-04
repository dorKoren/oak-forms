import type { Form } from "@oak-forms/shared";
import { describe, expect, it } from "vitest";
import { buildResponsesCsv } from "./ResponsesPage.export";

const form: Form = {
  id: "f1",
  title: "Feedback",
  status: "published",
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
  questions: [
    { id: "q1", type: "short_text", title: "Name", required: false },
    {
      id: "q2",
      type: "select",
      title: "Choice",
      required: false,
      options: [{ id: "opt-a", label: "Yes, please" }],
    },
  ],
};

describe("buildResponsesCsv", () => {
  it("builds headers and rows with escaped values", () => {
    const csv = buildResponsesCsv(form, [
      {
        id: "s1",
        formId: "f1",
        createdAt: "2025-01-02T12:00:00.000Z",
        answers: { q1: 'Say "hi"', q2: "opt-a" },
      },
    ]);

    expect(csv.startsWith("\uFEFF")).toBe(true);
    const lines = csv.slice(1).split("\r\n");
    expect(lines[0]).toBe("Submitted,Name,Choice");
    expect(lines[1]).toBe('2025-01-02T12:00:00.000Z,"Say ""hi""","Yes, please"');
  });

  it("leaves missing answers empty", () => {
    const csv = buildResponsesCsv(form, [
      {
        id: "s1",
        formId: "f1",
        createdAt: "2025-01-02T12:00:00.000Z",
        answers: {},
      },
    ]);

    const lines = csv.slice(1).split("\r\n");
    expect(lines[1]).toBe("2025-01-02T12:00:00.000Z,,");
  });
});
