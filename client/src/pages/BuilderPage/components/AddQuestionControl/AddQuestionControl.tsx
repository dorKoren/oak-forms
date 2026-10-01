import { QUESTION_TYPES, QUESTION_TYPE_LABELS, type QuestionType } from "@oak-forms/shared";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

type AddQuestionControlProps = {
  onAdd: (type: QuestionType) => void;
};

export default function AddQuestionControl({ onAdd }: AddQuestionControlProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={null}
        onValueChange={(value) => {
          if (value) onAdd(value as QuestionType);
        }}
      >
        <SelectTrigger className="w-full max-w-xs">
          <SelectValue placeholder="Add question…" />
        </SelectTrigger>

        <SelectContent>
          {QUESTION_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {QUESTION_TYPE_LABELS[type]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
