import { Icon } from "@envato/design-system/components";
import { useEffect, useMemo, useState } from "react";

import { usePrototypeCopy } from "./PrototypeCopyContext.tsx";

import styles from "./PrototypeCopyPanel.module.scss";

type Entry = { key: string; value: string; fallback: string };

// A list of key prefixes that should be shown, or `null` to show everything.
type Scope = string[] | null;

const SECTION_ORDER: Array<{ id: string; title: string; match: (key: string) => boolean }> = [
  { id: "hub", title: "Hub page", match: (key) => key.startsWith("hub.") },
  {
    id: "overview",
    title: "My Account overview",
    match: (key) => key.startsWith("overview.") || key.startsWith("credits-"),
  },
  {
    id: "upgrade",
    title: "Upgrade checkout",
    match: (key) => key.startsWith("upgrade."),
  },
  { id: "modal", title: "Confirmation modal", match: (key) => key.startsWith("modal.") },
];

// Order in which the upgrade-checkout fields appear on screen, top to bottom.
const UPGRADE_ORDER = [
  "title",
  "bannerTitle",
  "bannerDetail",
  "orderSummary",
  "chooseCredits",
  "chooseHelper",
  "billingHeading",
  "monthlyLabel",
  "monthlyPrice",
  "annualLabel",
  "saveBadge",
  "annualPrice",
  "annualBilled",
  "paymentHeading",
  "paymentValue",
  "updatePayment",
  "summaryHeading",
  "newPlanPriceLabel",
  "newPlanPriceValue",
  "gstLabel",
  "gstValue",
  "totalLabel",
  "totalValue",
  "chargeNote",
  "proRataHeading",
  "proRataChargeLabel",
  "proRataChargeValue",
  "creditLabel",
  "creditDays",
  "creditValue",
  "payTodayLabel",
  "payTodayValue",
  "startRightAway",
  "confirm",
  "cancel",
  "estimate",
];

const MODAL_ORDER = ["successTitle", "successBody", "done"];

const UPGRADE_LABELS: Record<string, string> = {
  title: "Page title",
  bannerTitle: "Current plan banner – title",
  bannerDetail: "Current plan banner – detail",
  orderSummary: "Order summary heading",
  chooseCredits: "Choose credits – heading",
  chooseHelper: "Choose credits – helper",
  billingHeading: "Billing cycle – heading",
  monthlyLabel: "Monthly – label",
  monthlyPrice: "Monthly – price",
  annualLabel: "Annual – label",
  saveBadge: "Annual – save badge",
  annualPrice: "Annual – price",
  annualBilled: "Annual – billed note",
  paymentHeading: "Payment method – heading",
  paymentValue: "Payment method – card",
  updatePayment: "Payment method – button",
  summaryHeading: "Summary – heading",
  newPlanPriceLabel: "Summary – new plan price label",
  newPlanPriceValue: "Summary – new plan price value",
  gstLabel: "Summary – GST label",
  gstValue: "Summary – GST value",
  totalLabel: "Summary – total label",
  totalValue: "Summary – total value",
  chargeNote: "Summary – charge note",
  proRataHeading: "Pro-rata – heading",
  proRataChargeLabel: "Pro-rata – charge label",
  proRataChargeValue: "Pro-rata – charge value",
  creditLabel: "Pro-rata – credit label",
  creditDays: "Pro-rata – credit days",
  creditValue: "Pro-rata – credit value",
  payTodayLabel: "Pro-rata – pay today label",
  payTodayValue: "Pro-rata – pay today value",
  startRightAway: "Start-right-away note",
  confirm: "Confirm button",
  cancel: "Cancel button",
  estimate: "Estimate disclaimer",
};

const MODAL_LABELS: Record<string, string> = {
  successTitle: "Title",
  successBody: "Body",
  done: "Done button",
};

function titleCase(value: string) {
  const spaced = value.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function prettifyLabel(key: string) {
  const parts = key.split(".");
  const suffix = parts[parts.length - 1];

  if (parts[0] === "upgrade") {
    return UPGRADE_LABELS[suffix] ?? titleCase(suffix);
  }

  if (parts[0] === "modal") {
    return MODAL_LABELS[suffix] ?? titleCase(suffix);
  }

  const promoIndex = parts.indexOf("promo");
  if (promoIndex !== -1) {
    const cardIndex = Number(parts[promoIndex + 1]);
    const cardName =
      cardIndex === 0
        ? "Elevate box"
        : cardIndex === 1
          ? "Annual box"
          : `Promo box ${cardIndex + 1}`;
    const rest = parts.slice(promoIndex + 2);
    const fieldName =
      rest[0] === "action"
        ? "Button label"
        : rest[0] === "cta"
          ? "Link label"
          : titleCase(rest[0] ?? "");
    return `${cardName} – ${fieldName}`;
  }

  if (suffix === "title" && parts[0].startsWith("credits-")) {
    return "Plan title";
  }

  return titleCase(suffix ?? key);
}

function fieldOrderRank(field: string) {
  switch (field) {
    case "title":
      return 0;
    case "body":
      return 1;
    case "cta":
      return 2;
    case "action":
      return 3;
    default:
      return 4;
  }
}

function orderIndex(order: string[], suffix: string) {
  const index = order.indexOf(suffix);
  return index === -1 ? order.length : index;
}

function sortRank(key: string): number[] {
  const parts = key.split(".");
  const suffix = parts[parts.length - 1];

  if (parts[0] === "upgrade") {
    return [0, orderIndex(UPGRADE_ORDER, suffix), 0, 0];
  }

  if (parts[0] === "modal") {
    return [0, orderIndex(MODAL_ORDER, suffix), 0, 0];
  }

  const promoIndex = parts.indexOf("promo");
  if (promoIndex !== -1) {
    const cardIndex = Number(parts[promoIndex + 1]) || 0;
    const rest = parts.slice(promoIndex + 2);
    const field = rest[0] ?? "";
    const actionIndex = field === "action" ? Number(rest[1] ?? 0) : 0;
    return [1, cardIndex, fieldOrderRank(field), actionIndex];
  }

  if (suffix === "title") {
    return [0, 0, 0, 0];
  }

  return [2, 0, 0, 0];
}

function isInScope(key: string, scope: Scope) {
  if (scope === null) {
    return true;
  }
  return scope.some((prefix) => key.startsWith(prefix));
}

function compareByReadingOrder(a: Entry, b: Entry) {
  const rankA = sortRank(a.key);
  const rankB = sortRank(b.key);
  for (let index = 0; index < rankA.length; index += 1) {
    if (rankA[index] !== rankB[index]) {
      return rankA[index] - rankB[index];
    }
  }
  return a.key.localeCompare(b.key);
}

function groupEntries(entries: Entry[]) {
  const sections = SECTION_ORDER.map((section) => ({
    ...section,
    items: entries
      .filter((entry) => section.match(entry.key))
      .sort(compareByReadingOrder),
  }));

  const matchedKeys = new Set(
    sections.flatMap((section) => section.items.map((item) => item.key)),
  );
  const other = entries.filter((entry) => !matchedKeys.has(entry.key));

  const result = sections.filter((section) => section.items.length > 0);
  if (other.length > 0) {
    result.push({ id: "other", title: "Other", match: () => false, items: other });
  }
  return result;
}

export function PrototypeCopyPalette() {
  const [open, setOpen] = useState(false);
  const { entries, resetAll, scope, setCopy } = usePrototypeCopy();
  const [draft, setDraft] = useState<Record<string, string>>({});

  const scopedEntries = useMemo(
    () => entries.filter((entry) => isInScope(entry.key, scope)),
    [entries, scope],
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    const seed: Record<string, string> = {};
    entries.forEach((entry) => {
      seed[entry.key] = entry.value;
    });
    setDraft(seed);
  }, [open]);

  const sections = useMemo(() => groupEntries(scopedEntries), [scopedEntries]);

  const hasChanges = scopedEntries.some(
    (entry) => draft[entry.key] !== undefined && draft[entry.key] !== entry.value,
  );

  const handleUpdate = () => {
    scopedEntries.forEach((entry) => {
      const next = draft[entry.key];
      if (next !== undefined && next !== entry.value) {
        setCopy(entry.key, next);
      }
    });
  };

  const handleReset = () => {
    resetAll();
    setDraft({});
  };

  return (
    <>
      <button
        aria-label="Edit prototype texts"
        className={styles["paletteButton"]}
        onClick={() => setOpen(true)}
        type="button"
      >
        <span className={styles["paletteIcon"]}>
          <Icon name="edit" size="1x" />
        </span>
        <span className={styles["paletteLabel"]}>Edit texts</span>
      </button>

      {open ? (
        <div className={styles["panel"]} role="dialog" aria-label="Edit prototype texts">
          <div className={styles["panelHeader"]}>
            <h2 className={styles["panelTitle"]}>Edit texts</h2>
            <button
              aria-label="Close text editor"
              className={styles["closeButton"]}
              onClick={() => setOpen(false)}
              type="button"
            >
              <Icon name="clear" size="1x" />
            </button>
          </div>

          <p className={styles["panelHint"]}>
            Update the copy below, then press Update to apply. Changes save in this
            browser until you reset.
          </p>

          <div className={styles["fields"]}>
            {scopedEntries.length === 0 ? (
              <p className={styles["empty"]}>No editable texts on this screen yet.</p>
            ) : (
              sections.map((section) => (
                <section className={styles["section"]} key={section.id}>
                  <h3 className={styles["sectionTitle"]}>{section.title}</h3>
                  <div className={styles["sectionFields"]}>
                    {section.items.map((entry) => (
                      <label className={styles["field"]} key={entry.key}>
                        <span className={styles["fieldLabel"]}>
                          {prettifyLabel(entry.key)}
                        </span>
                        <textarea
                          className={styles["fieldInput"]}
                          onChange={(event) =>
                            setDraft((current) => ({
                              ...current,
                              [entry.key]: event.target.value,
                            }))
                          }
                          rows={(draft[entry.key] ?? entry.value).length > 80 ? 3 : 2}
                          value={draft[entry.key] ?? entry.value}
                        />
                      </label>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>

          <div className={styles["panelFooter"]}>
            <button
              className={styles["resetButton"]}
              onClick={handleReset}
              type="button"
            >
              Reset all
            </button>
            <button
              className={styles["updateButton"]}
              disabled={!hasChanges}
              onClick={handleUpdate}
              type="button"
            >
              Update
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
