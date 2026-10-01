import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Field, FieldLabel } from "@/components/ui/field";

type SwitchFieldProps = {
  label: string;
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
};

export default function SwitchField({
  id,
  label,
  checked,
  onCheckedChange,
  className,
  orientation = "horizontal",
  disabled,
}: SwitchFieldProps) {
  return (
    <Field orientation={orientation} className={cn("items-center", className)}>
      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={(next) => onCheckedChange(next === true)}
      />
      <FieldLabel htmlFor={id} className="font-normal">
        {label}
      </FieldLabel>
    </Field>
  );
}
