import { TimeOfDayType } from "@/pages/portfolio";
import React, { useEffect, useState } from "react";

export interface ISnow {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

export default function Snow() {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    setSnowflakes(generateSnowflakes(100));
  }, []);

  return (
    <>
      {/* Snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute -top-10 rounded-full bg-white animate-snow"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            "--drift": `${flake.drift}px`,
            opacity: 0.8,
            boxShadow: "0 0 3px rgba(255,255,255,0.8)",
          }}
        />
      ))}

      {/* Snowman */}
      <div className="absolute bottom-16 right-1/3 opacity-90">
        <svg width="50" height="70" viewBox="0 0 50 70">
          {/* Bottom snowball */}
          <circle cx="25" cy="55" r="15" fill="white" />
          {/* Middle snowball */}
          <circle cx="25" cy="35" r="12" fill="white" />
          {/* Head */}
          <circle cx="25" cy="17" r="9" fill="white" />
          {/* Eyes */}
          <circle cx="22" cy="15" r="1.5" fill="#333" />
          <circle cx="28" cy="15" r="1.5" fill="#333" />
          {/* Nose (carrot) */}
          <polygon points="25,17 25,19 29,18" fill="#FF6B35" />
          {/* Smile */}
          <path
            d="M 21 20 Q 25 22 29 20"
            stroke="#333"
            fill="none"
            strokeWidth="1"
          />
          {/* Buttons */}
          <circle cx="25" cy="32" r="1.5" fill="#333" />
          <circle cx="25" cy="38" r="1.5" fill="#333" />
          <circle cx="25" cy="44" r="1.5" fill="#333" />
          {/* Hat */}
          <rect x="18" y="7" width="14" height="3" fill="#333" />
          <rect x="20" y="3" width="10" height="4" fill="#333" />
          {/* Scarf */}
          <ellipse cx="25" cy="23" rx="11" ry="3" fill="#FF0000" />
          <rect x="32" y="23" width="3" height="10" fill="#FF0000" />
        </svg>
      </div>

      {/* Ground snow */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 Q150,40 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
            fill="white"
            opacity="0.9"
          />
        </svg>
      </div>

      <style>{`
        @keyframes snow {
          0% {
            transform: translateY(-100vh) translateX(0);
          }
          100% {
            transform: translateY(100vh) translateX(var(--drift));
          }
        }
        .animate-snow {
          animation: snow linear infinite;
        }
      `}</style>
    </>
  );
}

export const generateSnowflakes = (max: number): ISnow[] => {
  const flakes = [];
  for (let i = 0; i < max; i++) {
    flakes.push({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 5,
      drift: (Math.random() - 0.5) * 50,
    });
  }
  return flakes;
};
