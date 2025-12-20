import React from "react";
import { render } from "@testing-library/react";
import ThunderstormScene from "./thunderstorm";
import { vi } from "vitest";

test("ThunderstormScene renders and triggers playThunder from Lightning", () => {
  vi.useFakeTimers();
  const play = vi.fn();

  const rand = vi.spyOn(Math, "random").mockReturnValue(0.9);

  render(<ThunderstormScene playThunder={play} />);

  vi.advanceTimersByTime(1000 * 3);

  expect(play).toHaveBeenCalled();

  rand.mockRestore();
  vi.useRealTimers();
});
