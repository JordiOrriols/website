import React, { useEffect, useState } from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Clouds, { CloudsProps } from "./elements/cloud";
import { TimeOfDayType, WeatherType } from "@/pages/portfolio";
import Stars from "./elements/stars";
import Rain from "./elements/rain";
import Snow from "./elements/snow";

interface configType {
  skyline: string;
  bg: string;
}

const configClear: Record<TimeOfDayType, configType> = {
  morning: {
    skyline: "#5A8FB8",
    bg: "from-[#87CEEB] via-[#B0E0E6] to-[#FFE4B5]",
  },
  day: {
    // Cielo despejado: azul intenso y limpio.
    skyline: "#5CA9E6",
    bg: "from-[#6EC6FF] via-[#9EDCFF] to-[#E0F6FF]",
  },
  afternoon: {
    skyline: "#CC8400",
    bg: "from-[#FFB347] via-[#FFCC70] to-[#FFA500]",
  },
  night: {
    // Azul profundo con toque violeta por luz urbana.
    skyline: "#1E2A44",
    bg: "from-[#0B1A33] via-[#1F3A5F] to-[#2B4C7E]",
  },
};

const configRain: Record<TimeOfDayType, configType> = {
  morning: {
    // Amanecer lluvioso: más claro y ligeramente cálido, aún con bruma fría.
    skyline: "#1F2937",
    bg: "from-[#9CA3AF] via-[#AAB3BF] to-[#B6BEC9]",
  },
  day: {
    // Día lluvioso: gris azulado neutro, más brillante y con contraste suave.
    skyline: "#1F2937",
    bg: "from-[#7B8799] via-[#8C97A8] to-[#A3ACB9]",
  },
  afternoon: {
    // Referencia base: tono más equilibrado, frío y húmedo.
    skyline: "#1F2937",
    bg: "from-[#64748B] via-[#7B8799] to-[#94A3B8]",
  },
  night: {
    // Noche lluviosa: baja luminosidad, más azul profundo y uniforme.
    skyline: "#1F2937",
    bg: "from-[#374151] via-[#4B5563] to-[#6B7280]",
  },
};

export default function ClearScene(props: {
  weather: WeatherType;
  timeOfDay: TimeOfDayType;
}) {
  const [clouds, setClouds] = useState<CloudsProps>({ maxNumber: 0 });
  const [config, setConfig] = useState<configType>(configClear.morning);

  useEffect(() => {
    if (props.weather === "rain" || props.weather === "snow")
      setConfig(configRain[props.timeOfDay]);
    else setConfig(configClear[props.timeOfDay]);
  }, [props.weather, props.timeOfDay]);

  useEffect(() => {
    if (
      props.weather === "cloudy" ||
      props.weather === "rain" ||
      props.weather === "snow"
    )
      setClouds({ maxNumber: 50, maxSize: 5, maxOpacity: 0.2 });
    else if (props.timeOfDay === "night") setClouds({ maxNumber: 0 });
    else if (props.weather === "clear") setClouds({ maxNumber: 8 });
    else setClouds({ maxNumber: 4 });
  }, [props.weather, props.timeOfDay]);

  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${config.bg}`}>
      {/* Bright Sun */}
      {(props.timeOfDay === "afternoon" || props.timeOfDay === "day") &&
      props.weather !== "rain" ? (
        <div className="absolute top-20 right-24">
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] shadow-2xl animate-pulse">
            {/* Glowing effect */}
            <div className="absolute inset-0 rounded-full bg-[#FFD700] opacity-40 blur-2xl animate-pulse"></div>
          </div>
        </div>
      ) : null}
      {/* Moon */}
      {props.timeOfDay === "night" ? (
        <div className="absolute top-40 right-40 w-20 h-20 rounded-full bg-transparent shadow-[25px_10px_0_0_#F2F1F5] backdrop-blur-sm"></div>
      ) : null}
      {/* Clouds */}
      <Clouds {...clouds} />
      {/* Rain */}
      {props.weather === "rain" ? (
        <Rain max={50} timeOfDay={props.timeOfDay} />
      ) : null}
      {/* City Skyline */}
      <CitySkyline fill={config.skyline} />
      {/* Stars */}
      {props.timeOfDay === "night" ? <Stars max={150} /> : null}
      {/* Logo */}
      <AppLogo />
      {/* Snow */}
      {props.weather === "snow" ? <Snow></Snow> : null}
    </div>
  );
}
