import React from "react";

export default function Cloud(cloud: {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
}) {
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
      <div className="flex items-end gap-1">
        <div
          className="w-12 h-12 bg-white rounded-full"
          style={{
            width: `${cloud.size * 0.5}px`,
            height: `${cloud.size * 0.5}px`,
          }}
        ></div>
        <div
          className="w-16 h-16 bg-white rounded-full"
          style={{
            width: `${cloud.size * 0.7}px`,
            height: `${cloud.size * 0.7}px`,
          }}
        ></div>
        <div
          className="w-12 h-12 bg-white rounded-full"
          style={{
            width: `${cloud.size * 0.5}px`,
            height: `${cloud.size * 0.5}px`,
          }}
        ></div>
      </div>
    </div>
  );
}
