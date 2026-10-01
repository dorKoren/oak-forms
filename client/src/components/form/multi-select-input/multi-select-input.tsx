import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";
import type { Option } from "@oak-forms/shared";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useId, useRef, useState } from "react";

type MultiSelectInputProps = {
  options: Option[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className?: string;
};

export default function MultiSelectInput({
  options,
  value = [],
  onValueChange,
  placeholder = "Choose options",
  disabled,
  id,
  className,
  ...aria
}: MultiSelectInputProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const selectedLabels = options
    .filter((option) => value.includes(option.id))
    .map((option) => option.label);

  const toggle = (optionId: string, checked: boolean) => {
    const next = checked ? [...value, optionId] : value.filter((id) => id !== optionId);
    onValueChange?.(next);
  };

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-invalid={aria["aria-invalid"]}
        aria-describedby={aria["aria-describedby"]}
        className={cn(
          "flex h-8 w-full cursor-pointer items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          selectedLabels.length === 0 && "text-muted-foreground",
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="line-clamp-1 flex-1 text-left">
          {selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder}
        </span>
        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
      </button>

      {open ? (
        <div
          id={listboxId}
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10"
        >
          {options.map((option) => {
            const checked = value.includes(option.id);
            const itemId = `${id ?? "multi"}-${option.id}`;
            return (
              <div
                key={option.id}
                role="option"
                aria-selected={checked}
                className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1.5 hover:bg-accent"
                onClick={() => toggle(option.id, !checked)}
              >
                <Checkbox
                  id={itemId}
                  checked={checked}
                  onCheckedChange={(next) => toggle(option.id, next === true)}
                  onClick={(event) => event.stopPropagation()}
                />
                <Label htmlFor={itemId} className="flex-1 cursor-pointer font-normal">
                  {option.label}
                </Label>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
