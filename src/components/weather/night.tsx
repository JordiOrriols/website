import React, { useEffect, useState } from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Stars from "./elements/stars";

export default function NightClear() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#4A6FA5] via-[#5B7FA8] to-[#4A6FA5]">
      {/* Stars */}
      <Stars max={150} />

      {/* Logo */}
      <AppLogo />

      {/* Moon */}
      <div className="absolute top-40 right-40 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm">
        <div className="absolute top-1 left-2 w-10 h-10 rounded-full bg-[#5B7FA8]"></div>
      </div>

      {/* City Skyline */}
      <CitySkyline fill="#293D5F" />
    </div>
  );
}
