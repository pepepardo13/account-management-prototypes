import type { iconNames } from "@envato/design-system/components";
import { useState } from "react";

import { Bleed, Button, Icon } from "@envato/design-system/components";

import { useExternalUrls } from "../contexts/ExternalUrlsContext.tsx";

import envatoHref from "../components/Navigation/HomeLink/envato.svg";

import styles from "./AccountManagementPage.module.scss";

const figmaCheckmarkCircleOutlinedHref =
  "https://www.figma.com/api/mcp/asset/0cb4fe90-a493-4fd5-ad84-e95a19c5e003";
const figmaAiLabsHref =
  "https://www.figma.com/api/mcp/asset/eb23c786-deb1-4f12-91ee-1497e57e5f26";
const figmaTopBarAiLabsHref =
  "https://www.figma.com/api/mcp/asset/246282b7-5103-4142-8e6f-c5edd03b1e45";
const figmaTopBarChevronDownHref =
  "https://www.figma.com/api/mcp/asset/445862f2-db9b-4615-8e1b-8d17d7e57d31";
const figmaTopBarChevronUpHref =
  "https://www.figma.com/api/mcp/asset/232d94c6-e8ac-4e3c-acb2-ebede8673a24";
const standardSupportingPoints = [
  "Unlimited downloads of 27+ million of creative assets",
  "Lifetime commercial license for all creative assets and AI generations",
];

type IconName = (typeof iconNames)[number];

type ActionLink = {
  href: string;
  icon: IconName;
  label: string;
  external?: boolean;
};

type FooterLink = {
  href: string;
  label: string;
};

type PlanFeature = {
  badge?: string;
  count?: string;
  supportingPoints?: string[];
};

type PromoAction = {
  external?: boolean;
  href?: string;
  label: string;
  outlined?: boolean;
  radius?: "4px" | "8px";
  variant: "primary" | "secondary";
};

type PromoCard = {
  body: string;
  ctaHref?: string;
  ctaLabel?: string;
  emphasized?: boolean;
  actions: PromoAction[];
  title: string;
  usage?: {
    current: string;
    resetDate: string;
    total: string;
  };
};

type PageConfig = {
  copyright: string;
  manageSubscription: ActionLink[];
  nextPaymentAmount: string;
  nextPaymentDate: string;
  nextPaymentDays: number;
  planFeature: PlanFeature;
  promoCards: PromoCard[];
  renewalCadence: "monthly" | "annually";
  title: string;
};

export type AccountManagementVariant =
  | "core-monthly"
  | "core-monthly-alt"
  | "core-monthly-v2"
  | "core-annual-alt"
  | "core-annual"
  | "core-annual-v2"
  | "plus-monthly"
  | "plus-monthly-alt"
  | "plus-monthly-v2"
  | "plus-annual"
  | "plus-annual-alt"
  | "plus-annual-v2"
  | "ultimate-monthly"
  | "ultimate-monthly-v2"
  | "ultimate-annual"
  | "ultimate-annual-v2";

type Props = {
  variant?: AccountManagementVariant;
};

type UsageInfo = NonNullable<PromoCard["usage"]>;

const publicSocialLinks: Array<{ href: string; icon: IconName; label: string }> = [
  { href: "https://www.youtube.com/@Envato", icon: "youtube-outlined", label: "YouTube" },
  { href: "https://www.tiktok.com/@envato", icon: "tik-tok", label: "TikTok" },
  { href: "https://www.threads.net/@envato", icon: "threads", label: "Threads" },
  { href: "https://www.facebook.com/envato", icon: "facebook-square", label: "Facebook" },
  { href: "https://x.com/envato", icon: "twitter-x", label: "X" },
  { href: "https://www.pinterest.com/envato/", icon: "pinterest-circle", label: "Pinterest" },
  { href: "https://www.instagram.com/envato/", icon: "instagram", label: "Instagram" },
];

function withHash(url: string, hash: string) {
  return `${url}#${hash}`;
}

function navigateToUrl(url: string, external?: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  if (external) {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  window.location.assign(url);
}

function ActionItem({ action }: { action: ActionLink }) {
  return (
    <a
      className={styles["actionItem"]}
      href={action.href}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noreferrer" : undefined}
    >
      <span className={styles["actionItemContent"]}>
        <Icon name={action.icon} size="1x" />
        <span>{action.label}</span>
      </span>
      <Icon name={action.external ? "open-in-new" : "chevron-right"} size="1x" />
    </a>
  );
}

function getRemainingGenerations(usage: UsageInfo) {
  return Math.max(Number(usage.total) - Number(usage.current), 0);
}

function HeaderUsageGauge({
  usage,
  isExpanded,
  isWide = false,
  onToggle,
}: {
  usage: UsageInfo;
  isExpanded: boolean;
  isWide?: boolean;
  onToggle: () => void;
}) {
  const remainingGenerations = getRemainingGenerations(usage);
  const usagePercent = (remainingGenerations / Number(usage.total)) * 100;

  return (
    <div
      aria-label="AI generations remaining"
      className={`${styles["topBarUsage"]} ${
        isWide ? styles["topBarUsageWide"] : ""
      } ${isExpanded ? styles["topBarUsageExpanded"] : ""}`}
    >
      <div
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Collapse generation details" : "Expand generation details"}
        className={styles["topBarUsageSurface"]}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className={styles["topBarUsageButton"]}>
          <div className={styles["topBarUsageHeader"]}>
            <div className={styles["topBarUsageMeta"]}>
              <img alt="" src={figmaTopBarAiLabsHref} />
              <span className={styles["topBarUsageText"]}>
                {remainingGenerations} AI Generations remaining
              </span>
            </div>
            <span aria-hidden="true" className={styles["topBarUsageChevron"]}>
              <img
                alt=""
                src={isExpanded ? figmaTopBarChevronUpHref : figmaTopBarChevronDownHref}
              />
            </span>
          </div>
        </div>

        <div className={styles["topBarUsageMeter"]}>
          <div className={styles["progressTrack"]}>
            <div
              className={styles["progressFill"]}
              style={{
                width: `${usagePercent}%`,
              }}
            />
          </div>
        </div>
      </div>

      {isExpanded ? (
        <div className={styles["topBarUsageDetails"]}>
          <div className={styles["topBarUsageDetailRow"]}>
            <span className={styles["topBarUsageDetailText"]}>Total generations</span>
            <span
              className={`${styles["topBarUsageDetailText"]} ${styles["topBarUsageValue"]}`}
            >
              {usage.total}
            </span>
          </div>
          <div className={styles["topBarUsageDetailRow"]}>
            <span className={styles["topBarUsageDetailText"]}>Plan Resets</span>
            <span
              className={`${styles["topBarUsageDetailText"]} ${styles["topBarUsageValue"]}`}
            >
              {usage.resetDate}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PromoCardView({
  card,
  collapsibleUsage = false,
  hideUsage = false,
  isUsageExpanded = true,
  onToggleUsage,
}: {
  card: PromoCard;
  collapsibleUsage?: boolean;
  hideUsage?: boolean;
  isUsageExpanded?: boolean;
  onToggleUsage?: () => void;
}) {
  const remainingGenerations = card.usage ? getRemainingGenerations(card.usage) : 0;
  const hasVisibleUsage = Boolean(card.usage) && !hideUsage;
  const hasSingleActionUsageLayout = hasVisibleUsage && card.actions.length === 1;
  const hasCollapsibleUsage = hasVisibleUsage && collapsibleUsage;

  return (
    <article
      className={`${styles["promoCard"]} ${
        card.emphasized ? styles["promoCardPrimary"] : ""
      } ${!hasVisibleUsage ? styles["promoCardBottomAlignedActions"] : ""} ${
        hasSingleActionUsageLayout ? styles["promoCardSingleActionBottomAligned"] : ""
      } ${hasCollapsibleUsage ? styles["promoCardCollapsibleUsage"] : ""} ${
        hasCollapsibleUsage && !isUsageExpanded ? styles["promoCardUsageCollapsed"] : ""
      }`}
    >
      <h2 className={styles["cardTitle"]}>{card.title}</h2>

      {hasVisibleUsage && card.usage && (
        <div className={styles["usageMeter"]}>
          <div className={styles["usageMeta"]}>
            <strong>{remainingGenerations} AI Generations remaining</strong>
            {hasCollapsibleUsage ? (
              <button
                aria-expanded={isUsageExpanded}
                aria-label={isUsageExpanded ? "Collapse generation details" : "Expand generation details"}
                className={styles["usageToggle"]}
                onClick={onToggleUsage}
                type="button"
              >
                <Icon name={isUsageExpanded ? "chevron-up" : "chevron-down"} size="1x" />
              </button>
            ) : null}
          </div>
          <div className={styles["progressTrack"]}>
            <div
              className={styles["progressFill"]}
              style={{
                width: `${(remainingGenerations / Number(card.usage.total)) * 100}%`,
              }}
            />
          </div>
          {(!hasCollapsibleUsage || isUsageExpanded) && (
            <div className={styles["usageDetails"]}>
              <div className={styles["usageDetailRow"]}>
                <span className={styles["usageDetailText"]}>Total generations</span>
                <span className={styles["usageDetailText"]}>{card.usage.total}</span>
              </div>
              <div className={styles["usageDetailRow"]}>
                <span className={styles["usageDetailText"]}>Plan resets</span>
                <span className={styles["usageDetailText"]}>{card.usage.resetDate}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <p className={styles["cardCopy"]}>
        {card.body}{" "}
        {card.ctaHref && card.ctaLabel ? (
          <a href={card.ctaHref}>{card.ctaLabel}</a>
        ) : null}
      </p>

      <div className={styles["cardSpacer"]} />

      <div className={styles["cardActions"]}>
        {card.actions.map((action) => (
          <div
            className={[
              action.outlined ? styles["outlinedButton"] : "",
              action.radius === "8px" ? styles["annualButton"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            key={action.label}
          >
            <Button
              onClick={
                action.href
                  ? () => {
                      navigateToUrl(action.href!, action.external);
                    }
                  : undefined
              }
              size="large"
              variant={action.variant}
              width="full"
            >
              {action.label}
            </Button>
          </div>
        ))}
      </div>
    </article>
  );
}

export function AccountManagementPage({ variant = "core-monthly" }: Props) {
  const externalUrls = useExternalUrls();
  const [isAltUsageExpanded, setIsAltUsageExpanded] = useState(false);
  const [isTopBarUsageExpanded, setIsTopBarUsageExpanded] = useState(false);
  const isCoreMonthlyVariant = variant === "core-monthly";
  const isCoreMonthlyAltVariant = variant === "core-monthly-alt";
  const isCoreMonthlyV2Variant = variant === "core-monthly-v2";
  const isCoreMonthlyFamilyVariant =
    isCoreMonthlyVariant || isCoreMonthlyAltVariant || isCoreMonthlyV2Variant;
  const isCoreAnnualVariant = variant === "core-annual";
  const isCoreAnnualAltVariant = variant === "core-annual-alt";
  const isCoreAnnualV2Variant = variant === "core-annual-v2";
  const isCoreAnnualFamilyVariant =
    isCoreAnnualVariant || isCoreAnnualAltVariant || isCoreAnnualV2Variant;
  const isPlusMonthlyVariant = variant === "plus-monthly";
  const isPlusMonthlyAltVariant = variant === "plus-monthly-alt";
  const isPlusMonthlyV2Variant = variant === "plus-monthly-v2";
  const isPlusMonthlyFamilyVariant =
    isPlusMonthlyVariant || isPlusMonthlyAltVariant || isPlusMonthlyV2Variant;
  const isPlusAnnualVariant = variant === "plus-annual";
  const isPlusAnnualAltVariant = variant === "plus-annual-alt";
  const isPlusAnnualV2Variant = variant === "plus-annual-v2";
  const isPlusAnnualFamilyVariant =
    isPlusAnnualVariant || isPlusAnnualAltVariant || isPlusAnnualV2Variant;
  const isUltimateMonthlyVariant = variant === "ultimate-monthly";
  const isUltimateMonthlyV2Variant = variant === "ultimate-monthly-v2";
  const isUltimateMonthlyFamilyVariant = isUltimateMonthlyVariant || isUltimateMonthlyV2Variant;
  const isUltimateAnnualVariant = variant === "ultimate-annual";
  const isUltimateAnnualV2Variant = variant === "ultimate-annual-v2";
  const isUltimateAnnualFamilyVariant = isUltimateAnnualVariant || isUltimateAnnualV2Variant;
  const isRefreshedV2Variant =
    isCoreMonthlyV2Variant ||
    isCoreAnnualV2Variant ||
    isPlusMonthlyV2Variant ||
    isPlusAnnualV2Variant ||
    isUltimateMonthlyV2Variant ||
    isUltimateAnnualV2Variant;
  const hasTopBarUsageVariant =
    isCoreMonthlyV2Variant ||
    isCoreAnnualV2Variant ||
    isPlusMonthlyV2Variant ||
    isPlusAnnualV2Variant;
  const hasWideTopBarUsageVariant = isPlusMonthlyV2Variant || isPlusAnnualV2Variant;
  const hasShortRefreshedV2HeroCards = isPlusMonthlyV2Variant || isPlusAnnualV2Variant;
  const hasUltimateMonthlyV2HeroCards = isUltimateMonthlyV2Variant;
  const isAltVariant =
    isCoreMonthlyAltVariant || isCoreAnnualAltVariant || isPlusMonthlyAltVariant || isPlusAnnualAltVariant;
  const pricingUrl = new URL("/pricing", externalUrls.storefront).toString();
  const forumsUrl = "https://forums.envato.com";
  const cookiesUrl = `${externalUrls.privacyPolicy}#cookies`;
  const cookieSettingsUrl = `${externalUrls.privacyPolicy}#cookie-settings`;

  const accountSettings: ActionLink[] = [
    {
      href: withHash(externalUrls.myAccount, "profile"),
      icon: "edit",
      label: "Edit profile",
    },
    {
      href: withHash(externalUrls.myAccount, "password"),
      icon: "key",
      label: "Change password",
    },
    {
      href: withHash(externalUrls.myAccount, "two-factor"),
      icon: "security-on",
      label: "Two-factor authentication (2FA)",
    },
  ];

  const sharedManageSubscriptionLinks: ActionLink[] = [
    {
      href: `${pricingUrl}?plan=teams`,
      icon: "group-add",
      label: "Upgrade to Teams",
    },
    {
      href: withHash(externalUrls.myAccount, "payment-method"),
      icon: "credit-card",
      label: "Payment method",
    },
    {
      href: withHash(externalUrls.myAccount, "billing-information"),
      icon: "receipt",
      label: "Billing information",
    },
    {
      href: withHash(externalUrls.myAccount, "payment-history"),
      icon: "documents",
      label: "Payment history",
    },
    {
      href: withHash(externalUrls.myAccount, "cancel-subscription"),
      icon: "clear",
      label: "Cancel subscription",
    },
  ];

  const ultimateManageSubscriptionLinks: ActionLink[] = [
    {
      href: `${pricingUrl}?plan=teams`,
      icon: "group-add",
      label: "Upgrade to Teams",
    },
    {
      href: withHash(externalUrls.myAccount, "change-plan"),
      icon: "swap-horizontal",
      label: "Change my plan",
    },
    {
      href: withHash(externalUrls.myAccount, "payment-method"),
      icon: "credit-card",
      label: "Payment method",
    },
    {
      href: withHash(externalUrls.myAccount, "billing-information"),
      icon: "receipt",
      label: "Billing information",
    },
    {
      href: withHash(externalUrls.myAccount, "payment-history"),
      icon: "documents",
      label: "Payment history",
    },
    {
      href: withHash(externalUrls.myAccount, "cancel-subscription"),
      icon: "clear",
      label: "Cancel subscription",
    },
  ];

  const configs: Record<AccountManagementVariant, PageConfig> = {
    "core-monthly": {
      title: "Core Individual Subscription",
      renewalCadence: "monthly",
      nextPaymentAmount: "USD $33.00",
      nextPaymentDate: "Jan 07, 2027",
      nextPaymentDays: 360,
      planFeature: { count: "10", supportingPoints: standardSupportingPoints },
      promoCards: [
        {
          title: "Elevate your plan!",
          body: "Upgrade to the Plus or Ultimate plan and unlock up to 100 or unlimited generations.",
          ctaHref: pricingUrl,
          ctaLabel: "Explore more",
          emphasized: true,
          usage: { current: "5", total: "10", resetDate: "14 April, 2026" },
          actions: [
            {
              href: `${pricingUrl}?plan=ultimate`,
              label: "Upgrade to Ultimate",
              variant: "primary",
            },
            {
              href: `${pricingUrl}?plan=plus`,
              label: "Upgrade to Plus",
              outlined: true,
              radius: "4px",
              variant: "secondary",
            },
          ],
        },
        {
          title: "Switch to annual payments and save 50%",
          body: "Save $198.00/year ($16.50/month) with an annual plan, same unlimited access, half the price.",
          actions: [
            {
              href: withHash(externalUrls.myAccount, "switch-to-annual"),
              label: "Switch to annual",
              outlined: true,
              radius: "8px",
              variant: "secondary",
            },
          ],
        },
      ],
      manageSubscription: sharedManageSubscriptionLinks,
      copyright:
        "© 2023 Envato Elements Pty Ltd. Trademarks and brands are the property of their respective owners.",
    },
    "core-monthly-alt": {
      title: "Core Individual Subscription",
      renewalCadence: "monthly",
      nextPaymentAmount: "USD $33.00",
      nextPaymentDate: "Jan 07, 2027",
      nextPaymentDays: 360,
      planFeature: { count: "10" },
      promoCards: [
        {
          title: "Elevate your plan!",
          body: "Upgrade to the Plus or Ultimate plan and unlock up to 100 or unlimited generations.",
          ctaHref: pricingUrl,
          ctaLabel: "Explore more",
          emphasized: true,
          usage: { current: "5", total: "10", resetDate: "14 April, 2026" },
          actions: [
            {
              href: `${pricingUrl}?plan=ultimate`,
              label: "Upgrade to Ultimate",
              variant: "primary",
            },
            {
              href: `${pricingUrl}?plan=plus`,
              label: "Upgrade to Plus",
              outlined: true,
              radius: "4px",
              variant: "secondary",
            },
          ],
        },
        {
          title: "Switch to annual payments and save 50%",
          body: "Save $198.00/year ($16.50/month) with an annual plan, same unlimited access, half the price.",
          actions: [
            {
              href: withHash(externalUrls.myAccount, "switch-to-annual"),
              label: "Switch to annual",
              outlined: true,
              radius: "8px",
              variant: "secondary",
            },
          ],
        },
      ],
      manageSubscription: sharedManageSubscriptionLinks,
      copyright:
        "© 2023 Envato Elements Pty Ltd. Trademarks and brands are the property of their respective owners.",
    },
    "core-monthly-v2": {
      title: "Core Individual Subscription",
      renewalCadence: "monthly",
      nextPaymentAmount: "USD $33.00",
      nextPaymentDate: "Jan 07, 2027",
      nextPaymentDays: 360,
      planFeature: {
        count: "10",
        supportingPoints: standardSupportingPoints,
      },
      promoCards: [
        {
          title: "Elevate your plan!",
          body: "Upgrade to the Plus or Ultimate plan and unlock up to 100 or unlimited generations.",
          ctaHref: pricingUrl,
          ctaLabel: "Explore more",
          emphasized: true,
          usage: { current: "5", total: "10", resetDate: "Mar 20, 2026" },
          actions: [
            {
              href: `${pricingUrl}?plan=ultimate`,
              label: "Upgrade to Ultimate",
              variant: "primary",
            },
            {
              href: `${pricingUrl}?plan=plus`,
              label: "Upgrade to Plus",
              outlined: true,
              radius: "4px",
              variant: "secondary",
            },
          ],
        },
        {
          title: "Switch to annual payments and save 50%",
          body: "Save $198.00/year ($16.50/month) with an annual plan, same unlimited access, half the price.",
          actions: [
            {
              href: withHash(externalUrls.myAccount, "switch-to-annual"),
              label: "Switch to annual",
              outlined: true,
              radius: "8px",
              variant: "secondary",
            },
          ],
        },
      ],
      manageSubscription: sharedManageSubscriptionLinks,
      copyright:
        "© 2023 Envato Elements Pty Ltd. Trademarks and brands are the property of their respective owners.",
    },
    "core-annual": {
      title: "Core Individual Subscription",
      renewalCadence: "annually",
      nextPaymentAmount: "USD $00.00",
      nextPaymentDate: "Nov 27, 2025",
      nextPaymentDays: 360,
      planFeature: { count: "10" },
      promoCards: [
        {
          title: "Elevate your plan!",
          body: "Upgrade to the Plus or Ultimate plan and unlock up to 100 or unlimited generations.",
          ctaHref: pricingUrl,
          ctaLabel: "Explore more",
          emphasized: true,
          usage: { current: "5", total: "10", resetDate: "14 April, 2026" },
          actions: [
            {
              href: `${pricingUrl}?plan=ultimate`,
              label: "Upgrade to Ultimate",
              variant: "primary",
            },
            {
              href: `${pricingUrl}?plan=plus`,
              label: "Upgrade to Plus",
              outlined: true,
              radius: "4px",
              variant: "secondary",
            },
          ],
        },
      ],
      manageSubscription: sharedManageSubscriptionLinks,
      copyright:
        "© 2023 Envato Elements Pty Ltd. Trademarks and brands are the property of their respective owners.",
    },
    "core-annual-alt": {
      title: "Core Individual Subscription",
      renewalCadence: "annually",
      nextPaymentAmount: "USD $00.00",
      nextPaymentDate: "Nov 27, 2025",
      nextPaymentDays: 360,
      planFeature: { count: "10" },
      promoCards: [
        {
          title: "Elevate your plan!",
          body: "Upgrade to the Plus or Ultimate plan and unlock up to 100 or unlimited generations.",
          ctaHref: pricingUrl,
          ctaLabel: "Explore more",
          emphasized: true,
          usage: { current: "5", total: "10", resetDate: "14 April, 2026" },
          actions: [
            {
              href: `${pricingUrl}?plan=ultimate`,
              label: "Upgrade to Ultimate",
              variant: "primary",
            },
            {
              href: `${pricingUrl}?plan=plus`,
              label: "Upgrade to Plus",
              outlined: true,
              radius: "4px",
              variant: "secondary",
            },
          ],
        },
      ],
      manageSubscription: sharedManageSubscriptionLinks,
      copyright:
        "© 2023 Envato Elements Pty Ltd. Trademarks and brands are the property of their respective owners.",
    },
    "core-annual-v2": {
      title: "Core Individual Subscription",
      renewalCadence: "annually",
      nextPaymentAmount: "USD $00.00",
      nextPaymentDate: "Nov 27, 2025",
      nextPaymentDays: 360,
      planFeature: { count: "10", supportingPoints: standardSupportingPoints },
      promoCards: [
        {
          title: "Elevate your plan!",
          body: "Upgrade to the Plus or Ultimate plan and unlock up to 100 or unlimited generations.",
          ctaHref: pricingUrl,
          ctaLabel: "Explore more",
          emphasized: true,
          usage: { current: "5", total: "10", resetDate: "Mar 20, 2026" },
          actions: [
            {
              href: `${pricingUrl}?plan=ultimate`,
              label: "Upgrade to Ultimate",
              variant: "primary",
            },
            {
              href: `${pricingUrl}?plan=plus`,
              label: "Upgrade to Plus",
              outlined: true,
              radius: "4px",
              variant: "secondary",
            },
          ],
        },
      ],
      manageSubscription: sharedManageSubscriptionLinks,
      copyright:
        "© 2023 Envato Elements Pty Ltd. Trademarks and brands are the property of their respective owners.",
    },
    "plus-monthly": {
      title: "Plus Individual Subscription",
      renewalCadence: "monthly",
      nextPaymentAmount: "USD $33.00",
      nextPaymentDate: "Jan 07, 2027",
      nextPaymentDays: 360,
      planFeature: { count: "100" },
      promoCards: [
        {
          title: "Elevate your plan!",
          body: "Upgrade to the Ultimate plan and unlock unlimited generations.",
          ctaHref: pricingUrl,
          ctaLabel: "Explore more",
          emphasized: true,
          usage: { current: "50", total: "100", resetDate: "14 April, 2026" },
          actions: [
            {
              href: `${pricingUrl}?plan=ultimate`,
              label: "Upgrade to Ultimate",
              variant: "primary",
            },
          ],
        },
        {
          title: "Switch to annual payments and save 50%",
          body: "Save $198.00/year ($16.50/month) with an annual plan, same unlimited access, half the price.",
          actions: [
            {
              href: withHash(externalUrls.myAccount, "switch-to-annual"),
              label: "Switch to annual",
              outlined: true,
              radius: "8px",
              variant: "secondary",
            },
          ],
        },
      ],
      manageSubscription: sharedManageSubscriptionLinks,
      copyright:
        "© 2023 Envato Elements Pty Ltd. Trademarks and brands are the property of their respective owners.",
    },
    "plus-monthly-alt": {
      title: "Plus Individual Subscription",
      renewalCadence: "monthly",
      nextPaymentAmount: "USD $33.00",
      nextPaymentDate: "Jan 07, 2027",
      nextPaymentDays: 360,
      planFeature: { count: "100" },
      promoCards: [
        {
          title: "Elevate your plan!",
          body: "Upgrade to the Ultimate plan and unlock unlimited generations.",
          ctaHref: pricingUrl,
          ctaLabel: "Explore more",
          emphasized: true,
          usage: { current: "50", total: "100", resetDate: "14 April, 2026" },
          actions: [
            {
              href: `${pricingUrl}?plan=ultimate`,
              label: "Upgrade to Ultimate",
              variant: "primary",
            },
          ],
        },
        {
          title: "Switch to annual payments and save 50%",
          body: "Save $198.00/year ($16.50/month) with an annual plan, same unlimited access, half the price.",
          actions: [
            {
              href: withHash(externalUrls.myAccount, "switch-to-annual"),
              label: "Switch to annual",
              outlined: true,
              radius: "8px",
              variant: "secondary",
            },
          ],
        },
      ],
      manageSubscription: sharedManageSubscriptionLinks,
      copyright:
        "© 2023 Envato Elements Pty Ltd. Trademarks and brands are the property of their respective owners.",
    },
    "plus-monthly-v2": {
      title: "Plus Individual Subscription",
      renewalCadence: "monthly",
      nextPaymentAmount: "USD $33.00",
      nextPaymentDate: "Jan 07, 2027",
      nextPaymentDays: 360,
      planFeature: { count: "100", supportingPoints: standardSupportingPoints },
      promoCards: [
        {
          title: "Elevate your plan!",
          body: "Upgrade to the Ultimate plan and unlock unlimited generations.",
          ctaHref: pricingUrl,
          ctaLabel: "Explore more",
          emphasized: true,
          usage: { current: "50", total: "100", resetDate: "Mar 20, 2026" },
          actions: [
            {
              href: `${pricingUrl}?plan=ultimate`,
              label: "Upgrade to Ultimate",
              variant: "primary",
            },
          ],
        },
        {
          title: "Switch to annual payments and save 50%",
          body: "Save $198.00/year ($16.50/month) with an annual plan, same unlimited access, half the price.",
          actions: [
            {
              href: withHash(externalUrls.myAccount, "switch-to-annual"),
              label: "Switch to annual",
              outlined: true,
              radius: "8px",
              variant: "secondary",
            },
          ],
        },
      ],
      manageSubscription: sharedManageSubscriptionLinks,
      copyright:
        "© 2023 Envato Elements Pty Ltd. Trademarks and brands are the property of their respective owners.",
    },
    "plus-annual": {
      title: "Plus Individual Subscription",
      renewalCadence: "annually",
      nextPaymentAmount: "USD $00.00",
      nextPaymentDate: "Nov 27, 2025",
      nextPaymentDays: 360,
      planFeature: { count: "100" },
      promoCards: [
        {
          title: "Elevate your plan!",
          body: "Upgrade to the Ultimate plan and unlock unlimited generations.",
          ctaHref: pricingUrl,
          ctaLabel: "Explore more",
          emphasized: true,
          usage: { current: "50", total: "100", resetDate: "14 April, 2026" },
          actions: [
            {
              href: `${pricingUrl}?plan=ultimate`,
              label: "Upgrade to Ultimate",
              variant: "primary",
            },
          ],
        },
      ],
      manageSubscription: sharedManageSubscriptionLinks,
      copyright:
        "© 2023 Envato Elements Pty Ltd. Trademarks and brands are the property of their respective owners.",
    },
    "plus-annual-alt": {
      title: "Plus Individual Subscription",
      renewalCadence: "annually",
      nextPaymentAmount: "USD $00.00",
      nextPaymentDate: "Nov 27, 2025",
      nextPaymentDays: 360,
      planFeature: { count: "100" },
      promoCards: [
        {
          title: "Elevate your plan!",
          body: "Upgrade to the Ultimate plan and unlock unlimited generations.",
          ctaHref: pricingUrl,
          ctaLabel: "Explore more",
          emphasized: true,
          usage: { current: "50", total: "100", resetDate: "14 April, 2026" },
          actions: [
            {
              href: `${pricingUrl}?plan=ultimate`,
              label: "Upgrade to Ultimate",
              variant: "primary",
            },
          ],
        },
      ],
      manageSubscription: sharedManageSubscriptionLinks,
      copyright:
        "© 2023 Envato Elements Pty Ltd. Trademarks and brands are the property of their respective owners.",
    },
    "plus-annual-v2": {
      title: "Plus Individual Subscription",
      renewalCadence: "annually",
      nextPaymentAmount: "USD $00.00",
      nextPaymentDate: "Nov 27, 2025",
      nextPaymentDays: 360,
      planFeature: { count: "100", supportingPoints: standardSupportingPoints },
      promoCards: [
        {
          title: "Elevate your plan!",
          body: "Upgrade to the Ultimate plan and unlock unlimited generations.",
          ctaHref: pricingUrl,
          ctaLabel: "Explore more",
          emphasized: true,
          usage: { current: "50", total: "100", resetDate: "Mar 20, 2026" },
          actions: [
            {
              href: `${pricingUrl}?plan=ultimate`,
              label: "Upgrade to Ultimate",
              variant: "primary",
            },
          ],
        },
      ],
      manageSubscription: sharedManageSubscriptionLinks,
      copyright:
        "© 2023 Envato Elements Pty Ltd. Trademarks and brands are the property of their respective owners.",
    },
    "ultimate-monthly": {
      title: "Ultimate Individual Subscription",
      renewalCadence: "monthly",
      nextPaymentAmount: "USD $33.00",
      nextPaymentDate: "Jan 07, 2027",
      nextPaymentDays: 360,
      planFeature: { badge: "Unlimited" },
      promoCards: [
        {
          title: "Switch to annual payments and save 50%",
          body: "Save $198.00/year ($16.50/month) with an annual plan, same unlimited access, half the price.",
          actions: [
            {
              href: withHash(externalUrls.myAccount, "switch-to-annual"),
              label: "Switch to annual",
              outlined: true,
              radius: "8px",
              variant: "secondary",
            },
          ],
        },
      ],
      manageSubscription: ultimateManageSubscriptionLinks,
      copyright:
        "© 2026 Envato Trademarks and brands are the property of their respective owners.",
    },
    "ultimate-monthly-v2": {
      title: "Ultimate Individual Subscription",
      renewalCadence: "monthly",
      nextPaymentAmount: "USD $33.00",
      nextPaymentDate: "Jan 07, 2027",
      nextPaymentDays: 360,
      planFeature: { badge: "Unlimited", supportingPoints: standardSupportingPoints },
      promoCards: [
        {
          title: "Switch to annual payments and save 50%",
          body: "Save $198.00/year ($16.50/month) with an annual plan, same unlimited access, half the price.",
          actions: [
            {
              href: withHash(externalUrls.myAccount, "switch-to-annual"),
              label: "Switch to annual",
              outlined: true,
              radius: "8px",
              variant: "secondary",
            },
          ],
        },
      ],
      manageSubscription: ultimateManageSubscriptionLinks,
      copyright:
        "© 2026 Envato Trademarks and brands are the property of their respective owners.",
    },
    "ultimate-annual": {
      title: "Ultimate Individual Subscription",
      renewalCadence: "annually",
      nextPaymentAmount: "USD $00.00",
      nextPaymentDate: "Nov 27, 2025",
      nextPaymentDays: 360,
      planFeature: { badge: "Unlimited" },
      promoCards: [],
      manageSubscription: ultimateManageSubscriptionLinks,
      copyright:
        "© 2026 Envato Trademarks and brands are the property of their respective owners.",
    },
    "ultimate-annual-v2": {
      title: "Ultimate Individual Subscription",
      renewalCadence: "annually",
      nextPaymentAmount: "USD $00.00",
      nextPaymentDate: "Nov 27, 2025",
      nextPaymentDays: 360,
      planFeature: { badge: "Unlimited", supportingPoints: standardSupportingPoints },
      promoCards: [],
      manageSubscription: ultimateManageSubscriptionLinks,
      copyright:
        "© 2026 Envato Trademarks and brands are the property of their respective owners.",
    },
  };

  const config = configs[variant];
  const isAnnualVariant = config.renewalCadence === "annually";
  const hasSingleAnnualHeroCard = isAnnualVariant && config.promoCards.length === 1;
  const topBarUsage = hasTopBarUsageVariant
    ? config.promoCards.find((card) => card.usage)?.usage
    : undefined;

  const supportLinks: ActionLink[] = [
    {
      href: externalUrls.helpCenterHome,
      icon: "help",
      label: "Help Center",
      external: true,
    },
    { href: forumsUrl, icon: "comment-text", label: "Forums", external: true },
  ];

  const footerLinks: FooterLink[] = [
    { href: externalUrls.storefront, label: "About Elements" },
    { href: pricingUrl, label: "Plans & Pricing" },
    { href: externalUrls.licenseTerms, label: "License Terms" },
    { href: externalUrls.userTerms, label: "Terms & Conditions" },
    { href: externalUrls.privacyPolicy, label: "Privacy Policy" },
    { href: cookiesUrl, label: "Cookies" },
    {
      href: externalUrls.personalInformation,
      label: "Do not share my personal information",
    },
    { href: externalUrls.helpCenterHome, label: "Help Center" },
    { href: cookieSettingsUrl, label: "Cookie Settings" },
  ];

  return (
    <Bleed uniform="3x">
      <div className={styles["page"]} data-variant={variant}>
        <header className={styles["topBar"]}>
          <div className={styles["topBarInner"]}>
            <a
              aria-label="Envato home"
              className={styles["logoLink"]}
              href={externalUrls.storefront}
            >
              <img alt="Envato" src={envatoHref} />
            </a>

            <div
              className={`${styles["topBarActions"]} ${
                hasTopBarUsageVariant ? styles["refreshedV2TopBarActions"] : ""
              } ${
                hasWideTopBarUsageVariant ? styles["wideTopBarUsageActions"] : ""
              }`}
            >
              {topBarUsage ? (
                <HeaderUsageGauge
                  isExpanded={isTopBarUsageExpanded}
                  isWide={hasWideTopBarUsageVariant}
                  onToggle={() => setIsTopBarUsageExpanded((current) => !current)}
                  usage={topBarUsage}
                />
              ) : null}

              <button className={styles["profileButton"]} type="button">
                <span>Juan</span>
                <Icon color="secondary" name="chevron-down" size="1x" />
              </button>
            </div>
          </div>
        </header>

        <section className={styles["heroSection"]}>
          <div
            className={`${styles["heroInner"]} ${
              isAnnualVariant ? styles["annualHeroInner"] : ""
            } ${
              isRefreshedV2Variant ? styles["refreshedV2HeroInner"] : ""
            } ${
              isPlusMonthlyFamilyVariant ? styles["plusMonthlyHeroInner"] : ""
            } ${
              isUltimateMonthlyFamilyVariant ? styles["ultimateMonthlyHeroInner"] : ""
            }`}
          >
            <div
              className={`${styles["planSummary"]} ${
                hasSingleAnnualHeroCard ? styles["annualPlanSummary"] : ""
              } ${
                isRefreshedV2Variant ? styles["refreshedV2PlanSummary"] : ""
              } ${
                isPlusMonthlyFamilyVariant ? styles["plusMonthlyPlanSummary"] : ""
              } ${
                isUltimateMonthlyFamilyVariant ? styles["ultimateMonthlyPlanSummary"] : ""
              }`}
            >
              <p className={styles["eyebrow"]}>Current Plan</p>
              <h1 className={styles["pageTitle"]}>{config.title}</h1>
              <p
                className={`${styles["description"]} ${
                  isAnnualVariant ? styles["annualDescription"] : ""
                }`}
              >
                Your subscription renews <strong>{config.renewalCadence}</strong>.
                {" "}Your next payment of <strong>{config.nextPaymentAmount}</strong>
                {" "}(excluding tax and discounts) is scheduled for{" "}
                <strong>{config.nextPaymentDate}</strong>
                {isAnnualVariant || isRefreshedV2Variant ? (
                  <> {"\u2014"} in {config.nextPaymentDays} days.</>
                ) : (
                  <> in {config.nextPaymentDays} days.</>
                )}
              </p>

              <div className={styles["planFeature"]}>
                <span className={styles["planFeatureIcon"]}>
                  <img alt="" src={figmaAiLabsHref} />
                </span>
                <div className={styles["planFeatureText"]}>
                  <span>Includes</span>
                  {config.planFeature.badge ? (
                    <span className={styles["featureBadge"]}>
                      {config.planFeature.badge}
                    </span>
                  ) : (
                    <strong>{config.planFeature.count}</strong>
                  )}
                  <span>AI generations</span>
                </div>
              </div>

              {config.planFeature.supportingPoints?.length ? (
                <div className={styles["planFeatureSupportingPoints"]}>
                  {config.planFeature.supportingPoints.map((point) => (
                    <div className={styles["planFeatureSupportingPoint"]} key={point}>
                      <span className={styles["planFeatureIcon"]}>
                        <img alt="" src={figmaCheckmarkCircleOutlinedHref} />
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {config.promoCards.length > 0 ? (
              <div
                className={`${styles["heroCards"]} ${
                  isPlusAnnualFamilyVariant ? styles["plusAnnualHeroCards"] : ""
                } ${
                  isUltimateAnnualFamilyVariant ? styles["ultimateAnnualHeroCards"] : ""
                } ${
                  isCoreMonthlyFamilyVariant ? styles["coreMonthlyHeroCards"] : ""
                } ${
                  isRefreshedV2Variant ? styles["refreshedV2HeroCards"] : ""
                } ${
                  hasShortRefreshedV2HeroCards ? styles["shortRefreshedV2HeroCards"] : ""
                } ${
                  hasUltimateMonthlyV2HeroCards ? styles["ultimateMonthlyV2HeroCards"] : ""
                } ${
                  isCoreAnnualFamilyVariant ? styles["coreAnnualHeroCards"] : ""
                } ${
                  isAltVariant ? styles["collapsibleHeroCards"] : ""
                } ${
                  isAltVariant && !isAltUsageExpanded
                    ? styles["collapsibleHeroCardsCollapsed"]
                    : ""
                } ${
                  isPlusMonthlyFamilyVariant ? styles["plusMonthlyHeroCards"] : ""
                } ${
                  isUltimateMonthlyFamilyVariant ? styles["ultimateMonthlyHeroCards"] : ""
                } ${
                  config.promoCards.length === 1 ? styles["heroCardsSingle"] : ""
                }`}
              >
                {config.promoCards.map((card) => (
                  <PromoCardView
                    card={card}
                    collapsibleUsage={isAltVariant}
                    hideUsage={hasTopBarUsageVariant}
                    isUsageExpanded={isAltUsageExpanded}
                    key={card.title}
                    onToggleUsage={
                      isAltVariant
                        ? () => setIsAltUsageExpanded((current) => !current)
                        : undefined
                    }
                  />
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className={styles["bodyPanel"]}>
          <div className={styles["bodyInner"]}>
            <div className={styles["actionsGrid"]}>
              <section>
                <h2 className={styles["sectionTitle"]}>Account settings</h2>
                <div className={styles["actionsList"]}>
                  {accountSettings.map((action) => (
                    <ActionItem action={action} key={action.label} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className={styles["sectionTitle"]}>Manage subscription</h2>
                <div className={styles["actionsList"]}>
                  {config.manageSubscription.map((action) => (
                    <ActionItem action={action} key={action.label} />
                  ))}
                </div>
              </section>
            </div>

            <div className={styles["sectionDivider"]} />

            <div className={styles["supportGrid"]}>
              {supportLinks.map((action) => (
                <ActionItem action={action} key={action.label} />
              ))}
            </div>
          </div>
        </section>

        <footer className={styles["footer"]}>
          <div className={styles["footerInner"]}>
            <nav aria-label="Footer links" className={styles["footerLinks"]}>
              {footerLinks.map((link) => (
                <a href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className={styles["footerMeta"]}>
              <div className={styles["socialLinks"]}>
                {publicSocialLinks.map((link) => (
                  <a aria-label={link.label} href={link.href} key={link.label}>
                    <Icon name={link.icon} size="1x" />
                  </a>
                ))}
              </div>

              <button className={styles["localeButton"]} type="button">
                <Icon name="globe" size="1x" />
                <span>English</span>
                <Icon name="chevron-down" size="1x" />
              </button>
            </div>

            <p className={styles["copyright"]}>{config.copyright}</p>
          </div>
        </footer>
      </div>
    </Bleed>
  );
}
