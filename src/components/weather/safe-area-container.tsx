import React from "react";

interface SafeAreaContainerProps {
  children: React.ReactNode;
  className?: string;
  themeColor?: string; // The top color of the gradient for notch/status bar area
  gradientColors?: [string, string, string]; // [from, via, to] colors for gradient
}

/**
 * Container that extends into iPhone safe areas (notch and home indicator).
 * Uses two layers: background fills edge-to-edge, content respects safe areas.
 */
export default function SafeAreaContainer({
  children,
  className = "",
  themeColor,
  gradientColors,
}: SafeAreaContainerProps) {
  // Update HTML background and theme-color meta tag to match scene
  React.useEffect(() => {
    if (themeColor) {
      // Set solid color as fallback
      document.documentElement.style.backgroundColor = themeColor;
      document.body.style.backgroundColor = themeColor;

      // If gradient colors provided, set gradient as background
      if (gradientColors) {
        const [from, via, to] = gradientColors;
        const gradient = `linear-gradient(to bottom, ${from}, ${via}, ${to})`;
        document.documentElement.style.backgroundImage = gradient;
        document.body.style.backgroundImage = gradient;
        document.documentElement.style.backgroundAttachment = "fixed";
        document.body.style.backgroundAttachment = "fixed";
        document.documentElement.style.backgroundSize = "100% 100%";
        document.body.style.backgroundSize = "100% 100%";
      } else {
        // Clear gradient if no gradient colors
        document.documentElement.style.backgroundImage = "none";
        document.body.style.backgroundImage = "none";
      }

      // Update theme-color meta tag
      let themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (!themeColorMeta) {
        themeColorMeta = document.createElement("meta");
        themeColorMeta.setAttribute("name", "theme-color");
        document.head.appendChild(themeColorMeta);
      }
      themeColorMeta.setAttribute("content", themeColor);
    }
  }, [themeColor, gradientColors]);

  return (
    <>
      {/* Background layer - covers entire screen including safe areas */}
      <div
        className={`absolute ${className}`}
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      {/* Content layer - weather elements */}
      <div className="absolute inset-0 overflow-hidden">
        {children}
      </div>
    </>
  );
}
