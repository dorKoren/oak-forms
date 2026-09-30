import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "@/components/ui/card";

type FormsEmptyStateProps = {
  onCreate: () => void;
  isCreating: boolean;
};

export default function FormsEmptyState({ onCreate, isCreating }: FormsEmptyStateProps) {
  return (
    <Card className="border-dashed shadow-none">
      <CardHeader>
        <CardTitle className="text-xl">No forms yet</CardTitle>
        <CardDescription>Create your first form to add questions and share a link.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button type="button" onClick={onCreate} disabled={isCreating}>
          Create a form
        </Button>
      </CardContent>
    </Card>
  );
}
