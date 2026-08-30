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
  label?: string;
  component: ReactNode;
}

interface ScrollCardsProps {
  cards: CardItem[];
  onActiveCardChange?: (cardKey: string, index: number) => void;
  initialCardKey?: string;
  // Whether the current background is dark, so the side index can switch to a white palette for contrast.
  isDarkBackground?: boolean;
  // Active indicator color on light backgrounds (e.g. the scene's own skyline color); defaults to dark blue.
  accentColor?: string;
}

export interface ScrollCardsHandle {
  scrollToKey: (key: string) => void;
}

const DEFAULT_ACCENT_COLOR = "#2D4A6B";

// Dark backgrounds switch the side index to white (opacity 0.8 at rest) for contrast;
// light backgrounds keep a neutral gray at rest and highlight the active entry with accentColor.
function getIndexLabelClass(active: boolean, isDark?: boolean): string {
  if (isDark) {
    return `transition-all duration-300 whitespace-nowrap text-white ${
      active
        ? "text-sm font-semibold opacity-100"
        : "text-xs font-medium opacity-80 group-hover:opacity-100"
    }`;
  }
  return `transition-all duration-300 whitespace-nowrap ${
    active
      ? "text-sm font-semibold opacity-100"
      : "text-gray-500 text-xs font-medium opacity-50 group-hover:opacity-90"
  }`;
}

function getIndexDotClass(active: boolean, isDark?: boolean): string {
  if (isDark) {
    return `rounded-full bg-white transition-all duration-300 ${
      active ? "w-2.5 h-2.5 opacity-100" : "w-1 h-1 opacity-80 group-hover:opacity-100"
    }`;
  }
  return `rounded-full transition-all duration-300 ${
    active ? "w-2.5 h-2.5" : "w-1 h-1 bg-gray-400 opacity-40 group-hover:opacity-70"
  }`;
}

const ScrollCards = forwardRef<ScrollCardsHandle, ScrollCardsProps>(function ScrollCards(
  { cards, onActiveCardChange, initialCardKey, isDarkBackground, accentColor },
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

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior) => {
    const container = containerRef.current;
    if (!container || typeof container.scrollTo !== "function") return;
    container.scrollTo({
      top: container.clientHeight * index,
      behavior,
    });
  }, []);

  useEffect(() => {
    const activeCard = cards[activeIndex];
    if (!activeCard) return;
    if (notifiedIndexRef.current === activeIndex) return;

    notifiedIndexRef.current = activeIndex;
    onActiveCardChange?.(activeCard.key, activeIndex);
  }, [activeIndex, cards, onActiveCardChange]);

  // Sync scroll position once on mount (e.g. deep link) so it never fights user scroll.
  useEffect(() => {
    if (activeIndex <= 0) return;
    scrollToIndex(activeIndex, "auto");
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      scrollToKey: (key: string) => {
        const index = cards.findIndex((card) => card.key === key);
        if (index < 0) return;
        scrollToIndex(index, "smooth");
      },
    }),
    [cards, scrollToIndex]
  );

  return (
    <>
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

      {/* Side index: highlights the current card and lets you jump to any other */}
      <div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3"
        data-testid="scroll-cards-side-index"
      >
        {cards.map((card, index) => {
          const active = index === activeIndex;
          const activeColorStyle =
            active && !isDarkBackground ? { color: accentColor ?? DEFAULT_ACCENT_COLOR } : undefined;
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => scrollToIndex(index, "smooth")}
              aria-label={`Go to ${card.label ?? card.key}`}
              aria-current={active ? "true" : undefined}
              data-testid={`scroll-cards-side-index-${index}`}
              className="group flex items-center gap-2 cursor-pointer"
            >
              <span className={getIndexLabelClass(active, isDarkBackground)} style={activeColorStyle}>
                {card.label ?? card.key}
              </span>
              <span
                className={getIndexDotClass(active, isDarkBackground)}
                style={activeColorStyle && { backgroundColor: activeColorStyle.color }}
              />
            </button>
          );
        })}
      </div>
    </>
  );
});

export default ScrollCards;
