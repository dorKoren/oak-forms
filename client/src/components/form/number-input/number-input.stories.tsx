import { useState } from "react";
import NumberInput from "./number-input";
import { FieldLabel } from "@/components/form";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Form/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="max-w-md space-y-2">
        <FieldLabel htmlFor="amount">Amount</FieldLabel>
        <NumberInput id="amount" value={value} onChange={(event) => setValue(event.target.value)} />
      </div>
    );
  },
};
