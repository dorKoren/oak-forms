import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "./app";
import { InMemoryStore } from "./store";

describe("API", () => {
  let store: InMemoryStore;
  let app: ReturnType<typeof createApp>;

  beforeEach(() => {
    store = new InMemoryStore();
    app = createApp(store);
  });

  afterEach(() => {
    store.reset();
  });

  it("round-trips create form, submit, and list submissions", async () => {
    const createRes = await request(app)
      .post("/api/forms")
      .send({ title: "Survey" })
      .expect(201);

    const formId = createRes.body.id as string;

    await request(app)
      .put(`/api/forms/${formId}`)
      .send({
        questions: [
          { id: "q1", type: "short_text", title: "Name", required: true },
        ],
      })
      .expect(200);

    await request(app)
      .post(`/api/forms/${formId}/submissions`)
      .send({ answers: { q1: "Kanso Studio" } })
      .expect(201);

    const listRes = await request(app).get(`/api/forms/${formId}/submissions`).expect(200);

    expect(listRes.body).toHaveLength(1);
    expect(listRes.body[0].answers.q1).toBe("Kanso Studio");
  });

  it("returns 400 for invalid submission payload", async () => {
    const createRes = await request(app).post("/api/forms").send({}).expect(201);
    const formId = createRes.body.id as string;

    await request(app)
      .put(`/api/forms/${formId}`)
      .send({
        questions: [
          { id: "q1", type: "short_text", title: "Name", required: true },
        ],
      })
      .expect(200);

    await request(app)
      .post(`/api/forms/${formId}/submissions`)
      .send({ answers: { q1: "" } })
      .expect(400);
  });

  it("returns 400 for malformed create form body", async () => {
    await request(app).post("/api/forms").send({ title: "" }).expect(400);
  });
});
