import styles from "./PlanTiersHubPage.module.scss";

type PlanCard = {
  href: string;
  inverse?: boolean;
  name: string;
  period: string;
};

const planCards: PlanCard[] = [
  {
    name: "Core",
    period: "Monthly",
    href: "./iframe.html?id=layout-account-management--default&viewMode=story",
  },
  {
    name: "Plus",
    period: "Monthly",
    href: "./iframe.html?id=layout-account-management--plus-monthly&viewMode=story",
  },
  {
    name: "Ultimate",
    period: "Monthly",
    href: "./iframe.html?id=layout-account-management--ultimate-monthly&viewMode=story",
  },
  {
    name: "Core",
    period: "Annual",
    inverse: true,
    href: "./iframe.html?id=layout-account-management--core-annual&viewMode=story",
  },
  {
    name: "Plus",
    period: "Annual",
    inverse: true,
    href: "./iframe.html?id=layout-account-management--plus-annual&viewMode=story",
  },
  {
    name: "Ultimate",
    period: "Annual",
    inverse: true,
    href: "./iframe.html?id=layout-account-management--ultimate-annual&viewMode=story",
  },
];

export function PlanTiersHubPage() {
  return (
    <div className={styles["page"]}>
      <div className={styles["inner"]}>
        <p className={styles["eyebrow"]}>AI Generations + Inclusions Prototypes</p>
        <h1 className={styles["title"]}>Select to Continue</h1>

        <div className={styles["grid"]}>
          {planCards.map((card) => (
            <a
              className={`${styles["card"]} ${card.inverse ? styles["cardInverse"] : ""}`}
              href={card.href}
              key={`${card.name}-${card.period}`}
            >
              <span className={styles["cardTitle"]}>{card.name}</span>
              <span className={styles["cardSubtitle"]}>{card.period}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
