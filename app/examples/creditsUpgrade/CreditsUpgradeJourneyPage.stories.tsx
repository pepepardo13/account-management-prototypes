import type { Meta, StoryObj } from "@storybook/react-vite";

import { CreditsUpgradeHubPage } from "./CreditsUpgradeHubPage.tsx";
import { CreditsUpgradeJourneyPage } from "./CreditsUpgradeJourneyPage.tsx";
import { PrototypeCopyProvider } from "./prototypeCopy/PrototypeCopyContext.tsx";
import { PrototypeCopyPalette } from "./prototypeCopy/PrototypeCopyPanel.tsx";

const meta = {
  title: "Layout / Credits Upgrade Journeys",
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    colorScheme: "light",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Hub: Story = {
  name: "Hub",
  render: () => (
    <PrototypeCopyProvider>
      <CreditsUpgradeHubPage />
      <PrototypeCopyPalette />
    </PrototypeCopyProvider>
  ),
};

export const PlusToUltimate500: Story = {
  name: "Plus Individual → Ultimate 2000",
  render: () => <CreditsUpgradeJourneyPage journeyId="plus-to-500" />,
};

export const Ultimate500To1000: Story = {
  name: "Ultimate 500 → Ultimate 2000",
  render: () => <CreditsUpgradeJourneyPage journeyId="500-to-1000" />,
};

export const Ultimate1000To2000: Story = {
  name: "Ultimate 1000 → Ultimate 2000",
  render: () => <CreditsUpgradeJourneyPage journeyId="1000-to-2000" />,
};

export const AnnualPlusToUltimate2000: Story = {
  name: "Annual Plus Individual → Ultimate 2000",
  render: () => (
    <CreditsUpgradeJourneyPage initialBillingCycle="annual" journeyId="plus-to-500" />
  ),
};

export const AnnualUltimate1000To2000: Story = {
  name: "Annual Ultimate 1000 → Ultimate 2000",
  render: () => (
    <CreditsUpgradeJourneyPage initialBillingCycle="annual" journeyId="1000-to-2000" />
  ),
};

export const AnnualUltimate2000: Story = {
  name: "Annual Ultimate 2000",
  render: () => (
    <CreditsUpgradeJourneyPage
      initialBillingCycle="annual"
      initialCredits={2000}
      journeyId="1000-to-2000"
    />
  ),
};
