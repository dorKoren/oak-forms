import type { Meta, StoryObj } from "@storybook/react-vite";
import FieldLabel from "./field-label";

const meta = {
  title: "Form/FieldLabel",
  component: FieldLabel,
  tags: ["autodocs"],
} satisfies Meta<typeof FieldLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    htmlFor: "example",
    children: "Email",
  },
};

export const Required: Story = {
  args: {
    htmlFor: "example-required",
    children: "Email",
    required: true,
  },
};
