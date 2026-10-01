import { Link } from "react-router-dom";
import { InboxIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyMedia,
  EmptyTitle,
  EmptyHeader,
  EmptyContent,
  EmptyDescription,
} from "@/components/ui/empty";

type ResponsesEmptyStateProps = {
  formId: string;
};

export default function ResponsesEmptyState({ formId }: ResponsesEmptyStateProps) {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No responses yet</EmptyTitle>
        <EmptyDescription>
          Share the fill link to start collecting answers for this form.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" nativeButton={false} render={<Link to={`/forms/${formId}`} />}>
          Open fill link
        </Button>
      </EmptyContent>
    </Empty>
  );
}
