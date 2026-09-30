import type * as React from "react";
import { cn } from "@/lib/utils";

export default function FieldHint({
  className,
  id,
  ...props
}: React.ComponentProps<"p"> & { id?: string }) {
  return (
    <p
      id={id}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

