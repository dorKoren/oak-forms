import { FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export default function FieldErrorAtom({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return <FieldError className={cn(className)} {...props} />;
}
