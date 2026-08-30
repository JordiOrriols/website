import React from "react";
import { render } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import FlyHeroCard from "./fly-hero-card";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en", changeLanguage: vi.fn() },
  }),
}));

describe("FlyHeroCard", () => {
  const section = {
    emoji: "✈️",
    title: "Want to come flying?",
    paragraphs: ["Hero paragraph one", "Hero paragraph two"],
  };

  it("renders the avatar in aviator (headset) mode", () => {
    const { getByTestId } = render(<FlyHeroCard section={section} testId="fly-hero-section" />);
    const card = getByTestId("fly-hero-section");
    expect(card.querySelector('[data-testid="profile-avatar"]')).toBeTruthy();
    const headset = card.querySelector('[id="headsets"]');
    expect(headset).toBeTruthy();
    expect(headset?.getAttribute("style") ?? "").not.toContain("display: none");
  });

  it("renders the language selector", () => {
    const { getByTestId } = render(<FlyHeroCard section={section} testId="fly-hero-section" />);
    expect(
      getByTestId("fly-hero-section").querySelector('[data-testid="language-selector"]')
    ).toBeTruthy();
  });

  it("renders the section title and paragraphs", () => {
    const { getByText } = render(<FlyHeroCard section={section} testId="fly-hero-section" />);
    expect(getByText("Want to come flying?")).toBeTruthy();
    expect(getByText("Hero paragraph one")).toBeTruthy();
  });

  it("does not cap the card height (avoids clipping the overlapping avatar)", () => {
    const { getByTestId } = render(<FlyHeroCard section={section} testId="fly-hero-section" />);
    const card = getByTestId("fly-hero-section");
    expect(card.className).toContain("overflow-visible");
    expect(card.className).not.toContain("max-h-");
  });
});
