import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SwitchField } from "./index";

const meta = {
  title: "Form/SwitchField",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <SwitchField
        id="switch-demo"
        label="Required"
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};
