import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import AppBreadcrumb from "./AppBreadcrumb";

const meta = {
  title: "Navigation/AppBreadcrumb",
  component: AppBreadcrumb,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof AppBreadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Builder: Story = {
  args: {
    items: [{ label: "Home", to: "/" }, { label: "Edit form" }],
  },
};

export const Responses: Story = {
  args: {
    items: [
      { label: "Home", to: "/" },
      { label: "Edit form", to: "/forms/demo/edit" },
      { label: "Responses" },
    ],
  },
};
