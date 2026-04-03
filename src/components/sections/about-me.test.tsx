import React from "react";
import { render } from "@testing-library/react";
import AboutMe from "./about-me";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) => {
      if (opts?.returnObjects) {
        if (key === "aboutMeHighlights") {
          return ["Highlight 1", "Highlight 2", "Highlight 3"];
        }
        return [];
      }
      return key;
    },
    i18n: { language: "en" },
  }),
}));

describe("AboutMe Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = render(<AboutMe />);
    expect(container).toBeTruthy();
  });

  it("renders section label", () => {
    const { getByText } = render(<AboutMe />);
    expect(getByText("aboutMeLabel")).toBeTruthy();
  });

  it("renders section title", () => {
    const { getByText } = render(<AboutMe />);
    expect(getByText("aboutMeTitle")).toBeTruthy();
  });

  it("renders profile photo", () => {
    const { getByTestId } = render(<AboutMe />);
    expect(getByTestId("about-me-photo")).toBeTruthy();
  });

  it("renders first bio paragraph", () => {
    const { getByText } = render(<AboutMe />);
    expect(getByText("aboutMeDescription1")).toBeTruthy();
  });

  it("renders second bio paragraph", () => {
    const { getByText } = render(<AboutMe />);
    expect(getByText("aboutMeDescription2")).toBeTruthy();
  });

  it("renders location badge", () => {
    const { getByText } = render(<AboutMe />);
    expect(getByText("aboutMeLocation")).toBeTruthy();
  });

  it("renders location with map pin icon", () => {
    const { getByTestId } = render(<AboutMe />);
    expect(getByTestId("about-me-location")).toBeTruthy();
  });

  it("renders all highlights", () => {
    const { getByText } = render(<AboutMe />);
    expect(getByText("Highlight 1")).toBeTruthy();
    expect(getByText("Highlight 2")).toBeTruthy();
    expect(getByText("Highlight 3")).toBeTruthy();
  });

  it("renders highlights with check icons", () => {
    const { getAllByTestId } = render(<AboutMe />);
    const checkIcons = getAllByTestId("highlight-check");
    expect(checkIcons).toHaveLength(3);
  });

  it("has correct card styling", () => {
    const { getByTestId } = render(<AboutMe />);
    const card = getByTestId("about-me-section");
    expect(card.className).toContain("rounded-3xl");
  });
});
