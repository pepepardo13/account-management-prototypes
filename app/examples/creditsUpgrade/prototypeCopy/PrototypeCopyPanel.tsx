import { Icon } from "@envato/design-system/components";
import { useState } from "react";

import { usePrototypeCopy } from "./PrototypeCopyContext.tsx";

import styles from "./PrototypeCopyPanel.module.scss";

export function PrototypeCopyPalette() {
  const [open, setOpen] = useState(false);
  const { entries, resetAll, setCopy } = usePrototypeCopy();

  return (
    <>
      <button
        aria-label="Open text editor"
        className={styles["paletteButton"]}
        onClick={() => setOpen(true)}
        type="button"
      >
        <Icon name="palette" size="1x" />
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
              ×
            </button>
          </div>

          <p className={styles["panelHint"]}>
            Changes save in this browser until you reset.
          </p>

          <div className={styles["panelActions"]}>
            <button className={styles["resetButton"]} onClick={resetAll} type="button">
              Reset all texts
            </button>
          </div>

          <div className={styles["fields"]}>
            {entries.length === 0 ? (
              <p className={styles["empty"]}>No editable texts on this screen yet.</p>
            ) : (
              entries.map((entry) => (
                <label className={styles["field"]} key={entry.key}>
                  <span className={styles["fieldKey"]}>{entry.key}</span>
                  <textarea
                    className={styles["fieldInput"]}
                    onChange={(event) => setCopy(entry.key, event.target.value)}
                    rows={entry.value.length > 80 ? 3 : 2}
                    value={entry.value}
                  />
                </label>
              ))
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
