import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export default function TextArea({ className, ...props }: React.ComponentProps<typeof Textarea>) {
  return <Textarea className={cn("w-full", className)} {...props} />;
}
