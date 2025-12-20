import type { TimeOfDayType } from "@/pages/portfolio";
import React, { useEffect, useState } from "react";

export interface IPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
  color: string;
}

export default function Confetti(props: { max: number; timeOfDay: TimeOfDayType }) {
  const [confetti, setConfetti] = useState<IPiece[]>([]);

  useEffect(() => {
    setConfetti(generateConfetti(props.max));
  }, [props.max]);

  return (
    <>
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-3 opacity-80"
          style={{
            left: piece.left + "%",
            backgroundColor: piece.color,
            animation: `fall ${piece.duration}s linear ${piece.delay}s infinite`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
          }
        }
      `}</style>
    </>
  );
}

export const generateConfetti = (max: number): IPiece[] => {
  const pieces: IPiece[] = [];
  const colors: string[] = ["#FFD700", "#FF1493", "#00CED1", "#FF4500", "#9370DB"];
  for (let i = 0; i < max; i++) {
    const idx = Math.floor(Math.random() * colors.length);
    const color = (colors[idx] ?? colors[0]) as string;
    pieces.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      rotation: Math.random() * 360,
      color,
    });
  }
  return pieces;
};
