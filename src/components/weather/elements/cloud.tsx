import React from "react";

export interface ICloud {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  opacity: number;
}

export default function Cloud(cloud: ICloud) {
  return (
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
        className="relative w-[200px] h-[60px] bg-white rounded-[200px] before:content-[''] before:absolute before:bg-white before:w-[100px] before:h-[80px] before:top-[-15px] before:left-[10px] before:rounded-[100px] before:rotate-[30deg] after:content-[''] after:absolute after:bg-white after:w-[120px] after:h-[120px] after:top-[-55px] after:right-[15px] after:rounded-[100px]"
        style={{
          transform: `scale(${cloud.size})`,
        }}
      ></div>
    </div>
  );
}

export const generateClouds = (): ICloud[] => {
  const newClouds: ICloud[] = [];
  for (let i = 0; i < 8; i++) {
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
