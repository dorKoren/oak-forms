import { ViewTransition } from "react";
import { QuestionEditor } from "../QuestionEditor";
import type { Question, QuestionType } from "@oak-forms/shared";

type QuestionListItemProps = {
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

export default function QuestionListItem({
  question,
  index,
  total,
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
}: QuestionListItemProps) {
  return (
    <ViewTransition enter="vt-fade" exit="vt-fade" default="none" update="auto">
      <QuestionEditor
        index={index}
        total={total}
        question={question}
        onRemove={onRemove}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onAddOption={onAddOption}
        onTypeChange={onTypeChange}
        onTitleChange={onTitleChange}
        onRemoveOption={onRemoveOption}
        onRequiredChange={onRequiredChange}
        onRatingMaxChange={onRatingMaxChange}
        onOptionLabelChange={onOptionLabelChange}
      />
    </ViewTransition>
  );
}
