import React from "react";
import { render } from "@testing-library/react";
import Card from "./card";
import { describe, it, expect } from "vitest";

describe("Card Component", () => {
  it("renders children", () => {
    const { getByText } = render(<Card>Hello</Card>);
    expect(getByText("Hello")).toBeTruthy();
  });

  it("applies base card styling", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain("bg-white/95");
    expect(card.className).toContain("backdrop-blur-sm");
    expect(card.className).toContain("rounded-3xl");
    expect(card.className).toContain("shadow-2xl");
  });

  it("applies default overflow-hidden", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain("overflow-hidden");
  });

  it("accepts additional className", () => {
    const { container } = render(<Card className="relative overflow-visible">Content</Card>);
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain("relative");
    expect(card.className).toContain("overflow-visible");
  });

  it("forwards data-testid", () => {
    const { getByTestId } = render(<Card data-testid="my-card">Content</Card>);
    expect(getByTestId("my-card")).toBeTruthy();
  });

  it("renders as the specified element via as prop", () => {
    const { container } = render(<Card as="section">Content</Card>);
    expect(container.firstElementChild?.tagName).toBe("SECTION");
  });

  it("defaults to div element", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstElementChild?.tagName).toBe("DIV");
  });
});
