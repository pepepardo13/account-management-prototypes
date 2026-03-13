import type { iconNames } from "@envato/design-system/components";

import { Bleed, Button, Icon } from "@envato/design-system/components";

import { useExternalUrls } from "../contexts/ExternalUrlsContext.tsx";

import envatoHref from "../components/Navigation/HomeLink/envato.svg";

import styles from "./AccountManagementPage.module.scss";

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
  | "core-annual"
  | "plus-monthly"
  | "plus-annual"
  | "ultimate-monthly"
  | "ultimate-annual";

type Props = {
  variant?: AccountManagementVariant;
};

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

function PromoCardView({ card }: { card: PromoCard }) {
  const remainingGenerations = card.usage
    ? Math.max(Number(card.usage.total) - Number(card.usage.current), 0)
    : 0;
  const hasSingleActionUsageLayout = Boolean(card.usage) && card.actions.length === 1;

  return (
    <article
      className={`${styles["promoCard"]} ${
        card.emphasized ? styles["promoCardPrimary"] : ""
      } ${!card.usage ? styles["promoCardBottomAlignedActions"] : ""} ${
        hasSingleActionUsageLayout ? styles["promoCardSingleActionBottomAligned"] : ""
      }`}
    >
      <h2 className={styles["cardTitle"]}>{card.title}</h2>

      {card.usage && (
        <div className={styles["usageMeter"]}>
          <div className={styles["usageMeta"]}>
            <strong>{remainingGenerations} Generations remaining</strong>
          </div>
          <div className={styles["progressTrack"]}>
            <div
              className={styles["progressFill"]}
              style={{
                width: `${(remainingGenerations / Number(card.usage.total)) * 100}%`,
              }}
            />
          </div>
          <div className={styles["usageDetails"]}>
            <div className={styles["usageDetailRow"]}>
              <span>Total generations</span>
              <span>{card.usage.total}</span>
            </div>
            <div className={styles["usageDetailRow"]}>
              <span>Plan resets</span>
              <span>{card.usage.resetDate}</span>
            </div>
          </div>
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
  const isCoreMonthlyVariant = variant === "core-monthly";
  const isCoreAnnualVariant = variant === "core-annual";
  const isPlusMonthlyVariant = variant === "plus-monthly";
  const isPlusAnnualVariant = variant === "plus-annual";
  const isUltimateMonthlyVariant = variant === "ultimate-monthly";
  const isUltimateAnnualVariant = variant === "ultimate-annual";
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
          body: "Upgrade to the Plus or Ultimate plan and unlock up to 100 or unlimited generations.",
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
          body: "Upgrade to the Plus or Ultimate plan and unlock up to 100 or unlimited generations.",
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
  };

  const config = configs[variant];
  const isAnnualVariant = config.renewalCadence === "annually";
  const hasSingleAnnualHeroCard = isAnnualVariant && config.promoCards.length === 1;

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
      <div className={styles["page"]}>
        <header className={styles["topBar"]}>
          <div className={styles["topBarInner"]}>
            <a
              aria-label="Envato home"
              className={styles["logoLink"]}
              href={externalUrls.storefront}
            >
              <img alt="Envato" src={envatoHref} />
            </a>

            <button className={styles["profileButton"]} type="button">
              <span>Juan</span>
              <Icon color="secondary" name="chevron-down" size="1x" />
            </button>
          </div>
        </header>

        <section className={styles["heroSection"]}>
          <div
            className={`${styles["heroInner"]} ${
              isAnnualVariant ? styles["annualHeroInner"] : ""
            } ${
              isPlusMonthlyVariant ? styles["plusMonthlyHeroInner"] : ""
            } ${
              isUltimateMonthlyVariant ? styles["ultimateMonthlyHeroInner"] : ""
            }`}
          >
            <div
              className={`${styles["planSummary"]} ${
                hasSingleAnnualHeroCard ? styles["annualPlanSummary"] : ""
              } ${
                isPlusMonthlyVariant ? styles["plusMonthlyPlanSummary"] : ""
              } ${
                isUltimateMonthlyVariant ? styles["ultimateMonthlyPlanSummary"] : ""
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
                {isAnnualVariant ? (
                  <> {"\u2014"} in {config.nextPaymentDays} days.</>
                ) : (
                  <> in {config.nextPaymentDays} days.</>
                )}
              </p>

              <div className={styles["planFeature"]}>
                <Icon name="ai-labs" size="1x" />
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
            </div>

            {config.promoCards.length > 0 ? (
              <div
                className={`${styles["heroCards"]} ${
                  isPlusAnnualVariant ? styles["plusAnnualHeroCards"] : ""
                } ${
                  isUltimateAnnualVariant ? styles["ultimateAnnualHeroCards"] : ""
                } ${
                  isCoreMonthlyVariant ? styles["coreMonthlyHeroCards"] : ""
                } ${
                  isCoreAnnualVariant ? styles["coreAnnualHeroCards"] : ""
                } ${
                  isPlusMonthlyVariant ? styles["plusMonthlyHeroCards"] : ""
                } ${
                  isUltimateMonthlyVariant ? styles["ultimateMonthlyHeroCards"] : ""
                } ${
                  config.promoCards.length === 1 ? styles["heroCardsSingle"] : ""
                }`}
              >
                {config.promoCards.map((card) => (
                  <PromoCardView card={card} key={card.title} />
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
