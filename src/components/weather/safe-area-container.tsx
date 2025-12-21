import React from "react";

interface SafeAreaContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container that extends into iPhone safe areas (notch and home indicator).
 * Uses two layers: background fills edge-to-edge, content respects safe areas.
 */
export default function SafeAreaContainer({ children, className = "" }: SafeAreaContainerProps) {
  return (
    <>
      {/* Background layer - covers entire screen including safe areas */}
      <div
        className={`fixed ${className}`}
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      {/* Content layer - respects safe areas */}
      <div className="fixed inset-0 overflow-hidden">{children}</div>
    </>
  );
}
