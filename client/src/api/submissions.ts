import {
  type CreateSubmissionInput,
  type Submission,
  createSubmissionInputSchema,
  submissionSchema,
} from "@oak-forms/shared";
import { z } from "zod";
import { apiRequest } from "./client";

const submissionListSchema = z.array(submissionSchema);

export async function listSubmissions(formId: string): Promise<Submission[]> {
  const data = await apiRequest<unknown>(
    `/api/forms/${encodeURIComponent(formId)}/submissions`,
  );
  return submissionListSchema.parse(data);
}

export async function createSubmission(
  formId: string,
  input: CreateSubmissionInput,
): Promise<Submission> {
  const body = createSubmissionInputSchema.parse(input);
  const data = await apiRequest<unknown>(
    `/api/forms/${encodeURIComponent(formId)}/submissions`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  );
  return submissionSchema.parse(data);
}

export async function deleteSubmission(
  formId: string,
  submissionId: string,
): Promise<void> {
  await apiRequest<void>(
    `/api/forms/${encodeURIComponent(formId)}/submissions/${encodeURIComponent(submissionId)}`,
    { method: "DELETE" },
  );
}
