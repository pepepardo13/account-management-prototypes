import { useEffect, useId, useRef, useState } from "react";

import { Bleed, Button, Icon, Message } from "@envato/design-system/components";

import { useExternalUrls } from "../../contexts/ExternalUrlsContext.tsx";
import envatoHref from "../../components/Navigation/HomeLink/envato.svg";

import type { CreditOption, CreditTiers, JourneyConfig } from "./journeyConfigs.ts";
import { useEditableCopy } from "./prototypeCopy/PrototypeCopyContext.tsx";

import styles from "./UpgradeToUltimatePage.module.scss";

export type BillingCycle = "monthly" | "annual";

type Props = {
  journey: JourneyConfig;
  onBack: () => void;
  onCancel: () => void;
  onConfirm: (credits: CreditTiers, billingCycle: BillingCycle) => void;
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
        <span className={styles["dropdownTriggerLabel"]}>
          {selectedOption?.label}
        </span>
        <span className={styles["dropdownChevron"]}>
          <Icon
            height={24}
            name={open ? "chevron-up" : "chevron-down"}
            width={24}
          />
        </span>
      </button>
      {open ? (
        <div className={styles["dropdownMenu"]} id={listId} role="listbox">
          {options.map((option) => (
            <button
              aria-selected={option.credits === selected}
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
              <span className={styles["dropdownOptionLabel"]}>{option.label}</span>
              <span className={styles["dropdownOptionPrice"]}>
                {option.priceLabel}
              </span>
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
    `Your Ultimate ${selectedCredits} individual plan will start right away!`,
  );
  const confirmLabel = useEditableCopy(`${prefix}.confirm`, "Confirm");
  const cancelLabel = useEditableCopy(`${prefix}.cancel`, "Cancel");
  const estimateCopy = useEditableCopy(
    `${prefix}.estimate`,
    "The credit from your current plan and the total amount shown are estimates. When you upgrade, you'll receive credit for the unused portion of your current plan, so you'll only pay the prorated difference. The final amount may vary slightly as charges are calculated when you confirm your upgrade. The exact amounts will appear on your invoice.",
  );

  const monthlyLabel = useEditableCopy(`${prefix}.monthlyLabel`, "Monthly");
  const monthlyPrice = useEditableCopy(
    `${prefix}.monthlyPrice`,
    "$299/m + local tax",
  );
  const annualLabel = useEditableCopy(`${prefix}.annualLabel`, "Annual");
  const saveBadge = useEditableCopy(`${prefix}.saveBadge`, "Save 50%");
  const annualPrice = useEditableCopy(
    `${prefix}.annualPrice`,
    "$XX.XX/m + local tax",
  );
  const annualBilled = useEditableCopy(
    `${prefix}.annualBilled`,
    "Billed annually at $XXX.XX/year + local tax",
  );

  const newPlanPriceLabel = useEditableCopy(
    `${prefix}.newPlanPriceLabel`,
    "New plan price",
  );
  const newPlanPriceValue = useEditableCopy(
    `${prefix}.newPlanPriceValue`,
    "$00.00/year",
  );
  const gstLabel = useEditableCopy(`${prefix}.gstLabel`, "GST");
  const gstValue = useEditableCopy(`${prefix}.gstValue`, "$0.00/year");
  const totalLabel = useEditableCopy(
    `${prefix}.totalLabel`,
    "Total ongoing new plan price",
  );
  const totalValue = useEditableCopy(`${prefix}.totalValue`, "USD $00.00/year");
  const chargeNote = useEditableCopy(
    `${prefix}.chargeNote`,
    "From Jul 4, 2026, you'll be charged USD $00.00. Your plan renews monthly.",
  );
  const proRataHeading = useEditableCopy(
    `${prefix}.proRataHeading`,
    "Pro-rata charges for the remainder of this billing period",
  );
  const proRataChargeLabel = useEditableCopy(
    `${prefix}.proRataChargeLabel`,
    "Pro-rata charge for new plan, incl. tax",
  );
  const proRataChargeValue = useEditableCopy(
    `${prefix}.proRataChargeValue`,
    "$00.00",
  );
  const creditLabel = useEditableCopy(
    `${prefix}.creditLabel`,
    "Credit from current plan, incl. tax",
  );
  const creditDays = useEditableCopy(
    `${prefix}.creditDays`,
    "(6 days remaining in your billing period)",
  );
  const creditValue = useEditableCopy(`${prefix}.creditValue`, "-$00.00");
  const payTodayLabel = useEditableCopy(
    `${prefix}.payTodayLabel`,
    "What you will pay today",
  );
  const payTodayValue = useEditableCopy(`${prefix}.payTodayValue`, "USD $00.00");

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

          <div className={styles["infoMessage"]}>
            <Message variant="info">
              <span className={styles["bannerText"]}>
                <span className={styles["bannerTitle"]}>{bannerTitle}</span>
                <span className={styles["bannerBody"]}>{bannerDetail}</span>
              </span>
            </Message>
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
                <strong>{selectedOption?.label}</strong> -{" "}
                {selectedOption?.priceLabel}
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
                  <strong>{monthlyLabel}</strong>
                  <span>{monthlyPrice}</span>
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
                    <strong>{annualLabel}</strong>
                    <span className={styles["savePill"]}>{saveBadge}</span>
                  </span>
                  <span>{annualPrice}</span>
                  <span className={styles["billingHelper"]}>{annualBilled}</span>
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
              <span className={styles["updatePaymentButton"]}>
                <Button
                  icon="open-in-new"
                  iconPosition="leading"
                  size="large"
                  variant="secondary"
                >
                  {updatePayment}
                </Button>
              </span>
            </div>
          </section>

          <section className={styles["section"]}>
            <div className={styles["summaryHeadingBlock"]}>
              <h3 className={styles["subheading"]}>{summaryHeading}</h3>
              <div className={styles["summaryRow"]}>
                <span>{newPlanPriceLabel}</span>
                <span>{newPlanPriceValue}</span>
              </div>
              <div className={styles["summaryRow"]}>
                <span>{gstLabel}</span>
                <span>{gstValue}</span>
              </div>
            </div>

            <div className={styles["summaryDivider"]} />

            <div className={`${styles["summaryRow"]} ${styles["summaryTotal"]}`}>
              <span>{totalLabel}</span>
              <span>{totalValue}</span>
            </div>
            <p className={styles["summaryNote"]}>{chargeNote}</p>

            <div className={styles["summaryDivider"]} />

            <div className={styles["summaryHeadingBlock"]}>
              <h3 className={styles["subheading"]}>{proRataHeading}</h3>
              <div className={styles["summaryRow"]}>
                <span>{proRataChargeLabel}</span>
                <span>{proRataChargeValue}</span>
              </div>
              <div className={`${styles["summaryRow"]} ${styles["summaryCredit"]}`}>
                <span>
                  {creditLabel}
                  <small>{creditDays}</small>
                </span>
                <span>{creditValue}</span>
              </div>
              <div className={`${styles["summaryRow"]} ${styles["summaryTotal"]}`}>
                <span>{payTodayLabel}</span>
                <span>{payTodayValue}</span>
              </div>
            </div>
          </section>

          <div className={styles["startRow"]}>
            <Icon height={24} name="checkmark-circle-outlined" width={24} />
            <span>{startRightAway}</span>
          </div>

          <div className={styles["actions"]}>
            <span className={styles["confirmButton"]}>
              <Button
                onClick={() => onConfirm(selectedCredits, billingCycle)}
                size="large"
                variant="primary"
              >
                {confirmLabel}
              </Button>
            </span>
            <span className={styles["cancelButton"]}>
              <Button onClick={onCancel} size="large" variant="secondary">
                {cancelLabel}
              </Button>
            </span>
          </div>

          <div className={styles["infoMessage"]}>
            <Message variant="info">
              <p className={styles["bannerBody"]}>{estimateCopy}</p>
            </Message>
          </div>
        </main>
      </div>
    </Bleed>
  );
}
