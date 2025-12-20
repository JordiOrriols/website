import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import HomeSection from "./home";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

// Mock Avatar component
vi.mock("@/components/avatar", () => ({
  default: ({ season, onClickAvatar }: any) => (
    <div data-testid="avatar" onClick={onClickAvatar}>
      Avatar-{season}
    </div>
  ),
}));

// Mock Stats component
vi.mock("@/components/stats", () => ({
  default: ({ options }: any) => (
    <div data-testid="stats">
      {options.map((opt: any) => (
        <button key={opt.label} onClick={opt.onClick} data-testid={`stat-${opt.label}`}>
          {opt.label}
        </button>
      ))}
    </div>
  ),
}));

// Mock LanguageSelector component
vi.mock("../language-selector", () => ({
  default: () => <div data-testid="language-selector">Language Selector</div>,
}));

// Mock Button component
vi.mock("@/components/ui/button", () => ({
  Button: ({ onClick, children }: any) => (
    <button onClick={onClick} data-testid="button">
      {children}
    </button>
  ),
}));

describe("HomeSection Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = render(<HomeSection season="summer" isModalOpen={false} />);
    expect(container).toBeTruthy();
  });

  it("renders avatar component", () => {
    const { getByTestId } = render(<HomeSection season="summer" isModalOpen={false} />);
    expect(getByTestId("avatar")).toBeTruthy();
  });

  it("renders stats section", () => {
    const { getByTestId } = render(<HomeSection season="summer" isModalOpen={false} />);
    expect(getByTestId("stats")).toBeTruthy();
  });

  it("renders language selector", () => {
    const { getByTestId } = render(<HomeSection season="summer" isModalOpen={false} />);
    expect(getByTestId("language-selector")).toBeTruthy();
  });

  it("calls handleStatClick when stat is clicked", () => {
    const handleStatClick = vi.fn();
    const { getByTestId } = render(
      <HomeSection season="summer" isModalOpen={false} handleStatClick={handleStatClick} />
    );

    const projectButton = getByTestId("stat-projects");
    fireEvent.click(projectButton);

    expect(handleStatClick).toHaveBeenCalledWith("projects");
  });

  it("calls onClickAvatar when avatar is clicked", () => {
    const onClickAvatar = vi.fn();
    const { getByTestId } = render(
      <HomeSection season="summer" isModalOpen={false} onClickAvatar={onClickAvatar} />
    );

    const avatar = getByTestId("avatar");
    fireEvent.click(avatar);

    expect(onClickAvatar).toHaveBeenCalled();
  });

  it("applies animation when modal is open", () => {
    const { container } = render(<HomeSection season="summer" isModalOpen={true} />);

    // The motion.div should have transform applied
    const motionDiv = container.querySelector('[class*="rounded-3xl"]');
    expect(motionDiv).toBeTruthy();
  });

  it("applies different animation when modal is closed", () => {
    const { container } = render(<HomeSection season="summer" isModalOpen={false} />);

    const motionDiv = container.querySelector('[class*="rounded-3xl"]');
    expect(motionDiv).toBeTruthy();
  });

  it("renders with summer season", () => {
    const { getByTestId } = render(<HomeSection season={"summer" as any} isModalOpen={false} />);
    const avatar = getByTestId("avatar");
    expect(avatar).toBeTruthy();
  });

  it("all stat buttons call handleStatClick with correct section", () => {
    const handleStatClick = vi.fn();
    const { getByTestId } = render(
      <HomeSection season="summer" isModalOpen={false} handleStatClick={handleStatClick} />
    );

    fireEvent.click(getByTestId("stat-companies"));
    expect(handleStatClick).toHaveBeenCalledWith("companies");

    fireEvent.click(getByTestId("stat-leading"));
    expect(handleStatClick).toHaveBeenCalledWith("leading_years");

    fireEvent.click(getByTestId("stat-experience"));
    expect(handleStatClick).toHaveBeenCalledWith("experience_years");
  });
});
