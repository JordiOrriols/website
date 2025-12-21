import React from "react";

interface SafeAreaContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container that extends into iPhone safe areas (notch and home indicator).
 * The background fills edge-to-edge, content can scroll under the notch.
 */
export default function SafeAreaContainer({ children, className = "" }: SafeAreaContainerProps) {
  return (
    <div
      className={`fixed inset-0 ${className}`}
      style={{
        // Extend beyond safe areas to cover notch and home indicator
        top: "calc(-1 * env(safe-area-inset-top, 0px))",
        bottom: "calc(-1 * env(safe-area-inset-bottom, 0px))",
        left: "calc(-1 * env(safe-area-inset-left, 0px))",
        right: "calc(-1 * env(safe-area-inset-right, 0px))",
      }}
    >
      {children}
    </div>
  );
}
