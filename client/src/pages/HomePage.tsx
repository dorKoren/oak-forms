import { Link, useNavigate } from "react-router-dom";
import { useCreateFormMutation, useFormsQuery } from "@/api";
import { OakLogo } from "@/components/brand/OakLogo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function HomePage() {
  const navigate = useNavigate();
  const { data: forms, isPending, isError, error } = useFormsQuery();
  const createForm = useCreateFormMutation();

  const handleCreate = () => {
    createForm.mutate(undefined, {
      onSuccess: (form) => {
        toast.add({ title: "Form created", type: "success" });
        void navigate(`/forms/${form.id}/edit`);
      },
      onError: () => {
        toast.add({
          title: "Could not create form",
          description: "Check that the API is running.",
          type: "error",
        });
      },
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h1 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-4xl">
            <OakLogo className="h-9 text-foreground" />
            <span>Forms</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Build, share, and collect responses.
          </p>
        </div>
        <Button
          type="button"
          onClick={handleCreate}
          disabled={createForm.isPending}
        >
          {createForm.isPending ? "Creating…" : "New form"}
        </Button>
      </header>

      {isPending ? (
        <p className="text-muted-foreground">Loading forms…</p>
      ) : null}

      {isError ? (
        <Card className="border-destructive/40 shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Could not load forms</CardTitle>
            <CardDescription>
              {error instanceof Error ? error.message : "Something went wrong."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {!isPending && !isError && forms?.length === 0 ? (
        <Card className="border-dashed shadow-none">
          <CardHeader>
            <CardTitle className="text-xl">No forms yet</CardTitle>
            <CardDescription>
              Create your first form to add questions and share a link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button type="button" onClick={handleCreate} disabled={createForm.isPending}>
              Create a form
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {!isPending && !isError && forms && forms.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {forms.map((form) => (
            <li key={form.id}>
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
                  <CardDescription>
                    Updated {formatDate(form.updatedAt)} · {form.questions.length}{" "}
                    question{form.questions.length === 1 ? "" : "s"} ·{" "}
                    {form.submissionCount} response
                    {form.submissionCount === 1 ? "" : "s"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 pt-0">
                  <Button variant="outline" size="sm" render={<Link to={`/forms/${form.id}/edit`} />}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" render={<Link to={`/forms/${form.id}`} />}>
                    Fill
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    render={<Link to={`/forms/${form.id}/responses`} />}
                  >
                    Responses
                  </Button>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
