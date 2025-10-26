import React, { useEffect, useState } from "react";
import AppLogo from "../logo";

export default function RainyScene({ timeOfDay }) {
  const [raindrops, setRaindrops] = useState([]);

  useEffect(() => {
    const generateRain = () => {
      const drops = [];
      for (let i = 0; i < 50; i++) {
        drops.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: Math.random() * 0.5 + 0.5,
        });
      }
      setRaindrops(drops);
    };
    generateRain();
  }, []);

  const getGradient = () => {
    if (timeOfDay === "morning") {
      return "from-[#6B7280] via-[#8B92A0] to-[#9CA3AF]";
    } else if (timeOfDay === "afternoon") {
      return "from-[#64748B] via-[#7B8799] to-[#94A3B8]";
    } else {
      return "from-[#374151] via-[#4B5563] to-[#6B7280]";
    }
  };

  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${getGradient()}`}>
      {/* Dark Clouds */}
      <div className="absolute top-0 left-0 right-0 h-64">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-80"
            style={{
              top: `${Math.random() * 40}%`,
              left: `${Math.random() * 80}%`,
              animation: `float ${40 + Math.random() * 20}s linear infinite`,
            }}
          >
            <div className="flex items-end gap-1">
              <div className="w-20 h-16 bg-[#4B5563] rounded-full blur-sm"></div>
              <div className="w-28 h-20 bg-[#374151] rounded-full blur-sm"></div>
              <div className="w-24 h-18 bg-[#4B5563] rounded-full blur-sm"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Rain */}
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-0.5 h-12 bg-gradient-to-b from-transparent via-blue-200 to-blue-300 opacity-60 animate-rain"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        />
      ))}

      {/* City Skyline */}
      <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-center opacity-40">
        <svg
          viewBox="0 0 800 200"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 L0,120 L50,120 L50,80 L80,80 L80,100 L120,100 L120,90 L150,90 L150,120 L200,120 L200,60 L240,60 L240,120 L280,120 L280,70 L310,70 L310,120 L350,120 L350,50 L380,50 L380,120 L420,120 L420,90 L460,90 L460,120 L500,120 L500,40 L530,40 L530,120 L570,120 L570,80 L600,80 L600,120 L650,120 L650,70 L680,70 L680,120 L730,120 L730,90 L760,90 L760,120 L800,120 L800,200 Z"
            fill="#1F2937"
          />
        </svg>
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <AppLogo></AppLogo>
      </div>

      <style>{`
        @keyframes rain {
          from {
            transform: translateY(-100vh);
          }
          to {
            transform: translateY(100vh);
          }
        }
        .animate-rain {
          animation: rain 1s linear infinite;
        }
        @keyframes float {
          from {
            transform: translateX(-20vw);
          }
          to {
            transform: translateX(120vw);
          }
        }
      `}</style>
    </div>
  );
}
