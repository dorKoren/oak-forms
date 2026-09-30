import { Link } from "react-router-dom";

type ResponsesHeaderProps = {
  formId: string;
  title: string;
  responseCount: number;
};

export default function ResponsesHeader({ formId, title, responseCount }: ResponsesHeaderProps) {
  return (
    <header className="space-y-4 border-b border-border pb-8">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          ← Home
        </Link>
        <span aria-hidden="true">·</span>
        <Link to={`/forms/${formId}/edit`} className="hover:text-foreground">
          Edit form
        </Link>
        <span aria-hidden="true">·</span>
        <Link to={`/forms/${formId}`} className="hover:text-foreground">
          Fill form
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl leading-tight">{title}</h1>
        <p className="text-muted-foreground">
          {responseCount} response{responseCount === 1 ? "" : "s"}
        </p>
      </div>
    </header>
  );
}
