"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type ControllerRenderProps,
} from "react-hook-form";

type FormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: (
    field: ControllerRenderProps<TFieldValues, TName> & {
      id: string;
      "aria-invalid"?: boolean;
      "aria-describedby"?: string;
    },
  ) => React.ReactNode;
};

export default function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  hint,
  name,
  label,
  control,
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
          <Field className={cn(className)} data-invalid={fieldState.invalid || undefined}>
            <FieldLabel htmlFor={baseId}>
              {label}
              {required ? (
                <span className="text-destructive" aria-hidden="true">
                  {" "}
                  *
                </span>
              ) : null}
            </FieldLabel>
            {children({
              ...field,
              id: baseId,
              "aria-invalid": fieldState.invalid || undefined,
              "aria-describedby": describedBy || undefined,
            })}
            {hint ? <FieldDescription id={hintId}>{hint}</FieldDescription> : null}
            {fieldState.error?.message ? (
              <FieldError id={errorId}>{fieldState.error.message}</FieldError>
            ) : null}
          </Field>
        );
      }}
    />
  );
}
