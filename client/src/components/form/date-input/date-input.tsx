import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function DateInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "type">) {
  return (
    <Input type="date" className={cn("w-full max-w-xs", className)} {...props} />
  );
}

