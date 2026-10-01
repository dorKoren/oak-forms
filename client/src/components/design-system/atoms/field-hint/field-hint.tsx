import { FieldDescription } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export default function FieldHint({
  className,
  ...props
}: React.ComponentProps<typeof FieldDescription>) {
  return <FieldDescription className={cn(className)} {...props} />;
}
