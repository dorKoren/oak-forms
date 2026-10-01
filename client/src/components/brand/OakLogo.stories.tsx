import type { Meta, StoryObj } from "@storybook/react-vite";
import { OakLogo } from "./OakLogo";

const meta = {
  title: "Brand/OakLogo",
  component: OakLogo,
  tags: ["autodocs"],
} satisfies Meta<typeof OakLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: {
    className: "h-12",
  },
};
