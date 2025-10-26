import React, { useEffect, useState } from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Clouds from "./elements/cloud";
import Rain from "./elements/rain";

export default function ThunderstormScene({ timeOfDay }) {
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    // Lightning effect
    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLightning(true);
        setTimeout(() => setLightning(false), 200);
      }
    }, 3000);

    return () => clearInterval(lightningInterval);
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#1F1B24] via-[#2D2832] to-[#4B3F72]">
      {/* Lightning Flash */}
      {lightning && (
        <div className="absolute inset-0 bg-white opacity-40 animate-flash z-10"></div>
      )}

      {/* Clouds */}
      <Clouds max={50} color="black" />

      {/* Lightning Bolt */}
      {lightning && (
        <svg
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-16 h-64 z-20"
          viewBox="0 0 64 256"
        >
          <path
            d="M32,0 L20,100 L40,100 L28,256 L52,100 L36,100 Z"
            fill="#FFD700"
            className="drop-shadow-2xl"
          />
        </svg>
      )}

      {/* Rain */}
      <Rain max={50} />

      {/* City Skyline */}
      <CitySkyline fill="#0F0D12" />

      {/* Logo */}
      <AppLogo />

      <style>{`
        @keyframes flash {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.4; }
        }
        .animate-flash {
          animation: flash 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
