import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateFormInput, UpdateFormInput } from "@oak-forms/shared";
import * as formsApi from "../forms";
import { queryKeys } from "../query-keys";

export function useFormsQuery() {
  return useQuery({
    queryKey: queryKeys.forms.all,
    queryFn: () => formsApi.listForms(),
  });
}

export function useFormQuery(formId: string) {
  return useQuery({
    queryKey: queryKeys.forms.detail(formId),
    queryFn: () => formsApi.getForm(formId),
    enabled: Boolean(formId),
  });
}

export function useCreateFormMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input?: CreateFormInput) => formsApi.createForm(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.forms.all });
    },
  });
}

export function useUpdateFormMutation(formId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateFormInput) => formsApi.updateForm(formId, input),
    onSuccess: (form) => {
      queryClient.setQueryData(queryKeys.forms.detail(formId), form);
      void queryClient.invalidateQueries({ queryKey: queryKeys.forms.all });
    },
  });
}

export function useDeleteFormMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formId: string) => formsApi.deleteForm(formId),
    onSuccess: (_data, formId) => {
      queryClient.removeQueries({ queryKey: queryKeys.forms.detail(formId) });
      queryClient.removeQueries({ queryKey: queryKeys.submissions.list(formId) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.forms.all });
    },
  });
}
