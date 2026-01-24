import React from "react";

interface SafeAreaContainerProps {
  children: React.ReactNode;
  className?: string;
  themeColor?: string; // The top color of the gradient for notch/status bar area
  gradientColors?: [string, string, string]; // [from, via, to] colors for gradient
  skylineFill?: string; // The skyline fill color to blend with bottom of gradient
}

// Helper to blend two hex colors with a given alpha for the overlay
export function blendColors(baseHex: string, overlayHex: string, alpha: number): string {
  const parseHex = (hex: string) => {
    const h = hex.replace("#", "");
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16),
    };
  };

  const base = parseHex(baseHex);
  const overlay = parseHex(overlayHex);

  // Alpha blending: result = overlay * alpha + base * (1 - alpha)
  const r = Math.round(overlay.r * alpha + base.r * (1 - alpha));
  const g = Math.round(overlay.g * alpha + base.g * (1 - alpha));
  const b = Math.round(overlay.b * alpha + base.b * (1 - alpha));

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
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
  skylineFill,
}: SafeAreaContainerProps) {
  // Update HTML background and theme-color meta tag to match scene
  React.useEffect(() => {
    if (themeColor) {
      // Calculate bottom color: gradient bottom + skyline at 60% opacity
      let bottomColor = themeColor;
      if (gradientColors && skylineFill) {
        bottomColor = blendColors(gradientColors[2], skylineFill, 0.6);
      } else if (gradientColors) {
        bottomColor = gradientColors[2];
      }

      // Set html background to top color (for top bounce scroll)
      document.documentElement.style.backgroundColor = themeColor;
      document.documentElement.style.backgroundImage = "none";

      // Set CSS variable for bottom extension color (used by #root::after)
      document.documentElement.style.setProperty("--bottom-extension-color", bottomColor);

      // Clear body background - let html show through
      document.body.style.backgroundColor = "transparent";
      document.body.style.backgroundImage = "none";

      // Update theme-color meta tag
      let themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (!themeColorMeta) {
        themeColorMeta = document.createElement("meta");
        themeColorMeta.setAttribute("name", "theme-color");
        document.head.appendChild(themeColorMeta);
      }
      themeColorMeta.setAttribute("content", themeColor);
    }
  }, [themeColor, gradientColors, skylineFill]);

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
      <div className="absolute inset-0 overflow-hidden">{children}</div>
    </>
  );
}
