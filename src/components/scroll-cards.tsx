import React, { useState, useRef, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";

interface CardItem {
  key: string;
  component: ReactNode;
}

interface ScrollCardsProps {
  cards: CardItem[];
}

export default function ScrollCards({ cards }: ScrollCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const { scrollTop, clientHeight } = container;
    const newIndex = Math.round(scrollTop / clientHeight);
    setActiveIndex(newIndex);
  }, []);

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
            className="h-[100dvh] snap-start flex items-center justify-center px-4 py-12"
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
}
