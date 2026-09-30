import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FieldLabel } from "@/components/design-system/atoms";
import RatingInput from "./rating-input";

const meta = {
  title: "Design System/Atoms/RatingInput",
  component: RatingInput,
  tags: ["autodocs"],
} satisfies Meta<typeof RatingInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<number | undefined>();
    return (
      <div className="max-w-md space-y-2">
        <FieldLabel>Rating</FieldLabel>
        <RatingInput max={5} value={value} onValueChange={setValue} />
      </div>
    );
  },
};
