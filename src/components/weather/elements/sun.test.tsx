import React from "react";
import { render } from "@testing-library/react";
import Sun from "./sun";

test("Sun renders the sun element", () => {
  const { container } = render(<Sun />);
  expect(container.querySelector(".relative.w-28.h-28")).toBeTruthy();
});
