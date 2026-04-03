import React from "react";
import { render } from "@testing-library/react";
import Philosophy from "./philosophy";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) => {
      if (opts?.returnObjects) {
        if (key === "philosophyPrinciples") {
          return [
            { number: "01", title: "Principle 1", description: "Description 1" },
            { number: "02", title: "Principle 2", description: "Description 2" },
            { number: "03", title: "Principle 3", description: "Description 3" },
          ];
        }
        return [];
      }
      return key;
    },
    i18n: { language: "en" },
  }),
}));

describe("Philosophy Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = render(<Philosophy />);
    expect(container).toBeTruthy();
  });

  it("renders section label", () => {
    const { getByText } = render(<Philosophy />);
    expect(getByText("philosophyLabel")).toBeTruthy();
  });

  it("renders section title", () => {
    const { getByText } = render(<Philosophy />);
    expect(getByText("philosophyTitle")).toBeTruthy();
  });

  it("renders all principles", () => {
    const { getByText } = render(<Philosophy />);
    expect(getByText("Principle 1")).toBeTruthy();
    expect(getByText("Principle 2")).toBeTruthy();
    expect(getByText("Principle 3")).toBeTruthy();
  });

  it("renders principle numbers", () => {
    const { getByText } = render(<Philosophy />);
    expect(getByText("01")).toBeTruthy();
    expect(getByText("02")).toBeTruthy();
    expect(getByText("03")).toBeTruthy();
  });

  it("renders principle descriptions", () => {
    const { getByText } = render(<Philosophy />);
    expect(getByText("Description 1")).toBeTruthy();
    expect(getByText("Description 2")).toBeTruthy();
    expect(getByText("Description 3")).toBeTruthy();
  });

  it("renders correct number of principle items", () => {
    const { getAllByTestId } = render(<Philosophy />);
    const items = getAllByTestId(/^principle-/);
    expect(items).toHaveLength(3);
  });

  it("has correct card styling", () => {
    const { getByTestId } = render(<Philosophy />);
    const card = getByTestId("philosophy-section");
    expect(card.className).toContain("rounded-3xl");
  });
});
