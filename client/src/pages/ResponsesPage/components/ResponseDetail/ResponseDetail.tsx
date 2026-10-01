import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import type { Form, Submission } from "@oak-forms/shared";
import { formatAnswerForDisplay, formatSubmissionDateTime } from "../../ResponsesPage.utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

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

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger
            render={<Button type="button" variant="outline" size="sm" disabled={isDeleting} />}
          >
            Delete
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this response?</AlertDialogTitle>
              <AlertDialogDescription>
                This cannot be undone. The answers will be removed from your form results.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
              >
                {isDeleting ? (
                  <>
                    <Spinner data-icon="inline-start" className="size-3.5" />
                    Deleting…
                  </>
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4 pt-6">
        {detailRows.length === 0 ? (
          <p className="text-muted-foreground">No questions on this form.</p>
        ) : (
          detailRows.map(({ questionId, question }, index) => {
            const title = question?.title ?? questionId;
            const value = submission.answers[questionId];

            return (
              <div key={questionId} className="space-y-4">
                {index > 0 ? <Separator /> : null}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                    {formatAnswerForDisplay(question, value)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
