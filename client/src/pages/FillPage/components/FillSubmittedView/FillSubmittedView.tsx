import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FillPageShell } from "../FillPageShell";

type FillSubmittedViewProps = {
  formTitle: string;
};

export default function FillSubmittedView({ formTitle }: FillSubmittedViewProps) {
  return (
    <FillPageShell gap="6">
      <Card className="border-dashed shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Thanks for your response</CardTitle>
          <CardDescription>
            Your answers for &ldquo;{formTitle}&rdquo; were submitted.
          </CardDescription>
        </CardHeader>
      </Card>
      <Button variant="outline" nativeButton={false} render={<Link to="/" />}>
        Back to home
      </Button>
    </FillPageShell>
  );
}
