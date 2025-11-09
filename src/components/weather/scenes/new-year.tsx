import React, { useEffect, useState } from "react";
import AppLogo from "../elements/logo";
import CitySkyline from "../elements/skyline";
import Fireworks from "../elements/fireworks";
import Stars from "../elements/stars";
import Moon from "../elements/moon";
import { configClear } from "./dynamic";

interface Props {
  playFireworks: () => void;
}

export default function NewYearScene(props: Props) {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-b ${configClear.night.bg}`}
    >
      <Fireworks></Fireworks>

      <Moon></Moon>

      {/* City Skyline */}
      <CitySkyline fill={configClear.night.skyline} />

      {/* Stars */}
      <Stars max={50} />

      {/* Logo */}
      <AppLogo />
    </div>
  );
}
