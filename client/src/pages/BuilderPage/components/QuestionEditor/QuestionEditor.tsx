import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NumberField, SwitchField } from "@/components/form";
import type { Question, QuestionType } from "@oak-forms/shared";
import QuestionToolbarButton from "./QuestionToolbarButton";
import QuestionTypeSelect from "./QuestionTypeSelect";
import QuestionOptionsSection from "./QuestionOptionsSection";

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
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm text-muted-foreground">Question {index + 1}</p>
          {question.required ? <Badge variant="secondary">Required</Badge> : null}
        </div>

        <div className="flex shrink-0 gap-1">
          <QuestionToolbarButton label="Move up" onClick={onMoveUp} disabled={index === 0}>
            <ChevronUp />
          </QuestionToolbarButton>

          <QuestionToolbarButton
            label="Move down"
            onClick={onMoveDown}
            disabled={index >= total - 1}
          >
            <ChevronDown />
          </QuestionToolbarButton>

          <QuestionToolbarButton label="Remove question" onClick={onRemove}>
            <Trash2 />
          </QuestionToolbarButton>
        </div>
      </CardHeader>

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
