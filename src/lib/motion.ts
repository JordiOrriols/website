import { useCallback, useEffect, useState } from "react";

const MOTION_PREFERENCE_KEY = "motion_preference";

type MotionPreference = "reduced" | "full";

function getSystemReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getStoredPreference(): MotionPreference | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(MOTION_PREFERENCE_KEY);
  if (stored === "reduced" || stored === "full") {
    return stored;
  }

  return null;
}

export function useMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    const stored = getStoredPreference();
    if (stored) {
      return stored === "reduced";
    }

    return getSystemReducedMotion();
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(MOTION_PREFERENCE_KEY, reducedMotion ? "reduced" : "full");
  }, [reducedMotion]);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion((current) => !current);
  }, []);

  return {
    reducedMotion,
    setReducedMotion,
    toggleReducedMotion,
  };
}
