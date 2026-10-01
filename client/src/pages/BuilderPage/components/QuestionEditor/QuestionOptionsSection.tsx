import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Question } from "@oak-forms/shared";
import { Separator } from "@/components/ui/separator";
import { questionHasOptions } from "../../BuilderPage.utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type QuestionOptionsSectionProps = {
  question: Question;
  onAddOption: () => void;
  onRemoveOption: (optionId: string) => void;
  onOptionLabelChange: (optionId: string, label: string) => void;
};

export default function QuestionOptionsSection({
  question,
  onAddOption,
  onRemoveOption,
  onOptionLabelChange,
}: QuestionOptionsSectionProps) {
  if (!questionHasOptions(question)) {
    return null;
  }

  return (
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
  );
}
