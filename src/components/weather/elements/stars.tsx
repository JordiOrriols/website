import React, { useMemo } from "react";

interface IStar {
  id: number;
  top: number;
  left: number;
  delay: number;
  size: number;
}

export default function Stars(props: { max: number }) {
  const stars = useMemo(() => generateStars(props.max), [props.max]);

  return (
    <>
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            top: `${star.top.toString()}%`,
            left: `${star.left.toString()}%`,
            width: `${star.size.toString()}px`,
            height: `${star.size.toString()}px`,
            animationDelay: `${star.delay.toString()}s`,
            animationDuration: "3s",
          }}
        />
      ))}

      <style>{`
         @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

const generateStars = (max: number): IStar[] => {
  const newStars: IStar[] = [];
  for (let i = 0; i < max; i++) {
    newStars.push({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 2,
      delay: Math.random() * 3,
    });
  }
  return newStars;
};
