import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FieldLabel } from "@/components/form";
import SelectInput from "./select-input";

const options = [
  { id: "a", label: "Option A" },
  { id: "b", label: "Option B" },
  { id: "c", label: "Option C" },
];

const meta = {
  title: "Form/SelectInput",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div className="max-w-md space-y-2">
        <FieldLabel>Choose one</FieldLabel>
        <SelectInput
          options={options}
          value={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};
