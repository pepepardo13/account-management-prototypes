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

// A list of key prefixes that are "active" for the screen/state currently on
// screen. `null` means show everything. Scoping by prefix (rather than by a
// coarse screen name) ensures that only the current plan tier's copy is shown,
// so fields don't appear multiple times once several tiers have been visited.
export type CopyScope = string[] | null;

type PrototypeCopyContextValue = {
  getCopy: (key: string, fallback: string) => string;
  entries: Array<{ key: string; value: string; fallback: string }>;
  registerDefaults: (defaults: CopyMap) => void;
  resetAll: () => void;
  scope: CopyScope;
  setCopy: (key: string, value: string) => void;
  setScope: (scope: CopyScope) => void;
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
  const [scope, setScope] = useState<CopyScope>(null);

  const registerDefaults = useCallback((next: CopyMap) => {
    setDefaults((current) => {
      const hasChange = Object.keys(next).some((key) => current[key] !== next[key]);
      return hasChange ? { ...current, ...next } : current;
    });
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
      scope,
      setCopy,
      setScope,
    }),
    [entries, getCopy, registerDefaults, resetAll, scope, setCopy],
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
