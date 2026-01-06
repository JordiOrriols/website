import React from "react";
import AppLogo from "../elements/logo";
import CitySkyline from "../elements/skyline";
import Fireworks from "../elements/fireworks";
import Stars from "../elements/stars";
import Moon from "../elements/moon";
import { configClear } from "./dynamic";
import SafeAreaContainer from "../safe-area-container";

interface Props {
  playFireworks: () => void;
}

export default function NewYearScene(props: Props) {
  return (
    <SafeAreaContainer
      className={`bg-gradient-to-b ${configClear.night.bg}`}
      themeColor={configClear.night.themeColor}
      gradientColors={configClear.night.gradientColors}
    >
      <Fireworks playFireworks={props.playFireworks}></Fireworks>

      <Moon></Moon>

      {/* City Skyline */}
      <CitySkyline fill={configClear.night.skyline} />

      {/* Stars */}
      <Stars max={50} />

      {/* Logo */}
      <AppLogo />
    </SafeAreaContainer>
  );
}
