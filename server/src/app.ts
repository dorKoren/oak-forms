import cors from "cors";
import express from "express";
import { createFormsRouter } from "./routes/forms";
import { createSubmissionsRouter } from "./routes/submissions";
import type { InMemoryStore } from "./store";

export function createApp(store: InMemoryStore) {
  const app = express();
  app.use(cors({ origin: "http://localhost:5173" }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/forms", createFormsRouter(store));
  app.use("/api/forms/:formId/submissions", createSubmissionsRouter(store));

  return app;
}
