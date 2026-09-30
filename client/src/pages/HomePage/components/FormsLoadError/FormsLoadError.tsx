import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FormsLoadErrorProps = {
  error: unknown;
};

export default function FormsLoadError({ error }: FormsLoadErrorProps) {
  return (
    <Card className="border-destructive/40 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">Could not load forms</CardTitle>
        <CardDescription>
          {error instanceof Error ? error.message : "Something went wrong."}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
