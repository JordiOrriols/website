import React, { useEffect, useState } from "react";
import AppLogo from "./elements/logo";
import CitySkyline from "./elements/skyline";

export default function ThunderstormScene({ timeOfDay }) {
  const [raindrops, setRaindrops] = useState([]);
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    const generateRain = () => {
      const drops = [];
      for (let i = 0; i < 70; i++) {
        drops.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: Math.random() * 0.3 + 0.4,
        });
      }
      setRaindrops(drops);
    };
    generateRain();

    // Lightning effect
    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLightning(true);
        setTimeout(() => setLightning(false), 200);
      }
    }, 3000);

    return () => clearInterval(lightningInterval);
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#1F1B24] via-[#2D2832] to-[#4B3F72]">
      {/* Lightning Flash */}
      {lightning && (
        <div className="absolute inset-0 bg-white opacity-40 animate-flash z-10"></div>
      )}

      {/* Dark Storm Clouds */}
      <div className="absolute top-0 left-0 right-0 h-80">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-90"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 80}%`,
              animation: `float ${30 + Math.random() * 15}s linear infinite`,
            }}
          >
            <div className="flex items-end gap-1">
              <div className="w-24 h-20 bg-[#1F1B24] rounded-full blur-md"></div>
              <div className="w-32 h-28 bg-[#16141A] rounded-full blur-md"></div>
              <div className="w-28 h-24 bg-[#1F1B24] rounded-full blur-md"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightning Bolt */}
      {lightning && (
        <svg
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-16 h-64 z-20"
          viewBox="0 0 64 256"
        >
          <path
            d="M32,0 L20,100 L40,100 L28,256 L52,100 L36,100 Z"
            fill="#FFD700"
            className="drop-shadow-2xl"
          />
        </svg>
      )}

      {/* Heavy Rain */}
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-1 h-16 bg-gradient-to-b from-transparent via-blue-300 to-blue-400 opacity-70 animate-heavy-rain"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        />
      ))}

      {/* City Skyline */}
      <CitySkyline fill="#0F0D12" />

      {/* Logo */}
      <AppLogo />

      <style>{`
        @keyframes heavy-rain {
          from {
            transform: translateY(-100vh);
          }
          to {
            transform: translateY(100vh);
          }
        }
        .animate-heavy-rain {
          animation: heavy-rain 0.6s linear infinite;
        }
        @keyframes flash {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.4; }
        }
        .animate-flash {
          animation: flash 0.2s ease-in-out;
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
