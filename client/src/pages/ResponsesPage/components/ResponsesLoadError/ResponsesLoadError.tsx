import { LoadErrorCard } from "@/components/feedback";

type ResponsesLoadErrorProps = {
  error: unknown;
};

export default function ResponsesLoadError({ error }: ResponsesLoadErrorProps) {
  return (
    <LoadErrorCard
      title="Could not load responses"
      error={error}
      className="mx-auto mt-12 max-w-5xl"
    />
  );
}
