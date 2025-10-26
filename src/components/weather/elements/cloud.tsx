import React from "react";

export interface ICloud {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
}

export default function Cloud(cloud: ICloud) {
  return (
    <div
      key={cloud.id}
      className="absolute opacity-40 animate-float"
      style={{
        top: `${cloud.top}%`,
        left: `${cloud.left}%`,
        animation: `float ${cloud.duration}s linear infinite`,
      }}
    >
      <div
        className="w-12 h-12 bg-white rounded-full cloud"
        style={{
          transform: `scale(${cloud.size})`,
        }}
      ></div>
    </div>
  );
}

export const generateClouds = (): ICloud[] => {
  const newClouds: ICloud[] = [];
  for (let i = 0; i < 4; i++) {
    newClouds.push({
      id: i,
      top: Math.random() * 30 + 15,
      left: Math.random() * 100,
      size: Math.random(),
      duration: Math.random() * 50 + 70,
    });
  }
  return newClouds;
};
