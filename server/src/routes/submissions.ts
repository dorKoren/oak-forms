import { buildAnswerSchema, createSubmissionInputSchema } from "@oak-forms/shared";
import { Router, type Request } from "express";
import type { InMemoryStore } from "../store";

type SubmissionRouteParams = {
  formId: string;
  submissionId?: string;
};

export function createSubmissionsRouter(store: InMemoryStore): Router {
  const router = Router({ mergeParams: true });

  router.get("/", (req: Request<SubmissionRouteParams>, res) => {
    const formId = req.params.formId;
    if (!store.getForm(formId)) {
      res.status(404).json({ error: "Form not found" });
      return;
    }
    res.json(store.listSubmissions(formId));
  });

  router.post("/", (req: Request<SubmissionRouteParams>, res) => {
    const formId = req.params.formId;
    const form = store.getForm(formId);
    if (!form) {
      res.status(404).json({ error: "Form not found" });
      return;
    }

    const bodyParsed = createSubmissionInputSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({ error: bodyParsed.error.flatten() });
      return;
    }

    const answerSchema = buildAnswerSchema(form);
    const answersParsed = answerSchema.safeParse(bodyParsed.data.answers);
    if (!answersParsed.success) {
      res.status(400).json({ error: answersParsed.error.flatten() });
      return;
    }

    const submission = store.createSubmission(formId, {
      answers: answersParsed.data as Record<string, string | number | string[]>,
    });
    res.status(201).json(submission);
  });

  router.delete("/:submissionId", (req: Request<SubmissionRouteParams>, res) => {
    const formId = req.params.formId;
    const submissionId = req.params.submissionId;
    if (!submissionId) {
      res.status(400).json({ error: "Submission id required" });
      return;
    }
    const submission = store.listSubmissions(formId).find((s) => s.id === submissionId);
    if (!submission) {
      res.status(404).json({ error: "Submission not found" });
      return;
    }
    store.deleteSubmission(submissionId);
    res.status(204).send();
  });

  return router;
}
