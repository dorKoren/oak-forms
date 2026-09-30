import { useParams } from "react-router-dom";

export function ResponsesPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl">Responses</h1>
      <p className="text-muted-foreground mt-2">Form ID: {id} (coming in S10)</p>
    </div>
  );
}
