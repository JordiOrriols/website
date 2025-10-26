import React from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Clouds from "./elements/cloud";
import Rain from "./elements/rain";

export default function RainyScene({ timeOfDay }) {
  const getGradient = () => {
    if (timeOfDay === "morning") {
      return "from-[#6B7280] via-[#8B92A0] to-[#9CA3AF]";
    } else if (timeOfDay === "afternoon") {
      return "from-[#64748B] via-[#7B8799] to-[#94A3B8]";
    } else {
      return "from-[#374151] via-[#4B5563] to-[#6B7280]";
    }
  };

  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${getGradient()}`}>
      {/* Clouds */}
      <Clouds maxNumber={50} maxSize={5} maxOpacity={0.1} />

      {/* Rain */}
      <Rain max={50} />

      {/* City Skyline */}
      <CitySkyline fill="#1F2937" />

      {/* Logo */}
      <AppLogo />
    </div>
  );
}
