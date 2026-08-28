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
            images: [
              "/images/watch-lab-1.jpg",
              "/images/watch-lab-2.jpg",
            ],
          },
        ];
      }

      const textMap: Record<string, string> = {
        sideProjectsLabel: "Side Projects",
        sideProjectsTitle: "Things I build out of curiosity",
        sideProjectsIntro: "Small products where I test ideas quickly.",
        openProject: "Open project",
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
  trackSideProjectOpened: vi.fn(),
  trackSideProjectLinkClicked: vi.fn(),
}));

const routesMocks = vi.hoisted(() => ({
  normalizeLocale: vi.fn(() => "en"),
  pushPortfolioRoute: vi.fn(),
}));

vi.mock("@/lib/analytics", () => analyticsMocks);
vi.mock("@/lib/routes", () => routesMocks);

describe("SideProjectsSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders localized side projects content", () => {
    render(<SideProjectsSection />);

    expect(screen.getByText("Side Projects")).toBeInTheDocument();
    expect(screen.getByText("Watch Lab")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("tracks project open action", () => {
    render(<SideProjectsSection />);

    fireEvent.click(screen.getByRole("button", { name: "Open project" }));

    expect(routesMocks.pushPortfolioRoute).toHaveBeenCalledWith("en", "side-projects", "watch-lab");
    expect(analyticsMocks.trackSideProjectOpened).toHaveBeenCalledWith("watch-lab");
  });

  it("tracks project link click", () => {
    render(<SideProjectsSection />);

    fireEvent.click(screen.getByRole("link", { name: "Visit project" }));

    expect(analyticsMocks.trackSideProjectLinkClicked).toHaveBeenCalledWith(
      "watch-lab",
      "https://example.com/watch-lab"
    );
  });

  it("highlights project when activeSlug matches", () => {
    render(<SideProjectsSection activeSlug="watch-lab" />);

    const projectCard = screen.getByText("Watch Lab").closest("article");
    expect(projectCard?.className).toContain("border-[#4A6FA5]");
  });
});
