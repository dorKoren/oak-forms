import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type CopyShareLinkButtonProps = {
  disabledReason: string | null;
  onCopyShareLink: () => void;
};

export default function CopyShareLinkButton({
  disabledReason,
  onCopyShareLink,
}: CopyShareLinkButtonProps) {
  if (disabledReason) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <span className="inline-flex cursor-not-allowed">
              <Button type="button" variant="outline" disabled className="pointer-events-none">
                Copy share link
              </Button>
            </span>
          }
        />
        <TooltipContent>{disabledReason}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Button type="button" variant="outline" onClick={onCopyShareLink}>
      Copy share link
    </Button>
  );
}
