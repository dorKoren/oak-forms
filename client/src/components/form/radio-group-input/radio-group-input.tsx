import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import type { Option } from "@oak-forms/shared";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type RadioGroupInputProps = {
  options: Option[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className?: string;
};

export default function RadioGroupInput({
  options,
  value,
  onValueChange,
  disabled,
  id,
  className,
  ...aria
}: RadioGroupInputProps) {
  return (
    <RadioGroup
      id={id}
      disabled={disabled}
      value={value ?? null}
      onValueChange={(next) => {
        if (next != null) onValueChange?.(String(next));
      }}
      className={cn("gap-3", className)}
      aria-invalid={aria["aria-invalid"]}
      aria-describedby={aria["aria-describedby"]}
    >
      {options.map((option) => {
        const itemId = `${id ?? "radio"}-${option.id}`;
        return (
          <div key={option.id} className="flex items-center gap-2">
            <RadioGroupItem value={option.id} id={itemId} aria-invalid={aria["aria-invalid"]} />
            <Label htmlFor={itemId} className="cursor-pointer font-normal">
              {option.label}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
