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
export const Default: Story = {
  name: "Core Monthly",
  args: {
    variant: "core-monthly",
  },
};

export const PlusMonthly: Story = {
  args: {
    variant: "plus-monthly",
  },
};

export const CoreMonthlyAlt: Story = {
  name: "Core Monthly Alt",
  args: {
    variant: "core-monthly-alt",
  },
};

export const CoreMonthlyV2: Story = {
  name: "Core Monthly - v2",
  args: {
    variant: "core-monthly-v2",
  },
};

export const CoreAnnual: Story = {
  args: {
    variant: "core-annual",
  },
};

export const CoreAnnualAlt: Story = {
  name: "Core Annual Alt",
  args: {
    variant: "core-annual-alt",
  },
};

export const CoreAnnualV2: Story = {
  name: "Core Annual - v2",
  args: {
    variant: "core-annual-v2",
  },
};

export const PlusAnnual: Story = {
  args: {
    variant: "plus-annual",
  },
};

export const PlusMonthlyAlt: Story = {
  name: "Plus Monthly Alt",
  args: {
    variant: "plus-monthly-alt",
  },
};

export const PlusMonthlyV2: Story = {
  name: "Plus Monthly - v2",
  args: {
    variant: "plus-monthly-v2",
  },
};

export const PlusAnnualAlt: Story = {
  name: "Plus Annual Alt",
  args: {
    variant: "plus-annual-alt",
  },
};

export const PlusAnnualV2: Story = {
  name: "Plus Annual - v2",
  args: {
    variant: "plus-annual-v2",
  },
};

export const UltimateMonthly: Story = {
  args: {
    variant: "ultimate-monthly",
  },
};

export const UltimateMonthlyV2: Story = {
  name: "Ultimate Monthly - v2",
  args: {
    variant: "ultimate-monthly-v2",
  },
};

export const UltimateAnnual: Story = {
  args: {
    variant: "ultimate-annual",
  },
};

export const UltimateAnnualV2: Story = {
  name: "Ultimate Annual - v2",
  args: {
    variant: "ultimate-annual-v2",
  },
};
