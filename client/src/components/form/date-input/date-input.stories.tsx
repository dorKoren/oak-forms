import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FieldLabel } from "@/components/form";
import DateInput from "./date-input";

const meta = {
  title: "Form/DateInput",
  component: DateInput,
  tags: ["autodocs"],
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="max-w-md space-y-2">
        <FieldLabel htmlFor="event-date">Date</FieldLabel>
        <DateInput
          id="event-date"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  },
};
