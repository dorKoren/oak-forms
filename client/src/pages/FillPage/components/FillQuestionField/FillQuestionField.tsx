import type { Question } from "@oak-forms/shared";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  TextArea,
  TextInput,
  DateInput,
  FormField,
  NumberInput,
  RatingInput,
  SelectInput,
  CheckboxGroup,
} from "@/components/design-system";

type FillQuestionFieldProps<T extends FieldValues> = {
  question: Question;
  control: Control<T>;
};

export default function FillQuestionField<T extends FieldValues>({
  control,
  question,
}: FillQuestionFieldProps<T>) {
  const name = question.id as FieldPath<T>;

  return (
    <FormField control={control} name={name} label={question.title} required={question.required}>
      {(field) => {
        switch (question.type) {
          case "short_text":
            return <TextInput {...field} value={field.value ?? ""} />;
          case "paragraph":
            return <TextArea {...field} value={field.value ?? ""} rows={4} />;
          case "number":
            return (
              <NumberInput
                {...field}
                value={field.value ?? ""}
                onChange={(e) => {
                  const next = e.target.value;
                  field.onChange(next === "" ? undefined : e.target.value);
                }}
              />
            );
          case "date":
            return <DateInput {...field} value={field.value ?? ""} />;
          case "select":
            return (
              <SelectInput
                options={question.options}
                value={field.value ?? undefined}
                onValueChange={field.onChange}
                id={field.id}
                aria-invalid={field["aria-invalid"]}
                aria-describedby={field["aria-describedby"]}
              />
            );
          case "multi_select":
          case "checkboxes":
            return (
              <CheckboxGroup
                options={question.options}
                value={field.value ?? []}
                onValueChange={field.onChange}
                id={field.id}
                aria-invalid={field["aria-invalid"]}
                aria-describedby={field["aria-describedby"]}
              />
            );
          case "rating":
            return (
              <RatingInput
                max={question.max}
                value={field.value ?? undefined}
                onValueChange={field.onChange}
                id={field.id}
                aria-invalid={field["aria-invalid"]}
                aria-describedby={field["aria-describedby"]}
              />
            );
          default:
            return null;
        }
      }}
    </FormField>
  );
}
