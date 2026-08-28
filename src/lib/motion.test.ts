import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useMotionPreference } from "./motion";

describe("useMotionPreference", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn(),
    });
  });

  it("uses system preference when no stored value exists", () => {
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          matches: query === "(prefers-reduced-motion: reduce)",
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as MediaQueryList
    );

    const { result } = renderHook(() => useMotionPreference());

    expect(result.current.reducedMotion).toBe(true);
  });

  it("uses stored preference over system preference", () => {
    localStorage.setItem("motion_preference", "full");

    vi.spyOn(window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          matches: query === "(prefers-reduced-motion: reduce)",
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as MediaQueryList
    );

    const { result } = renderHook(() => useMotionPreference());

    expect(result.current.reducedMotion).toBe(false);
  });

  it("toggles and persists preference", () => {
    vi.spyOn(window, "matchMedia").mockImplementation(
      () =>
        ({
          matches: false,
          media: "(prefers-reduced-motion: reduce)",
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as MediaQueryList
    );

    const { result } = renderHook(() => useMotionPreference());

    expect(result.current.reducedMotion).toBe(false);

    act(() => {
      result.current.toggleReducedMotion();
    });

    expect(result.current.reducedMotion).toBe(true);
    expect(localStorage.getItem("motion_preference")).toBe("reduced");
  });
});
