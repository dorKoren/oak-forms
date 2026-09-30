import { useHomePage } from "./HomePage.hooks";
import { FormsList } from "./components/FormsList";
import { LoadErrorCard } from "@/components/feedback";
import { HomePageHeader } from "./components/HomePageHeader";
import { FormsEmptyState } from "./components/FormsEmptyState";

export default function HomePage() {
  const { forms, error, isError, isLoading, isCreating, createNewForm } = useHomePage();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <HomePageHeader onCreate={createNewForm} isCreating={isCreating} />

      {isLoading ? <p className="text-muted-foreground">Loading forms…</p> : null}

      {!isLoading && isError ? <LoadErrorCard title="Could not load forms" error={error} /> : null}

      {!isLoading && !isError && forms?.length === 0 ? (
        <FormsEmptyState onCreate={createNewForm} isCreating={isCreating} />
      ) : null}

      {!isLoading && !isError && forms && forms.length > 0 ? <FormsList forms={forms} /> : null}
    </div>
  );
}
