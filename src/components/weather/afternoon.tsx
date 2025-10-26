import React from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Clouds from "./elements/cloud";

export default function AfternoonSunny() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#FFB347] via-[#FFCC70] to-[#FFA500]">
      {/* Bright Sun */}
      <div className="absolute top-20 right-24">
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] shadow-2xl animate-pulse">
          {/* Glowing effect */}
          <div className="absolute inset-0 rounded-full bg-[#FFD700] opacity-40 blur-2xl animate-pulse"></div>

          {/* Sun rays */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 origin-center"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              }}
            >
              <div className="w-40 h-2 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Warm Clouds */}
      <Clouds max={8} color="white" />

      {/* City Skyline */}
      <CitySkyline fill="#CC8400" />

      {/* Logo */}
      <AppLogo />
    </div>
  );
}
