import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import NotesSection from "./notes";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { returnObjects?: boolean }) => {
      if (key === "notesItems" && opts?.returnObjects) {
        return [
          {
            title: "Shipping under pressure",
            shortText: "How to split delivery in measurable milestones.",
            longText: "The full story about splitting delivery into milestones.",
            tags: ["delivery", "leadership"],
            slug: "shipping-under-pressure",
          },
          {
            title: "Simplicity as a product decision",
            shortText: "Simpler architecture improves time-to-value.",
            tags: ["architecture"],
            slug: "simplicity-product-decision",
          },
        ];
      }

      const textMap: Record<string, string> = {
        notesLabel: "Notes",
        notesTitle: "Small writing on engineering leadership",
        notesIntro: "Short notes I use to capture decisions and lessons learned.",
      };

      return textMap[key] ?? key;
    },
    i18n: { language: "en" },
  }),
}));

const analyticsMocks = vi.hoisted(() => ({
  trackBlockVisible: vi.fn(),
  trackContentDisplayed: vi.fn(),
}));

vi.mock("@/lib/analytics", () => analyticsMocks);

describe("NotesSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders localized header content", () => {
    render(<NotesSection />);
    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByText("Small writing on engineering leadership")).toBeInTheDocument();
  });

  it("renders every note as a carousel card with its full text and tags", () => {
    render(<NotesSection />);
    expect(screen.getByText("Shipping under pressure")).toBeInTheDocument();
    expect(
      screen.getByText("The full story about splitting delivery into milestones.")
    ).toBeInTheDocument();
    expect(screen.getByText("#delivery")).toBeInTheDocument();

    // Falls back to shortText when longText is not provided
    expect(screen.getByText("Simplicity as a product decision")).toBeInTheDocument();
    expect(screen.getByText("Simpler architecture improves time-to-value.")).toBeInTheDocument();
  });

  it("has no open/close/back navigation left over", () => {
    render(<NotesSection />);
    expect(screen.queryByRole("button", { name: /back to notes/i })).not.toBeInTheDocument();
    expect(screen.queryByTestId("note-detail")).not.toBeInTheDocument();
  });

  it("tracks the first note as visible on mount", () => {
    render(<NotesSection />);
    expect(analyticsMocks.trackBlockVisible).toHaveBeenCalledWith(
      "notes",
      "shipping-under-pressure"
    );
    expect(analyticsMocks.trackContentDisplayed).toHaveBeenCalledWith(
      "note",
      "shipping-under-pressure",
      "notes"
    );
  });
});
