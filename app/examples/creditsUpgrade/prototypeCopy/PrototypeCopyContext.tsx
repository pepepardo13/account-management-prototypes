import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "credits-upgrade-prototype-copy";

export type CopyMap = Record<string, string>;

type PrototypeCopyContextValue = {
  getCopy: (key: string, fallback: string) => string;
  entries: Array<{ key: string; value: string; fallback: string }>;
  registerDefaults: (defaults: CopyMap) => void;
  resetAll: () => void;
  setCopy: (key: string, value: string) => void;
};

const PrototypeCopyContext = createContext<PrototypeCopyContextValue | null>(
  null,
);

function readStored(): CopyMap {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as CopyMap) : {};
  } catch {
    return {};
  }
}

function writeStored(map: CopyMap) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function PrototypeCopyProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<CopyMap>(() => readStored());
  const [defaults, setDefaults] = useState<CopyMap>({});

  const registerDefaults = useCallback((next: CopyMap) => {
    setDefaults((current) => ({ ...current, ...next }));
  }, []);

  const setCopy = useCallback((key: string, value: string) => {
    setOverrides((current) => {
      const next = { ...current, [key]: value };
      writeStored(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setOverrides({});
    writeStored({});
  }, []);

  const getCopy = useCallback(
    (key: string, fallback: string) => {
      if (overrides[key] !== undefined) {
        return overrides[key];
      }
      if (defaults[key] !== undefined) {
        return defaults[key];
      }
      return fallback;
    },
    [defaults, overrides],
  );

  const entries = useMemo(() => {
    const keys = Array.from(
      new Set([...Object.keys(defaults), ...Object.keys(overrides)]),
    ).sort();

    return keys.map((key) => ({
      key,
      value: overrides[key] ?? defaults[key] ?? "",
      fallback: defaults[key] ?? "",
    }));
  }, [defaults, overrides]);

  const value = useMemo(
    () => ({
      getCopy,
      entries,
      registerDefaults,
      resetAll,
      setCopy,
    }),
    [entries, getCopy, registerDefaults, resetAll, setCopy],
  );

  return (
    <PrototypeCopyContext.Provider value={value}>
      {children}
    </PrototypeCopyContext.Provider>
  );
}

export function usePrototypeCopy() {
  const ctx = useContext(PrototypeCopyContext);
  if (!ctx) {
    throw new Error("usePrototypeCopy must be used within PrototypeCopyProvider");
  }
  return ctx;
}

export function useEditableCopy(key: string, fallback: string) {
  const { getCopy, registerDefaults } = usePrototypeCopy();

  useEffect(() => {
    registerDefaults({ [key]: fallback });
  }, [fallback, key, registerDefaults]);

  return getCopy(key, fallback);
}
