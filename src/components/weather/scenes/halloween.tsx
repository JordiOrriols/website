import React from "react";
import AppLogo from "../elements/logo";
import CitySkyline from "../elements/skyline";
import Stars from "../elements/stars";
import Moon from "../elements/moon";
import Ghosts from "../elements/ghosts";
import SafeAreaContainer from "../safe-area-container";

const configHalloween = {
  bg: "from-[#1a0f2e] via-[#2d1b47] to-[#4a2c5e]",
  skyline: "#0d0520",
  themeColor: "#1a0f2e",
  gradientColors: ["#1a0f2e", "#2d1b47", "#4a2c5e"] as [string, string, string],
};

export default function HalloweenScene() {
  return (
    <SafeAreaContainer
      className={`bg-gradient-to-b ${configHalloween.bg}`}
      themeColor={configHalloween.themeColor}
      gradientColors={configHalloween.gradientColors}
      skylineFill={configHalloween.skyline}
    >
      <Moon></Moon>

      <Ghosts max={6}></Ghosts>

      {/* City Skyline */}
      <CitySkyline fill={configHalloween.skyline} />

      {/* Stars */}
      <Stars max={50} />

      {/* Logo */}
      <AppLogo />
    </SafeAreaContainer>
  );
}
