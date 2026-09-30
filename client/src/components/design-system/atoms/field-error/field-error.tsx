import type * as React from "react";
import { cn } from "@/lib/utils";

export default function FieldError({
  className,
  id,
  ...props
}: React.ComponentProps<"p"> & { id?: string }) {
  return (
    <p
      id={id}
      role="alert"
      className={cn("text-sm text-destructive", className)}
      {...props}
    />
  );
}

