import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageLeadProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "lg";
};

export default function PageLead({ children, className, size = "default" }: PageLeadProps) {
  return (
    <p
      className={cn(
        "text-muted-foreground",
        size === "lg" && "text-lg",
        className,
      )}
    >
      {children}
    </p>
  );
}
