import { cn } from "@/lib/utils";
import type { Option } from "@oak-forms/shared";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";

type SelectInputProps = {
  options: Option[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className?: string;
};

export default function SelectInput({
  options,
  value,
  onValueChange,
  placeholder = "Choose an option",
  disabled,
  id,
  className,
  ...aria
}: SelectInputProps) {
  return (
    <Select
      value={value ?? null}
      onValueChange={(next) => onValueChange?.(next ?? "")}
      disabled={disabled}
    >
      <SelectTrigger
        id={id}
        className={cn("w-full", className)}
        aria-invalid={aria["aria-invalid"]}
        aria-describedby={aria["aria-describedby"]}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
