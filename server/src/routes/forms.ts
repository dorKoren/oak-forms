import {
  createFormInputSchema,
  formSchema,
  updateFormInputSchema,
} from "@oak-forms/shared";
import { Router } from "express";
import type { InMemoryStore } from "../store";

export function createFormsRouter(store: InMemoryStore): Router {
  const router = Router();

  router.get("/", (_req, res) => {
    res.json(store.listForms());
  });

  router.post("/", (req, res) => {
    const parsed = createFormInputSchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const form = store.createForm(parsed.data);
    res.status(201).json(form);
  });

  router.get("/:id", (req, res) => {
    const form = store.getForm(req.params.id);
    if (!form) {
      res.status(404).json({ error: "Form not found" });
      return;
    }
    res.json(form);
  });

  router.put("/:id", (req, res) => {
    const parsed = updateFormInputSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const updated = store.updateForm(req.params.id, parsed.data);
    if (!updated) {
      res.status(404).json({ error: "Form not found" });
      return;
    }
    const check = formSchema.safeParse(updated);
    if (!check.success) {
      res.status(400).json({ error: check.error.flatten() });
      return;
    }
    res.json(updated);
  });

  router.delete("/:id", (req, res) => {
    const deleted = store.deleteForm(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Form not found" });
      return;
    }
    res.status(204).send();
  });

  return router;
}
