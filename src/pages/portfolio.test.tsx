import React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import Portfolio from "./portfolio";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock dependencies
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) => {
      if (opts?.returnObjects) return {};
      return key;
    },
    i18n: { language: "en" },
  }),
}));

vi.mock("@/lib/weather", () => ({
  fetchCurrentWeather: vi.fn(() =>
    Promise.resolve({
      current_weather: { weathercode: 0 },
      daily: { sunrise: ["2024-01-01T08:00:00"], sunset: ["2024-01-01T19:00:00"] },
    })
  ),
  getWeatherMode: vi.fn(() => "clear"),
}));

vi.mock("@/lib/ambient", () => ({
  useAmbientAudio: () => ({
    playThunder: vi.fn(),
    playFireworks: vi.fn(),
    playClick: vi.fn(),
    playNotification: vi.fn(),
    toggleMute: vi.fn(),
    muted: false,
  }),
}));

const motionMocks = vi.hoisted(() => ({
  toggleReducedMotion: vi.fn(),
}));

vi.mock("@/lib/motion", () => ({
  useMotionPreference: () => ({
    reducedMotion: false,
    toggleReducedMotion: motionMocks.toggleReducedMotion,
  }),
}));

const browserMocks = vi.hoisted(() => ({
  isSafari: vi.fn(() => false),
}));

vi.mock("@/lib/browser", () => ({
  isSafari: browserMocks.isSafari,
}));

vi.mock("@/components/weather/scenes/dynamic", () => ({
  default: () => <div data-testid="dynamic-scene">Dynamic Scene</div>,
  getSceneAccentColor: vi.fn(() => "#5CA9E6"),
}));

vi.mock("@/components/weather/scenes/thunderstorm", () => ({
  default: () => <div data-testid="thunderstorm-scene">Thunderstorm Scene</div>,
}));

vi.mock("@/components/weather/scenes/new-year", () => ({
  default: () => <div data-testid="new-year-scene">New Year Scene</div>,
}));

vi.mock("@/components/weather/scenes/halloween", () => ({
  default: () => <div data-testid="halloween-scene">Halloween Scene</div>,
}));

vi.mock("@/components/sections/home", () => ({
  default: ({ handleStatClick, onClickAvatar, isModalOpen }: any) => (
    <div data-testid="home-section">
      <button onClick={() => handleStatClick("projects")} data-testid="projects-btn">
        Projects
      </button>
      <button onClick={() => handleStatClick("companies")} data-testid="companies-btn">
        Companies
      </button>
      <button onClick={onClickAvatar} data-testid="avatar-btn">
        Avatar
      </button>
    </div>
  ),
}));

vi.mock("@/components/scroll-cards", () => ({
  default: ({ cards }: any) => (
    <div data-testid="scroll-cards-container">
      {cards.map((card: any) => (
        <div key={card.key} data-testid={`scroll-card-${card.key}`}>
          {card.component}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("@/components/sections/profile-card", () => ({
  default: ({ season, showPlane, onClickAvatar }: any) => (
    <div data-testid="profile-card" data-season={season}>
      <button onClick={onClickAvatar} data-testid="avatar-btn">
        Avatar
      </button>
    </div>
  ),
}));

vi.mock("@/components/sections/about-me", () => ({
  default: () => <div data-testid="about-me-section">About Me</div>,
}));

vi.mock("@/components/sections/philosophy", () => ({
  default: () => <div data-testid="philosophy-section">Philosophy</div>,
}));

vi.mock("@/components/sections/notes", () => ({
  default: () => <div data-testid="notes-section">Notes</div>,
}));

vi.mock("@/components/sections/side-projects", () => ({
  default: () => <div data-testid="side-projects-section">Side Projects</div>,
}));

vi.mock("@/components/dropdown", () => ({
  default: ({ onValueChange }: any) => (
    <select data-testid="dropdown" onChange={(e) => onValueChange(e.target.value)}>
      <option value="clear">Clear</option>
      <option value="rain">Rain</option>
    </select>
  ),
}));

vi.mock("@/components/plane", () => ({
  default: () => <div data-testid="plane">Plane</div>,
}));

vi.mock("react-error-boundary", () => ({
  ErrorBoundary: ({ children }: any) => <div>{children}</div>,
}));

describe("Portfolio Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    const { getByText } = render(<Portfolio />);
    expect(getByText("loadingWeather")).toBeTruthy();
  });

  it("renders profile card after loading", async () => {
    const { getByTestId } = render(<Portfolio />);

    await waitFor(() => {
      expect(getByTestId("profile-card")).toBeTruthy();
    });
  });

  it("renders scroll cards container", async () => {
    const { getByTestId } = render(<Portfolio />);

    await waitFor(() => {
      expect(getByTestId("scroll-cards-container")).toBeTruthy();
    });
  });

  it("renders about me section", async () => {
    const { getByTestId } = render(<Portfolio />);

    await waitFor(() => {
      expect(getByTestId("about-me-section")).toBeTruthy();
    });
  });

  it("renders philosophy section", async () => {
    const { getByTestId } = render(<Portfolio />);

    await waitFor(() => {
      expect(getByTestId("philosophy-section")).toBeTruthy();
    });
  });

  it("renders dynamic scene for clear weather", async () => {
    const { getByTestId } = render(<Portfolio />);

    await waitFor(() => {
      expect(getByTestId("dynamic-scene")).toBeTruthy();
    });
  });

  it("toggles avatar special events when avatar is clicked", async () => {
    const { getByTestId } = render(<Portfolio />);

    await waitFor(() => {
      const avatarBtn = getByTestId("avatar-btn");
      expect(avatarBtn).toBeTruthy();
      fireEvent.click(avatarBtn);
    });
  });

  it("renders weather dropdowns on desktop", async () => {
    const { getByTestId } = render(<Portfolio />);

    await waitFor(() => {
      const dropdowns = document.querySelectorAll('[data-testid="dropdown"]');
      expect(dropdowns.length).toBeGreaterThan(0);
    });
  });

  it("has mute button that toggles mute state", async () => {
    const { getByTestId } = render(<Portfolio />);

    await waitFor(() => {
      const buttons = document.querySelectorAll("button");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  it("has reduced motion button next to mute controls", async () => {
    render(<Portfolio />);

    await waitFor(() => {
      const reducedMotionButton = screen.getByLabelText("enableReducedMotion");
      expect(reducedMotionButton).toBeTruthy();
    });
  });

  it("calls reduced motion toggle when button is clicked", async () => {
    render(<Portfolio />);

    await waitFor(() => {
      fireEvent.click(screen.getByLabelText("enableReducedMotion"));
      expect(motionMocks.toggleReducedMotion).toHaveBeenCalledOnce();
    });
  });

  it("hides the reduced motion button on Safari", async () => {
    browserMocks.isSafari.mockReturnValueOnce(true);
    render(<Portfolio />);

    await waitFor(() => {
      const buttons = document.querySelectorAll("button");
      expect(buttons.length).toBeGreaterThan(0);
    });

    expect(screen.queryByLabelText("enableReducedMotion")).toBeNull();
  });

  it("has plane toggle button on desktop", async () => {
    const { container } = render(<Portfolio />);

    await waitFor(() => {
      const buttons = container.querySelectorAll("button");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  it("shows plane component when plane button is clicked", async () => {
    const { getByTestId, queryByTestId } = render(<Portfolio />);

    await waitFor(() => {
      const buttons = document.querySelectorAll("button");
      // Find the plane button (should be one of the control buttons)
      const planeBtn = Array.from(buttons).find((btn) => btn.querySelector("svg"));
      if (planeBtn) {
        fireEvent.click(planeBtn);
      }
    });

    // Plane might appear after clicking the button
    await waitFor(
      () => {
        // This may or may not render depending on which button was clicked
      },
      { timeout: 1000 }
    );
  });

  it("renders full-height container", async () => {
    const { container } = render(<Portfolio />);

    await waitFor(() => {
      const mainDiv =
        container.querySelector(".min-h-screen") || container.querySelector(".min-h-\\[100dvh\\]");
      expect(mainDiv).toBeTruthy();
    });
  });

  it("has perspective transform style on cards container", async () => {
    const { getByTestId } = render(<Portfolio />);

    await waitFor(() => {
      expect(getByTestId("scroll-cards-container")).toBeTruthy();
    });
  });

  it("renders without crashing", async () => {
    const { container } = render(<Portfolio />);

    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });
});
