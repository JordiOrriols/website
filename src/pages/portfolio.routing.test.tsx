import React, { useEffect } from "react";
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Portfolio from "./portfolio";

const routesMocks = vi.hoisted(() => ({
  parsePortfolioPath: vi.fn(() => ({ locale: "en", section: "profile", slug: undefined })),
  isSupportedSection: vi.fn(() => true),
  normalizeLocale: vi.fn(() => "en"),
  buildPortfolioPath: vi.fn((locale: string, section: string, slug?: string) =>
    slug ? `/${locale}/${section}/${slug}` : `/${locale}/${section}`
  ),
  replacePortfolioRoute: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: "en",
      changeLanguage: vi.fn(),
    },
  }),
}));

vi.mock("@/lib/routes", () => routesMocks);

vi.mock("@/lib/weather", () => ({
  fetchCurrentWeather: vi.fn(() =>
    Promise.resolve({
      current_weather: { weathercode: 0 },
      daily: { sunrise: ["2024-01-01T08:00:00"], sunset: ["2024-01-01T19:00:00"] },
    })
  ),
  getWeatherMode: vi.fn(() => "clear"),
}));

vi.mock("@/lib/ambient", () => ({
  useAmbientAudio: () => ({
    playThunder: vi.fn(),
    playFireworks: vi.fn(),
    playClick: vi.fn(),
    playNotification: vi.fn(),
    toggleMute: vi.fn(),
    muted: false,
  }),
}));

vi.mock("@/lib/motion", () => ({
  useMotionPreference: () => ({
    reducedMotion: false,
    toggleReducedMotion: vi.fn(),
  }),
}));

function MockScrollCards({
  onActiveCardChange,
}: {
  onActiveCardChange?: (cardKey: string) => void;
}) {
  useEffect(() => {
    onActiveCardChange?.("profile");
  }, [onActiveCardChange]);

  return <div data-testid="scroll-cards-container">Scroll Cards</div>;
}

vi.mock("@/components/scroll-cards", () => ({
  default: MockScrollCards,
}));

vi.mock("@/components/sections/profile-card", () => ({
  default: () => <div data-testid="profile-card" />,
}));

vi.mock("@/components/sections/about-me", () => ({
  default: () => <div data-testid="about-me-section" />,
}));

vi.mock("@/components/sections/philosophy", () => ({
  default: () => <div data-testid="philosophy-section" />,
}));

vi.mock("@/components/sections/notes", () => ({
  default: () => <div data-testid="notes-section" />,
}));

vi.mock("@/components/sections/side-projects", () => ({
  default: () => <div data-testid="side-projects-section" />,
}));

vi.mock("@/components/weather/scenes/dynamic", () => ({
  default: () => <div data-testid="dynamic-scene" />,
}));

vi.mock("@/components/weather/scenes/thunderstorm", () => ({
  default: () => <div data-testid="thunderstorm-scene" />,
}));

vi.mock("@/components/weather/scenes/new-year", () => ({
  default: () => <div data-testid="new-year-scene" />,
}));

vi.mock("@/components/weather/scenes/halloween", () => ({
  default: () => <div data-testid="halloween-scene" />,
}));

vi.mock("@/components/dropdown", () => ({
  default: () => <div data-testid="dropdown" />,
}));

vi.mock("@/components/plane", () => ({
  default: () => <div data-testid="plane" />,
}));

vi.mock("react-error-boundary", () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Portfolio routing stability", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("preserves slug when active section callback matches current section", async () => {
    render(<Portfolio />);

    await waitFor(() => {
      expect(routesMocks.replacePortfolioRoute).toHaveBeenCalledWith("en", "profile", undefined);
    });
  });
});
