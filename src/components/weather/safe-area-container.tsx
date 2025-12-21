import React from "react";

interface SafeAreaContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container that extends into iPhone safe areas (notch and home indicator)
 * while keeping content properly positioned with padding.
 *
 * Use this for full-screen backgrounds that should fill edge-to-edge on iOS.
 */
export default function SafeAreaContainer({ children, className = "" }: SafeAreaContainerProps) {
  return (
    <div
      className={`fixed ${className}`}
      style={{
        top: "calc(-1 * env(safe-area-inset-top, 0px))",
        bottom: "calc(-1 * env(safe-area-inset-bottom, 0px))",
        left: "calc(-1 * env(safe-area-inset-left, 0px))",
        right: "calc(-1 * env(safe-area-inset-right, 0px))",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          paddingLeft: "env(safe-area-inset-left, 0px)",
          paddingRight: "env(safe-area-inset-right, 0px)",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
