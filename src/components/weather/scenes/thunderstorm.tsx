import React from "react";
import AppLogo from "../elements/logo";
import CitySkyline from "../elements/skyline";
import Clouds from "../elements/cloud";
import Rain from "../elements/rain";
import Lightning from "../elements/lightning";
import SafeAreaContainer from "../safe-area-container";

interface Props {
  playThunder: () => void;
}

export default function ThunderstormScene(props: Props) {
  return (
    <SafeAreaContainer className="bg-gradient-to-b from-[#2C2B2F] to-[#3A444F]" themeColor="#2C2B2F" gradientColors={["#2C2B2F", "#333238", "#3A444F"]}>
      <Lightning playThunder={props.playThunder} />

      {/* Clouds */}
      <Clouds maxNumber={50} maxSize={5} maxOpacity={0.03} />

      {/* Rain */}
      <Rain timeOfDay={"night"} max={500} />

      {/* City Skyline */}
      <CitySkyline fill="#0F0D12" />

      {/* Logo */}
      <AppLogo />
    </SafeAreaContainer>
  );
}
