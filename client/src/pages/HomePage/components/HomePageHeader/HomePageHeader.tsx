import { Button } from "@/components/ui/button";
import { OakLogo } from "@/components/brand/OakLogo";

type HomePageHeaderProps = {
  onCreate: () => void;
  isCreating: boolean;
};

export default function HomePageHeader({ onCreate, isCreating }: HomePageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <h1 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-4xl">
          <OakLogo className="h-9 text-foreground" />
          <span>Forms</span>
        </h1>
        <p className="text-lg text-muted-foreground">Build, share, and collect responses.</p>
      </div>
      <Button type="button" onClick={onCreate} disabled={isCreating}>
        {isCreating ? "Creating…" : "New form"}
      </Button>
    </header>
  );
}
