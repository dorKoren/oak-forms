import { useId } from "react";
import { cn } from "@/lib/utils";
import { Field, FieldLabel } from "@/components/ui/field";
import NumberInput from "../number-input/number-input";

type NumberFieldProps = {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  id?: string;
  min?: number;
  max?: number;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
};

export default function NumberField({
  label,
  value,
  onValueChange,
  id: idProp,
  min,
  max,
  className,
  inputClassName,
  disabled,
}: NumberFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <Field className={cn("max-w-xs", className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <NumberInput
        id={id}
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        className={inputClassName}
        onChange={(event) => {
          const parsed = Number.parseInt(event.target.value, 10);
          onValueChange(Number.isNaN(parsed) ? (min ?? 0) : parsed);
        }}
      />
    </Field>
  );
}
