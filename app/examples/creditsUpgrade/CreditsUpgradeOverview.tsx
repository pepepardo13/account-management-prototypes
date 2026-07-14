import type { iconNames } from "@envato/design-system/components";
import { Bleed, Button, Icon } from "@envato/design-system/components";

import { useExternalUrls } from "../../contexts/ExternalUrlsContext.tsx";
import envatoHref from "../../components/Navigation/HomeLink/envato.svg";
import accountAiLabsIcon from "../assets/account-ai-labs.svg";
import accountCheckCircleIcon from "../assets/account-check-circle.svg";

import type { PlanState } from "./journeyConfigs.ts";
import { useEditableCopy } from "./prototypeCopy/PrototypeCopyContext.tsx";

import styles from "./CreditsUpgradeOverview.module.scss";

type IconName = (typeof iconNames)[number];

type Props = {
  annualPromoBody: string;
  annualPromoTitle: string;
  onUpgrade: () => void;
  plan: PlanState;
  supportingPoints: string[];
};

function MastercardMark() {
  return (
    <span aria-hidden="true" className={styles["mastercard"]}>
      <span className={styles["mastercardLeft"]} />
      <span className={styles["mastercardRight"]} />
    </span>
  );
}

export function CreditsUpgradeOverview({
  annualPromoBody,
  annualPromoTitle,
  onUpgrade,
  plan,
  supportingPoints,
}: Props) {
  const externalUrls = useExternalUrls();
  const prefix = `overview.${plan.creditTotal}`;

  const currentPlanLabel = useEditableCopy(`${prefix}.eyebrow`, "Current Plan");
  const title = useEditableCopy(`${prefix}.title`, plan.title);
  const includesLabel = useEditableCopy(`${prefix}.includes`, "Includes:");
  const creditsPill = useEditableCopy(
    `${prefix}.creditsPill`,
    `${plan.primaryFeatureCount} AI credits per month`,
  );
  const point1 = useEditableCopy(`${prefix}.point1`, supportingPoints[0] ?? "");
  const point2 = useEditableCopy(`${prefix}.point2`, supportingPoints[1] ?? "");
  const renewal = useEditableCopy(
    `${prefix}.renewal`,
    "Your subscription renews monthly. Your next payment of USD $00.00 (excluding tax and discounts) is scheduled for Jan 07, 2027 – in 360 days.",
  );
  const paymentMethodLabel = useEditableCopy(
    `${prefix}.paymentMethodLabel`,
    "Payment method",
  );
  const paymentMethodValue = useEditableCopy(
    `${prefix}.paymentMethodValue`,
    "**** **** **** 8757",
  );
  const elevateTitle = useEditableCopy(`${prefix}.elevateTitle`, plan.elevateTitle);
  const remainingLabel = useEditableCopy(
    `${prefix}.remaining`,
    `${plan.creditRemaining} AI credits remaining`,
  );
  const totalLabel = useEditableCopy(
    `${prefix}.totalLabel`,
    "Total generations per month",
  );
  const resetsLabel = useEditableCopy(`${prefix}.resetsLabel`, "Generations resets");
  const elevateBody = useEditableCopy(`${prefix}.elevateBody`, plan.elevateBody);
  const exploreMore = useEditableCopy(`${prefix}.exploreMore`, "Explore more");
  const elevateCta = useEditableCopy(`${prefix}.elevateCta`, plan.elevateCta);
  const annualTitle = useEditableCopy(`${prefix}.annualTitle`, annualPromoTitle);
  const annualBody = useEditableCopy(`${prefix}.annualBody`, annualPromoBody);
  const annualCta = useEditableCopy(`${prefix}.annualCta`, "Switch to annual");

  const accountSettings: Array<{ icon: IconName; label: string }> = [
    { icon: "edit", label: "Edit profile" },
    { icon: "key", label: "Change password" },
    { icon: "security-on", label: "Two-factor authentication (2FA)" },
  ];

  const manageSubscription: Array<{ icon: IconName; label: string }> = [
    { icon: "group-add", label: "Upgrade to Teams" },
    { icon: "credit-card", label: "Payment method" },
    { icon: "receipt", label: "Billing information" },
    { icon: "documents", label: "Payment history" },
    { icon: "clear", label: "Cancel subscription" },
  ];

  const usagePercent = Math.min(
    100,
    Math.max(0, (plan.creditRemaining / plan.creditTotal) * 100),
  );

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
          <div className={styles["heroInner"]}>
            <div className={styles["planSummary"]}>
              <p className={styles["eyebrow"]}>{currentPlanLabel}</p>
              <h1 className={styles["pageTitle"]}>{title}</h1>

              <div className={styles["includesBlock"]}>
                <p className={styles["includesLabel"]}>{includesLabel}</p>
                <div className={styles["includesList"]}>
                  <div className={styles["includesItem"]}>
                    <span className={styles["creditsPill"]}>
                      <img alt="" className={styles["pillIcon"]} src={accountAiLabsIcon} />
                      <span>{creditsPill}</span>
                    </span>
                  </div>
                  <div className={styles["includesItem"]}>
                    <img
                      alt=""
                      className={styles["checkIcon"]}
                      src={accountCheckCircleIcon}
                    />
                    <span>{point1}</span>
                  </div>
                  <div className={styles["includesItem"]}>
                    <img
                      alt=""
                      className={styles["checkIcon"]}
                      src={accountCheckCircleIcon}
                    />
                    <span>{point2}</span>
                  </div>
                </div>
              </div>

              <p className={styles["renewal"]}>{renewal}</p>

              <div className={styles["inlinePayment"]}>
                <p className={styles["inlinePaymentLabel"]}>{paymentMethodLabel}</p>
                <div className={styles["inlinePaymentRow"]}>
                  <MastercardMark />
                  <span>{paymentMethodValue}</span>
                </div>
              </div>
            </div>

            <div className={styles["heroCards"]}>
              <article className={`${styles["promoCard"]} ${styles["promoCardPrimary"]}`}>
                <h2 className={styles["cardTitle"]}>{elevateTitle}</h2>
                <div className={styles["usageMeter"]}>
                  <div className={styles["usageMeta"]}>
                    <strong>{remainingLabel}</strong>
                  </div>
                  <div className={styles["progressTrack"]}>
                    <div
                      className={styles["progressFill"]}
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                  <div className={styles["usageDetails"]}>
                    <div className={styles["usageDetailRow"]}>
                      <span>{totalLabel}</span>
                      <span>{plan.creditTotal}</span>
                    </div>
                    <div className={styles["usageDetailRow"]}>
                      <span>{resetsLabel}</span>
                      <span>{plan.resetDate}</span>
                    </div>
                  </div>
                </div>
                <p className={styles["cardCopy"]}>
                  {elevateBody}{" "}
                  <button className={styles["textLink"]} type="button">
                    {exploreMore}
                  </button>
                </p>
                <div className={styles["cardSpacer"]} />
                <div className={styles["cardActions"]}>
                  <Button onClick={onUpgrade} size="medium" variant="primary">
                    {elevateCta}
                  </Button>
                </div>
              </article>

              <article className={styles["promoCard"]}>
                <h2 className={styles["cardTitle"]}>{annualTitle}</h2>
                <p className={styles["cardCopy"]}>{annualBody}</p>
                <div className={styles["cardSpacer"]} />
                <div className={`${styles["cardActions"]} ${styles["outlinedButton"]}`}>
                  <Button size="medium" variant="secondary">
                    {annualCta}
                  </Button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles["bodyPanel"]}>
          <div className={styles["bodyInner"]}>
            <div className={styles["actionsGrid"]}>
              <section>
                <h2 className={styles["sectionTitle"]}>Account settings</h2>
                <div className={styles["actionsList"]}>
                  {accountSettings.map((item) => (
                    <button className={styles["actionItem"]} key={item.label} type="button">
                      <span className={styles["actionItemContent"]}>
                        <Icon name={item.icon} size="1x" />
                        <span>{item.label}</span>
                      </span>
                      <Icon name="chevron-right" size="1x" />
                    </button>
                  ))}
                </div>
              </section>
              <section>
                <h2 className={styles["sectionTitle"]}>Manage subscription</h2>
                <div className={styles["actionsList"]}>
                  {manageSubscription.map((item) => (
                    <button className={styles["actionItem"]} key={item.label} type="button">
                      <span className={styles["actionItemContent"]}>
                        <Icon name={item.icon} size="1x" />
                        <span>{item.label}</span>
                      </span>
                      <Icon name="chevron-right" size="1x" />
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </Bleed>
  );
}
