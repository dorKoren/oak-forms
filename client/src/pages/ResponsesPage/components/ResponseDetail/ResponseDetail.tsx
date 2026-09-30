import { useEffect, useState } from "react";
import type { Form, Submission } from "@oak-forms/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatAnswerForDisplay, formatSubmissionDateTime } from "../../ResponsesPage.utils";

type ResponseDetailProps = {
  form: Form;
  submission: Submission;
  onDelete: (onClosed?: () => void) => void;
  isDeleting: boolean;
};

export default function ResponseDetail({
  form,
  submission,
  onDelete,
  isDeleting,
}: ResponseDetailProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    setDeleteOpen(false);
  }, [submission.id]);

  const detailRows = [
    ...form.questions.map((question) => ({ questionId: question.id, question })),
    ...Object.keys(submission.answers)
      .filter((id) => !form.questions.some((q) => q.id === id))
      .map((questionId) => ({ questionId, question: undefined })),
  ];

  const handleConfirmDelete = () => {
    onDelete(() => setDeleteOpen(false));
  };

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl">Response detail</CardTitle>
          <CardDescription>{formatSubmissionDateTime(submission.createdAt)}</CardDescription>
        </div>

        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger
            render={
              <Button type="button" variant="outline" size="sm" disabled={isDeleting} />
            }
          >
            Delete
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete this response?</DialogTitle>
              <DialogDescription>
                This cannot be undone. The answers will be removed from your form results.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button type="button" variant="outline" disabled={isDeleting} />}>
                Cancel
              </DialogClose>
              <Button
                type="button"
                variant="destructive"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="space-y-4">
        {detailRows.length === 0 ? (
          <p className="text-muted-foreground">No questions on this form.</p>
        ) : (
          detailRows.map(({ questionId, question }) => {
            const title = question?.title ?? questionId;
            const value = submission.answers[questionId];

            return (
              <div key={questionId} className="space-y-1 border-b border-border pb-4 last:border-0">
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                  {formatAnswerForDisplay(question, value)}
                </p>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
