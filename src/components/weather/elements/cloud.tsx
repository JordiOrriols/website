import React, { useEffect, useState } from "react";

export interface ICloud {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  opacity: number;
  color?: string;
}

export default function Clouds(props: { max: number; color: string }) {
  const [clouds, setClouds] = useState<ICloud>([]);

  useEffect(() => {
    const newClouds = generateClouds(props.max);
    setClouds(newClouds);
  }, []);

  return (
    <>
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute animate-float"
          style={{
            top: `${cloud.top}%`,
            left: `${cloud.left}%`,
            opacity: cloud.opacity,
            animation: `float ${cloud.duration}s linear infinite`,
          }}
        >
          <div
            className={`relative w-[200px] h-[60px] bg-${props.color} rounded-[200px] before:content-[''] before:absolute before:bg-${props.color} before:w-[100px] before:h-[80px] before:top-[-15px] before:left-[10px] before:rounded-[100px] before:rotate-[30deg] after:content-[''] after:absolute after:bg-${props.color} after:w-[120px] after:h-[120px] after:top-[-55px] after:right-[15px] after:rounded-[100px]`}
            style={{
              transform: `scale(${cloud.size})`,
            }}
          ></div>
        </div>
      ))}
      <style>{`
        @keyframes float {
          from {
            transform: translateX(-20vw);
          }
          to {
            transform: translateX(120vw);
          }
        }
      `}</style>
    </>
  );
}

export const generateClouds = (max: number): ICloud[] => {
  const newClouds: ICloud[] = [];
  for (let i = 0; i < max; i++) {
    newClouds.push({
      id: i,
      top: Math.random() * 30 + 15,
      left: Math.random() * 100,
      size: Math.random(),
      opacity: Math.random(),
      duration: Math.random() * 50 + 70,
    });
  }
  return newClouds;
};
