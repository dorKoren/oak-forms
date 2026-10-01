import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type QuestionToolbarButtonProps = React.ComponentProps<typeof Button> & {
  label: string;
};

export default function QuestionToolbarButton({
  label,
  children,
  ...props
}: QuestionToolbarButtonProps) {
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
