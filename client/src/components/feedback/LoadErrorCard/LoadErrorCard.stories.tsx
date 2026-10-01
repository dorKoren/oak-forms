import type { Meta, StoryObj } from "@storybook/react-vite";
import LoadErrorCard from "./LoadErrorCard";

const meta = {
  title: "Feedback/LoadErrorCard",
  component: LoadErrorCard,
  tags: ["autodocs"],
  args: {
    title: "Could not load forms",
    error: new Error("Network request failed"),
  },
} satisfies Meta<typeof LoadErrorCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const UnknownError: Story = {
  args: {
    title: "Could not load form",
    error: "not an Error instance",
  },
};
