import React, { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number, isActive: boolean) => ReactNode;
  onActiveIndexChange?: (index: number, item: T) => void;
  ariaLabel?: string;
  // Width classes for each slide slot. Must live on the wrapper (not the rendered card) so
  // percentage widths resolve against a definite size instead of an auto-sized flex item.
  itemClassName?: string;
}

export default function Carousel<T>({
  items,
  getKey,
  renderItem,
  onActiveIndexChange,
  ariaLabel,
  itemClassName = "w-[85%] sm:w-[60%] md:w-[44%]",
}: CarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Centers the target card within the visible track, instead of just aligning its left edge.
  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const card = track?.children[index];
    if (!track || !(card instanceof HTMLElement)) return;

    const target = card.offsetLeft - track.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;

    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Infinity;

    Array.from(track.children).forEach((child, index) => {
      if (!(child instanceof HTMLElement)) return;
      const cardCenter = child.offsetLeft - track.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(cardCenter - center);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });

    setActive((current) => (current === nearest ? current : nearest));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const item = items[active];
    if (item) onActiveIndexChange?.(active, item);
  }, [active]);

  if (items.length === 0) return null;

  const goToPrevious = () => scrollToIndex(Math.max(0, active - 1));
  const goToNext = () => scrollToIndex(Math.min(items.length - 1, active + 1));

  return (
    <div className="relative" data-testid="carousel">
      <button
        type="button"
        onClick={goToPrevious}
        disabled={active === 0}
        aria-label="Previous"
        data-testid="carousel-prev"
        className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 disabled:opacity-30 hover:bg-black/5 transition-colors"
      >
        <ChevronLeft className="w-7 h-7" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={goToNext}
        disabled={active === items.length - 1}
        aria-label="Next"
        data-testid="carousel-next"
        className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 disabled:opacity-30 hover:bg-black/5 transition-colors"
      >
        <ChevronRight className="w-7 h-7" aria-hidden="true" />
      </button>

      <div
        ref={trackRef}
        role="list"
        aria-label={ariaLabel}
        data-testid="carousel-track"
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, index) => (
          <div
            key={getKey(item, index)}
            role="listitem"
            className={`snap-center flex-shrink-0 ${itemClassName}`}
          >
            {renderItem(item, index, index === active)}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6" data-testid="carousel-dots">
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={getKey(item, index)}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to item ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              data-testid={`carousel-dot-${index}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: isActive ? 24 : 8,
                height: 8,
                backgroundColor: isActive ? "#4A6FA5" : "#C8C8C8",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
