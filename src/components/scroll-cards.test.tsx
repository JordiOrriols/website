import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ScrollCards from "./scroll-cards";
import { vi, describe, it, expect, beforeEach } from "vitest";

describe("ScrollCards Component", () => {
  const cards = [
    { key: "card-1", component: <div data-testid="card-content-1">Card 1</div> },
    { key: "card-2", component: <div data-testid="card-content-2">Card 2</div> },
    { key: "card-3", component: <div data-testid="card-content-3">Card 3</div> },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all cards", () => {
    const { getByTestId } = render(<ScrollCards cards={cards} />);
    expect(getByTestId("card-content-1")).toBeTruthy();
    expect(getByTestId("card-content-2")).toBeTruthy();
    expect(getByTestId("card-content-3")).toBeTruthy();
  });

  it("renders scroll container with snap behavior", () => {
    const { getByTestId } = render(<ScrollCards cards={cards} />);
    const container = getByTestId("scroll-cards-container");
    expect(container).toBeTruthy();
  });

  it("renders card sections for each card", () => {
    const { getAllByTestId } = render(<ScrollCards cards={cards} />);
    const sections = getAllByTestId(/^scroll-card-section-/);
    expect(sections).toHaveLength(3);
  });

  it("first card is active by default", () => {
    const { getByTestId } = render(<ScrollCards cards={cards} />);
    const firstSection = getByTestId("scroll-card-section-0");
    expect(firstSection.style.pointerEvents).not.toBe("none");
  });

  it("non-active cards have pointer-events disabled", () => {
    const { getByTestId } = render(<ScrollCards cards={cards} />);
    const secondSection = getByTestId("scroll-card-section-1");
    expect(secondSection.style.pointerEvents).toBe("none");
  });

  it("renders with empty cards array", () => {
    const { getByTestId } = render(<ScrollCards cards={[]} />);
    expect(getByTestId("scroll-cards-container")).toBeTruthy();
  });

  it("renders with single card", () => {
    const { getByTestId } = render(<ScrollCards cards={[cards[0]]} />);
    expect(getByTestId("card-content-1")).toBeTruthy();
    const section = getByTestId("scroll-card-section-0");
    expect(section.style.pointerEvents).not.toBe("none");
  });

  it("updates active index on scroll", () => {
    const { getByTestId } = render(<ScrollCards cards={cards} />);
    const container = getByTestId("scroll-cards-container");

    // Simulate scroll to second card
    Object.defineProperty(container, "scrollTop", { value: 800, writable: true });
    Object.defineProperty(container, "clientHeight", { value: 800, writable: true });
    fireEvent.scroll(container);

    const secondSection = getByTestId("scroll-card-section-1");
    expect(secondSection.style.pointerEvents).not.toBe("none");
  });

  it("notifies initial active card and changes on scroll", () => {
    const onActiveCardChange = vi.fn();
    const { getByTestId } = render(
      <ScrollCards cards={cards} onActiveCardChange={onActiveCardChange} />
    );

    expect(onActiveCardChange).toHaveBeenCalledWith("card-1", 0);

    const container = getByTestId("scroll-cards-container");
    Object.defineProperty(container, "scrollTop", { value: 800, writable: true });
    Object.defineProperty(container, "clientHeight", { value: 800, writable: true });
    fireEvent.scroll(container);

    expect(onActiveCardChange).toHaveBeenCalledWith("card-2", 1);
  });

  it("starts from initialCardKey", () => {
    const { getByTestId } = render(<ScrollCards cards={cards} initialCardKey="card-3" />);

    const thirdSection = getByTestId("scroll-card-section-2");
    expect(thirdSection.style.pointerEvents).not.toBe("none");
  });

  it("renders a side index entry per card, using label or falling back to key", () => {
    const labeledCards = [
      { key: "card-1", label: "First", component: <div>Card 1</div> },
      { key: "card-2", component: <div>Card 2</div> },
    ];
    const { getByTestId, getByText } = render(<ScrollCards cards={labeledCards} />);
    expect(getByTestId("scroll-cards-side-index")).toBeTruthy();
    expect(getByText("First")).toBeTruthy();
    expect(getByText("card-2")).toBeTruthy();
  });

  it("marks the active side index entry with aria-current", () => {
    const { getByTestId } = render(<ScrollCards cards={cards} />);
    expect(getByTestId("scroll-cards-side-index-0").getAttribute("aria-current")).toBe("true");
    expect(getByTestId("scroll-cards-side-index-1").getAttribute("aria-current")).toBeNull();
  });

  it("scrolls to the clicked card via the side index", () => {
    const scrollTo = vi.fn();
    const { getByTestId } = render(<ScrollCards cards={cards} />);
    const container = getByTestId("scroll-cards-container");
    Object.defineProperty(container, "clientHeight", { value: 800, writable: true });
    container.scrollTo = scrollTo;

    fireEvent.click(getByTestId("scroll-cards-side-index-2"));

    expect(scrollTo).toHaveBeenCalledWith({ top: 1600, behavior: "smooth" });
  });

  it("uses accentColor for the active entry on light backgrounds, and white on dark ones", () => {
    const { getByTestId, rerender } = render(
      <ScrollCards cards={cards} accentColor="#FFB347" />
    );
    const activeLabel = getByTestId("scroll-cards-side-index-0").querySelector("span");
    expect(activeLabel).toHaveStyle({ color: "#FFB347" });

    rerender(<ScrollCards cards={cards} accentColor="#FFB347" isDarkBackground />);
    const darkActiveLabel = getByTestId("scroll-cards-side-index-0").querySelector("span");
    expect(darkActiveLabel?.className).toContain("text-white");
    expect(darkActiveLabel?.getAttribute("style")).toBeFalsy();
  });

  it("makes the inactive dot smaller than the active one", () => {
    const { getByTestId } = render(<ScrollCards cards={cards} />);
    const activeDot = getByTestId("scroll-cards-side-index-0").querySelectorAll("span")[1];
    const inactiveDot = getByTestId("scroll-cards-side-index-1").querySelectorAll("span")[1];
    expect(activeDot?.className).toContain("w-2.5");
    expect(inactiveDot?.className).toContain("w-1 ");
  });
});
