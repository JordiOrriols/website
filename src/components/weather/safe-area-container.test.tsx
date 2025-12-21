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

  it("applies custom className", () => {
    const { container } = render(
      <SafeAreaContainer className="bg-blue-500">
        <div>Content</div>
      </SafeAreaContainer>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("bg-blue-500");
  });

  it("applies fixed positioning classes", () => {
    const { container } = render(
      <SafeAreaContainer>
        <div>Content</div>
      </SafeAreaContainer>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("fixed");
    // Now uses inline styles for positioning instead of classes
    const styleAttr = wrapper.getAttribute("style");
    expect(styleAttr).toBeTruthy();
    expect(styleAttr).toContain("top");
    expect(styleAttr).toContain("bottom");
    expect(styleAttr).toContain("left");
    expect(styleAttr).toContain("right");
  });

  it("applies safe area inset styles", () => {
    const { container } = render(
      <SafeAreaContainer>
        <div>Content</div>
      </SafeAreaContainer>
    );

    const wrapper = container.firstChild as HTMLElement;

    // Check that wrapper has safe area inset styles
    const styleAttr = wrapper.getAttribute("style");
    expect(styleAttr).toBeTruthy();
    expect(styleAttr).toContain("top");
  });

  it("renders without className prop", () => {
    const { container } = render(
      <SafeAreaContainer>
        <div>Content</div>
      </SafeAreaContainer>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeTruthy();
    expect(wrapper.className).toContain("fixed");
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
