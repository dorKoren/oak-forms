import { useBuilderPage } from "./BuilderPage.hooks";
import { BuilderHeader } from "./components/BuilderHeader";
import { QuestionListItem } from "./components/QuestionListItem";
import { AddQuestionControl } from "./components/AddQuestionControl";
import { BuilderMissingFormId } from "./components/BuilderMissingFormId";
import { LoadErrorCard, PageLoadingSkeleton } from "@/components/feedback";

export default function BuilderPage() {
  const {
    draft,
    error,
    formId,
    isError,
    isDirty,
    canShare,
    isSaving,
    isLoading,
    saveForm,
    setTitle,
    addOption,
    removeOption,
    copyShareLink,
    setOptionLabel,
    setQuestionType,
    moveQuestionById,
    setQuestionTitle,
    addQuestionOfType,
    removeQuestionById,
    setQuestionRequired,
    setQuestionRatingMax,
  } = useBuilderPage();

  if (!formId) return <BuilderMissingFormId />;

  if (isLoading || !draft) return <PageLoadingSkeleton variant="builder" className="max-w-3xl" />;

  if (isError) {
    return (
      <LoadErrorCard
        title="Could not load form"
        error={error}
        className="mx-auto mt-12 max-w-3xl"
      />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12">
      <BuilderHeader
        formId={formId}
        onSave={saveForm}
        isDirty={isDirty}
        title={draft.title}
        canShare={canShare}
        isSaving={isSaving}
        status={draft.status}
        onTitleChange={setTitle}
        onCopyShareLink={copyShareLink}
        hasQuestions={draft.questions.length > 0}
      />

      <div className="flex flex-col gap-4">
        {draft.questions.map((question, index) => (
          <QuestionListItem
            key={question.id}
            index={index}
            question={question}
            total={draft.questions.length}
            onAddOption={() => addOption(question.id)}
            onRemove={() => removeQuestionById(question.id)}
            onMoveUp={() => moveQuestionById(question.id, "up")}
            onMoveDown={() => moveQuestionById(question.id, "down")}
            onTypeChange={(type) => setQuestionType(question.id, type)}
            onTitleChange={(title) => setQuestionTitle(question.id, title)}
            onRemoveOption={(optionId) => removeOption(question.id, optionId)}
            onRatingMaxChange={(max) => setQuestionRatingMax(question.id, max)}
            onRequiredChange={(required) => setQuestionRequired(question.id, required)}
            onOptionLabelChange={(optionId, label) =>
              setOptionLabel(question.id, optionId, label)
            }
          />
        ))}
      </div>

      <AddQuestionControl onAdd={addQuestionOfType} />
    </div>
  );
}
