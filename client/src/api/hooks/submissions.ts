import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateSubmissionInput } from "@oak-forms/shared";
import { queryKeys } from "../query-keys";
import * as submissionsApi from "../submissions";

export function useSubmissionsQuery(formId: string) {
  return useQuery({
    queryKey: queryKeys.submissions.list(formId),
    queryFn: () => submissionsApi.listSubmissions(formId),
    enabled: Boolean(formId),
  });
}

export function useCreateSubmissionMutation(formId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateSubmissionInput) =>
      submissionsApi.createSubmission(formId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.submissions.list(formId),
      });
    },
  });
}

export function useDeleteSubmissionMutation(formId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (submissionId: string) =>
      submissionsApi.deleteSubmission(formId, submissionId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.submissions.list(formId),
      });
    },
  });
}
