import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import { sortSubmissionsNewestFirst } from "./ResponsesPage.utils";
import { useDeleteSubmissionMutation, useFormQuery, useSubmissionsQuery } from "@/api";

export function useResponsesPage() {
  const { id: formId = "" } = useParams<{ id: string }>();
  const {
    data: form,
    error: formError,
    isError: isFormError,
    isPending: isFormPending,
  } = useFormQuery(formId);

  const {
    data: submissions,
    error: submissionsError,
    isError: isSubmissionsError,
    isPending: isSubmissionsPending,
  } = useSubmissionsQuery(formId);

  const deleteSubmission = useDeleteSubmissionMutation(formId);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sortedSubmissions = submissions ? sortSubmissionsNewestFirst(submissions) : [];

  const selectedSubmission =
    sortedSubmissions.find((s) => s.id === selectedId) ?? sortedSubmissions[0] ?? null;

  const effectiveSelectedId = selectedSubmission?.id ?? null;

  const deleteSelected = (onClosed?: () => void) => {
    if (!selectedSubmission) {
      return;
    }

    deleteSubmission.mutate(selectedSubmission.id, {
      onSuccess: () => {
        toast.add({ title: "Response deleted", type: "success" });
        setSelectedId(null);
        onClosed?.();
      },

      onError: () => {
        toast.add({
          title: "Could not delete response",
          description: "Please try again.",
          type: "error",
        });
      },
    });
  };

  return {
    form,
    formId,
    selectedSubmission,
    submissions: sortedSubmissions,
    selectedId: effectiveSelectedId,
    error: formError ?? submissionsError,
    isDeleting: deleteSubmission.isPending,
    isError: isFormError || isSubmissionsError,
    isLoading: isFormPending || isSubmissionsPending,
    setSelectedId,
    deleteSelected,
  };
}
