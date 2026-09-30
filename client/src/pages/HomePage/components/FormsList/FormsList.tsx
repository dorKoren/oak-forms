import type { FormListItem as FormListItemType } from "@/api/forms";
import FormListItem from "./FormListItem";

type FormsListProps = {
  forms: FormListItemType[];
};

export default function FormsList({ forms }: FormsListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {forms.map((form) => (
        <li key={form.id}>
          <FormListItem form={form} />
        </li>
      ))}
    </ul>
  );
}
