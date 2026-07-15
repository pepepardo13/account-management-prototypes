export type CreditTiers = 200 | 500 | 1000 | 2000;

export type CreditOption = {
  credits: CreditTiers;
  label: string;
  priceLabel: string;
};

export type JourneyId = "plus-to-500" | "500-to-1000" | "1000-to-2000";

export type PlanState = {
  creditTotal: CreditTiers;
  creditRemaining: number;
  elevateBody: string;
  elevateCta: string;
  elevateTitle: string;
  planName: string;
  primaryFeatureCount: string;
  resetDate: string;
  title: string;
};

export type JourneyConfig = {
  annualPromoBody: string;
  annualPromoTitle: string;
  creditMode: "dropdown" | "fixed";
  creditOptions: CreditOption[];
  defaultSelectedCredits: CreditTiers;
  destination: PlanState;
  fixedCreditHelper: string;
  id: JourneyId;
  source: PlanState;
  startRightAwayCopy: string;
  supportingPoints: string[];
  upgradeCurrentPlanBanner: string;
  upgradeCurrentPlanDetail: string;
  upgradePageTitle: (credits: CreditTiers) => string;
};

const supportingPoints = [
  "Unlimited downloads of 27+ million of creative assets",
  "Lifetime commercial license for all creative assets and AI generations",
];

const annualPromoTitle = "Switch to annual payments and save 50%";
const annualPromoBody =
  "Save $198.00/year ($16.50/month) with an annual plan – same unlimited access, half the price.";

export const journeyConfigs: Record<JourneyId, JourneyConfig> = {
  "plus-to-500": {
    id: "plus-to-500",
    supportingPoints,
    annualPromoTitle,
    annualPromoBody,
    creditMode: "dropdown",
    defaultSelectedCredits: 500,
    creditOptions: [
      {
        credits: 500,
        label: "500 AI credits per month",
        priceLabel: "USD $39/month",
      },
      {
        credits: 1000,
        label: "1,000 AI credits per month",
        priceLabel: "USD $168/month",
      },
      {
        credits: 2000,
        label: "2,000 AI credits per month",
        priceLabel: "USD $297/month",
      },
    ],
    fixedCreditHelper: "",
    upgradePageTitle: (credits) =>
      `Upgrade to the Ultimate ${credits} Individual plan`,
    upgradeCurrentPlanBanner: "Current plan: Plus Individual, renews monthly.",
    upgradeCurrentPlanDetail:
      "Your next payment of $00.00 (excluding tax and discounts) is scheduled for Jan 07, 2027 – in 360 days.",
    startRightAwayCopy: "Your Ultimate individual plan will start right away!",
    source: {
      title: "Plus Individual Subscription",
      planName: "Plus Individual",
      primaryFeatureCount: "200",
      creditTotal: 200,
      creditRemaining: 100,
      resetDate: "14 August, 2026",
      elevateTitle: "Elevate your plan!",
      elevateBody:
        "Get more AI credits by upgrading your plan.",
      elevateCta: "Upgrade to Ultimate",
    },
    destination: {
      title: "Ultimate 500 Individual Subscription",
      planName: "Ultimate 500 Individual",
      primaryFeatureCount: "500",
      creditTotal: 500,
      creditRemaining: 500,
      resetDate: "14 August, 2026",
      elevateTitle: "Elevate your plan!",
      elevateBody:
        "Get more AI credits by upgrading your plan.",
      elevateCta: "Get more AI credits",
    },
  },
  "500-to-1000": {
    id: "500-to-1000",
    supportingPoints,
    annualPromoTitle,
    annualPromoBody,
    creditMode: "dropdown",
    defaultSelectedCredits: 1000,
    creditOptions: [
      {
        credits: 1000,
        label: "1,000 AI credits per month",
        priceLabel: "USD $168/month",
      },
      {
        credits: 2000,
        label: "2,000 AI credits per month",
        priceLabel: "USD $297/month",
      },
    ],
    fixedCreditHelper: "",
    upgradePageTitle: (credits) =>
      `Upgrade to the Ultimate ${credits} Individual plan`,
    upgradeCurrentPlanBanner:
      "Current plan: Ultimate 500 Individual, renews monthly.",
    upgradeCurrentPlanDetail:
      "Your next payment of $00.00 (excluding tax and discounts) is scheduled for Jan 07, 2027 – in 360 days.",
    startRightAwayCopy: "Your Ultimate individual plan will start right away!",
    source: {
      title: "Ultimate 500 Individual Subscription",
      planName: "Ultimate 500 Individual",
      primaryFeatureCount: "500",
      creditTotal: 500,
      creditRemaining: 500,
      resetDate: "14 August, 2026",
      elevateTitle: "Elevate your plan!",
      elevateBody:
        "Get more AI credits by upgrading your plan.",
      elevateCta: "Get more AI credits",
    },
    destination: {
      title: "Ultimate 1000 Individual Subscription",
      planName: "Ultimate 1000 Individual",
      primaryFeatureCount: "1000",
      creditTotal: 1000,
      creditRemaining: 1000,
      resetDate: "14 August, 2026",
      elevateTitle: "Elevate your plan!",
      elevateBody:
        "Get more AI credits by upgrading your plan.",
      elevateCta: "Get more AI credits",
    },
  },
  "1000-to-2000": {
    id: "1000-to-2000",
    supportingPoints,
    annualPromoTitle,
    annualPromoBody,
    creditMode: "fixed",
    defaultSelectedCredits: 2000,
    creditOptions: [
      {
        credits: 2000,
        label: "2000 AI credits",
        priceLabel: "USD $297/month",
      },
    ],
    fixedCreditHelper:
      "You're on our biggest step-up — 2000 monthly AI credits is the highest plan size available.",
    upgradePageTitle: () => "Upgrade to the Ultimate 2000 Individual plan",
    upgradeCurrentPlanBanner:
      "Current plan: Ultimate 1000 Individual, renews monthly.",
    upgradeCurrentPlanDetail:
      "Your next payment of $00.00 (excluding tax and discounts) is scheduled for Jan 07, 2027 – in 360 days.",
    startRightAwayCopy: "Your Ultimate individual plan will start right away!",
    source: {
      title: "Ultimate 1000 Individual Subscription",
      planName: "Ultimate 1000 Individual",
      primaryFeatureCount: "1000",
      creditTotal: 1000,
      creditRemaining: 1000,
      resetDate: "14 August, 2026",
      elevateTitle: "Elevate your plan!",
      elevateBody:
        "Get more AI credits by upgrading your plan.",
      elevateCta: "Get more AI credits",
    },
    destination: {
      title: "Ultimate 2000 Individual Subscription",
      planName: "Ultimate 2000 Individual",
      primaryFeatureCount: "2000",
      creditTotal: 2000,
      creditRemaining: 2000,
      resetDate: "14 August, 2026",
      elevateTitle: "Elevate your plan!",
      elevateBody:
        "Get more AI credits by upgrading your plan.",
      elevateCta: "Get more AI credits",
    },
  },
};

/**
 * Resolves the upgrade journey that applies when the user currently owns the
 * given credit tier, i.e. the journey whose starting plan matches `credits`.
 * Returns `undefined` for the top tier (2000), where no further upgrade exists.
 * This lets the journeys chain together (Plus → 500 → 1000 → 2000) so the
 * correct current-plan banner, source state and upgrade options are applied at
 * every step without returning to the hub.
 */
export function journeyFromCurrentCredits(
  credits: CreditTiers,
): JourneyConfig | undefined {
  return Object.values(journeyConfigs).find(
    (journey) => journey.source.creditTotal === credits,
  );
}

export function planStateForCredits(
  journey: JourneyConfig,
  credits: CreditTiers,
): PlanState {
  if (credits === journey.source.creditTotal) {
    return journey.source;
  }

  return {
    ...journey.destination,
    title: `Ultimate ${credits} Individual Subscription`,
    planName: `Ultimate ${credits} Individual`,
    primaryFeatureCount: String(credits),
    creditTotal: credits,
    creditRemaining: credits,
  };
}
