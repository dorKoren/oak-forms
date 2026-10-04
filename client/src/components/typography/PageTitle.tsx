import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const formPageTitleClassName = "text-3xl leading-tight";

type PageTitleProps = {
  children: ReactNode;
  className?: string;
};

export default function PageTitle({ children, className }: PageTitleProps) {
  return <h1 className={cn(formPageTitleClassName, className)}>{children}</h1>;
}
