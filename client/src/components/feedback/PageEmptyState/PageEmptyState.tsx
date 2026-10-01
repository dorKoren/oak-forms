import type { ReactNode } from "react";
import {
  Empty,
  EmptyMedia,
  EmptyTitle,
  EmptyHeader,
  EmptyContent,
  EmptyDescription,
} from "@/components/ui/empty";

type PageEmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
};

export default function PageEmptyState({
  icon,
  title,
  children,
  description,
}: PageEmptyStateProps) {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children ? <EmptyContent>{children}</EmptyContent> : null}
    </Empty>
  );
}
