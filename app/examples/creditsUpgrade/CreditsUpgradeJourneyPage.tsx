import { useMemo, useState } from "react";

import {
  journeyConfigs,
  planStateForCredits,
  type CreditTiers,
  type JourneyId,
} from "./journeyConfigs.ts";
import { CreditsUpgradeOverview } from "./CreditsUpgradeOverview.tsx";
import { PlanUpdateSuccessModal } from "./PlanUpdateSuccessModal.tsx";
import { PrototypeCopyProvider } from "./prototypeCopy/PrototypeCopyContext.tsx";
import { PrototypeCopyPalette } from "./prototypeCopy/PrototypeCopyPanel.tsx";
import { UpgradeToUltimatePage } from "./UpgradeToUltimatePage.tsx";

type Screen = "overview" | "upgrade";

type Props = {
  journeyId: JourneyId;
};

function CreditsUpgradeJourneyInner({ journeyId }: Props) {
  const journey = journeyConfigs[journeyId];
  const [screen, setScreen] = useState<Screen>("overview");
  const [appliedCredits, setAppliedCredits] = useState<CreditTiers>(
    journey.source.creditTotal,
  );
  const [selectedCredits, setSelectedCredits] = useState<CreditTiers>(
    journey.defaultSelectedCredits,
  );
  const [successOpen, setSuccessOpen] = useState(false);

  const plan = useMemo(
    () => planStateForCredits(journey, appliedCredits),
    [appliedCredits, journey],
  );

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
      {screen === "overview" ? (
        <CreditsUpgradeOverview
          annualPromoBody={journey.annualPromoBody}
          annualPromoTitle={journey.annualPromoTitle}
          onUpgrade={() => {
            setSelectedCredits(journey.defaultSelectedCredits);
            setScreen("upgrade");
          }}
          plan={plan}
          supportingPoints={journey.supportingPoints}
        />
      ) : (
        <UpgradeToUltimatePage
          journey={journey}
          onBack={() => setScreen("overview")}
          onCancel={() => setScreen("overview")}
          onConfirm={handleConfirm}
          selectedCredits={selectedCredits}
          setSelectedCredits={setSelectedCredits}
        />
      )}

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
