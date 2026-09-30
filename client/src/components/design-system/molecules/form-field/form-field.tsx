import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { useId } from "react";
import { FieldError, FieldHint, FieldLabel } from "@/components/design-system/atoms";
import { cn } from "@/lib/utils";

type FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: (
    field: ControllerRenderProps<TFieldValues, TName> & {
      id: string;
      invalid: boolean;
      describedBy?: string;
      "aria-invalid"?: boolean;
      "aria-describedby"?: string;
    },
  ) => React.ReactNode;
};

export default function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  hint,
  required,
  className,
  children,
}: FormFieldProps<TFieldValues, TName>) {
  const baseId = useId();
  const hintId = hint ? `${baseId}-hint` : undefined;
  const errorId = `${baseId}-error`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const describedBy = [hintId, fieldState.error ? errorId : undefined]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            className={cn("group/field space-y-2", className)}
            data-invalid={fieldState.invalid || undefined}
          >
            <FieldLabel htmlFor={baseId} required={required}>
              {label}
            </FieldLabel>
            {hint ? <FieldHint id={hintId}>{hint}</FieldHint> : null}
            {children({
              ...field,
              id: baseId,
              invalid: fieldState.invalid,
              describedBy: describedBy || undefined,
              "aria-invalid": fieldState.invalid || undefined,
              "aria-describedby": describedBy || undefined,
            })}
            {fieldState.error?.message ? (
              <FieldError id={errorId}>{fieldState.error.message}</FieldError>
            ) : null}
          </div>
        );
      }}
    />
  );
}
