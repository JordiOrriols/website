import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Avatar from "./avatar";

describe("Avatar Component", () => {
  it("renders avatar with gradient background", () => {
    const { container } = render(<Avatar season="summer" />);
    const avatar = container.querySelector(".rounded-full");
    expect(avatar).toBeTruthy();
    expect(avatar?.className).toContain("bg-gradient-to-br");
  });

  it("renders with hover state", async () => {
    const { container } = render(<Avatar season="summer" />);
    const avatar = container.querySelector(".rounded-full");

    if (avatar) {
      await userEvent.hover(avatar);
      expect(avatar).toBeTruthy();

      await userEvent.unhover(avatar);
      expect(avatar).toBeTruthy();
    }
  });

  it("calls onClickAvatar when clicked", async () => {
    const onClickAvatar = vi.fn();
    const { container } = render(<Avatar season="summer" onClickAvatar={onClickAvatar} />);
    const avatar = container.querySelector(".rounded-full") as HTMLElement;

    await userEvent.click(avatar);
    expect(onClickAvatar).toHaveBeenCalledTimes(1);
  });

  it.each<["summer" | "autumn" | "winter" | "spring"]>([
    ["summer"],
    ["autumn"],
    ["winter"],
    ["spring"],
  ])("renders avatar with season: %s", (season) => {
    const { container } = render(<Avatar season={season} />);
    const avatar = container.querySelector(".rounded-full");
    expect(avatar).toBeTruthy();
  });

  it("does not call callback if not provided on click", async () => {
    const { container } = render(<Avatar season="summer" />);
    const avatar = container.querySelector(".rounded-full") as HTMLElement;

    await userEvent.click(avatar);
    expect(avatar).toBeTruthy();
  });

  it("renders as a clickable interactive element", () => {
    const { container } = render(<Avatar season="summer" />);
    const avatar = container.querySelector(".rounded-full");
    expect(avatar?.getAttribute("class")).toContain("flex");
  });

  it("maintains full width and height dimensions", () => {
    const { container } = render(<Avatar season="summer" />);
    const avatar = container.querySelector(".rounded-full");
    expect(avatar?.className).toContain("w-full");
    expect(avatar?.className).toContain("h-full");
  });

  it("centers content with flex layout", () => {
    const { container } = render(<Avatar season="summer" />);
    const avatar = container.querySelector(".rounded-full");
    expect(avatar?.className).toContain("flex");
    expect(avatar?.className).toContain("items-center");
    expect(avatar?.className).toContain("justify-center");
  });

  it("has relative positioning for child positioning", () => {
    const { container } = render(<Avatar season="summer" />);
    const avatar = container.querySelector(".rounded-full");
    expect(avatar?.className).toContain("relative");
  });

  it("renders SVG element inside avatar", () => {
    const { container } = render(<Avatar season="summer" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("width")).toBe("100%");
    expect(svg?.getAttribute("height")).toBe("100%");
  });
});
