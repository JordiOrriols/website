import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProfileCard from "./profile-card";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) => {
      if (opts?.returnObjects) return [];
      return key;
    },
    i18n: { language: "en" },
  }),
}));

// Mock HomeSection
vi.mock("@/components/sections/home", () => ({
  default: ({ season, showPlane, isModalOpen, handleStatClick, onClickAvatar }: any) => (
    <div
      data-testid="home-section"
      data-season={season}
      data-show-plane={showPlane}
      data-modal-open={isModalOpen}
    >
      <button onClick={() => handleStatClick?.("companies")} data-testid="stat-companies">
        Companies
      </button>
      <button onClick={() => handleStatClick?.("experience_years")} data-testid="stat-experience">
        Experience
      </button>
      <button disabled onClick={() => handleStatClick?.("projects")} data-testid="stat-projects">
        Projects
      </button>
      <button
        disabled
        onClick={() => handleStatClick?.("leading_years")}
        data-testid="stat-leading"
      >
        Leading
      </button>
      <button onClick={() => handleStatClick?.("contact")} data-testid="stat-contact">
        Contact
      </button>
      <button onClick={onClickAvatar} data-testid="avatar-btn">
        Avatar
      </button>
    </div>
  ),
}));

// Mock ContactForm
vi.mock("@/components/sections/contact-form", () => ({
  default: ({ onClose }: any) => (
    <div data-testid="contact-form">
      <button onClick={onClose} data-testid="close-contact">
        Close
      </button>
    </div>
  ),
}));

// Mock ProjectsGallery
vi.mock("@/components/sections/projects", () => ({
  default: ({ onClose }: any) => (
    <div data-testid="projects-gallery">
      <button onClick={onClose} data-testid="close-projects">
        Close
      </button>
    </div>
  ),
}));

// Mock Gallery
vi.mock("@/components/sections/gallery", () => ({
  default: ({ onClose, title }: any) => (
    <div data-testid="gallery" data-title={title}>
      <button onClick={onClose} data-testid="close-gallery">
        Close
      </button>
    </div>
  ),
}));

// Mock WorkTimeline
vi.mock("@/components/sections/experience", () => ({
  default: ({ onClose }: any) => (
    <div data-testid="work-timeline">
      <button onClick={onClose} data-testid="close-timeline">
        Close
      </button>
    </div>
  ),
}));

// Mock companies data
vi.mock("@/data/companies", () => ({
  companiesGallery: [],
}));

// Mock analytics
vi.mock("@/lib/analytics", () => ({
  trackStatClick: vi.fn(),
  trackModalAction: vi.fn(),
}));

// Mock react-error-boundary
vi.mock("react-error-boundary", () => ({
  ErrorBoundary: ({ children }: any) => <>{children}</>,
}));

describe("ProfileCard Component", () => {
  const defaultProps = {
    season: "summer" as const,
    showPlane: false,
    playClick: vi.fn(),
    onClickAvatar: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders HomeSection", () => {
    const { getByTestId } = render(<ProfileCard {...defaultProps} />);
    expect(getByTestId("home-section")).toBeTruthy();
  });

  it("passes season to HomeSection", () => {
    const { getByTestId } = render(<ProfileCard {...defaultProps} season="christmas" />);
    expect(getByTestId("home-section").dataset.season).toBe("christmas");
  });

  it("passes showPlane to HomeSection", () => {
    const { getByTestId } = render(<ProfileCard {...defaultProps} showPlane={true} />);
    expect(getByTestId("home-section").dataset.showPlane).toBe("true");
  });

  it("passes onClickAvatar to HomeSection", () => {
    const onClickAvatar = vi.fn();
    const { getByTestId } = render(<ProfileCard {...defaultProps} onClickAvatar={onClickAvatar} />);
    fireEvent.click(getByTestId("avatar-btn"));
    expect(onClickAvatar).toHaveBeenCalled();
  });

  it("starts with no active modal", () => {
    const { getByTestId } = render(<ProfileCard {...defaultProps} />);
    expect(getByTestId("home-section").dataset.modalOpen).toBe("false");
  });

  it("opens companies modal on stat click", () => {
    const { getByTestId, queryByTestId } = render(<ProfileCard {...defaultProps} />);
    fireEvent.click(getByTestId("stat-companies"));
    expect(queryByTestId("gallery")).toBeTruthy();
  });

  it("opens experience modal on stat click", () => {
    const { getByTestId, queryByTestId } = render(<ProfileCard {...defaultProps} />);
    fireEvent.click(getByTestId("stat-experience"));
    expect(queryByTestId("work-timeline")).toBeTruthy();
  });

  it("opens contact modal on stat click", () => {
    const { getByTestId, queryByTestId } = render(<ProfileCard {...defaultProps} />);
    fireEvent.click(getByTestId("stat-contact"));
    expect(queryByTestId("contact-form")).toBeTruthy();
  });

  it("keeps projects stat disabled", () => {
    const { getByTestId, queryByTestId } = render(<ProfileCard {...defaultProps} />);
    fireEvent.click(getByTestId("stat-projects"));
    expect(queryByTestId("projects-gallery")).toBeNull();
  });

  it("keeps leading stat disabled", () => {
    const { getByTestId, queryByTestId } = render(<ProfileCard {...defaultProps} />);
    fireEvent.click(getByTestId("stat-leading"));
    expect(queryByTestId("gallery")).toBeNull();
  });

  it("plays click sound when opening a modal", () => {
    const playClick = vi.fn();
    const { getByTestId } = render(<ProfileCard {...defaultProps} playClick={playClick} />);
    fireEvent.click(getByTestId("stat-companies"));
    expect(playClick).toHaveBeenCalled();
  });

  it("sets isModalOpen to true when modal is open", () => {
    const { getByTestId } = render(<ProfileCard {...defaultProps} />);
    fireEvent.click(getByTestId("stat-companies"));
    expect(getByTestId("home-section").dataset.modalOpen).toBe("true");
  });

  it("closes modal and plays click sound", () => {
    const playClick = vi.fn();
    const { getByTestId, queryByTestId } = render(
      <ProfileCard {...defaultProps} playClick={playClick} />
    );
    fireEvent.click(getByTestId("stat-companies"));
    playClick.mockClear();
    fireEvent.click(getByTestId("close-gallery"));
    expect(queryByTestId("gallery")).toBeNull();
    expect(playClick).toHaveBeenCalled();
  });

  it("resets isModalOpen to false when modal closes", () => {
    const { getByTestId } = render(<ProfileCard {...defaultProps} />);
    fireEvent.click(getByTestId("stat-companies"));
    expect(getByTestId("home-section").dataset.modalOpen).toBe("true");
    fireEvent.click(getByTestId("close-gallery"));
    expect(getByTestId("home-section").dataset.modalOpen).toBe("false");
  });

  it("tracks analytics on modal open", async () => {
    const { trackStatClick, trackModalAction } = await import("@/lib/analytics");
    const { getByTestId } = render(<ProfileCard {...defaultProps} />);
    fireEvent.click(getByTestId("stat-companies"));
    expect(trackStatClick).toHaveBeenCalledWith("companies");
    expect(trackModalAction).toHaveBeenCalledWith("open", "companies");
  });

  it("tracks analytics on modal close", async () => {
    const { trackModalAction } = await import("@/lib/analytics");
    const { getByTestId } = render(<ProfileCard {...defaultProps} />);
    fireEvent.click(getByTestId("stat-companies"));
    (trackModalAction as ReturnType<typeof vi.fn>).mockClear();
    fireEvent.click(getByTestId("close-gallery"));
    expect(trackModalAction).toHaveBeenCalledWith("close", "companies");
  });
});
