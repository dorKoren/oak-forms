import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type BuilderHeaderProps = {
  title: string;
  formId: string;
  isSaving: boolean;
  onCopyShareLink: () => void;
  onTitleChange: (title: string) => void;
};

export default function BuilderHeader({
  formId,
  title,
  isSaving,
  onTitleChange,
  onCopyShareLink,
}: BuilderHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-border pb-8">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          ← Home
        </Link>

        <span aria-hidden="true">·</span>

        <Link to={`/forms/${formId}/responses`} className="hover:text-foreground">
          Responses
        </Link>

        {isSaving ? <span className="ml-auto">Saving…</span> : null}
      </div>

      <Input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="h-auto min-h-0 border-0 bg-transparent px-0 py-0 text-3xl leading-tight tracking-tight shadow-none focus-visible:border-transparent focus-visible:ring-0 font-[family-name:var(--font-headline)] font-normal md:text-3xl"
        aria-label="Form title"
      />

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={onCopyShareLink}>
          Copy share link
        </Button>

        <Button
          type="button"
          variant="ghost"
          nativeButton={false}
          render={<Link to={`/forms/${formId}`} target="_blank" rel="noreferrer" />}
        >
          Preview fill
        </Button>
      </div>
    </header>
  );
}
