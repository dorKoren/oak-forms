import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

type PageStatusProps = {
  children: ReactNode;
  className?: string;
};

export default function PageStatus({ children, className }: PageStatusProps) {
  return (
    <p className={cn("px-6 py-12 text-muted-foreground", className)}>
      {children}
    </p>
  );
}
