import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { NumberField } from "./index";

const meta = {
  title: "Form/NumberField",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(5);
    return (
      <NumberField
        label="Max rating"
        min={1}
        max={10}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};
