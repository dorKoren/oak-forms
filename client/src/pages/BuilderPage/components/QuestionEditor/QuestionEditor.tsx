import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { questionHasOptions } from "../../BuilderPage.utils";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  type Question,
  type QuestionType,
  QUESTION_TYPES,
  QUESTION_TYPE_LABELS,
} from "@oak-forms/shared";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

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
        <p className="text-sm text-muted-foreground">Question {index + 1}</p>

        <div className="flex shrink-0 gap-1">
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={onMoveUp}
            aria-label="Move up"
            disabled={index === 0}
          >
            <ChevronUp />
          </Button>

          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={onMoveDown}
            aria-label="Move down"
            disabled={index >= total - 1}
          >
            <ChevronDown />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onRemove}
            aria-label="Remove question"
          >
            <Trash2 />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Input
          value={question.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Question"
          aria-label="Question title"
        />

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex min-w-[12rem] flex-col gap-1.5">
            <Label>Type</Label>

            <Select
              value={question.type}
              onValueChange={(value) => onTypeChange(value as QuestionType)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
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

          <div className="flex items-center gap-2">
            <Checkbox
              id={`required-${question.id}`}
              checked={question.required}
              onCheckedChange={(checked) => onRequiredChange(checked === true)}
            />

            <Label htmlFor={`required-${question.id}`} className="font-normal">
              Required
            </Label>
          </div>
        </div>

        {question.type === "rating" ? (
          <div className="flex max-w-xs flex-col gap-1.5">
            <Label htmlFor={`max-${question.id}`}>Max rating</Label>

            <Input
              min={1}
              max={10}
              type="number"
              value={question.max}
              id={`max-${question.id}`}
              onChange={(e) => onRatingMaxChange(Number.parseInt(e.target.value, 10) || 5)}
            />
          </div>
        ) : null}

        {questionHasOptions(question) ? (
          <div className="flex flex-col gap-2">
            <Label>Options</Label>

            {question.options.map((option) => (
              <div key={option.id} className="flex gap-2">
                <Input
                  value={option.label}
                  onChange={(e) => onOptionLabelChange(option.id, e.target.value)}
                  aria-label="Option label"
                />

                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Remove option"
                  disabled={question.options.length <= 1}
                  onClick={() => onRemoveOption(option.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" size="sm" onClick={onAddOption}>
              Add option
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
