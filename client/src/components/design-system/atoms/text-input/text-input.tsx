import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function TextInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return <Input className={cn("w-full", className)} {...props} />;
}
