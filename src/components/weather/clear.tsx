import React, { useEffect, useState } from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Clouds from "./elements/cloud";
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
    skyline: "#BEAEA2",
    bg: "from-[#87CEEB] via-[#B0E0E6] to-[#D0DAED]",
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
  const [clouds, setClouds] = useState<number>(7);

  useEffect(() => {
    const newClouds =
      props.timeOfDay === "night" ? 0 : props.weather === "clear" ? 5 : 25;
    setClouds(newClouds);
  }, [props.weather]);

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
      <Clouds maxNumber={clouds} />

      {/* City Skyline */}
      <CitySkyline fill={config[props.timeOfDay].skyline} />

      {/* Stars */}
      {props.timeOfDay === "night" ? <Stars max={150} /> : null}

      {/* Logo */}
      <AppLogo />
    </div>
  );
}
