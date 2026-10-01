import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

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
