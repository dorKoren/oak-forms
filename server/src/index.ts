import { createApp } from "./app";
import { seedSampleForm } from "./seed";
import { store } from "./store";

const PORT = process.env.PORT ?? 3001;

if (process.env.NODE_ENV !== "test") {
  seedSampleForm();
}

const app = createApp(store);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

export { app };
