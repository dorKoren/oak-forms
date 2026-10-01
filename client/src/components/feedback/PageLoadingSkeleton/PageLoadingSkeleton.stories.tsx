import type { Meta, StoryObj } from "@storybook/react-vite";
import PageLoadingSkeleton from "./PageLoadingSkeleton";

const meta = {
  title: "Feedback/PageLoadingSkeleton",
  component: PageLoadingSkeleton,
  tags: ["autodocs"],
  args: {
    variant: "home",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["home", "builder", "fill", "responses"],
    },
  },
} satisfies Meta<typeof PageLoadingSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: { variant: "home" },
};

export const Builder: Story = {
  args: { variant: "builder" },
};

export const Fill: Story = {
  args: { variant: "fill" },
};

export const Responses: Story = {
  args: { variant: "responses" },
};
