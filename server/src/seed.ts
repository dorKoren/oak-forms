import { store } from "./store";

export function seedSampleForm(): void {
  const form = store.createForm({ title: "Client Creative Brief" });
  store.updateForm(form.id, {
    questions: [
      {
        id: "q-vision",
        type: "paragraph",
        title: "Describe your design vision and spatial objectives",
        required: true,
      },
      {
        id: "q-scope",
        type: "number",
        title: "Estimated project square footage / scope",
        required: true,
      },
      {
        id: "q-date",
        type: "date",
        title: "Deliverables needed",
        required: true,
      },
      {
        id: "q-priority",
        type: "rating",
        title: "Overall design priority level",
        required: true,
        max: 5,
      },
    ],
  });
}
