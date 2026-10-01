import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SaveFormButton from "./SaveFormButton";
import { Button } from "@/components/ui/button";
import type { FormStatus } from "@oak-forms/shared";
import PreviewFillButton from "./PreviewFillButton";
import { ConfirmDeleteDialog } from "@/components/confirm";
import CopyShareLinkButton from "./CopyShareLinkButton";
import { useBuilderHeaderActions } from "./BuilderHeader.hooks";
import { AppBreadcrumb } from "@/components/navigation/AppBreadcrumb";

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
  const {
    canSave,
    deleteOpen,
    isPublished,
    shareDisabledReason,
    setDeleteOpen,
    handleConfirmDelete,
    isDeleting,
  } = useBuilderHeaderActions({ formId, status, isDirty, hasQuestions });

  return (
    <header className="flex flex-col gap-4 border-b border-border pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <AppBreadcrumb items={[{ label: "Home", to: "/" }, { label: "Edit form" }]} />
        <Badge variant={isPublished ? "secondary" : "outline"}>
          {isPublished ? "Published" : "Draft"}
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
        <SaveFormButton canSave={canSave} isSaving={isSaving} onSave={onSave} />

        <CopyShareLinkButton
          disabledReason={shareDisabledReason}
          onCopyShareLink={onCopyShareLink}
        />

        <PreviewFillButton
          formId={formId}
          canShare={canShare}
          disabledReason={shareDisabledReason}
        />

        <Button
          type="button"
          variant="ghost"
          nativeButton={false}
          render={<Link to={`/forms/${formId}/responses`} />}
        >
          Responses
        </Button>

        <ConfirmDeleteDialog
          open={deleteOpen}
          isDeleting={isDeleting}
          onOpenChange={setDeleteOpen}
          onConfirm={handleConfirmDelete}
          title="Delete this form?"
          description="This cannot be undone. The form and all responses will be permanently removed."
          triggerLabel="Delete form"
          triggerClassName="ml-auto"
        />
      </div>
    </header>
  );
}
