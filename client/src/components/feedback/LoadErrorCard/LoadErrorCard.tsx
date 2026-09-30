import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type LoadErrorCardProps = {
  title: string;
  error: unknown;
  className?: string;
};

export default function LoadErrorCard({
  title,
  error,
  className,
}: LoadErrorCardProps) {
  return (
    <Card className={cn("border-destructive/40 shadow-none", className)}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>
          {error instanceof Error ? error.message : "Something went wrong."}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
