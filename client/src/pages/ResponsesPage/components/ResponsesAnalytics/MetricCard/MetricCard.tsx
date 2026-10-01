import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type MetricCardProps = {
  label: string;
  title: ReactNode;
  titleClassName?: string;
  className?: string;
  children?: ReactNode;
};

export default function MetricCard({
  label,
  title,
  titleClassName,
  className,
  children,
}: MetricCardProps) {
  return (
    <Card className={cn("shadow-none", className)}>
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className={titleClassName}>{title}</CardTitle>
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}
    </Card>
  );
}
