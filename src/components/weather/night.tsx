import React, { useEffect, useState } from "react";
import AppLogo from "../logo";

export default function NightClear() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 80; i++) {
        newStars.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          size: Math.random() * 2 + 1,
          delay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#4A6FA5] via-[#5B7FA8] to-[#4A6FA5]">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: "3s",
          }}
        />
      ))}

      {/* Logo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <AppLogo></AppLogo>
      </div>

      {/* Moon */}
      <div className="absolute top-12 right-20 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm">
        <div className="absolute top-1 right-2 w-10 h-10 rounded-full bg-[#4A6FA5]"></div>
      </div>

      {/* City Skyline */}
      <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-center opacity-30">
        <svg
          viewBox="0 0 800 200"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 L0,120 L50,120 L50,80 L80,80 L80,100 L120,100 L120,90 L150,90 L150,120 L200,120 L200,60 L240,60 L240,120 L280,120 L280,70 L310,70 L310,120 L350,120 L350,50 L380,50 L380,120 L420,120 L420,90 L460,90 L460,120 L500,120 L500,40 L530,40 L530,120 L570,120 L570,80 L600,80 L600,120 L650,120 L650,70 L680,70 L680,120 L730,120 L730,90 L760,90 L760,120 L800,120 L800,200 Z"
            fill="#2D4A6B"
          />
        </svg>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
