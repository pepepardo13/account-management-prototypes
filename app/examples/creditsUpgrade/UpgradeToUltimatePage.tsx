import { useEffect, useId, useRef, useState } from "react";

import { Bleed, Button, Icon } from "@envato/design-system/components";

import { useExternalUrls } from "../../contexts/ExternalUrlsContext.tsx";
import envatoHref from "../../components/Navigation/HomeLink/envato.svg";

import type { CreditOption, CreditTiers, JourneyConfig } from "./journeyConfigs.ts";
import { useEditableCopy } from "./prototypeCopy/PrototypeCopyContext.tsx";

import styles from "./UpgradeToUltimatePage.module.scss";

type BillingCycle = "monthly" | "annual";

type Props = {
  journey: JourneyConfig;
  onBack: () => void;
  onCancel: () => void;
  onConfirm: (credits: CreditTiers) => void;
  selectedCredits: CreditTiers;
  setSelectedCredits: (credits: CreditTiers) => void;
};

function MastercardMark() {
  return (
    <span aria-hidden="true" className={styles["mastercard"]}>
      <span className={styles["mastercardLeft"]} />
      <span className={styles["mastercardRight"]} />
    </span>
  );
}

function CreditsDropdown({
  options,
  selected,
  onSelect,
}: {
  options: CreditOption[];
  selected: CreditTiers;
  onSelect: (credits: CreditTiers) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selectedOption =
    options.find((option) => option.credits === selected) ?? options[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <div className={styles["dropdown"]} ref={rootRef}>
      <button
        aria-controls={listId}
        aria-expanded={open}
        className={styles["dropdownTrigger"]}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span>{selectedOption?.label}</span>
        <Icon name={open ? "chevron-up" : "chevron-down"} size="1x" />
      </button>
      {open ? (
        <div className={styles["dropdownMenu"]} id={listId} role="listbox">
          {options.map((option) => (
            <button
              className={`${styles["dropdownOption"]} ${
                option.credits === selected ? styles["dropdownOptionSelected"] : ""
              }`}
              key={option.credits}
              onClick={() => {
                onSelect(option.credits);
                setOpen(false);
              }}
              role="option"
              type="button"
            >
              <span>{option.label}</span>
              <span className={styles["dropdownPrice"]}>{option.priceLabel}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function UpgradeToUltimatePage({
  journey,
  onBack,
  onCancel,
  onConfirm,
  selectedCredits,
  setSelectedCredits,
}: Props) {
  const externalUrls = useExternalUrls();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const prefix = `upgrade.${journey.id}.${selectedCredits}`;

  const pageTitle = useEditableCopy(
    `${prefix}.title`,
    journey.upgradePageTitle(selectedCredits),
  );
  const bannerTitle = useEditableCopy(
    `${prefix}.bannerTitle`,
    journey.upgradeCurrentPlanBanner,
  );
  const bannerDetail = useEditableCopy(
    `${prefix}.bannerDetail`,
    journey.upgradeCurrentPlanDetail,
  );
  const orderSummary = useEditableCopy(`${prefix}.orderSummary`, "Order summary");
  const chooseCredits = useEditableCopy(
    `${prefix}.chooseCredits`,
    "Choose your monthly AI credits",
  );
  const chooseHelper = useEditableCopy(
    `${prefix}.chooseHelper`,
    journey.creditMode === "fixed"
      ? journey.fixedCreditHelper
      : "Ultimate scales with how much you create. Pick your monthly AI credits – you can change this anytime",
  );
  const billingHeading = useEditableCopy(
    `${prefix}.billingHeading`,
    "Confirm your billing cycle",
  );
  const paymentHeading = useEditableCopy(`${prefix}.paymentHeading`, "Payment method");
  const paymentValue = useEditableCopy(
    `${prefix}.paymentValue`,
    "**** **** **** 8757",
  );
  const updatePayment = useEditableCopy(
    `${prefix}.updatePayment`,
    "Update payment method",
  );
  const summaryHeading = useEditableCopy(
    `${prefix}.summaryHeading`,
    `Upgrade to Ultimate ${selectedCredits} Individual monthly subscription`,
  );
  const startRightAway = useEditableCopy(
    `${prefix}.startRightAway`,
    journey.startRightAwayCopy,
  );
  const confirmLabel = useEditableCopy(
    `${prefix}.confirm`,
    "Confirm - USD $00.00 Today",
  );
  const cancelLabel = useEditableCopy(`${prefix}.cancel`, "Cancel");
  const estimateCopy = useEditableCopy(
    `${prefix}.estimate`,
    "The credit from your current plan and the total amount shown are estimates. When you upgrade, you'll receive credit for the unused portion of your current plan, so you'll only pay the prorated difference. The final amount may vary slightly as charges are calculated when you confirm your upgrade. The exact amounts will appear on your invoice.",
  );

  const selectedOption =
    journey.creditOptions.find((option) => option.credits === selectedCredits) ??
    journey.creditOptions[0];

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

        <main className={styles["main"]}>
          <button
            aria-label="Go back"
            className={styles["backButton"]}
            onClick={onBack}
            type="button"
          >
            <Icon name="chevron-left" size="1x" />
          </button>

          <h1 className={styles["title"]}>{pageTitle}</h1>

          <div className={styles["infoBanner"]}>
            <Icon name="info" size="1x" />
            <div>
              <p className={styles["bannerTitle"]}>
                <strong>{bannerTitle}</strong>
              </p>
              <p className={styles["bannerBody"]}>{bannerDetail}</p>
            </div>
          </div>

          <section className={styles["section"]}>
            <h2 className={styles["sectionTitle"]}>{orderSummary}</h2>
            <h3 className={styles["subheading"]}>{chooseCredits}</h3>
            <p className={styles["helper"]}>{chooseHelper}</p>

            {journey.creditMode === "dropdown" ? (
              <CreditsDropdown
                onSelect={setSelectedCredits}
                options={journey.creditOptions}
                selected={selectedCredits}
              />
            ) : (
              <div className={styles["fixedCreditsBox"]}>
                <strong>
                  {selectedOption?.label} - {selectedOption?.priceLabel}
                </strong>
              </div>
            )}
          </section>

          <section className={styles["section"]}>
            <h3 className={styles["subheading"]}>{billingHeading}</h3>
            <div className={styles["billingGrid"]}>
              <button
                className={`${styles["billingCard"]} ${
                  billingCycle === "monthly" ? styles["billingCardSelected"] : ""
                }`}
                onClick={() => setBillingCycle("monthly")}
                type="button"
              >
                <span
                  className={`${styles["radio"]} ${
                    billingCycle === "monthly" ? styles["radioSelected"] : ""
                  }`}
                />
                <span className={styles["billingCardBody"]}>
                  <strong>Monthly</strong>
                  <span>$299/m + local tax</span>
                </span>
              </button>
              <button
                className={`${styles["billingCard"]} ${
                  billingCycle === "annual" ? styles["billingCardSelected"] : ""
                }`}
                onClick={() => setBillingCycle("annual")}
                type="button"
              >
                <span
                  className={`${styles["radio"]} ${
                    billingCycle === "annual" ? styles["radioSelected"] : ""
                  }`}
                />
                <span className={styles["billingCardBody"]}>
                  <span className={styles["billingCardTitleRow"]}>
                    <strong>Annual</strong>
                    <span className={styles["savePill"]}>Save 50%</span>
                  </span>
                  <span>$XX.XX/m + local tax</span>
                  <span className={styles["billingHelper"]}>
                    Billed annually at $XXX.XX/year + local tax
                  </span>
                </span>
              </button>
            </div>
          </section>

          <section className={styles["section"]}>
            <h3 className={styles["subheading"]}>{paymentHeading}</h3>
            <div className={styles["paymentRow"]}>
              <div className={styles["paymentCard"]}>
                <MastercardMark />
                <span>{paymentValue}</span>
              </div>
              <Button size="medium" variant="secondary">
                {updatePayment}
              </Button>
            </div>
          </section>

          <section className={styles["section"]}>
            <h3 className={styles["subheading"]}>{summaryHeading}</h3>
            <div className={styles["summaryRow"]}>
              <span>New plan price</span>
              <span>$00.00/year</span>
            </div>
            <div className={styles["summaryRow"]}>
              <span>GST</span>
              <span>$0.00/year</span>
            </div>
            <div className={`${styles["summaryRow"]} ${styles["summaryTotal"]}`}>
              <span>Total ongoing new plan price</span>
              <span>USD $00.00/year</span>
            </div>
            <p className={styles["summaryNote"]}>
              From Jul 4, 2026, you&apos;ll be charged USD $00.00. Your plan renews{" "}
              {billingCycle === "monthly" ? "monthly" : "annually"}.
            </p>

            <h3 className={styles["subheading"]}>
              Pro-rata charges for the remainder of this billing period
            </h3>
            <div className={styles["summaryRow"]}>
              <span>Pro-rata charge for new plan, incl. tax</span>
              <span>$00.00</span>
            </div>
            <div className={`${styles["summaryRow"]} ${styles["summaryCredit"]}`}>
              <span>
                Credit from current plan, incl. tax
                <small>(6 days remaining in your billing period)</small>
              </span>
              <span>-$00.00</span>
            </div>
            <div className={`${styles["summaryRow"]} ${styles["summaryTotal"]}`}>
              <span>What you will pay today</span>
              <span>USD $00.00</span>
            </div>
          </section>

          <div className={styles["startRow"]}>
            <Icon name="done" size="1x" />
            <span>{startRightAway}</span>
          </div>

          <div className={styles["actions"]}>
            <Button
              onClick={() => onConfirm(selectedCredits)}
              size="medium"
              variant="primary"
            >
              {confirmLabel}
            </Button>
            <Button onClick={onCancel} size="medium" variant="secondary">
              {cancelLabel}
            </Button>
          </div>

          <div className={styles["infoBanner"]}>
            <Icon name="info" size="1x" />
            <p className={styles["bannerBody"]}>{estimateCopy}</p>
          </div>
        </main>
      </div>
    </Bleed>
  );
}
