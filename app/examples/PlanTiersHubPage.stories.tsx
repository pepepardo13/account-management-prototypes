import type { Meta, StoryObj } from "@storybook/react-vite";

import { PlanTiersHubPage } from "./PlanTiersHubPage.tsx";

const meta = {
  title: "Layout / Plan Tiers Hub",
  component: PlanTiersHubPage,
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    colorScheme: "light",
  },
} satisfies Meta<typeof PlanTiersHubPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
