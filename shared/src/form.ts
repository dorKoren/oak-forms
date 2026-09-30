import { z } from "zod";
import { questionSchema } from "./question";

export const formSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  questions: z.array(questionSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Form = z.infer<typeof formSchema>;

export const createFormInputSchema = z.object({
  title: z.string().min(1).optional(),
});

export const updateFormInputSchema = z.object({
  title: z.string().min(1).optional(),
  questions: z.array(questionSchema).optional(),
});

export type CreateFormInput = z.infer<typeof createFormInputSchema>;
export type UpdateFormInput = z.infer<typeof updateFormInputSchema>;

export function createEmptyForm(id: string, title = "Untitled form"): Form {
  const now = new Date().toISOString();
  return {
    id,
    title,
    questions: [],
    createdAt: now,
    updatedAt: now,
  };
}
