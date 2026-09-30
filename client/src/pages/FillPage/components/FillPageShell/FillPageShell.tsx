import type { ReactNode } from "react";

type FillPageShellProps = {
  children: ReactNode;
  gap?: "6" | "8";
};

export default function FillPageShell({ children, gap = "8" }: FillPageShellProps) {
  return (
    <div
      className={`mx-auto flex w-full max-w-3xl flex-col px-6 py-12 ${gap === "6" ? "gap-6" : "gap-8"}`}
    >
      {children}
    </div>
  );
}
