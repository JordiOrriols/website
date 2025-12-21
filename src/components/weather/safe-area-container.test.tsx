import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import SafeAreaContainer from "./safe-area-container";

describe("SafeAreaContainer", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <SafeAreaContainer>
        <div>Test Content</div>
      </SafeAreaContainer>
    );

    expect(getByText("Test Content")).toBeTruthy();
  });

  it("applies custom className to background layer", () => {
    const { container } = render(
      <SafeAreaContainer className="bg-blue-500">
        <div>Content</div>
      </SafeAreaContainer>
    );

    // First child is the background layer
    const backgroundLayer = container.firstChild as HTMLElement;
    expect(backgroundLayer.className).toContain("bg-blue-500");
  });

  it("renders two layers - background and content", () => {
    const { container } = render(
      <SafeAreaContainer>
        <div>Content</div>
      </SafeAreaContainer>
    );

    // Should have 2 direct children (background layer + content layer)
    expect(container.childNodes.length).toBe(2);

    const backgroundLayer = container.childNodes[0] as HTMLElement;
    const contentLayer = container.childNodes[1] as HTMLElement;

    expect(backgroundLayer.className).toContain("fixed");
    expect(contentLayer.className).toContain("fixed");
    expect(contentLayer.className).toContain("inset-0");
  });

  it("background layer has fixed positioning with inline styles", () => {
    const { container } = render(
      <SafeAreaContainer>
        <div>Content</div>
      </SafeAreaContainer>
    );

    const backgroundLayer = container.firstChild as HTMLElement;
    expect(backgroundLayer.className).toContain("fixed");
    // Uses inline styles for positioning
    const style = backgroundLayer.getAttribute("style");
    expect(style).toContain("top");
  });

  it("renders without className prop", () => {
    const { container } = render(
      <SafeAreaContainer>
        <div>Content</div>
      </SafeAreaContainer>
    );

    const backgroundLayer = container.firstChild as HTMLElement;
    expect(backgroundLayer).toBeTruthy();
    expect(backgroundLayer.className).toContain("fixed");
  });

  it("renders multiple children", () => {
    const { getByText } = render(
      <SafeAreaContainer>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </SafeAreaContainer>
    );

    expect(getByText("First")).toBeTruthy();
    expect(getByText("Second")).toBeTruthy();
    expect(getByText("Third")).toBeTruthy();
  });
});
