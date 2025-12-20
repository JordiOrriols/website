import React from "react";
import { render } from "@testing-library/react";
import NewYearScene from "./new-year";
import { vi } from "vitest";

test("NewYearScene renders and forwards playFireworks to Fireworks", () => {
  vi.useFakeTimers();
  const play = vi.fn();

  // make fireworks generate by forcing Math.random
  const rand = vi.spyOn(Math, "random").mockReturnValue(0.9);

  render(<NewYearScene playFireworks={play} />);

  vi.advanceTimersByTime(1000 * 3);

  expect(play).toHaveBeenCalled();

  rand.mockRestore();
  vi.useRealTimers();
});
