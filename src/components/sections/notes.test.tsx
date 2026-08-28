import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NotesSection from "./notes";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { returnObjects?: boolean }) => {
      if (key === "notesItems" && opts?.returnObjects) {
        return [
          {
            title: "Shipping under pressure",
            shortText: "How to split delivery in measurable milestones.",
            tags: ["delivery", "leadership"],
            slug: "shipping-under-pressure",
          },
        ];
      }

      const textMap: Record<string, string> = {
        notesLabel: "Notes",
        notesTitle: "Small writing on engineering leadership",
        notesIntro: "Short notes I use to capture decisions and lessons learned.",
        backToNotes: "Back to notes",
      };

      return textMap[key] ?? key;
    },
    i18n: { language: "en" },
  }),
}));

const analyticsMocks = vi.hoisted(() => ({
  trackBlockVisible: vi.fn(),
  trackContentDisplayed: vi.fn(),
  trackNoteOpened: vi.fn(),
}));

const routesMocks = vi.hoisted(() => ({
  normalizeLocale: vi.fn(() => "en"),
  pushPortfolioRoute: vi.fn(),
  replacePortfolioRoute: vi.fn(),
}));

vi.mock("@/lib/analytics", () => analyticsMocks);
vi.mock("@/lib/routes", () => routesMocks);

describe("NotesSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders localized notes content", () => {
    render(<NotesSection />);

    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByText("Shipping under pressure")).toBeInTheDocument();
    expect(screen.getByText("#delivery")).toBeInTheDocument();
  });

  it("opens note detail when clicking a note card", () => {
    render(<NotesSection />);

    fireEvent.click(screen.getByRole("button", { name: /Shipping under pressure/i }));

    expect(routesMocks.pushPortfolioRoute).toHaveBeenCalledWith("en", "notes", "shipping-under-pressure");
    expect(analyticsMocks.trackNoteOpened).toHaveBeenCalledWith("shipping-under-pressure");

    return waitFor(() => {
      expect(screen.getByTestId("note-detail")).toBeInTheDocument();
    });
  });

  it("returns to notes root from detail view", () => {
    render(<NotesSection activeSlug="shipping-under-pressure" />);

    fireEvent.click(screen.getByRole("button", { name: "Back to notes" }));

    expect(routesMocks.replacePortfolioRoute).toHaveBeenCalledWith("en", "notes");
  });

  it("does not render open and copy actions in list view", () => {
    render(<NotesSection />);

    expect(screen.queryByRole("button", { name: "Open note" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Copy link" })).not.toBeInTheDocument();
  });
});
