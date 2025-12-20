import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";

describe("Input", () => {
  it("renders input element", () => {
    const { container } = render(<Input />);
    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
  });

  it("accepts input value", async () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text") as HTMLInputElement;

    await userEvent.type(input, "Hello");
    expect(input.value).toBe("Hello");
  });

  it("handles disabled state", () => {
    const { container } = render(<Input disabled />);
    const input = container.querySelector("input");
    expect(input).toBeDisabled();
  });

  it("accepts type prop", () => {
    const { container } = render(<Input type="email" />);
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("type", "email");
  });

  it("accepts className prop", () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector("input");
    expect(input?.className).toContain("custom-class");
  });
});
