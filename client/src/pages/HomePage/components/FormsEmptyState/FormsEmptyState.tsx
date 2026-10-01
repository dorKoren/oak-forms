import { FileTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Empty,
  EmptyTitle,
  EmptyMedia,
  EmptyHeader,
  EmptyContent,
  EmptyDescription,
} from "@/components/ui/empty";

type FormsEmptyStateProps = {
  onCreate: () => void;
  isCreating: boolean;
};

export default function FormsEmptyState({ onCreate, isCreating }: FormsEmptyStateProps) {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileTextIcon />
        </EmptyMedia>
        <EmptyTitle>No forms yet</EmptyTitle>
        <EmptyDescription>
          Create your first form to add questions and share a link.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button type="button" onClick={onCreate} disabled={isCreating}>
          {isCreating ? (
            <>
              <Spinner data-icon="inline-start" className="size-3.5" />
              Creating…
            </>
          ) : (
            "Create a form"
          )}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
