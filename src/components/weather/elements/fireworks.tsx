import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IFireworkParticle {
  id: number;
  angle: number;
  velocity: number;
  size: number;
}

interface IFirework {
  id: number;
  x: number;
  y: number;
  color: string;
  particles: IFireworkParticle[];
}

interface Props {
  playFireworks: () => void;
}

export default function Fireworks(props: Props) {
  const [fireworks, setFireworks] = useState<IFirework[]>([]);

  useEffect(() => {
    // Generate fireworks periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newFirework = generateFirework();
        setFireworks((prev) => [...prev.slice(-8), newFirework]);

        // Remove firework after animation
        setTimeout(() => {
          setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
        }, 2000);

        props.playFireworks();
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Fireworks */}
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
          }}
        >
          {/* Center bright flash */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 3, 0], opacity: [1, 0.5, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute w-4 h-4 rounded-full"
            style={{
              backgroundColor: firework.color,
              boxShadow: `0 0 20px ${firework.color}, 0 0 40px ${firework.color}`,
            }}
          />

          {/* Particles in circle */}
          {firework.particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              initial={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: Math.cos(particle.angle) * particle.velocity,
                y: Math.sin(particle.angle) * particle.velocity + 30,
                scale: [1, 1.2, 0.3],
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: 1.5 + Math.random() * 0.5,
                ease: "easeOut",
              }}
              style={{
                width: particle.size + "px",
                height: particle.size + "px",
                backgroundColor: firework.color,
                boxShadow: `0 0 4px ${firework.color}`,
              }}
            />
          ))}

          {/* Secondary ring of particles */}
          {firework.particles.slice(0, 25).map((particle) => (
            <motion.div
              key={`secondary-${particle.id}`}
              className="absolute rounded-full"
              initial={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 0.7,
              }}
              animate={{
                x: Math.cos(particle.angle + 0.1) * (particle.velocity * 0.6),
                y: Math.sin(particle.angle + 0.1) * (particle.velocity * 0.6) + 20,
                scale: [1, 0.8, 0],
                opacity: [0.7, 0.5, 0],
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 0.1,
              }}
              style={{
                width: particle.size * 1.5 + "px",
                height: particle.size * 1.5 + "px",
                backgroundColor: firework.color,
                filter: "brightness(1.3)",
              }}
            />
          ))}

          {/* Trailing sparkles */}
          {firework.particles
            .filter((_, i) => i % 3 === 0)
            .map((particle) => (
              <motion.div
                key={`trail-${particle.id}`}
                className="absolute rounded-full bg-white"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0.5,
                  opacity: 1,
                }}
                animate={{
                  x: Math.cos(particle.angle) * (particle.velocity * 0.8),
                  y: Math.sin(particle.angle) * (particle.velocity * 0.8) + 25,
                  scale: [0.5, 1, 0],
                  opacity: [1, 0.6, 0],
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeOut",
                  delay: 0.05,
                }}
                style={{
                  width: "2px",
                  height: "2px",
                }}
              />
            ))}
        </div>
      ))}
    </>
  );
}

const generateFirework = (): IFirework => {
  const colors: string[] = [
    "#FFD700",
    "#FF1493",
    "#00CED1",
    "#FF4500",
    "#9370DB",
    "#32CD32",
    "#FF69B4",
  ];
  return {
    id: Date.now(),
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 30,
    color: (colors[Math.floor(Math.random() * colors.length)] ?? colors[0]) as string,
    particles: Array.from({ length: 50 }, (_, i) => {
      const angle = (i / 50) * Math.PI * 2;
      const velocity = 80 + Math.random() * 40;
      return {
        id: i,
        angle,
        velocity,
        size: 2 + Math.random() * 2,
      };
    }),
  };
};
