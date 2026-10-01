import { Link } from "react-router-dom";
import { FileQuestionIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageEmptyState } from "@/components/feedback";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-6 py-12">
      <PageEmptyState
        icon={<FileQuestionIcon />}
        title="Page not found"
        description="This link doesn’t match any page in OAK Forms. Open your form from the home list or use a share link from the builder."
      >
        <Button variant="outline" nativeButton={false} render={<Link to="/" />}>
          Back to home
        </Button>
      </PageEmptyState>
    </div>
  );
}
