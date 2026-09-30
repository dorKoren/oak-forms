import type * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FieldLabelProps = React.ComponentProps<typeof Label> & {
  required?: boolean;
};

export default function FieldLabel({ className, children, required, ...props }: FieldLabelProps) {
  return (
    <Label className={cn("group/field-label text-foreground", className)} {...props}>
      {children}
      {required ? (
        <span className="text-destructive" aria-hidden="true">
          {" "}
          *
        </span>
      ) : null}
    </Label>
  );
}
