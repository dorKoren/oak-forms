import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type SaveFormButtonProps = {
  canSave: boolean;
  isSaving: boolean;
  onSave: () => void;
};

export default function SaveFormButton({ canSave, isSaving, onSave }: SaveFormButtonProps) {
  return (
    <Button type="button" disabled={!canSave || isSaving} onClick={onSave}>
      {isSaving ? (
        <>
          <Spinner data-icon="inline-start" className="size-3.5" />
          Saving…
        </>
      ) : (
        "Save"
      )}
    </Button>
  );
}
