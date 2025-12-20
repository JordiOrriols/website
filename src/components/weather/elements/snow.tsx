import React, { useEffect, useState } from "react";

interface ISnow {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

export default function Snow() {
  const [snowflakes, setSnowflakes] = useState<ISnow[]>([]);

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
            opacity: 0.8,
            boxShadow: "0 0 3px rgba(255,255,255,0.8)",
            ...( { ["--drift"]: `${flake.drift}px` } as React.CSSProperties ),
          }}
        />
      ))}

      <style>{`
        @keyframes snow {
          0% {
            transform: translateY(-10vh) translateX(0);
          }
          100% {
            transform: translateY(110vh) translateX(var(--drift));
          }
        }
        .animate-snow {
          animation: snow linear infinite;
        }
      `}</style>
    </>
  );
}

const generateSnowflakes = (max: number): ISnow[] => {
  const flakes: ISnow[] = [];
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
