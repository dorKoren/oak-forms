import { TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type LoadErrorCardProps = {
  title: string;
  error: unknown;
  className?: string;
};

export default function LoadErrorCard({ title, error, className }: LoadErrorCardProps) {
  return (
    <Alert variant="destructive" className={cn("max-w-3xl shadow-none", className)}>
      <TriangleAlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {error instanceof Error ? error.message : "Something went wrong."}
      </AlertDescription>
    </Alert>
  );
}
