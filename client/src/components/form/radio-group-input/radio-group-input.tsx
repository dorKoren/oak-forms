import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import type { Option } from "@oak-forms/shared";

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
    <div
      id={id}
      role="radiogroup"
      data-slot="radio-group"
      className={cn("flex flex-col gap-3", className)}
      aria-invalid={aria["aria-invalid"]}
      aria-describedby={aria["aria-describedby"]}
    >
      {options.map((option) => {
        const itemId = `${id ?? "radio"}-${option.id}`;
        const checked = value === option.id;
        return (
          <div key={option.id} className="flex items-center gap-2">
            <input
              type="radio"
              id={itemId}
              name={id}
              value={option.id}
              checked={checked}
              disabled={disabled}
              className="size-4 shrink-0 cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-50"
              onChange={() => onValueChange?.(option.id)}
            />
            <Label htmlFor={itemId} className="cursor-pointer font-normal">
              {option.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
