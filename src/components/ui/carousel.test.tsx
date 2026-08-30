import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import Carousel from "./carousel";

interface Item {
  id: string;
  label: string;
}

const items: Item[] = [
  { id: "a", label: "First" },
  { id: "b", label: "Second" },
  { id: "c", label: "Third" },
];

function setupTrack(container: HTMLElement, scrollTo: (opts: ScrollToOptions) => void) {
  const track = container.querySelector('[data-testid="carousel-track"]') as HTMLElement;
  Object.defineProperty(track, "clientWidth", { value: 300, writable: true });
  Object.defineProperty(track, "offsetLeft", { value: 0, writable: true });
  track.scrollTo = scrollTo;

  Array.from(track.children).forEach((child, index) => {
    Object.defineProperty(child, "offsetLeft", { value: index * 320, writable: true });
    Object.defineProperty(child, "clientWidth", { value: 300, writable: true });
  });

  return track;
}

describe("Carousel", () => {
  it("renders all items", () => {
    const { getByText } = render(
      <Carousel items={items} getKey={(item) => item.id} renderItem={(item) => item.label} />
    );
    expect(getByText("First")).toBeTruthy();
    expect(getByText("Second")).toBeTruthy();
    expect(getByText("Third")).toBeTruthy();
  });

  it("renders nothing for an empty list", () => {
    const { queryByTestId } = render(
      <Carousel items={[]} getKey={(item: Item) => item.id} renderItem={(item: Item) => item.label} />
    );
    expect(queryByTestId("carousel")).toBeNull();
  });

  it("disables previous on the first item and next on the last item", () => {
    const { getByTestId } = render(
      <Carousel items={items} getKey={(item) => item.id} renderItem={(item) => item.label} />
    );
    expect(getByTestId("carousel-prev")).toBeDisabled();
    expect(getByTestId("carousel-next")).not.toBeDisabled();
  });

  it("centers the target card when the next button is clicked", () => {
    const scrollTo = vi.fn();
    const { container, getByTestId } = render(
      <Carousel items={items} getKey={(item) => item.id} renderItem={(item) => item.label} />
    );
    setupTrack(container, scrollTo);

    fireEvent.click(getByTestId("carousel-next"));

    // card[1].offsetLeft (320) - track.offsetLeft (0) - (track.clientWidth(300) - card.clientWidth(300)) / 2 = 320
    expect(scrollTo).toHaveBeenCalledWith({ left: 320, behavior: "smooth" });
  });

  it("scrolls to a specific item when its dot is clicked", () => {
    const scrollTo = vi.fn();
    const { container, getByTestId } = render(
      <Carousel items={items} getKey={(item) => item.id} renderItem={(item) => item.label} />
    );
    setupTrack(container, scrollTo);

    fireEvent.click(getByTestId("carousel-dot-2"));

    expect(scrollTo).toHaveBeenCalledWith({ left: 640, behavior: "smooth" });
  });

  it("does not scroll when previous is clicked while already at the first item", () => {
    const scrollTo = vi.fn();
    const { container, getByTestId } = render(
      <Carousel items={items} getKey={(item) => item.id} renderItem={(item) => item.label} />
    );
    setupTrack(container, scrollTo);

    fireEvent.click(getByTestId("carousel-prev"));

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("updates the active card and notifies on scroll", () => {
    const onActiveIndexChange = vi.fn();
    const { container } = render(
      <Carousel
        items={items}
        getKey={(item) => item.id}
        renderItem={(item, _index, isActive) => (
          <span data-testid={`item-${item.id}`}>{isActive ? "active" : "inactive"}</span>
        )}
        onActiveIndexChange={onActiveIndexChange}
      />
    );

    expect(onActiveIndexChange).toHaveBeenCalledWith(0, items[0]);

    const track = setupTrack(container, vi.fn());
    Object.defineProperty(track, "scrollLeft", { value: 320, writable: true });
    fireEvent.scroll(track);

    expect(onActiveIndexChange).toHaveBeenCalledWith(1, items[1]);
  });
});
