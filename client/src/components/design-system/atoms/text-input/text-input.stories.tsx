import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FieldLabel } from "@/components/design-system/atoms";
import TextInput from "./text-input";

const meta = {
  title: "Design System/Atoms/TextInput",
  component: TextInput,
  tags: ["autodocs"],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="max-w-md space-y-2">
        <FieldLabel htmlFor="short-text">Short answer</FieldLabel>
        <TextInput
          id="short-text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Your answer"
        />
      </div>
    );
  },
};
