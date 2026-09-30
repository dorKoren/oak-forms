import { toast } from "@/components/ui/toast";
import { OakLogo } from "@/components/brand/OakLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-4xl">
          <OakLogo className="h-9 text-foreground" />
          <span>Forms</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Warm editorial craft — build, share, and collect responses.
        </p>
      </header>

      <Card className="border shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Design tokens</CardTitle>
          <CardDescription>Quick check that shadcn + Tailwind theme are wired.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="demo-input">Sample field</Label>
            <Input id="demo-input" placeholder="Placeholder in stone border…" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={() => toast.add({ title: "Primary action", type: "success" })}
            >
              Primary
            </Button>
            <Button type="button" variant="outline">Outline</Button>
            <Button type="button" variant="ghost">Ghost</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
