import React from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Clouds from "./elements/cloud";
import Rain from "./elements/rain";
import Stars from "./elements/stars";
import { TimeOfDayType } from "@/pages/portfolio";

interface configType {
  bg: string;
}

const config: Record<TimeOfDayType, configType> = {
  morning: {
    bg: "from-[#6B7280] via-[#8B92A0] to-[#9CA3AF]",
  },
  day: {
    bg: "from-[#6B7280] via-[#8B92A0] to-[#9CA3AF]",
  },
  afternoon: {
    bg: "from-[#64748B] via-[#7B8799] to-[#94A3B8]",
  },
  night: {
    bg: "from-[#374151] via-[#4B5563] to-[#6B7280]",
  },
};

export default function RainyScene({ timeOfDay }) {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-b ${config[timeOfDay].bg}`}
    >
      {/* Stars */}
      {timeOfDay === "night" ? <Stars max={150} /> : null}
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
