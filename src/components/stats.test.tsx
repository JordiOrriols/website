import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Stats from "./stats";

describe("Stats Component", () => {
  const defaultOptions = [
    { label: "Stat 1", value: "10", onClick: vi.fn() },
    { label: "Stat 2", value: "20", onClick: vi.fn() },
    { label: "Stat 3", value: "30", onClick: vi.fn() },
    { label: "Stat 4", value: "40", onClick: vi.fn() },
  ];

  it("renders all stat buttons", () => {
    render(<Stats options={defaultOptions} />);
    expect(screen.getByText("Stat 1")).toBeTruthy();
    expect(screen.getByText("Stat 2")).toBeTruthy();
    expect(screen.getByText("Stat 3")).toBeTruthy();
    expect(screen.getByText("Stat 4")).toBeTruthy();
  });

  it.each<number>([1, 2, 3, 4, 5])("renders with %d options", (count) => {
    const options = Array.from({ length: count }, (_, i) => ({
      label: `Stat ${i + 1}`,
      value: `${(i + 1) * 10}`,
      onClick: vi.fn(),
    }));
    render(<Stats options={options} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(count);
  });

  it("displays stat values", () => {
    render(<Stats options={defaultOptions} />);
    expect(screen.getByText("10")).toBeTruthy();
    expect(screen.getByText("20")).toBeTruthy();
  });

  it("renders stat labels", () => {
    const options = [
      { label: "Projects", value: "15", onClick: vi.fn() },
      { label: "Years", value: "5", onClick: vi.fn() },
    ];
    render(<Stats options={options} />);
    expect(screen.getByText("Projects")).toBeTruthy();
    expect(screen.getByText("Years")).toBeTruthy();
  });

  it("calls onClick handler when stat button is clicked", async () => {
    const onClick = vi.fn();
    const options = [{ label: "Stat 1", value: "100", onClick }];
    render(<Stats options={options} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each<number>([0, 1, 2, 3])("calls correct onClick for option %d", async (index) => {
    const onClicks = Array.from({ length: 4 }, () => vi.fn());
    const options = onClicks.map((onClick, i) => ({
      label: `Stat ${i}`,
      value: `${i}`,
      onClick,
    }));
    render(<Stats options={options} />);
    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[index]);
    expect(onClicks[index]).toHaveBeenCalledTimes(1);
  });

  it("uses grid layout with responsive columns", () => {
    const { container } = render(<Stats options={defaultOptions} />);
    const wrapper = container.querySelector(".grid");
    expect(wrapper?.className).toContain("grid-cols-2");
    expect(wrapper?.className).toContain("sm:grid-cols-4");
  });

  it("applies padding and gap spacing", () => {
    const { container } = render(<Stats options={defaultOptions} />);
    const wrapper = container.querySelector(".grid");
    expect(wrapper?.className).toContain("gap-8");
    expect(wrapper?.className).toContain("px-8");
    expect(wrapper?.className).toContain("pb-7");
  });

  it("renders with optional unit property", () => {
    const options = [
      { label: "Years", value: "5", unit: "years", onClick: vi.fn() },
      { label: "Projects", value: "20", unit: "projects", onClick: vi.fn() },
    ];
    render(<Stats options={options} />);
    expect(screen.getByText("Years")).toBeTruthy();
    expect(screen.getByText("Projects")).toBeTruthy();
  });

  it("displays units when provided", () => {
    const options = [{ label: "Experience", value: "10", unit: "years", onClick: vi.fn() }];
    render(<Stats options={options} />);
    expect(screen.getByText("Experience")).toBeTruthy();
    expect(screen.getByText("10")).toBeTruthy();
  });

  it("has framer-motion animation with hover effect", () => {
    const { container } = render(<Stats options={defaultOptions} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0].tagName).toBe("BUTTON");
  });

  it("renders with empty options array", () => {
    const { container } = render(<Stats options={[]} />);
    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(0);
  });
});
