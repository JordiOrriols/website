import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithBold } from "./text";

describe("renderWithBold", () => {
  it("returns plain text unchanged when there is no bold marker", () => {
    const { container } = render(React.createElement("p", null, renderWithBold("Hello world")));
    expect(container.textContent).toBe("Hello world");
    expect(container.querySelector("strong")).toBeNull();
  });

  it("wraps a single **bold** segment in a strong element", () => {
    const { container } = render(
      React.createElement("p", null, renderWithBold("Before **bold text** after"))
    );
    expect(container.textContent).toBe("Before bold text after");
    expect(container.querySelector("strong")?.textContent).toBe("bold text");
  });

  it("wraps multiple **bold** segments", () => {
    const { container } = render(
      React.createElement("p", null, renderWithBold("**one** and **two**"))
    );
    const strongs = container.querySelectorAll("strong");
    expect(strongs).toHaveLength(2);
    expect(strongs[0]?.textContent).toBe("one");
    expect(strongs[1]?.textContent).toBe("two");
  });

  it("handles a string that is entirely bold", () => {
    const { container } = render(React.createElement("p", null, renderWithBold("**all bold**")));
    expect(container.querySelector("strong")?.textContent).toBe("all bold");
    expect(container.textContent).toBe("all bold");
  });

  it("returns an empty result for an empty string", () => {
    const { container } = render(React.createElement("p", null, renderWithBold("")));
    expect(container.textContent).toBe("");
  });
});
