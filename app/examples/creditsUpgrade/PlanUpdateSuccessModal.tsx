import { Button, Icon } from "@envato/design-system/components";

import { useEditableCopy } from "./prototypeCopy/PrototypeCopyContext.tsx";

import styles from "./PlanUpdateSuccessModal.module.scss";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  onDone: () => void;
};

export function PlanUpdateSuccessModal({ isOpen, onDismiss, onDone }: Props) {
  const title = useEditableCopy(
    "modal.successTitle",
    "Your plan has been successfully updated",
  );
  const body = useEditableCopy(
    "modal.successBody",
    "A confirmation email will be sent to john.doe@gmail.com",
  );
  const doneLabel = useEditableCopy("modal.done", "Done");

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className={styles["overlay"]}
      onClick={onDismiss}
      role="dialog"
    >
      <div
        className={styles["modal"]}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles["inner"]}>
          <div className={styles["topRow"]}>
            <div className={styles["badge"]}>
              <Icon name="done" size="1x" />
            </div>
          </div>

          <h2 className={styles["title"]}>{title}</h2>
          <p className={styles["body"]}>{body}</p>

          <div className={styles["doneButton"]}>
            <Button onClick={onDone} size="medium" variant="primary">
              {doneLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
