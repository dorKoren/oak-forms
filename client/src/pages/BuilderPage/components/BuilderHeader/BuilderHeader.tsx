import { useState } from "react";
import { useDeleteFormMutation } from "@/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Link, useNavigate } from "react-router-dom";
import { AppBreadcrumb } from "@/components/navigation/AppBreadcrumb";
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
  const navigate = useNavigate();
  const deleteForm = useDeleteFormMutation();
  const [deleteOpen, setDeleteOpen] = useState(false);

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
        {isSaving ? (
          <span className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner className="size-3.5" />
            Saving…
          </span>
        ) : null}
      </div>

      <Input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="h-auto min-h-0 border-0 bg-transparent px-2 py-1 text-3xl leading-tight tracking-tight shadow-none focus-visible:border-transparent focus-visible:ring-0 font-[family-name:var(--font-headline)] font-normal md:text-3xl"
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
