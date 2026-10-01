import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type PageLoadingSkeletonProps = {
  variant: "home" | "builder" | "fill" | "responses";
  className?: string;
  /** Omit page chrome (padding / max-width) when the parent layout already provides it. */
  bare?: boolean;
};

export default function PageLoadingSkeleton({
  variant,
  className,
  bare = false,
}: PageLoadingSkeletonProps) {
  const body = (
    <>
      {!bare ? <Skeleton className="h-4 w-48" /> : null}
      {!bare ? <Skeleton className="h-10 w-full max-w-md" /> : null}
      {variant === "home" ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      ) : null}
      {variant === "builder" || variant === "fill" ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      ) : null}
      {variant === "responses" ? (
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </div>
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      ) : null}
    </>
  );

  if (bare) {
    return <div className={cn("flex w-full flex-col gap-4", className)}>{body}</div>;
  }

  return (
    <div className={cn("mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12", className)}>
      {body}
    </div>
  );
}
