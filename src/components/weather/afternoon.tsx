import React, { useEffect, useState } from "react";
import AppLogo from "../logo";
import CitySkyline from "../skyline";

export default function AfternoonSunny() {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    const generateClouds = () => {
      const newClouds = [];
      for (let i = 0; i < 4; i++) {
        newClouds.push({
          id: i,
          top: Math.random() * 30 + 15,
          left: Math.random() * 100,
          size: Math.random() * 50 + 35,
          duration: Math.random() * 50 + 70,
        });
      }
      setClouds(newClouds);
    };
    generateClouds();
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#FFB347] via-[#FFCC70] to-[#FFA500]">
      {/* Bright Sun */}
      <div className="absolute top-20 right-24">
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] shadow-2xl animate-pulse">
          {/* Glowing effect */}
          <div className="absolute inset-0 rounded-full bg-[#FFD700] opacity-40 blur-2xl animate-pulse"></div>

          {/* Sun rays */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 origin-center"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              }}
            >
              <div className="w-40 h-2 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Warm Clouds */}
      {clouds.map((cloud) => (
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
      ))}

      {/* City Skyline */}
      <CitySkyline fill="#CC8400"/>

      {/* Logo */}
      <AppLogo />

      <style>{`
        @keyframes float {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100vw);
          }
        }
      `}</style>
    </div>
  );
}
