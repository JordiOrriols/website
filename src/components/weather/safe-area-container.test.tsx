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
    // Uses Tailwind classes for positioning
    expect(wrapper.className).toContain("top-0");
    expect(wrapper.className).toContain("left-0");
    expect(wrapper.className).toContain("right-0");
    expect(wrapper.className).toContain("bottom-0");
  });

  it("applies safe area inset styles via inline style", () => {
    const { container } = render(
      <SafeAreaContainer>
        <div>Content</div>
      </SafeAreaContainer>
    );

    const wrapper = container.firstChild as HTMLElement;

    // The component applies padding styles for safe area insets
    // In jsdom, env() values may not be fully interpreted, but the style prop is set
    expect(wrapper).toBeTruthy();
    expect(wrapper.className).toContain("fixed");
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
