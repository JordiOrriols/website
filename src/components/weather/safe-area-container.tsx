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
      className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full ${className}`}
      style={{
        marginTop: "calc(-1 * env(safe-area-inset-top))",
        marginBottom: "calc(-1 * env(safe-area-inset-bottom))",
        marginLeft: "calc(-1 * env(safe-area-inset-left))",
        marginRight: "calc(-1 * env(safe-area-inset-right))",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
