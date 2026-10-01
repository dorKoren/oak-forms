import { createApp } from "./app";
import { store } from "./store";

const PORT = process.env.PORT ?? 3001;

const app = createApp(store);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

export { app };
