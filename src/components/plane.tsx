import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlaneController() {
  const [position, setPosition] = useState({ x: 100, y: 50 });
  const [showNotification, setShowNotification] = useState(true);
  const velocityYRef = useRef(0);
  const positionRef = useRef({ x: 100, y: 50 });

  useEffect(() => {
    // Hide notification after 4 seconds
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 4000);

    // Keyboard controls
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        velocityYRef.current = Math.max(velocityYRef.current - 0.3, -2);
      } else if (e.key === "ArrowDown") {
        velocityYRef.current = Math.min(velocityYRef.current + 0.3, 2);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Animation loop
    const animate = () => {
      // Move horizontally (always moving left)
      positionRef.current.x -= 0.3;

      // Reset position when off screen
      if (positionRef.current.x < -15) {
        positionRef.current.x = 115;
      }

      // Move vertically based on controls
      positionRef.current.y += velocityYRef.current;

      // Vertical boundaries (keep within viewport)
      if (positionRef.current.y < 10) positionRef.current.y = 10;
      if (positionRef.current.y > 90) positionRef.current.y = 90;

      setPosition({ x: positionRef.current.x, y: positionRef.current.y });

      // Damping for vertical movement
      velocityYRef.current *= 0.95;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Plane SVG */}
      <motion.div
        className="fixed z-10 pointer-events-none"
        style={{
          top: `${position.y}%`,
          left: `${position.x}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          rotate: velocityYRef.current * 3,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          className="drop-shadow-xl"
        >
          {/* Fuselage (cuerpo) */}
          <ellipse
            cx="50"
            cy="40"
            rx="35"
            ry="10"
            fill="#FFFFFF"
            stroke="#333"
            strokeWidth="1.5"
          />

          {/* Cockpit window */}
          <ellipse
            cx="60"
            cy="40"
            rx="12"
            ry="8"
            fill="#87CEEB"
            opacity="0.7"
          />

          {/* Wings (alas principales) */}
          <rect
            x="30"
            y="20"
            width="40"
            height="6"
            fill="#FF0000"
            stroke="#8B0000"
            strokeWidth="1"
          />
          <rect
            x="30"
            y="54"
            width="40"
            height="6"
            fill="#FF0000"
            stroke="#8B0000"
            strokeWidth="1"
          />

          {/* Tail (cola) */}
          <path
            d="M 15 35 L 15 45 L 25 45 L 25 35 Z"
            fill="#FF0000"
            stroke="#8B0000"
            strokeWidth="1"
          />
          <path
            d="M 15 30 L 15 38 L 25 40 Z"
            fill="#FF0000"
            stroke="#8B0000"
            strokeWidth="1"
          />
          <path
            d="M 15 42 L 15 50 L 25 40 Z"
            fill="#FF0000"
            stroke="#8B0000"
            strokeWidth="1"
          />

          {/* Propeller (hélice) - animated */}
          <g>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 85 40"
              to="360 85 40"
              dur="0.2s"
              repeatCount="indefinite"
            />
            <rect x="82" y="35" width="8" height="2" fill="#333" rx="1" />
            <rect x="82" y="43" width="8" height="2" fill="#333" rx="1" />
            <circle cx="85" cy="40" r="3" fill="#555" />
          </g>

          {/* Engine */}
          <ellipse cx="78" cy="40" rx="8" ry="6" fill="#444" />

          {/* Landing gear */}
          <circle cx="55" cy="52" r="2.5" fill="#333" />
          <circle cx="45" cy="52" r="2.5" fill="#333" />
          <line
            x1="55"
            y1="50"
            x2="55"
            y2="48"
            stroke="#333"
            strokeWidth="1.5"
          />
          <line
            x1="45"
            y1="50"
            x2="45"
            y2="48"
            stroke="#333"
            strokeWidth="1.5"
          />

          {/* Details */}
          <line
            x1="20"
            y1="40"
            x2="85"
            y2="40"
            stroke="#999"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <text
            x="55"
            y="44"
            fontSize="6"
            fill="#333"
            textAnchor="middle"
            fontWeight="bold"
          >
            N172SP
          </text>
        </svg>
      </motion.div>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-[#2D4A6B] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">✈️</span>
              </div>
              <div>
                <p className="font-semibold">¡Avión activado!</p>
                <p className="text-sm text-white/80">
                  Usa ↑ ↓ para controlarlo
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
