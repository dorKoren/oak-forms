import { toast } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { useCreateFormMutation, useFormsQuery } from "@/api";

export function useHomePage() {
  const navigate = useNavigate();
  const createForm = useCreateFormMutation();
  const { data: forms, isPending, isError, error } = useFormsQuery();

  const createNewForm = () => {
    createForm.mutate(undefined, {
      onSuccess: (form) => {
        toast.add({ title: "Form created", type: "success" });
        void navigate(`/forms/${form.id}/edit`);
      },
      onError: () => {
        toast.add({
          title: "Could not create form",
          description: "Check that the API is running.",
          type: "error",
        });
      },
    });
  };

  const isLoading = isPending;
  const showHeaderCreateButton = isLoading || isError || (forms !== undefined && forms.length > 0);

  return {
    forms,
    error,
    isError,
    isLoading,
    createNewForm,
    showHeaderCreateButton,
    isCreating: createForm.isPending,
  };
}
