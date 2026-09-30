import { Link } from "react-router-dom";

type ResponsesEmptyStateProps = {
  formId: string;
};

export default function ResponsesEmptyState({ formId }: ResponsesEmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-border px-6 py-12 text-center">
      <p className="text-lg text-foreground">No responses yet</p>

      <p className="mt-2 text-muted-foreground">
        Share the{" "}
        <Link to={`/forms/${formId}`} className="text-primary underline-offset-4 hover:underline">
          fill link
        </Link>{" "}
        to start collecting answers.
      </p>
    </div>
  );
}
