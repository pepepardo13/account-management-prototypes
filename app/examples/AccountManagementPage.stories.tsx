import type { Meta, StoryObj } from "@storybook/react-vite";

import { AccountManagementPage } from "./AccountManagementPage.tsx";

const meta = {
  title: "Layout / Account Management",
  component: AccountManagementPage,
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    colorScheme: "light",
  },
} satisfies Meta<typeof AccountManagementPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Account management landing page with subscription summary, upgrade prompts,
 * and grouped account actions based on the new Figma design.
 */
export const CoreMonthly: Story = {
  args: {
    variant: "core-monthly",
  },
};

export const PlusMonthly: Story = {
  args: {
    variant: "plus-monthly",
  },
};

export const UltimateMonthly: Story = {
  args: {
    variant: "ultimate-monthly",
  },
};
