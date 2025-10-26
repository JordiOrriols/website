import React, { useEffect, useState } from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Clouds, { CloudsProps } from "./elements/cloud";
import { TimeOfDayType, WeatherType } from "@/pages/portfolio";
import Stars from "./elements/stars";

interface configType {
  skyline: string;
  bg: string;
}

const config: Record<TimeOfDayType, configType> = {
  morning: {
    skyline: "#5A8FB8",
    bg: "from-[#87CEEB] via-[#B0E0E6] to-[#FFE4B5]",
  },
  day: {
    skyline: "#4AA0FF",
    bg: "from-[#5EC4FF] via-[#90E0FF] to-[#E6F7FF]",
  },
  afternoon: {
    skyline: "#CC8400",
    bg: "from-[#FFB347] via-[#FFCC70] to-[#FFA500]",
  },
  night: {
    skyline: "#293D5F",
    bg: "from-[#4A6FA5] via-[#5B7FA8] to-[#4A6FA5]",
  },
};

export default function ClearScene(props: {
  weather: WeatherType;
  timeOfDay: TimeOfDayType;
}) {
  const [clouds, setClouds] = useState<CloudsProps>({ maxNumber: 0 });

  useEffect(() => {
    if (props.timeOfDay === "night") setClouds({ maxNumber: 0 });
    else if (props.weather === "clear") setClouds({ maxNumber: 8 });
    else if (props.weather === "cloudy")
      setClouds({ maxNumber: 50, maxSize: 5, maxOpacity: 0.3 });
  }, [props]);

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-b ${
        config[props.timeOfDay].bg
      }`}
    >
      {/* Bright Sun */}
      {props.timeOfDay === "afternoon" || props.timeOfDay === "day" ? (
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

      {/* City Skyline */}
      <CitySkyline fill={config[props.timeOfDay].skyline} />

      {/* Stars */}
      {props.timeOfDay === "night" ? <Stars max={150} /> : null}

      {/* Logo */}
      <AppLogo />
    </div>
  );
}
