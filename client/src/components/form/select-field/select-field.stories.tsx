import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SelectField } from "./index";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

const meta = {
  title: "Form/SelectField",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <div className="max-w-xs">
        <SelectField label="Choose one" value={value} options={options} onValueChange={setValue} />
      </div>
    );
  },
};
