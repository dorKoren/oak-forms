import type { Form, Submission } from "@oak-forms/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatAnswerForDisplay, formatSubmissionDateTime } from "../../ResponsesPage.utils";

type ResponsesTableProps = {
  form: Form;
  submissions: Submission[];
  selectedId: string | null;
  onSelect: (submissionId: string) => void;
};

export default function ResponsesTable({
  form,
  submissions,
  selectedId,
  onSelect,
}: ResponsesTableProps) {
  return (
    <div className="rounded-lg border border-border">
      <Table className="min-w-[32rem]">
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-12 text-muted-foreground">#</TableHead>
            <TableHead className="text-muted-foreground">Submitted</TableHead>
            {form.questions.map((question) => (
              <TableHead
                key={question.id}
                className="max-w-[12rem] truncate text-muted-foreground"
                title={question.title}
              >
                {question.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission, index) => {
            const isSelected = submission.id === selectedId;
            return (
              <TableRow
                key={submission.id}
                tabIndex={0}
                role="button"
                data-state={isSelected ? "selected" : undefined}
                aria-selected={isSelected}
                onClick={() => onSelect(submission.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(submission.id);
                  }
                }}
                className="cursor-pointer"
              >
                <TableCell className="text-muted-foreground">
                  {submissions.length - index}
                </TableCell>
                <TableCell>{formatSubmissionDateTime(submission.createdAt)}</TableCell>
                {form.questions.map((question) => (
                  <TableCell
                    key={question.id}
                    className="max-w-[12rem] truncate whitespace-nowrap"
                    title={formatAnswerForDisplay(question, submission.answers[question.id])}
                  >
                    {formatAnswerForDisplay(question, submission.answers[question.id])}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
