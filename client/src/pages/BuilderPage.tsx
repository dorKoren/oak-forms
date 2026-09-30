import { useParams } from "react-router-dom";

export function BuilderPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl">Form builder</h1>
      <p className="text-muted-foreground mt-2">Form ID: {id} (coming in S8)</p>
    </div>
  );
}
