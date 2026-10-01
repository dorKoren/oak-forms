import { cn } from "@/lib/utils";
import { FieldLabel } from "@/components/ui/field";

type FieldLabelProps = React.ComponentProps<typeof FieldLabel> & {
  required?: boolean;
};

export default function FieldLabelAtom({
  className,
  children,
  required,
  ...props
}: FieldLabelProps) {
  return (
    <FieldLabel className={cn(className)} {...props}>
      {children}
      {required ? (
        <span className="text-destructive" aria-hidden="true">
          {" "}
          *
        </span>
      ) : null}
    </FieldLabel>
  );
}
