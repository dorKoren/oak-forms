import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { OakLogo } from "@/components/brand/OakLogo";

type HomePageHeaderProps = {
  onCreate: () => void;
  isCreating: boolean;
  showCreateButton?: boolean;
};

export default function HomePageHeader({
  onCreate,
  isCreating,
  showCreateButton = true,
}: HomePageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <h1 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-4xl">
          <OakLogo className="h-9 text-foreground" />
          <span>Forms</span>
        </h1>
        <p className="text-lg text-muted-foreground">Build, share, and collect responses.</p>
      </div>
      {showCreateButton ? (
        <Button type="button" onClick={onCreate} disabled={isCreating}>
          {isCreating ? (
            <>
              <Spinner data-icon="inline-start" className="size-3.5" />
              Creating…
            </>
          ) : (
            "New form"
          )}
        </Button>
      ) : null}
    </header>
  );
}
