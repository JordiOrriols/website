import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorkTimeline from "./experience";
import { I18nextProvider } from "react-i18next";
import i18n from "../../lib/i18n";

const mockExperienceData = [
  {
    id: "1",
    title: "Senior Developer",
    company: "Tech Corp",
    period: "2022 - Present",
    description: "Building amazing things",
    achievements: ["Built feature A", "Improved performance by 50%"],
    tech: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "2",
    title: "Junior Developer",
    company: "StartUp Inc",
    period: "2020 - 2022",
    description: "Learning and growing",
    achievements: ["Completed projects", "Fixed bugs"],
    tech: ["JavaScript", "React"],
  },
];

const renderWithI18n = (component: React.ReactElement) => {
  return render(<I18nextProvider i18n={i18n}>{component}</I18nextProvider>);
};

describe("WorkTimeline", () => {
  it("renders title and subtitle", () => {
    const onClose = vi.fn();
    renderWithI18n(
      <WorkTimeline
        title="Experience"
        subtitle="My work history"
        options={mockExperienceData}
        onClose={onClose}
      />
    );

    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("My work history")).toBeInTheDocument();
  });

  it("renders all experience entries", () => {
    const onClose = vi.fn();
    renderWithI18n(
      <WorkTimeline
        title="Experience"
        subtitle="My work history"
        options={mockExperienceData}
        onClose={onClose}
      />
    );

    mockExperienceData.forEach((exp) => {
      expect(screen.getByText(exp.title)).toBeInTheDocument();
      expect(screen.getByText(exp.company)).toBeInTheDocument();
      expect(screen.getByText(exp.period)).toBeInTheDocument();
    });
  });

  it("renders close button and calls onClose", async () => {
    const onClose = vi.fn();
    renderWithI18n(
      <WorkTimeline
        title="Experience"
        subtitle="My work history"
        options={mockExperienceData}
        onClose={onClose}
      />
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it("displays achievements for each entry", () => {
    const onClose = vi.fn();
    renderWithI18n(
      <WorkTimeline
        title="Experience"
        subtitle="My work history"
        options={mockExperienceData}
        onClose={onClose}
      />
    );

    mockExperienceData.forEach((exp) => {
      exp.achievements?.forEach((achievement) => {
        expect(screen.getByText(achievement)).toBeInTheDocument();
      });
    });
  });

  it("renders timeline structure", () => {
    const onClose = vi.fn();
    const { container } = renderWithI18n(
      <WorkTimeline
        title="Experience"
        subtitle="My work history"
        options={mockExperienceData}
        onClose={onClose}
      />
    );

    // Check for timeline visual structure
    const timeline = container.querySelector(".space-y-8");
    expect(timeline).toBeInTheDocument();
  });
});
