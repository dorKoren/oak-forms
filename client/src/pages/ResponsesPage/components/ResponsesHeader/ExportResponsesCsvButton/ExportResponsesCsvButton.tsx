import { useState } from "react";
import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Form, Submission } from "@oak-forms/shared";
import { downloadResponsesCsv } from "../../../ResponsesPage.export";

type ExportResponsesCsvButtonProps = {
  form: Form;
  submissions: Submission[];
};

export default function ExportResponsesCsvButton({
  form,
  submissions,
}: ExportResponsesCsvButtonProps) {
  const [isExportingCsv, setIsExportingCsv] = useState(false);

  if (submissions.length === 0) {
    return null;
  }

  const handleExport = async () => {
    setIsExportingCsv(true);
    try {
      await downloadResponsesCsv(form, submissions);
    } finally {
      setIsExportingCsv(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isExportingCsv}
      onClick={() => void handleExport()}
    >
      {isExportingCsv ? (
        <>
          <Spinner data-icon="inline-start" className="size-3.5" />
          Exporting…
        </>
      ) : (
        <>
          <DownloadIcon data-icon="inline-start" />
          Export CSV
        </>
      )}
    </Button>
  );
}
