import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteFormMutation } from "@/api";
import type { FormStatus } from "@oak-forms/shared";
import { isFormPublished } from "@oak-forms/shared";

type UseBuilderHeaderActionsParams = {
  formId: string;
  status: FormStatus;
  isDirty: boolean;
  hasQuestions: boolean;
};

export function useBuilderHeaderActions({
  formId,
  status,
  isDirty,
  hasQuestions,
}: UseBuilderHeaderActionsParams) {
  const navigate = useNavigate();
  const deleteForm = useDeleteFormMutation();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isPublished = isFormPublished({ status });
  const hasPendingSave = isDirty || !isPublished;
  const canSave = hasPendingSave && hasQuestions;
  const shareDisabledReason = !hasQuestions
    ? "Add at least one question before you can save and share."
    : !isPublished
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

  return {
    canSave,
    isPublished,
    shareDisabledReason,
    deleteOpen,
    setDeleteOpen,
    handleConfirmDelete,
    isDeleting: deleteForm.isPending,
  };
}
