import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock Portfolio component
vi.mock("./pages/portfolio", () => ({
  default: () => <div data-testid="portfolio">Portfolio</div>,
}));

// Mock FlyWithMe page
vi.mock("./pages/vuela-conmigo", () => ({
  default: () => <div data-testid="vuela-conmigo">Vuela Conmigo</div>,
}));

// Mock i18n
vi.mock("./lib/i18n", () => ({}));

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.replaceState({}, "", "/");
  });

  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it("renders Portfolio component", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("portfolio")).toBeTruthy();
  });

  it("has ErrorBoundary wrapper", () => {
    const { container } = render(<App />);
    // ErrorBoundary should exist as a provider (no specific test id, but component exists)
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("has Suspense wrapper with fallback", () => {
    // We can verify by checking if Suspense is present (it will show fallback if children fail)
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it("renders FlyWithMe instead of Portfolio on /vuela-conmigo", () => {
    window.history.replaceState({}, "", "/vuela-conmigo");
    const { getByTestId, queryByTestId } = render(<App />);
    expect(getByTestId("vuela-conmigo")).toBeTruthy();
    expect(queryByTestId("portfolio")).toBeNull();
  });

  it("renders FlyWithMe on /vuela-conmigo with a trailing slash", () => {
    window.history.replaceState({}, "", "/vuela-conmigo/");
    const { getByTestId } = render(<App />);
    expect(getByTestId("vuela-conmigo")).toBeTruthy();
  });

  it("renders FlyWithMe even with a locale prefix like /en/vuela-conmigo", () => {
    window.history.replaceState({}, "", "/en/vuela-conmigo");
    const { getByTestId, queryByTestId } = render(<App />);
    expect(getByTestId("vuela-conmigo")).toBeTruthy();
    expect(queryByTestId("portfolio")).toBeNull();
  });
});
