import { LoadErrorCard } from "@/components/feedback";

type BuilderLoadErrorProps = {
  error: unknown;
};

export default function BuilderLoadError({ error }: BuilderLoadErrorProps) {
  return (
    <LoadErrorCard
      title="Could not load form"
      error={error}
      className="mx-auto mt-12 max-w-3xl"
    />
  );
}
