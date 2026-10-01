import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "../../HomePage.utils";
import type { FormListItem as FormListItemType } from "@/api/forms";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "@/components/ui/card";

type FormListItemProps = {
  form: FormListItemType;
};

export default function FormListItem({ form }: FormListItemProps) {
  return (
    <Card className="shadow-none transition-colors hover:border-ring/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">
          <Link
            to={`/forms/${form.id}/edit`}
            className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {form.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Updated {formatDate(form.updatedAt)}</Badge>
          <Badge variant="secondary">
            {form.questions.length} question{form.questions.length === 1 ? "" : "s"}
          </Badge>
          <Badge variant="secondary">
            {form.submissionCount} response{form.submissionCount === 1 ? "" : "s"}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2 pt-0">
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link to={`/forms/${form.id}/edit`} />}
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<Link to={`/forms/${form.id}`} />}
        >
          Fill
        </Button>
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<Link to={`/forms/${form.id}/responses`} />}
        >
          Responses
        </Button>
      </CardContent>
    </Card>
  );
}
