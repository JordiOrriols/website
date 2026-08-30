import React from "react";
import { render, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import FlyBooking from "./fly-booking";

const uiMock = vi.fn();
const getCalApiMock = vi.fn(() => Promise.resolve(uiMock));

vi.mock("@calcom/embed-react", () => ({
  default: (props: { namespace?: string; calLink: string }) => (
    <div data-testid="cal-embed" data-namespace={props.namespace} data-cal-link={props.calLink} />
  ),
  getCalApi: (...args: unknown[]) => getCalApiMock(...args),
}));

describe("FlyBooking", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Cal embed with the expected booking link", () => {
    const { getByTestId } = render(<FlyBooking />);
    expect(getByTestId("cal-embed").getAttribute("data-cal-link")).toBe("jordiorriols/fly-with-me");
  });

  it("uses the same namespace for getCalApi and the Cal component", async () => {
    const { getByTestId } = render(<FlyBooking />);
    await waitFor(() => expect(getCalApiMock).toHaveBeenCalled());
    const [{ namespace: requestedNamespace }] = getCalApiMock.mock.calls[0] as [
      { namespace: string },
    ];
    expect(getByTestId("cal-embed").getAttribute("data-namespace")).toBe(requestedNamespace);
  });

  it("configures the booker UI (theme, hidden event details, month view)", async () => {
    render(<FlyBooking />);
    await waitFor(() =>
      expect(uiMock).toHaveBeenCalledWith("ui", {
        theme: "light",
        hideEventTypeDetails: true,
        layout: "month_view",
      })
    );
  });
});
