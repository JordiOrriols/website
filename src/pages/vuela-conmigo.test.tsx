import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FlyWithMe from "./vuela-conmigo";
import { vi, describe, it, expect, beforeEach } from "vitest";

const heroIntro = ["Hero paragraph one", "Hero paragraph **two**"];
const sections = [
  { emoji: "⚖️", title: "Weight section", paragraphs: ["Weight paragraph"] },
  { emoji: "🗺️", title: "Routes section", paragraphs: ["Routes paragraph"] },
  { emoji: "🕐", title: "Time section", paragraphs: ["Time paragraph"] },
  { emoji: "🎧", title: "Experience section", paragraphs: ["Experience paragraph"] },
  { emoji: "💰", title: "Cost section", paragraphs: ["Cost paragraph"] },
  { emoji: "📅", title: "Booking section", paragraphs: ["Booking paragraph"] },
];

const changeLanguage = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) => {
      if (opts?.returnObjects) {
        if (key === "flyWithMeHeroIntro") return heroIntro;
        if (key === "flyWithMeSections") return sections;
        return [];
      }
      return key;
    },
    i18n: { language: "en", changeLanguage },
  }),
}));

vi.mock("@/lib/motion", () => ({
  useMotionPreference: () => ({ reducedMotion: false, toggleReducedMotion: vi.fn() }),
}));

vi.mock("@/components/weather/scenes/dynamic", () => ({
  default: ({ weather, timeOfDay }: { weather: string; timeOfDay: string }) => (
    <div data-testid="dynamic-scene" data-weather={weather} data-time-of-day={timeOfDay} />
  ),
}));

vi.mock("@/components/plane", () => ({
  default: () => <div data-testid="plane">Plane</div>,
}));

vi.mock("@/components/sections/fly-booking-modal", () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="fly-booking-modal">
      <button onClick={onClose} data-testid="fly-booking-modal-close">
        close
      </button>
    </div>
  ),
}));

const { trackSectionVisible, trackLanguageChange, trackModalAction } = vi.hoisted(() => ({
  trackSectionVisible: vi.fn(),
  trackLanguageChange: vi.fn(),
  trackModalAction: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({
  trackSectionVisible,
  trackLanguageChange,
  trackModalAction,
}));

describe("FlyWithMe page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.replaceState({}, "", "/vuela-conmigo");
  });

  it("renders without crashing", () => {
    const { container } = render(<FlyWithMe />);
    expect(container).toBeTruthy();
  });

  it("always renders the clear/day background, regardless of real weather", () => {
    const { getByTestId } = render(<FlyWithMe />);
    const scene = getByTestId("dynamic-scene");
    expect(scene.dataset.weather).toBe("clear");
    expect(scene.dataset.timeOfDay).toBe("day");
  });

  it("always renders the plane", () => {
    const { getByTestId } = render(<FlyWithMe />);
    expect(getByTestId("plane")).toBeTruthy();
  });

  it("renders the avatar in aviator (headset) mode on the hero card", () => {
    const { getByTestId } = render(<FlyWithMe />);
    const hero = getByTestId("fly-hero-section");
    const avatar = hero.querySelector('[data-testid="profile-avatar"]');
    expect(avatar).toBeTruthy();
    const headset = hero.querySelector('[id="headsets"]');
    expect(headset).toBeTruthy();
    expect(headset?.getAttribute("style") ?? "").not.toContain("display: none");
  });

  it("renders the hero section", () => {
    const { getByTestId, getByText } = render(<FlyWithMe />);
    expect(getByTestId("fly-hero-section")).toBeTruthy();
    expect(getByText("flyWithMeHeroTitle")).toBeTruthy();
    expect(getByText("Hero paragraph one")).toBeTruthy();
  });

  it("renders bold markers inside hero paragraphs as strong elements", () => {
    const { getByTestId } = render(<FlyWithMe />);
    const hero = getByTestId("fly-hero-section");
    expect(hero.querySelector("strong")?.textContent).toBe("two");
  });

  it("renders all 6 section cards", () => {
    const { getByTestId } = render(<FlyWithMe />);
    sections.forEach((section, index) => {
      const card = getByTestId(`fly-section-${index}`);
      expect(card.textContent).toContain(section.title);
    });
  });

  it("renders a find-date button only inside the last section, closed by default", () => {
    const { getByTestId, getAllByTestId, queryByTestId } = render(<FlyWithMe />);
    expect(getAllByTestId("fly-find-date-button")).toHaveLength(1);
    const lastSection = getByTestId(`fly-section-${sections.length - 1}`);
    expect(lastSection.querySelector('[data-testid="fly-find-date-button"]')).toBeTruthy();
    expect(queryByTestId("fly-booking-modal")).toBeNull();
  });

  it("opens the booking modal when the find-date button is clicked, and tracks it", () => {
    const { getByTestId } = render(<FlyWithMe />);
    fireEvent.click(getByTestId("fly-find-date-button"));
    expect(getByTestId("fly-booking-modal")).toBeTruthy();
    expect(trackModalAction).toHaveBeenCalledWith("open", "booking");
  });

  it("closes the booking modal and tracks it", () => {
    const { getByTestId, queryByTestId } = render(<FlyWithMe />);
    fireEvent.click(getByTestId("fly-find-date-button"));
    fireEvent.click(getByTestId("fly-booking-modal-close"));
    expect(queryByTestId("fly-booking-modal")).toBeNull();
    expect(trackModalAction).toHaveBeenCalledWith("close", "booking");
  });

  it("has the page root test id", () => {
    const { getByTestId } = render(<FlyWithMe />);
    expect(getByTestId("vuela-conmigo-page")).toBeTruthy();
  });

  it("switches language to the locale found in the URL", () => {
    window.history.replaceState({}, "", "/es/vuela-conmigo");
    render(<FlyWithMe />);
    expect(changeLanguage).toHaveBeenCalledWith("es");
  });

  it("does not change language when the URL has no locale segment", () => {
    window.history.replaceState({}, "", "/vuela-conmigo");
    render(<FlyWithMe />);
    expect(changeLanguage).not.toHaveBeenCalled();
  });

  it("renders the language selector on the hero card", () => {
    const { getByTestId } = render(<FlyWithMe />);
    const hero = getByTestId("fly-hero-section");
    expect(hero.querySelector('[data-testid="language-selector"]')).toBeTruthy();
  });

  it("switching language from the selector keeps the /vuela-conmigo path", () => {
    const { getByTestId } = render(<FlyWithMe />);
    getByTestId("language-button-es").click();
    expect(window.location.pathname).toBe("/es/vuela-conmigo");
    expect(trackLanguageChange).toHaveBeenCalledWith("es");
  });

  it("tracks visibility for the hero card on mount", () => {
    render(<FlyWithMe />);
    expect(trackSectionVisible).toHaveBeenCalledWith("fly-hero");
  });
});
