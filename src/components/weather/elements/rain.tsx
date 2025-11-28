import { TimeOfDayType } from "@/pages/portfolio";
import React, { useEffect, useState } from "react";

interface IRain {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

export default function Rain(props: { max: number; timeOfDay: TimeOfDayType }) {
  const [raindrops, setRaindrops] = useState([]);

  useEffect(() => {
    setRaindrops(generateRain(props.max));
  }, [props.max]);

  const lightDrop = ["afternoon", "night"].includes(props.timeOfDay);
  const colorStart = lightDrop ? "via-blue-200" : "via-slate-500";
  const colorEnd = lightDrop ? "to-blue-300" : "to-slate-600";

  return (
    <>
      {/* Rain */}
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className={`absolute w-0.5 h-12 bg-gradient-to-b from-transparent ${colorStart} ${colorEnd} opacity-60 animate-rain`}
          style={{
            top: `-50px`,
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes rain {
          from {
            transform: translateY(-20vh);
          }
          to {
            transform: translateY(120vh);
          }
        }
        .animate-rain {
          animation: rain 1s linear infinite;
        }
      `}</style>
    </>
  );
}

const generateRain = (max: number): IRain[] => {
  const drops = [];
  for (let i = 0; i < max; i++) {
    drops.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 0.5 + 0.5,
    });
  }
  return drops;
};
