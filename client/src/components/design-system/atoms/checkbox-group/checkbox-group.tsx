import type { Option } from "@oak-forms/shared";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type CheckboxGroupProps = {
  options: Option[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className?: string;
};

export default function CheckboxGroup({
  options,
  value = [],
  onValueChange,
  disabled,
  id,
  className,
  ...aria
}: CheckboxGroupProps) {
  const toggle = (optionId: string, checked: boolean) => {
    const next = checked
      ? [...value, optionId]
      : value.filter((id) => id !== optionId);
    onValueChange?.(next);
  };

  return (
    <div
      id={id}
      role="group"
      className={cn("flex flex-col gap-3", className)}
      aria-invalid={aria["aria-invalid"]}
      aria-describedby={aria["aria-describedby"]}
    >
      {options.map((option) => {
        const checked = value.includes(option.id);
        const itemId = `${id ?? "checkbox"}-${option.id}`;
        return (
          <div key={option.id} className="flex items-center gap-2">
            <Checkbox
              id={itemId}
              checked={checked}
              disabled={disabled}
              onCheckedChange={(next) =>
                toggle(option.id, next === true)
              }
            />
            <Label htmlFor={itemId} className="font-normal">
              {option.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
