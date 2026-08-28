import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AnalyticsConsent from "./analytics-consent";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const textMap: Record<string, string> = {
        analyticsConsentTitle: "Analytics preferences",
        analyticsConsentDescription:
          "Allow anonymous analytics to understand which sections people view and open.",
        analyticsConsentAccept: "Allow analytics",
        analyticsConsentDecline: "Decline analytics",
        analyticsConsentManage: "Privacy settings",
      };

      return textMap[key] ?? key;
    },
  }),
}));

const analyticsMocks = vi.hoisted(() => ({
  getAnalyticsConsent: vi.fn(),
  setAnalyticsConsent: vi.fn(),
  trackConsentDecision: vi.fn(),
}));

vi.mock("@/lib/analytics", () => analyticsMocks);

describe("AnalyticsConsent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders consent banner when no decision was made", () => {
    analyticsMocks.getAnalyticsConsent.mockReturnValue(null);

    render(<AnalyticsConsent />);

    expect(screen.getByText("Analytics preferences")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Allow analytics" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Decline analytics" })).toBeInTheDocument();
  });

  it("accepts analytics and stores consent", () => {
    analyticsMocks.getAnalyticsConsent.mockReturnValue(null);

    render(<AnalyticsConsent />);

    fireEvent.click(screen.getByRole("button", { name: "Allow analytics" }));

    expect(analyticsMocks.setAnalyticsConsent).toHaveBeenCalledWith("granted");
    expect(analyticsMocks.trackConsentDecision).toHaveBeenCalledWith("granted");
  });

  it("shows manage button when consent was already decided", () => {
    analyticsMocks.getAnalyticsConsent.mockReturnValue("denied");

    render(<AnalyticsConsent />);

    expect(screen.getByRole("button", { name: "Privacy settings" })).toBeInTheDocument();
  });
});
