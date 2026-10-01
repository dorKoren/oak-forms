import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type PreviewFillButtonProps = {
  formId: string;
  canShare: boolean;
  disabledReason: string | null;
};

export default function PreviewFillButton({
  formId,
  canShare,
  disabledReason,
}: PreviewFillButtonProps) {
  if (canShare) {
    return (
      <Button
        type="button"
        variant="ghost"
        nativeButton={false}
        render={<Link to={`/forms/${formId}`} target="_blank" rel="noreferrer" />}
      >
        Preview fill
      </Button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span className="inline-flex cursor-not-allowed">
            <Button type="button" variant="ghost" disabled className="pointer-events-none">
              Preview fill
            </Button>
          </span>
        }
      />
      <TooltipContent>{disabledReason}</TooltipContent>
    </Tooltip>
  );
}
