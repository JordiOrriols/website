import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import FlyBookingModal from "./fly-booking-modal";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

vi.mock("./fly-booking", () => ({
  default: () => <div data-testid="fly-booking-embed" />,
}));

describe("FlyBookingModal", () => {
  it("renders the booking embed with the booking label as title", () => {
    const { getByText, getByTestId } = render(<FlyBookingModal onClose={vi.fn()} />);
    expect(getByText("flyWithMeBookingLabel")).toBeTruthy();
    expect(getByTestId("fly-booking-embed")).toBeTruthy();
  });

  it("is wider than the default modal so slots fit next to the calendar", () => {
    const { container } = render(<FlyBookingModal onClose={vi.fn()} />);
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.className).toContain("max-w-5xl");
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    const { getByLabelText } = render(<FlyBookingModal onClose={onClose} />);
    fireEvent.click(getByLabelText("Close modal"));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
