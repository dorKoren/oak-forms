import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { FileQuestionIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageEmptyState } from "../PageEmptyState";

type FormNotFoundStateProps = {
  className?: string;
};

export default function FormNotFoundState({ className }: FormNotFoundStateProps) {
  return (
    <div className={cn("mx-auto flex w-full max-w-3xl flex-col px-6 py-12", className)}>
      <PageEmptyState
        icon={<FileQuestionIcon />}
        title="Form not found"
        description="There is no form with this link. It may have been deleted, or the server was restarted and lost in-memory data."
      >
        <Button variant="outline" nativeButton={false} render={<Link to="/" />}>
          Back to home
        </Button>
      </PageEmptyState>
    </div>
  );
}
