import React from "react";
import { render } from "@testing-library/react";
import CitySkyline from "./skyline";

test("CitySkyline renders an svg and accepts color props", () => {
  const { container } = render(<CitySkyline fill="#123456" fillBackground="#abcdef" />);
  const svg = container.querySelector("svg");
  expect(svg).toBeTruthy();
});
