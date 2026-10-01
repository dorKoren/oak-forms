import { useResponsesPage } from "./ResponsesPage.hooks";
import { ResponseDetail } from "./components/ResponseDetail";
import { ResponsesTable } from "./components/ResponsesTable";
import { ResponsesHeader } from "./components/ResponsesHeader";
import { ResponsesAnalytics } from "./components/ResponsesAnalytics";
import { ResponsesEmptyState } from "./components/ResponsesEmptyState";
import { LoadErrorCard, PageLoadingSkeleton } from "@/components/feedback";
import { ResponsesMissingFormId } from "./components/ResponsesMissingFormId";

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

  if (!formId) return <ResponsesMissingFormId />;

  if (isLoading || !form) return <PageLoadingSkeleton variant="responses" />;

  if (isError) {
    return (
      <LoadErrorCard
        error={error}
        title="Could not load responses"
        className="mx-auto mt-12 max-w-5xl"
      />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
      <ResponsesHeader formId={formId} title={form.title} responseCount={submissions.length} />

      {submissions.length === 0 ? (
        <ResponsesEmptyState formId={formId} />
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
