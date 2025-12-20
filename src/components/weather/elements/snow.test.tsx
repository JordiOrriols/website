import React from "react";
import { render, waitFor } from "@testing-library/react";
import Snow from "./snow";

test("Snow renders snowflake nodes", async () => {
  const { container } = render(<Snow />);

  await waitFor(() => {
    const nodes = container.querySelectorAll(".animate-snow");
    expect(nodes.length).toBeGreaterThan(0);
  });
});
