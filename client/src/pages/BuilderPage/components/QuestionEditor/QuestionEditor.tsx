import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import QuestionTypeSelect from "./QuestionTypeSelect";
import { Card, CardContent } from "@/components/ui/card";
import QuestionEditorHeader from "./QuestionEditorHeader";
import { NumberField, SwitchField } from "@/components/form";
import QuestionOptionsSection from "./QuestionOptionsSection";
import type { Question, QuestionType } from "@oak-forms/shared";

type QuestionEditorProps = {
  question: Question;
  index: number;
  total: number;
  onMoveUp: () => void;
  onRemove: () => void;
  onMoveDown: () => void;
  onAddOption: () => void;
  onTitleChange: (title: string) => void;
  onRatingMaxChange: (max: number) => void;
  onTypeChange: (type: QuestionType) => void;
  onRemoveOption: (optionId: string) => void;
  onRequiredChange: (required: boolean) => void;
  onOptionLabelChange: (optionId: string, label: string) => void;
};

export default function QuestionEditor({
  total,
  index,
  question,
  onRemove,
  onMoveUp,
  onMoveDown,
  onAddOption,
  onTypeChange,
  onTitleChange,
  onRemoveOption,
  onRequiredChange,
  onRatingMaxChange,
  onOptionLabelChange,
}: QuestionEditorProps) {
  return (
    <Card className="shadow-none">
      <QuestionEditorHeader
        index={index}
        total={total}
        required={question.required}
        onMoveUp={onMoveUp}
        onRemove={onRemove}
        onMoveDown={onMoveDown}
      />

      <Separator />

      <CardContent className="flex flex-col gap-4 pt-6">
        <Input
          value={question.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Question"
          aria-label="Question title"
        />

        <div className="flex flex-wrap items-end gap-6">
          <QuestionTypeSelect
            value={question.type}
            onValueChange={onTypeChange}
            className="min-w-[12rem] flex-1"
          />

          <SwitchField
            label="Required"
            id={`required-${question.id}`}
            checked={question.required}
            onCheckedChange={onRequiredChange}
          />
        </div>

        {question.type === "rating" ? (
          <NumberField
            label="Max rating"
            id={`max-${question.id}`}
            min={1}
            max={10}
            value={question.max}
            onValueChange={(max) => onRatingMaxChange(max || 5)}
          />
        ) : null}

        <QuestionOptionsSection
          question={question}
          onAddOption={onAddOption}
          onRemoveOption={onRemoveOption}
          onOptionLabelChange={onOptionLabelChange}
        />
      </CardContent>
    </Card>
  );
}
