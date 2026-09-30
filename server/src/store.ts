import {
  createEmptyForm,
  type CreateFormInput,
  type CreateSubmissionInput,
  type Form,
  type Submission,
  type UpdateFormInput,
} from "@oak-forms/shared";
import { randomUUID } from "node:crypto";

export type FormListItem = Form & { submissionCount: number };

export class InMemoryStore {
  private forms = new Map<string, Form>();
  private submissions = new Map<string, Submission>();

  reset(): void {
    this.forms.clear();
    this.submissions.clear();
  }

  listForms(): FormListItem[] {
    return [...this.forms.values()].map((form) => ({
      ...form,
      submissionCount: this.countSubmissionsForForm(form.id),
    }));
  }

  getForm(id: string): Form | undefined {
    return this.forms.get(id);
  }

  createForm(input: CreateFormInput = {}): Form {
    const id = randomUUID();
    const form = createEmptyForm(id, input.title ?? "Untitled form");
    this.forms.set(id, form);
    return form;
  }

  updateForm(id: string, input: UpdateFormInput): Form | undefined {
    const existing = this.forms.get(id);
    if (!existing) return undefined;
    const updated: Form = {
      ...existing,
      title: input.title ?? existing.title,
      questions: input.questions ?? existing.questions,
      updatedAt: new Date().toISOString(),
    };
    this.forms.set(id, updated);
    return updated;
  }

  deleteForm(id: string): boolean {
    const deleted = this.forms.delete(id);
    if (deleted) {
      for (const [subId, sub] of this.submissions) {
        if (sub.formId === id) this.submissions.delete(subId);
      }
    }
    return deleted;
  }

  listSubmissions(formId: string): Submission[] {
    return [...this.submissions.values()]
      .filter((s) => s.formId === formId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  createSubmission(formId: string, input: CreateSubmissionInput): Submission | undefined {
    if (!this.forms.has(formId)) return undefined;
    const submission: Submission = {
      id: randomUUID(),
      formId,
      answers: input.answers,
      createdAt: new Date().toISOString(),
    };
    this.submissions.set(submission.id, submission);
    return submission;
  }

  deleteSubmission(id: string): boolean {
    return this.submissions.delete(id);
  }

  private countSubmissionsForForm(formId: string): number {
    return [...this.submissions.values()].filter((s) => s.formId === formId).length;
  }
}

export const store = new InMemoryStore();
