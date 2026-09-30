import { z } from "zod";

export const answerValueSchema = z.union([
  z.string(),
  z.number(),
  z.array(z.string()),
]);

export type AnswerValue = z.infer<typeof answerValueSchema>;

export const submissionSchema = z.object({
  id: z.string().min(1),
  formId: z.string().min(1),
  answers: z.record(z.string(), answerValueSchema),
  createdAt: z.string().datetime(),
});

export type Submission = z.infer<typeof submissionSchema>;

export const createSubmissionInputSchema = z.object({
  answers: z.record(z.string(), answerValueSchema),
});

export type CreateSubmissionInput = z.infer<typeof createSubmissionInputSchema>;
