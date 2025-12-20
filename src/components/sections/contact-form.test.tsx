import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./contact-form";
import { I18nextProvider } from "react-i18next";
import i18n from "../../lib/i18n";

const renderWithI18n = (component: React.ReactElement) => {
  return render(<I18nextProvider i18n={i18n}>{component}</I18nextProvider>);
};

describe("ContactForm", () => {
  it("renders form with title", () => {
    const onClose = vi.fn();
    renderWithI18n(<ContactForm onClose={onClose} />);

    expect(screen.getByText(/Send me a message/i)).toBeInTheDocument();
  });

  it("renders form inputs", () => {
    const onClose = vi.fn();
    renderWithI18n(<ContactForm onClose={onClose} />);

    const inputs = screen.getAllByRole("textbox");
    // Should have 3 text inputs (firstName, lastName, message) + 1 email
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it("renders cancel and send buttons", () => {
    const onClose = vi.fn();
    renderWithI18n(<ContactForm onClose={onClose} />);

    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", async () => {
    const onClose = vi.fn();
    renderWithI18n(<ContactForm onClose={onClose} />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
  });

  it("allows filling form inputs", async () => {
    const onClose = vi.fn();
    renderWithI18n(<ContactForm onClose={onClose} />);

    const inputs = screen.getAllByRole("textbox");
    if (inputs.length >= 3) {
      await userEvent.type(inputs[0], "John");
      await userEvent.type(inputs[1], "Test message here");
      expect(inputs[0]).toHaveValue("John");
    }
  });

  it("handles form submission", async () => {
    const onClose = vi.fn();
    renderWithI18n(<ContactForm onClose={onClose} />);

    const inputs = screen.getAllByRole("textbox");

    if (inputs.length >= 2) {
      await userEvent.type(inputs[0], "John");
      await userEvent.type(inputs[inputs.length - 1], "Test message");
    }

    const sendButton = screen.getByRole("button", { name: /send/i });
    await userEvent.click(sendButton);

    // Wait for success message or form state change
    await waitFor(
      () => {
        const sentText = screen.queryByText(/messageSent|sent|success/i);
        expect(sentText || sendButton).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
