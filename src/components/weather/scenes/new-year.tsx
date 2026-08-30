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
      skylineFill={configClear.night.skyline}
    >
      <Fireworks playFireworks={props.playFireworks}></Fireworks>

      <Moon></Moon>

      {/* Stars */}
      <Stars max={50} />

      {/* City Skyline */}
      <CitySkyline
        fill={configClear.night.skyline}
        backgroundFill={configClear.night.gradientColors[2]}
      />

      {/* Logo */}
      <AppLogo />
    </SafeAreaContainer>
  );
}
