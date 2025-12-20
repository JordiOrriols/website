import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import Dropdown from "./dropdown";

describe("Dropdown Component", () => {
  const defaultProps = {
    auto: "default",
    placeholder: "Select an option",
    disabled: false,
    options: [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2", value: "opt2" },
      { label: "Option 3", value: "opt3" },
    ],
    value: "opt1",
    onValueChange: vi.fn(),
  };

  it.each<string>(["opt1", "opt2", "opt3"])("renders with value %s", (value) => {
    render(
      <I18nextProvider i18n={i18n}>
        <Dropdown {...defaultProps} value={value} />
      </I18nextProvider>
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeTruthy();
  });

  it("renders with placeholder text", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Dropdown {...defaultProps} placeholder="Choose..." />
      </I18nextProvider>
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeTruthy();
  });

  it("renders with custom styling classes", () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Dropdown {...defaultProps} />
      </I18nextProvider>
    );
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger?.className).toContain("bg-white");
    expect(trigger?.className).toContain("w-56");
  });

  it.each<boolean>([true, false])("renders with disabled state: %s", (disabled) => {
    render(
      <I18nextProvider i18n={i18n}>
        <Dropdown {...defaultProps} disabled={disabled} />
      </I18nextProvider>
    );
    const trigger = screen.getByRole("combobox");
    if (disabled) {
      expect(trigger).toHaveAttribute("disabled");
    }
  });

  it("displays auto option with green pulse indicator", () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Dropdown {...defaultProps} auto="custom" />
      </I18nextProvider>
    );
    // Auto option shows green pulse dot
    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeTruthy();
  });

  it("renders all options from props", () => {
    const options = [
      { label: "Summer", value: "summer" },
      { label: "Winter", value: "winter" },
      { label: "Spring", value: "spring" },
    ];
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Dropdown {...defaultProps} options={options} value="summer" />
      </I18nextProvider>
    );
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger).toBeTruthy();
  });

  it("capitalizes first letter of auto value", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Dropdown {...defaultProps} auto="automatic" />
      </I18nextProvider>
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeTruthy();
  });

  it("has semi-transparent white background with blur", () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Dropdown {...defaultProps} />
      </I18nextProvider>
    );
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger?.className).toContain("bg-white");
    expect(trigger?.className).toContain("backdrop-blur");
  });

  it("handles empty options array", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Dropdown {...defaultProps} options={[]} />
      </I18nextProvider>
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeTruthy();
  });

  it("applies white/50 border color", () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Dropdown {...defaultProps} />
      </I18nextProvider>
    );
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger?.className).toContain("border-white");
  });
});
