import React, { type ReactNode } from "react";

// Splits on **bold** markers and wraps matched segments in <strong>, without dangerouslySetInnerHTML.
export function renderWithBold(text: string): ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? React.createElement("strong", { key: index }, part) : part
  );
}
