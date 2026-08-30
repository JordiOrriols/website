import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SideProjectsSection from "./side-projects";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { returnObjects?: boolean }) => {
      if (key === "sideProjectsItems" && opts?.returnObjects) {
        return [
          {
            title: "Watch Lab",
            shortDescription: "Interactive watch experiments focused on delightful details.",
            slug: "watch-lab",
            link: "https://example.com/watch-lab",
            images: ["/images/watch-lab-1.jpg", "/images/watch-lab-2.jpg"],
          },
        ];
      }

      const textMap: Record<string, string> = {
        sideProjectsLabel: "Side Projects",
        sideProjectsTitle: "Things I build out of curiosity",
        sideProjectsIntro: "Small products where I test ideas quickly.",
        projectLink: "Visit project",
      };

      return textMap[key] ?? key;
    },
    i18n: { language: "en" },
  }),
}));

const analyticsMocks = vi.hoisted(() => ({
  trackBlockVisible: vi.fn(),
  trackContentDisplayed: vi.fn(),
  trackSideProjectLinkClicked: vi.fn(),
}));

vi.mock("@/lib/analytics", () => analyticsMocks);

describe("SideProjectsSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders localized side projects content", () => {
    render(<SideProjectsSection />);
    expect(screen.getByText("Side Projects")).toBeInTheDocument();
    expect(screen.getByText("Watch Lab")).toBeInTheDocument();
  });

  it("renders the project images and visit link directly on the card", () => {
    render(<SideProjectsSection />);
    expect(
      screen.getByText("Interactive watch experiments focused on delightful details.")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Visit project" })).toHaveAttribute(
      "href",
      "https://example.com/watch-lab"
    );
  });

  it("tracks project link clicks", () => {
    render(<SideProjectsSection />);

    fireEvent.click(screen.getByRole("link", { name: "Visit project" }));

    expect(analyticsMocks.trackSideProjectLinkClicked).toHaveBeenCalledWith(
      "watch-lab",
      "https://example.com/watch-lab"
    );
  });

  it("has no open/close/back navigation left over", () => {
    render(<SideProjectsSection />);
    expect(screen.queryByRole("button", { name: /back to projects/i })).not.toBeInTheDocument();
    expect(screen.queryByTestId("side-project-detail")).not.toBeInTheDocument();
  });

  it("tracks the first project as visible on mount", () => {
    render(<SideProjectsSection />);
    expect(analyticsMocks.trackBlockVisible).toHaveBeenCalledWith("side_projects", "watch-lab");
    expect(analyticsMocks.trackContentDisplayed).toHaveBeenCalledWith(
      "side_project",
      "watch-lab",
      "side_projects"
    );
  });
});
