import React, { useEffect, useState } from "react";
import AppLogo from "../logo";
import CitySkyline from "../skyline";

export default function NightClear() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
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
      <AppLogo />

      {/* Moon */}
      <div className="absolute top-40 right-40 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm">
        <div className="absolute top-1 left-2 w-10 h-10 rounded-full bg-[#5B7FA8]"></div>
      </div>

      {/* City Skyline */}
      <CitySkyline fill="#2D4A6B" />

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
