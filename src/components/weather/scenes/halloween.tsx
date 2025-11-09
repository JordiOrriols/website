import React, { useEffect, useState } from "react";
import AppLogo from "../elements/logo";
import CitySkyline from "../elements/skyline";
import Fireworks from "../elements/fireworks";
import Stars from "../elements/stars";
import Moon from "../elements/moon";
import { configClear } from "./dynamic";

const configHalloween = {
  bg: "from-[#1a0f2e] via-[#2d1b47] to-[#4a2c5e]",
  skyline: "#FFD700",
};

export default function HalloweenScene() {
  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${configHalloween.bg}`}>
      <Moon></Moon>

      {/* City Skyline */}
      <CitySkyline fill={configHalloween.skyline} />

      {/* Stars */}
      <Stars max={50} />

      {/* Logo */}
      <AppLogo />
    </div>
  );
}
