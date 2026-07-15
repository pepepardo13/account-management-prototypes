import styles from "./CreditsUpgradeHubPage.module.scss";
import { useEditableCopy } from "./prototypeCopy/PrototypeCopyContext.tsx";

type JourneyCard = {
  href: string;
  name: string;
  period: string;
};

const journeyCards: JourneyCard[] = [
  {
    name: "Plus Individual → Ultimate 2000",
    period: "Monthly",
    href: "./iframe.html?id=layout-credits-upgrade-journeys--plus-to-ultimate-500&viewMode=story",
  },
  {
    name: "Ultimate 500 → Ultimate 2000",
    period: "Monthly",
    href: "./iframe.html?id=layout-credits-upgrade-journeys--ultimate-500-to-1000&viewMode=story",
  },
  {
    name: "Ultimate 1000 → Ultimate 2000",
    period: "Monthly",
    href: "./iframe.html?id=layout-credits-upgrade-journeys--ultimate-1000-to-2000&viewMode=story",
  },
  {
    name: "Plus Individual → Ultimate 2000",
    period: "Annual",
    href: "./iframe.html?id=layout-credits-upgrade-journeys--annual-plus-to-ultimate-2000&viewMode=story",
  },
  {
    name: "Ultimate 1000 → Ultimate 2000",
    period: "Annual",
    href: "./iframe.html?id=layout-credits-upgrade-journeys--annual-ultimate-1000-to-2000&viewMode=story",
  },
  {
    name: "Ultimate 2000",
    period: "Annual",
    href: "./iframe.html?id=layout-credits-upgrade-journeys--annual-ultimate-2000&viewMode=story",
  },
];

export function CreditsUpgradeHubPage() {
  const eyebrow = useEditableCopy("hub.eyebrow", "AI Credits Upgrade Prototypes");
  const title = useEditableCopy("hub.title", "Select to Continue");

  return (
    <div className={styles["page"]}>
      <div className={styles["inner"]}>
        <p className={styles["eyebrow"]}>{eyebrow}</p>
        <h1 className={styles["title"]}>{title}</h1>

        <div className={styles["grid"]}>
          {journeyCards.map((card) => (
            <a className={styles["card"]} href={card.href} key={card.href}>
              <span className={styles["cardTitle"]}>{card.name}</span>
              <span className={styles["cardSubtitle"]}>{card.period}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
