import React from "react";

interface SafeAreaContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container that extends into iPhone safe areas (notch and home indicator).
 * The background fills edge-to-edge, content respects safe areas.
 */
export default function SafeAreaContainer({ children, className = "" }: SafeAreaContainerProps) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 ${className}`}
      style={{
        // Use padding to keep content within safe areas
        // while the background extends to the edges
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        paddingLeft: "env(safe-area-inset-left, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
    >
      {children}
    </div>
  );
}
