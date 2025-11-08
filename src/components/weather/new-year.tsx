import React, { useEffect, useState } from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Fireworks from "./elements/fireworks";
import Stars from "./elements/stars";
import Moon from "./elements/moon";

interface Props {
  playFireworks: () => void;
}

export default function NewYearScene(props: Props) {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#2C2B2F] to-[#3A444F]">
      <Fireworks></Fireworks>

      <Moon></Moon>

      {/* City Skyline */}
      <CitySkyline fill="#1E2A44" />

      {/* Stars */}
      <Stars max={150} />

      {/* Logo */}
      <AppLogo />
    </div>
  );
}
