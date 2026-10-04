import { isApiNotFound } from "@/api";
import { Link } from "react-router-dom";
import { InboxIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResponsesPage } from "./ResponsesPage.hooks";
import { ResponseDetail } from "./components/ResponseDetail";
import { ResponsesTable } from "./components/ResponsesTable";
import { ResponsesHeader } from "./components/ResponsesHeader";
import { ResponsesAnalytics } from "./components/ResponsesAnalytics";
import {
  PageStatus,
  LoadErrorCard,
  PageEmptyState,
  FormNotFoundState,
  PageLoadingSkeleton,
} from "@/components/feedback";

export default function ResponsesPage() {
  const {
    form,
    error,
    formId,
    isError,
    isLoading,
    selectedId,
    isDeleting,
    submissions,
    selectedSubmission,
    setSelectedId,
    deleteSelected,
  } = useResponsesPage();

  if (!formId) return <PageStatus>Missing form id.</PageStatus>;

  if (isError) {
    if (isApiNotFound(error)) {
      return <FormNotFoundState className="max-w-5xl" />;
    }
    return (
      <LoadErrorCard
        error={error}
        title="Could not load responses"
        className="mx-auto mt-12 max-w-5xl"
      />
    );
  }

  if (isLoading || !form) return <PageLoadingSkeleton variant="responses" />;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
      <ResponsesHeader
        form={form}
        formId={formId}
        title={form.title}
        submissions={submissions}
        responseCount={submissions.length}
      />

      {submissions.length === 0 ? (
        <PageEmptyState
          icon={<InboxIcon />}
          title="No responses yet"
          description="Share the fill link to start collecting answers for this form."
        >
          <Button variant="outline" nativeButton={false} render={<Link to={`/forms/${formId}`} />}>
            Open fill link
          </Button>
        </PageEmptyState>
      ) : (
        <>
          <ResponsesAnalytics form={form} submissions={submissions} />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <ResponsesTable
              form={form}
              selectedId={selectedId}
              onSelect={setSelectedId}
              submissions={submissions}
            />
            {selectedSubmission ? (
              <ResponseDetail
                form={form}
                isDeleting={isDeleting}
                onDelete={deleteSelected}
                submission={selectedSubmission}
              />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
