import React from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Clouds from "./elements/cloud";

export default function MorningSunny() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#B0E0E6] to-[#FFE4B5]">
      {/* Sun */}
      <div className="absolute top-16 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-[#FDB813] to-[#FF9500] shadow-2xl">
        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-32 h-1 bg-[#FDB813] opacity-40"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
              transformOrigin: "center",
            }}
          />
        ))}
      </div>

      {/* Clouds */}
      <Clouds max={8} />

      {/* City Skyline */}
      <CitySkyline fill="#5A8FB8" />

      {/* Logo */}
      <AppLogo />
    </div>
  );
}
