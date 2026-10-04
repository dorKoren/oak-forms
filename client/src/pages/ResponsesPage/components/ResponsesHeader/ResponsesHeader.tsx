import { Badge } from "@/components/ui/badge";
import type { Form, Submission } from "@oak-forms/shared";
import { AppBreadcrumb } from "@/components/navigation/AppBreadcrumb";
import { ExportResponsesCsvButton } from "./ExportResponsesCsvButton";

type ResponsesHeaderProps = {
  form: Form;
  title: string;
  formId: string;
  responseCount: number;
  submissions: Submission[];
};

export default function ResponsesHeader({
  form,
  title,
  formId,
  submissions,
  responseCount,
}: ResponsesHeaderProps) {
  return (
    <header className="space-y-4 border-b border-border pb-8">
      <AppBreadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Edit form", to: `/forms/${formId}/edit` },
          { label: "Responses" },
        ]}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl leading-tight">{title}</h1>
          <Badge variant="secondary" className="tabular-nums">
            {responseCount} response{responseCount === 1 ? "" : "s"}
          </Badge>
        </div>

        <ExportResponsesCsvButton form={form} submissions={submissions} />
      </div>
    </header>
  );
}
