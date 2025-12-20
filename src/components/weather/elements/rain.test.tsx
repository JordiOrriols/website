import React from "react";
import { render, waitFor } from "@testing-library/react";
import Rain from "./rain";

test("Rain renders requested number of raindrops", async () => {
  const { container } = render(<Rain max={6} timeOfDay={"day" as any} />);

  await waitFor(() => {
    const nodes = container.querySelectorAll(".animate-rain");
    expect(nodes.length).toBe(6);
  });
});
