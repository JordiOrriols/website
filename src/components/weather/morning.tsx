import React from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Clouds from "./elements/cloud";
import { WeatherType } from "@/pages/portfolio";

export default function MorningSunny(props: { weather: WeatherType }) {
  const clouds = props.weather === "clear" ? 7 : 15;

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#B0E0E6] to-[#FFE4B5]">
      {/* Clouds */}
      <Clouds maxNumber={clouds} />

      {/* City Skyline */}
      <CitySkyline fill="#5A8FB8" />

      {/* Logo */}
      <AppLogo />
    </div>
  );
}
