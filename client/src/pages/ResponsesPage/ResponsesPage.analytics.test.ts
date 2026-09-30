import { describe, expect, it } from "vitest";
import { buildQuestionAnalytics, buildResponseSummary } from "./ResponsesPage.analytics";
import type { Form } from "@oak-forms/shared";

const form: Form = {
  id: "f1",
  title: "Survey",
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
  questions: [
    { id: "q-rating", type: "rating", title: "Score", required: false, max: 5 },
    {
      id: "q-select",
      type: "select",
      title: "Pick one",
      required: false,
      options: [
        { id: "a", label: "Alpha" },
        { id: "b", label: "Beta" },
      ],
    },
  ],
};

describe("buildQuestionAnalytics", () => {
  it("computes rating average and choice distribution", () => {
    const analytics = buildQuestionAnalytics(form, [
      {
        id: "s1",
        formId: "f1",
        createdAt: "2025-01-02T10:00:00.000Z",
        answers: { "q-rating": 4, "q-select": "a" },
      },
      {
        id: "s2",
        formId: "f1",
        createdAt: "2025-01-03T10:00:00.000Z",
        answers: { "q-rating": 2, "q-select": "b" },
      },
    ]);

    expect(analytics).toHaveLength(2);

    const rating = analytics.find((a) => a.kind === "rating");
    expect(rating).toMatchObject({ average: 3, max: 5, count: 2 });

    const choice = analytics.find((a) => a.kind === "choice");
    expect(choice?.options).toEqual([
      { label: "Alpha", count: 1, percent: 50 },
      { label: "Beta", count: 1, percent: 50 },
    ]);
  });
});

describe("buildResponseSummary", () => {
  it("returns total and latest submission timestamp", () => {
    const summary = buildResponseSummary([
      {
        id: "s1",
        formId: "f1",
        createdAt: "2025-01-02T10:00:00.000Z",
        answers: {},
      },
      {
        id: "s2",
        formId: "f1",
        createdAt: "2025-01-05T10:00:00.000Z",
        answers: {},
      },
    ]);

    expect(summary.total).toBe(2);
    expect(summary.latestSubmittedAt).toBe("2025-01-05T10:00:00.000Z");
  });
});
