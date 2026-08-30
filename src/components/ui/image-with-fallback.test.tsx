import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ImageWithFallback from "./image-with-fallback";
import { describe, it, expect, vi } from "vitest";

describe("ImageWithFallback Component", () => {
  it("renders an image with the given src", () => {
    const { getByTestId } = render(
      <ImageWithFallback src="/images/image.jpeg" alt="Photo" data-testid="photo" />
    );
    const img = getByTestId("photo") as HTMLImageElement;
    expect(img.tagName).toBe("IMG");
    expect(img.src).toContain("/images/image.jpeg");
  });

  it("passes alt attribute", () => {
    const { getByAltText } = render(<ImageWithFallback src="/images/image.jpeg" alt="My photo" />);
    expect(getByAltText("My photo")).toBeTruthy();
  });

  it("passes className to the image", () => {
    const { getByAltText } = render(
      <ImageWithFallback src="/images/image.jpeg" alt="Photo" className="w-full rounded" />
    );
    expect(getByAltText("Photo").className).toContain("w-full");
    expect(getByAltText("Photo").className).toContain("rounded");
  });

  it("shows fallback logo when image fails to load", () => {
    const { getByAltText, getByTestId } = render(
      <ImageWithFallback src="/bad-path.jpg" alt="Photo" data-testid="photo" />
    );
    const img = getByAltText("Photo");
    fireEvent.error(img);
    expect(getByTestId("image-fallback")).toBeTruthy();
  });

  it("hides the img element after error", () => {
    const { getByAltText, queryByTestId } = render(
      <ImageWithFallback src="/bad-path.jpg" alt="Photo" data-testid="photo" />
    );
    fireEvent.error(getByAltText("Photo"));
    // The img should not be visible anymore
    expect(queryByTestId("photo")).toBeNull();
  });

  it("renders fallback with aria-label matching alt text", () => {
    const { getByAltText, getByTestId } = render(
      <ImageWithFallback src="/bad.jpg" alt="My profile" />
    );
    fireEvent.error(getByAltText("My profile"));
    const fallback = getByTestId("image-fallback");
    expect(fallback.getAttribute("aria-label")).toBe("My profile");
  });

  it("calls custom onError handler if provided", () => {
    const onError = vi.fn();
    const { getByAltText } = render(
      <ImageWithFallback src="/bad.jpg" alt="Photo" onError={onError} />
    );
    fireEvent.error(getByAltText("Photo"));
    expect(onError).toHaveBeenCalled();
  });
});
