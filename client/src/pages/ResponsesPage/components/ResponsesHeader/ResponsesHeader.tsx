import { Badge } from "@/components/ui/badge";
import { AppBreadcrumb } from "@/components/navigation/AppBreadcrumb";

type ResponsesHeaderProps = {
  formId: string;
  title: string;
  responseCount: number;
};

export default function ResponsesHeader({ formId, title, responseCount }: ResponsesHeaderProps) {
  return (
    <header className="space-y-4 border-b border-border pb-8">
      <AppBreadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Edit form", to: `/forms/${formId}/edit` },
          { label: "Responses" },
        ]}
      />

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl leading-tight">{title}</h1>
        <Badge variant="secondary" className="tabular-nums">
          {responseCount} response{responseCount === 1 ? "" : "s"}
        </Badge>
      </div>
    </header>
  );
}
