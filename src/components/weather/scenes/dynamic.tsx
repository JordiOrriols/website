import React from "react";
import AppLogo from "../elements/logo";
import CitySkyline from "../elements/skyline";
import Clouds from "../elements/cloud";
import type { CloudsProps } from "../elements/cloud";
import type { TimeOfDayType, WeatherType } from "@/pages/portfolio";
import Stars from "../elements/stars";
import Rain from "../elements/rain";
import Snow from "../elements/snow";
import Moon from "../elements/moon";
import Sun from "../elements/sun";
import SafeAreaContainer from "../safe-area-container";

interface configType {
  skyline: string;
  bg: string;
  themeColor: string; // Top color of gradient for notch area
  gradientColors: [string, string, string]; // [from, via, to] colors
}

export const configClear: Record<TimeOfDayType, configType> = {
  morning: {
    skyline: "#5A8FB8",
    bg: "from-[#87CEEB] via-[#B0E0E6] to-[#FFE4B5]",
    themeColor: "#87CEEB",
    gradientColors: ["#87CEEB", "#B0E0E6", "#FFE4B5"],
  },
  day: {
    // Cielo despejado: azul intenso y limpio.
    skyline: "#5CA9E6",
    bg: "from-[#6EC6FF] via-[#9EDCFF] to-[#E0F6FF]",
    themeColor: "#6EC6FF",
    gradientColors: ["#6EC6FF", "#9EDCFF", "#E0F6FF"],
  },
  afternoon: {
    skyline: "#CC8400",
    bg: "from-[#FFB347] via-[#FFCC70] to-[#FFA500]",
    themeColor: "#FFB347",
    gradientColors: ["#FFB347", "#FFCC70", "#FFA500"],
  },
  night: {
    // Azul profundo con toque violeta por luz urbana.
    skyline: "#1E2A44",
    bg: "from-[#0B1A33] via-[#1F3A5F] to-[#2B4C7E]",
    themeColor: "#0B1A33",
    gradientColors: ["#0B1A33", "#1F3A5F", "#2B4C7E"],
  },
};

export const configRain: Record<TimeOfDayType, configType> = {
  morning: {
    // Amanecer lluvioso: más claro y ligeramente cálido, aún con bruma fría.
    skyline: "#1F2937",
    bg: "from-[#9CA3AF] via-[#AAB3BF] to-[#B6BEC9]",
    themeColor: "#9CA3AF",
    gradientColors: ["#9CA3AF", "#AAB3BF", "#B6BEC9"],
  },
  day: {
    // Día lluvioso: gris azulado neutro, más brillante y con contraste suave.
    skyline: "#1F2937",
    bg: "from-[#7B8799] via-[#8C97A8] to-[#A3ACB9]",
    themeColor: "#7B8799",
    gradientColors: ["#7B8799", "#8C97A8", "#A3ACB9"],
  },
  afternoon: {
    // Referencia base: tono más equilibrado, frío y húmedo.
    skyline: "#1F2937",
    bg: "from-[#64748B] via-[#7B8799] to-[#94A3B8]",
    themeColor: "#64748B",
    gradientColors: ["#64748B", "#7B8799", "#94A3B8"],
  },
  night: {
    // Noche lluviosa: baja luminosidad, más azul profundo y uniforme.
    skyline: "#1F2937",
    bg: "from-[#374151] via-[#4B5563] to-[#6B7280]",
    themeColor: "#374151",
    gradientColors: ["#374151", "#4B5563", "#6B7280"],
  },
};

export default function DynamicScene(props: { weather: WeatherType; timeOfDay: TimeOfDayType }) {
  const getConfig = (): configType => {
    if (props.weather === "rain" || props.weather === "snow") return configRain[props.timeOfDay];
    return configClear[props.timeOfDay];
  };

  const getClouds = (): CloudsProps => {
    if (props.weather === "cloudy" || props.weather === "rain" || props.weather === "snow")
      return { maxNumber: 50, maxSize: 5, maxOpacity: 0.2 };
    if (props.timeOfDay === "night") return { maxNumber: 0 };
    if (props.weather === "clear") return { maxNumber: 8 };
    return { maxNumber: 4 };
  };

  const config = getConfig();
  const clouds = getClouds();

  return (
    <SafeAreaContainer
      className={`bg-gradient-to-b ${config.bg}`}
      themeColor={config.themeColor}
      gradientColors={config.gradientColors}
      skylineFill={config.skyline}
    >
      {/* Bright Sun */}
      {(props.timeOfDay === "afternoon" || props.timeOfDay === "day") &&
      props.weather !== "rain" &&
      props.weather !== "snow" ? (
        <Sun></Sun>
      ) : null}
      {/* Moon */}
      {props.timeOfDay === "night" ? <Moon></Moon> : null}
      {/* Clouds */}
      <Clouds {...clouds} />
      {/* Rain */}
      {props.weather === "rain" ? <Rain max={50} timeOfDay={props.timeOfDay} /> : null}
      {/* City Skyline */}
      <CitySkyline fill={config.skyline} />
      {/* Stars */}
      {props.timeOfDay === "night" ? <Stars max={props.weather === "clear" ? 150 : 50} /> : null}
      {/* Logo */}
      <AppLogo />
      {/* Snow */}
      {props.weather === "snow" ? <Snow></Snow> : null}
    </SafeAreaContainer>
  );
}
