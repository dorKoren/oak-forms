import { cn } from "@/lib/utils";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectFieldOption<T extends string = string> = {
  value: T;
  label: string;
};

type SelectFieldProps<T extends string> = {
  label: string;
  value: T;
  options: SelectFieldOption<T>[];
  onValueChange: (value: T) => void;
  className?: string;
  triggerClassName?: string;
};

export default function SelectField<T extends string>({
  label,
  value,
  options,
  onValueChange,
  className,
  triggerClassName,
}: SelectFieldProps<T>) {
  const selectedLabel = options.find((option) => option.value === value)?.label ?? value;

  return (
    <Field className={cn(className)}>
      <FieldLabel>{label}</FieldLabel>
      <Select value={value} onValueChange={(next) => next && onValueChange(next as T)}>
        <SelectTrigger className={cn("w-full", triggerClassName)}>
          <SelectValue>{selectedLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
