import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import LanguageSelector from "./language-selector";

describe("LanguageSelector Component", () => {
  it("renders three language buttons", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  it.each<["ca" | "es" | "en", string]>([
    ["ca", "CA"],
    ["es", "ES"],
    ["en", "EN"],
  ])("renders language button %s with label %s", (code, label) => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    const button = screen.getByText(label);
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("has gray background container with rounded-full", () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toContain("bg-gray-100");
    expect(wrapper?.className).toContain("rounded-full");
  });

  it("positions selector absolutely at top-right", () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toContain("absolute");
    expect(wrapper?.className).toContain("top-5");
    expect(wrapper?.className).toContain("right-5");
  });

  it("highlights active language button with dark background", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    const enButton = screen.getByText("EN");
    expect(enButton.className).toContain("bg-[#2D4A6B]");
    expect(enButton.className).toContain("text-white");
  });

  it("changes language when button is clicked", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    const caButton = screen.getByText("CA");
    await userEvent.click(caButton);

    await waitFor(() => {
      expect(caButton.className).toContain("bg-[#2D4A6B]");
      expect(caButton.className).toContain("text-white");
    });
  });

  it("removes highlight from previously selected button", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    const enButton = screen.getByText("EN");
    const caButton = screen.getByText("CA");

    expect(enButton.className).toContain("bg-[#2D4A6B]");

    await userEvent.click(caButton);

    await waitFor(() => {
      expect(caButton.className).toContain("bg-[#2D4A6B]");
    });
  });

  it("applies inactive state styling to non-selected buttons", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    const esButton = screen.getByText("ES");
    expect(esButton.className).toContain("text-gray");
  });

  it("has transition animation on hover", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    const caButton = screen.getByText("CA");
    expect(caButton.className).toContain("transition-all");
    expect(caButton.className).toContain("duration-200");
  });

  it("buttons use small font size", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    const caButton = screen.getByText("CA");
    expect(caButton.className).toContain("text-xs");
    expect(caButton.className).toContain("font-medium");
  });
});
