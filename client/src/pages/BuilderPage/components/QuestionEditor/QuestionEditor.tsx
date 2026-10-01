import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Field, FieldLabel } from "@/components/ui/field";
import { questionHasOptions } from "../../BuilderPage.utils";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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

function QuestionToolbarButton({
  label,
  children,
  ...props
}: React.ComponentProps<typeof Button> & { label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button type="button" size="icon-sm" variant="ghost" aria-label={label} {...props} />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

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
          <Field className="min-w-[12rem] flex-1">
            <FieldLabel>Type</FieldLabel>
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
          </Field>

          <Field orientation="horizontal" className="items-center">
            <Switch
              id={`required-${question.id}`}
              checked={question.required}
              onCheckedChange={(checked) => onRequiredChange(checked === true)}
            />
            <FieldLabel htmlFor={`required-${question.id}`} className="font-normal">
              Required
            </FieldLabel>
          </Field>
        </div>

        {question.type === "rating" ? (
          <Field className="max-w-xs">
            <FieldLabel htmlFor={`max-${question.id}`}>Max rating</FieldLabel>
            <Input
              min={1}
              max={10}
              type="number"
              value={question.max}
              id={`max-${question.id}`}
              onChange={(e) => onRatingMaxChange(Number.parseInt(e.target.value, 10) || 5)}
            />
          </Field>
        ) : null}

        {questionHasOptions(question) ? (
          <div className="flex flex-col gap-2">
            <Label>Options</Label>
            <Separator />
            {question.options.map((option) => (
              <div key={option.id} className="flex gap-2">
                <Input
                  value={option.label}
                  onChange={(e) => onOptionLabelChange(option.id, e.target.value)}
                  aria-label="Option label"
                />
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        aria-label="Remove option"
                        disabled={question.options.length <= 1}
                        onClick={() => onRemoveOption(option.id)}
                      />
                    }
                  >
                    <Trash2 />
                  </TooltipTrigger>
                  <TooltipContent>Remove option</TooltipContent>
                </Tooltip>
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
