import React, { useEffect, useState } from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Clouds from "./elements/cloud";
import Rain from "./elements/rain";
import Lightning from "./elements/lightning";

export default function ThunderstormScene() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#2C2B2F] to-[#3A444F]">
      <Lightning />

      {/* Clouds */}
      <Clouds maxNumber={50} maxSize={5} maxOpacity={0.03} />

      {/* Rain */}
      <Rain max={500} />

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
