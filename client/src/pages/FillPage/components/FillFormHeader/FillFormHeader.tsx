import { PageLead, PageTitle } from "@/components/typography";

type FillFormHeaderProps = {
  title: string;
  questionCount: number;
};

export default function FillFormHeader({ title, questionCount }: FillFormHeaderProps) {
  return (
    <header className="space-y-2 border-b border-border pb-8">
      <PageTitle>{title}</PageTitle>
      <PageLead>
        {questionCount === 0
          ? "This form has no questions yet."
          : "All fields marked with * are required."}
      </PageLead>
    </header>
  );
}
