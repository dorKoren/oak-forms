import type { Meta, StoryObj } from "@storybook/react-vite";
import PageStatus from "./PageStatus";

const meta = {
  title: "Feedback/PageStatus",
  component: PageStatus,
  tags: ["autodocs"],
  args: {
    children: "Loading forms…",
  },
} satisfies Meta<typeof PageStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MissingId: Story = {
  args: {
    children: "Missing form id.",
  },
};
