import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";

interface CardItem {
  key: string;
  component: ReactNode;
}

interface ScrollCardsProps {
  cards: CardItem[];
  onActiveCardChange?: (cardKey: string, index: number) => void;
  initialCardKey?: string;
}

export interface ScrollCardsHandle {
  scrollToKey: (key: string) => void;
}

const ScrollCards = forwardRef<ScrollCardsHandle, ScrollCardsProps>(function ScrollCards(
  { cards, onActiveCardChange, initialCardKey },
  ref
) {
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

  // Sync scroll position once on mount (e.g. deep link) so it never fights user scroll.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || activeIndex <= 0 || typeof container.scrollTo !== "function") return;

    container.scrollTo({
      top: container.clientHeight * activeIndex,
      behavior: "auto",
    });
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      scrollToKey: (key: string) => {
        const container = containerRef.current;
        if (!container || typeof container.scrollTo !== "function") return;
        const index = cards.findIndex((card) => card.key === key);
        if (index < 0) return;
        container.scrollTo({
          top: container.clientHeight * index,
          behavior: "smooth",
        });
      },
    }),
    [cards]
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      data-testid="scroll-cards-container"
      className="h-[100dvh] overflow-y-auto snap-y snap-mandatory"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {cards.map((card, index) => {
        const isActive = index === activeIndex;
        const isAbove = index < activeIndex;

        return (
          <div
            key={card.key}
            data-testid={`scroll-card-section-${index}`}
            className="h-[100dvh] snap-start flex items-center justify-center px-4 py-6 md:py-12"
            style={{
              scrollSnapAlign: "start",
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <motion.div
              className="relative w-full max-w-3xl"
              animate={{
                opacity: isActive ? 1 : isAbove ? 0 : 0.4,
                scale: isActive ? 1 : isAbove ? 0.9 : 0.96,
                y: isActive ? 0 : isAbove ? -40 : 40,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
            >
              {card.component}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
});

export default ScrollCards;
