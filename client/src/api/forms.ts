import {
  type CreateFormInput,
  type Form,
  type UpdateFormInput,
  createFormInputSchema,
  formSchema,
  updateFormInputSchema,
} from "@oak-forms/shared";
import { z } from "zod";
import { apiRequest } from "./client";

const formListItemSchema = formSchema.extend({
  submissionCount: z.number().int().nonnegative(),
});

const formListSchema = z.array(formListItemSchema);

export type FormListItem = z.infer<typeof formListItemSchema>;

export async function listForms(): Promise<FormListItem[]> {
  const data = await apiRequest<unknown>("/api/forms");
  return formListSchema.parse(data);
}

export async function getForm(id: string): Promise<Form> {
  const data = await apiRequest<unknown>(`/api/forms/${encodeURIComponent(id)}`);
  return formSchema.parse(data);
}

export async function createForm(input: CreateFormInput = {}): Promise<Form> {
  const body = createFormInputSchema.parse(input);
  const data = await apiRequest<unknown>("/api/forms", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return formSchema.parse(data);
}

export async function updateForm(
  id: string,
  input: UpdateFormInput,
): Promise<Form> {
  const body = updateFormInputSchema.parse(input);
  const data = await apiRequest<unknown>(
    `/api/forms/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(body),
    },
  );
  return formSchema.parse(data);
}

export async function deleteForm(id: string): Promise<void> {
  await apiRequest<void>(`/api/forms/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
