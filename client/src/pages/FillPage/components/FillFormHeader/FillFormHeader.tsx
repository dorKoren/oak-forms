type FillFormHeaderProps = {
  title: string;
  questionCount: number;
};

export default function FillFormHeader({ title, questionCount }: FillFormHeaderProps) {
  return (
    <header className="space-y-2 border-b border-border pb-8">
      <h1 className="text-3xl leading-tight">{title}</h1>
      <p className="text-muted-foreground">
        {questionCount === 0
          ? "This form has no questions yet."
          : "All fields marked with * are required."}
      </p>
    </header>
  );
}
