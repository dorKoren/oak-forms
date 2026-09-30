import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function NumberInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "type">) {
  return (
    <Input
      type="number"
      inputMode="decimal"
      className={cn("w-full max-w-xs", className)}
      {...props}
    />
  );
}

