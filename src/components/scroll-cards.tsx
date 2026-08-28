import React, { useState, useRef, useCallback, useEffect, type ReactNode } from "react";

interface CardItem {
  key: string;
  component: ReactNode;
}

interface ScrollCardsProps {
  cards: CardItem[];
  onActiveCardChange?: (cardKey: string, index: number) => void;
  initialCardKey?: string;
  scrollLocked?: boolean;
}

export default function ScrollCards({
  cards,
  onActiveCardChange,
  initialCardKey,
  scrollLocked = false,
}: ScrollCardsProps) {
  const getInitialIndex = () => {
    if (!initialCardKey) return 0;
    const initialIndex = cards.findIndex((card) => card.key === initialCardKey);
    return initialIndex >= 0 ? initialIndex : 0;
  };

  const [activeIndex, setActiveIndex] = useState(getInitialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const notifiedIndexRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const { scrollTop, clientHeight } = container;
    if (clientHeight <= 0) return;
    const newIndex = Math.round(scrollTop / clientHeight);
    const boundedIndex = Math.max(0, Math.min(cards.length - 1, newIndex));
    setActiveIndex((current) => (current === boundedIndex ? current : boundedIndex));
  }, [cards.length]);

  useEffect(() => {
    const activeCard = cards[activeIndex];
    if (!activeCard) return;
    if (notifiedIndexRef.current === activeIndex) return;

    notifiedIndexRef.current = activeIndex;
    onActiveCardChange?.(activeCard.key, activeIndex);
  }, [activeIndex, cards, onActiveCardChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || activeIndex <= 0 || typeof container.scrollTo !== "function") return;

    container.scrollTo({
      top: container.clientHeight * activeIndex,
      behavior: "auto",
    });
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      data-testid="scroll-cards-container"
      className={`h-[100dvh] snap-y snap-mandatory ${scrollLocked ? "overflow-hidden" : "overflow-y-auto"}`}
      style={{ scrollSnapType: "y mandatory" }}
    >
      {cards.map((card, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={card.key}
            data-testid={`scroll-card-section-${index}`}
            className="h-[100dvh] snap-start flex items-center justify-center px-4 py-12"
            style={{
              scrollSnapAlign: "start",
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <div className="relative w-full max-w-3xl">{card.component}</div>
          </div>
        );
      })}
    </div>
  );
}
