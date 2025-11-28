import React, { useEffect, useState } from "react";

interface ICloud {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  opacity: number;
}

export interface CloudsProps {
  maxNumber: number;
  maxOpacity?: number;
  maxSize?: number;
}

export default function Clouds(props: CloudsProps) {
  const [clouds, setClouds] = useState<ICloud>([]);

  useEffect(() => {
    const newClouds = generateClouds(props);
    setClouds(newClouds);
  }, [props.maxNumber, props.maxOpacity, props.maxSize]);

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
            className={`relative w-[200px] h-[60px] bg-white rounded-[200px] before:content-[''] before:absolute before:bg-white before:w-[100px] before:h-[80px] before:top-[-15px] before:left-[10px] before:rounded-[100px] before:rotate-[30deg] after:content-[''] after:absolute after:bg-white after:w-[120px] after:h-[120px] after:top-[-55px] after:right-[15px] after:rounded-[100px]`}
            style={{
              transform: `scale(${cloud.size})`,
            }}
          ></div>
        </div>
      ))}
      <style>{`
        @keyframes float {
          from {
            transform: translateX(-50vw);
          }
          to {
            transform: translateX(150vw);
          }
        }
      `}</style>
    </>
  );
}

const generateClouds = (config: CloudsProps): ICloud[] => {
  const newClouds: ICloud[] = [];
  for (let i = 0; i < config.maxNumber; i++) {
    newClouds.push({
      id: i,
      top: Math.random() * 30 + 15,
      left: Math.random() * 100,
      size: Math.random() * (config.maxSize || 1) + 0.3,
      opacity: Math.random() * (config.maxOpacity || 1),
      duration: Math.random() * 50 + 70,
    });
  }
  return newClouds;
};
