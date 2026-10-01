import { useState } from "react";
import { useDeleteFormMutation } from "@/api";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Link, useNavigate } from "react-router-dom";
import type { FormStatus } from "@oak-forms/shared";
import { isFormPublished } from "@oak-forms/shared";
import { AppBreadcrumb } from "@/components/navigation/AppBreadcrumb";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

type BuilderHeaderProps = {
  title: string;
  formId: string;
  isDirty: boolean;
  canShare: boolean;
  isSaving: boolean;
  status: FormStatus;
  hasQuestions: boolean;
  onSave: () => void;
  onCopyShareLink: () => void;
  onTitleChange: (title: string) => void;
};

export default function BuilderHeader({
  formId,
  title,
  status,
  isDirty,
  canShare,
  isSaving,
  hasQuestions,
  onSave,
  onTitleChange,
  onCopyShareLink,
}: BuilderHeaderProps) {
  const navigate = useNavigate();
  const deleteForm = useDeleteFormMutation();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const hasPendingSave = isDirty || !isFormPublished({ status });
  const canSave = hasPendingSave && hasQuestions;
  const shareDisabledReason = !hasQuestions
    ? "Add at least one question before you can save and share."
    : !isFormPublished({ status })
      ? "Save the form to publish and share a link."
      : isDirty
        ? "Save your changes before sharing."
        : null;

  const handleConfirmDelete = () => {
    deleteForm.mutate(formId, {
      onSuccess: () => {
        setDeleteOpen(false);
        navigate("/");
      },
    });
  };

  return (
    <header className="flex flex-col gap-4 border-b border-border pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <AppBreadcrumb items={[{ label: "Home", to: "/" }, { label: "Edit form" }]} />
        <Badge variant={isFormPublished({ status }) ? "secondary" : "outline"}>
          {isFormPublished({ status }) ? "Published" : "Draft"}
        </Badge>
        {isDirty ? (
          <Badge variant="outline" className="text-muted-foreground">
            Unsaved changes
          </Badge>
        ) : null}
      </div>

      <Input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="h-auto min-h-0 border-0 bg-transparent px-2 py-1 text-3xl leading-tight tracking-tight shadow-none focus-visible:border-transparent focus-visible:ring-0 font-[family-name:var(--font-headline)] font-normal md:text-3xl"
        aria-label="Form title"
      />

      <div className="flex flex-wrap gap-2">
        <Button type="button" disabled={!canSave || isSaving} onClick={onSave}>
          {isSaving ? (
            <>
              <Spinner data-icon="inline-start" className="size-3.5" />
              Saving…
            </>
          ) : (
            "Save"
          )}
        </Button>

        {shareDisabledReason ? (
          <Tooltip>
            <TooltipTrigger
              render={
                <span className="inline-flex cursor-not-allowed">
                  <Button type="button" variant="outline" disabled className="pointer-events-none">
                    Copy share link
                  </Button>
                </span>
              }
            />
            <TooltipContent>{shareDisabledReason}</TooltipContent>
          </Tooltip>
        ) : (
          <Button type="button" variant="outline" onClick={onCopyShareLink}>
            Copy share link
          </Button>
        )}

        {canShare ? (
          <Button
            type="button"
            variant="ghost"
            nativeButton={false}
            render={<Link to={`/forms/${formId}`} target="_blank" rel="noreferrer" />}
          >
            Preview fill
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger
              render={
                <span className="inline-flex cursor-not-allowed">
                  <Button type="button" variant="ghost" disabled className="pointer-events-none">
                    Preview fill
                  </Button>
                </span>
              }
            />
            <TooltipContent>{shareDisabledReason}</TooltipContent>
          </Tooltip>
        )}

        <Button
          type="button"
          variant="ghost"
          nativeButton={false}
          render={<Link to={`/forms/${formId}/responses`} />}
        >
          Responses
        </Button>

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger
            render={
              <Button
                type="button"
                variant="destructive"
                className="ml-auto"
                disabled={deleteForm.isPending}
              />
            }
          >
            Delete form
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this form?</AlertDialogTitle>
              <AlertDialogDescription>
                This cannot be undone. The form and all responses will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleteForm.isPending}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={deleteForm.isPending}
                onClick={handleConfirmDelete}
              >
                {deleteForm.isPending ? (
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
      </div>
    </header>
  );
}
