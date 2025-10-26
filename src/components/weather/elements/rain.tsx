import React, { useEffect, useState } from "react";

export interface IRain {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

export default function Rain(props: { max: number }) {
  const [raindrops, setRaindrops] = useState([]);

  useEffect(() => {
    setRaindrops(generateRain(props.max));
  }, [props]);

  return (
    <>
      {/* Rain */}
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-0.5 h-12 bg-gradient-to-b from-transparent via-blue-200 to-blue-300 opacity-60 animate-rain"
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

export const generateRain = (max: number): IRain[] => {
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
