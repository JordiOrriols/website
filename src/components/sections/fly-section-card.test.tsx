import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FlySectionCard from "./fly-section-card";

describe("FlySectionCard", () => {
  const section = {
    emoji: "⚖️",
    title: "Weight section",
    paragraphs: ["Plain paragraph", "Paragraph with **bold** text"],
  };

  it("renders the emoji, title and paragraphs", () => {
    const { getByTestId, getByText } = render(
      <FlySectionCard section={section} testId="fly-section-0" />
    );
    const card = getByTestId("fly-section-0");
    expect(card.textContent).toContain("⚖️");
    expect(getByText("Weight section")).toBeTruthy();
    expect(getByText("Plain paragraph")).toBeTruthy();
  });

  it("renders bold markers as strong elements", () => {
    const { getByTestId } = render(<FlySectionCard section={section} testId="fly-section-0" />);
    const card = getByTestId("fly-section-0");
    expect(card.querySelector("strong")?.textContent).toBe("bold");
  });

  it("renders children after the paragraphs", () => {
    const { getByTestId, getByText } = render(
      <FlySectionCard section={section} testId="fly-section-0">
        <div data-testid="extra-content">Extra</div>
      </FlySectionCard>
    );
    expect(getByTestId("extra-content")).toBeTruthy();
    expect(getByText("Extra")).toBeTruthy();
  });

  it("caps height and enables scrolling for long content", () => {
    const { getByTestId } = render(<FlySectionCard section={section} testId="fly-section-0" />);
    expect(getByTestId("fly-section-0").className).toContain("max-h-[90dvh]");
    expect(getByTestId("fly-section-0").className).toContain("overflow-y-auto");
  });
});
