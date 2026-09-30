export const queryKeys = {
  forms: {
    all: ["forms"] as const,
    detail: (id: string) => ["forms", id] as const,
  },
  submissions: {
    list: (formId: string) => ["forms", formId, "submissions"] as const,
  },
};
