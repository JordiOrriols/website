import React from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Clouds from "./elements/cloud";
import Rain from "./elements/rain";
import Stars from "./elements/stars";
import { TimeOfDayType } from "@/pages/portfolio";

interface configType {
  bgFrom: string;
  bgVia: string;
  bgTo: string;
}

const config: Record<TimeOfDayType, configType> = {
  morning: {
    bgFrom: "#6B7280",
    bgVia: "#8B92A0",
    bgTo: "#9CA3AF",
  },
  day: {
    bgFrom: "#6B7280",
    bgVia: "#8B92A0",
    bgTo: "#9CA3AF",
  },
  afternoon: {
    bgFrom: "#64748B",
    bgVia: "#7B8799",
    bgTo: "#94A3B8",
  },
  night: {
    bgFrom: "#374151",
    bgVia: "#4B5563",
    bgTo: "#6B7280",
  },
};

export default function RainyScene({ timeOfDay }) {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-b from-[${config[timeOfDay].bgFrom}] via-[${config[timeOfDay].bgVia}] to-[${config[timeOfDay].bgTo}]`}
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
