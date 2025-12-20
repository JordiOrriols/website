import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./modal";

describe("Modal", () => {
  it("renders title, subtitle and children", () => {
    const onClose = vi.fn();
    render(
      <Modal title={<span>Test Title</span>} subtitle={<span>Sub</span>} onClose={onClose}>
        <div>Child content</div>
      </Modal>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Sub")).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    render(
      <Modal title={<span>Test Title</span>} subtitle={<span>Sub</span>} onClose={onClose}>
        <div>Child content</div>
      </Modal>
    );

    const button = screen.getByRole("button", { name: /close/i });
    await userEvent.click(button);
    expect(onClose).toHaveBeenCalled();
  });

  it("renders without title or subtitle", () => {
    const onClose = vi.fn();
    render(
      <Modal onClose={onClose}>
        <div>Child content only</div>
      </Modal>
    );

    expect(screen.getByText("Child content only")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("accepts custom className", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal onClose={onClose} className="custom-class">
        <div>Content</div>
      </Modal>
    );

    const modal = container.querySelector('[class*="custom-class"]');
    expect(modal).toBeInTheDocument();
  });
});
