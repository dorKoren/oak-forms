import { FileTextIcon } from "lucide-react";
import { useHomePage } from "./HomePage.hooks";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FormsList } from "./components/FormsList";
import { HomePageHeader } from "./components/HomePageHeader";
import { LoadErrorCard, PageEmptyState, PageLoadingSkeleton } from "@/components/feedback";

export default function HomePage() {
  const { forms, error, isError, isLoading, isCreating, showHeaderCreateButton, createNewForm } =
    useHomePage();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <HomePageHeader
        isCreating={isCreating}
        onCreate={createNewForm}
        showCreateButton={showHeaderCreateButton}
      />

      {isLoading ? <PageLoadingSkeleton variant="home" className="px-0 py-0" /> : null}

      {!isLoading && isError ? <LoadErrorCard title="Could not load forms" error={error} /> : null}

      {!isLoading && !isError && forms?.length === 0 ? (
        <PageEmptyState
          icon={<FileTextIcon />}
          title="No forms yet"
          description="Create your first form to add questions and share a link."
        >
          <Button type="button" onClick={createNewForm} disabled={isCreating}>
            {isCreating ? (
              <>
                <Spinner data-icon="inline-start" className="size-3.5" />
                Creating…
              </>
            ) : (
              "Create a form"
            )}
          </Button>
        </PageEmptyState>
      ) : null}

      {!isLoading && !isError && forms && forms.length > 0 ? <FormsList forms={forms} /> : null}
    </div>
  );
}
