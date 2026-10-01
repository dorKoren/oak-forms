import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingInputProps = {
  max?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className?: string;
};

export default function RatingInput({
  max = 5,
  value,
  onValueChange,
  disabled,
  id,
  className,
  ...aria
}: RatingInputProps) {
  const stars = Array.from({ length: max }, (_, index) => index + 1);

  return (
    <div
      id={id}
      role="radiogroup"
      className={cn("flex flex-wrap gap-1", className)}
      aria-invalid={aria["aria-invalid"]}
      aria-describedby={aria["aria-describedby"]}
    >
      {stars.map((rating) => {
        const selected = value !== undefined && rating <= value;
        return (
          <button
            key={rating}
            type="button"
            role="radio"
            aria-checked={value === rating}
            disabled={disabled}
            className={cn(
              "cursor-pointer rounded-md p-1 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
              selected ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => onValueChange?.(rating)}
          >
            <Star
              className="size-8"
              strokeWidth={1.5}
              fill={selected ? "currentColor" : "none"}
            />
            <span className="sr-only">{rating} of {max}</span>
          </button>
        );
      })}
    </div>
  );
}

