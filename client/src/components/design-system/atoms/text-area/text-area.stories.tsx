import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FieldLabel } from "@/components/design-system/atoms";
import TextArea from "./text-area";

const meta = {
  title: "Design System/Atoms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="max-w-md space-y-2">
        <FieldLabel htmlFor="paragraph">Long answer</FieldLabel>
        <TextArea
          id="paragraph"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Write a few sentences…"
        />
      </div>
    );
  },
};
