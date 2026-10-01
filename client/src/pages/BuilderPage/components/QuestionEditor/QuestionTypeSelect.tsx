import { SelectField } from "@/components/form";
import { QUESTION_TYPES, QUESTION_TYPE_LABELS, type QuestionType } from "@oak-forms/shared";

const questionTypeOptions = QUESTION_TYPES.map((type) => ({
  value: type,
  label: QUESTION_TYPE_LABELS[type],
}));

type QuestionTypeSelectProps = {
  value: QuestionType;
  onValueChange: (type: QuestionType) => void;
  className?: string;
};

export default function QuestionTypeSelect({
  value,
  onValueChange,
  className,
}: QuestionTypeSelectProps) {
  return (
    <SelectField
      label="Type"
      value={value}
      className={className}
      options={questionTypeOptions}
      onValueChange={onValueChange}
    />
  );
}
