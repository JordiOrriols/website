import React from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";
import Clouds from "./elements/cloud";
import { TimeOfDayType, WeatherType } from "@/pages/portfolio";
import Stars from "./elements/stars";

interface configType {
  skyline: string;
  bgFrom: string;
  bgVia: string;
  bgTo: string;
}

const config: Record<TimeOfDayType, configType> = {
  morning: {
    skyline: "#5A8FB8",
    bgFrom: "#87CEEB",
    bgVia: "#B0E0E6",
    bgTo: "#FFE4B5",
  },
  day: {
    skyline: "#5A8FB8",
    bgFrom: "#FFB347",
    bgVia: "#FFB347",
    bgTo: "#FFB347",
  },
  afternoon: {
    skyline: "#CC8400",
    bgFrom: "#FFB347",
    bgVia: "#FFCC70",
    bgTo: "#FFA500",
  },
  night: {
    skyline: "#293D5F",
    bgFrom: "#4A6FA5",
    bgVia: "#5B7FA8",
    bgTo: "#4A6FA5",
  },
};

export default function ClearScene(props: {
  weather: WeatherType;
  timeOfDay: TimeOfDayType;
}) {
  const clouds = props.weather === "clear" ? 7 : 25;

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-b from-[${
        config[props.timeOfDay].bgFrom
      }] via-[${config[props.timeOfDay].bgVia}] to-[${
        config[props.timeOfDay].bgTo
      }]`}
    >

      {/* Bright Sun */}
      {props.timeOfDay !== "night" ? (
        <div className="absolute top-20 right-24">
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] shadow-2xl animate-pulse">
            {/* Glowing effect */}
            <div className="absolute inset-0 rounded-full bg-[#FFD700] opacity-40 blur-2xl animate-pulse"></div>
          </div>
        </div>
      ) : null}

      {/* Stars */}
      {props.timeOfDay === "night" ? <Stars max={150} /> : null}

      {/* Moon */}
      {props.timeOfDay === "night" ? (
        <div className="absolute top-40 right-40 w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm">
          <div
            className="absolute left-5 w-20 h-20 rounded-full bg-[#5B7FA8]"
            style={{ top: -8 }}
          ></div>
        </div>
      ) : null}

      {/* Clouds */}
      <Clouds maxNumber={clouds} />

      {/* City Skyline */}
      <CitySkyline fill={config[props.timeOfDay].skyline} />

      {/* Logo */}
      <AppLogo />
    </div>
  );
}
