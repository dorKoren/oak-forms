import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FieldLabel } from "@/components/form";
import CheckboxGroup from "./checkbox-group";

const options = [
  { id: "a", label: "Option A" },
  { id: "b", label: "Option B" },
  { id: "c", label: "Option C" },
];

const meta = {
  title: "Form/CheckboxGroup",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="max-w-md space-y-2">
        <FieldLabel>Select all that apply</FieldLabel>
        <CheckboxGroup
          id="prefs"
          options={options}
          value={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};
