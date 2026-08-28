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
        openNote: "Open note",
        copyLink: "Copy link",
      };

      return textMap[key] ?? key;
    },
  }),
}));

const analyticsMocks = vi.hoisted(() => ({
  trackBlockVisible: vi.fn(),
  trackContentDisplayed: vi.fn(),
  trackNoteOpened: vi.fn(),
  trackNoteLinkCopied: vi.fn(),
}));

vi.mock("@/lib/analytics", () => analyticsMocks);

describe("NotesSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("renders localized notes content", () => {
    render(<NotesSection />);

    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByText("Shipping under pressure")).toBeInTheDocument();
    expect(screen.getByText("#delivery")).toBeInTheDocument();
  });

  it("tracks note open action", () => {
    render(<NotesSection />);

    fireEvent.click(screen.getByRole("button", { name: "Open note" }));

    expect(analyticsMocks.trackNoteOpened).toHaveBeenCalledWith("shipping-under-pressure");
  });

  it("copies note link and tracks copy action", async () => {
    render(<NotesSection />);

    fireEvent.click(screen.getByRole("button", { name: "Copy link" }));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
      expect(analyticsMocks.trackNoteLinkCopied).toHaveBeenCalledWith("shipping-under-pressure");
    });
  });
});
