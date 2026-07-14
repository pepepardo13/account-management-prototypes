import { useEffect, useState } from "react";

import {
  AccountManagementPage,
  type AccountManagementVariant,
} from "../AccountManagementPage.tsx";

import {
  journeyConfigs,
  journeyFromCurrentCredits,
  type CreditTiers,
  type JourneyId,
} from "./journeyConfigs.ts";
import { PlanUpdateSuccessModal } from "./PlanUpdateSuccessModal.tsx";
import {
  PrototypeCopyProvider,
  usePrototypeCopy,
} from "./prototypeCopy/PrototypeCopyContext.tsx";
import { PrototypeCopyPalette } from "./prototypeCopy/PrototypeCopyPanel.tsx";
import { UpgradeToUltimatePage } from "./UpgradeToUltimatePage.tsx";

type Screen = "overview" | "upgrade";

type Props = {
  journeyId: JourneyId;
};

const overviewVariantForCredits: Record<CreditTiers, AccountManagementVariant> = {
  200: "credits-plus-200",
  500: "credits-ultimate-500",
  1000: "credits-ultimate-1000",
  2000: "credits-ultimate-2000",
};

function getHubUrl() {
  if (typeof window === "undefined") {
    return "";
  }

  const url = new URL(window.location.href);
  url.pathname = `${window.location.pathname.replace(/\/[^/]*$/, "")}/iframe.html`;
  url.search = "?id=layout-credits-upgrade-journeys--hub&viewMode=story";
  url.hash = "";
  return url.toString();
}

function useHubShortcut() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "r" && event.key !== "R") {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName;
      const isTypingTarget =
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT" ||
        target?.isContentEditable;

      if (isTypingTarget) {
        return;
      }

      const hubUrl = getHubUrl();
      if (hubUrl) {
        event.preventDefault();
        window.location.assign(hubUrl);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}

function CreditsUpgradeJourneyInner({ journeyId }: Props) {
  const entryJourney = journeyConfigs[journeyId];
  const [screen, setScreen] = useState<Screen>("overview");
  const [appliedCredits, setAppliedCredits] = useState<CreditTiers>(
    entryJourney.source.creditTotal,
  );
  const [selectedCredits, setSelectedCredits] = useState<CreditTiers>(
    entryJourney.defaultSelectedCredits,
  );
  const [successOpen, setSuccessOpen] = useState(false);
  const { getCopy, registerDefaults, setScope } = usePrototypeCopy();

  // The journey that applies from the tier the user currently owns. As the user
  // completes upgrades this advances (Plus → 500 → 1000 → 2000), so each step
  // gets the correct current-plan banner, source state and upgrade options.
  // `undefined` once the user reaches the top tier (2000).
  const activeJourney = journeyFromCurrentCredits(appliedCredits);

  useHubShortcut();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [screen, appliedCredits]);

  useEffect(() => {
    if (screen === "upgrade" && activeJourney) {
      setScope([`upgrade.${activeJourney.id}.${selectedCredits}.`, "modal."]);
    } else {
      setScope([`${overviewVariantForCredits[appliedCredits]}.`]);
    }
  }, [activeJourney, appliedCredits, screen, selectedCredits, setScope]);

  const handleConfirm = (credits: CreditTiers) => {
    setSelectedCredits(credits);
    setSuccessOpen(true);
  };

  const handleDone = () => {
    setAppliedCredits(selectedCredits);
    setSuccessOpen(false);
    setScreen("overview");
  };

  return (
    <>
      {/*
        Both screens stay mounted (the inactive one is visually hidden) so every
        page registers its editable copy up front. This keeps the "Edit texts"
        panel populated with the texts from every step, regardless of which
        screen is currently on-screen or whether the story was reloaded.
      */}
      <div
        aria-hidden={screen !== "overview"}
        style={{ display: screen === "overview" ? undefined : "none" }}
      >
        <AccountManagementPage
          copyGet={getCopy}
          copyRegisterDefaults={registerDefaults}
          disableHubRedirect
          onPrimaryPromoAction={
            activeJourney
              ? () => {
                  setSelectedCredits(activeJourney.defaultSelectedCredits);
                  setScreen("upgrade");
                }
              : undefined
          }
          variant={overviewVariantForCredits[appliedCredits]}
        />
      </div>
      <div
        aria-hidden={screen !== "upgrade"}
        style={{ display: screen === "upgrade" ? undefined : "none" }}
      >
        {activeJourney ? (
          <UpgradeToUltimatePage
            journey={activeJourney}
            onBack={() => setScreen("overview")}
            onCancel={() => setScreen("overview")}
            onConfirm={handleConfirm}
            selectedCredits={selectedCredits}
            setSelectedCredits={setSelectedCredits}
          />
        ) : null}
      </div>

      <PlanUpdateSuccessModal
        isOpen={successOpen}
        onDismiss={() => setSuccessOpen(false)}
        onDone={handleDone}
      />

      <PrototypeCopyPalette />
    </>
  );
}

export function CreditsUpgradeJourneyPage({ journeyId }: Props) {
  return (
    <PrototypeCopyProvider>
      <CreditsUpgradeJourneyInner journeyId={journeyId} />
    </PrototypeCopyProvider>
  );
}
