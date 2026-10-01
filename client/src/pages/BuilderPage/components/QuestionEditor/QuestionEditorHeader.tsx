import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import QuestionToolbarButton from "./QuestionToolbarButton";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

type QuestionEditorHeaderProps = {
  index: number;
  total: number;
  required: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
};

export default function QuestionEditorHeader({
  index,
  total,
  required,
  onMoveUp,
  onMoveDown,
  onRemove,
}: QuestionEditorHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm text-muted-foreground">Question {index + 1}</p>
        {required ? <Badge variant="secondary">Required</Badge> : null}
      </div>

      <div className="flex shrink-0 gap-1">
        <QuestionToolbarButton label="Move up" onClick={onMoveUp} disabled={index === 0}>
          <ChevronUp />
        </QuestionToolbarButton>

        <QuestionToolbarButton label="Move down" onClick={onMoveDown} disabled={index >= total - 1}>
          <ChevronDown />
        </QuestionToolbarButton>

        <QuestionToolbarButton label="Remove question" onClick={onRemove}>
          <Trash2 />
        </QuestionToolbarButton>
      </div>
    </CardHeader>
  );
}
