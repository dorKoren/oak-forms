import { cn } from "cn"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md border border-border/80 bg-border/60",
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
