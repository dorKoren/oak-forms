import { z } from "zod";

export const optionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
});

export type Option = z.infer<typeof optionSchema>;
