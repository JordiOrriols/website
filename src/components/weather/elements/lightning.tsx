import React, { useEffect, useState } from "react";

export default function Lightning() {
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    // Lightning effect
    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLightning(true);
        setTimeout(() => setLightning(false), 200);
      }
    }, 1000);

    return () => clearInterval(lightningInterval);
  }, []);

  return (
    <>
      {/* Lightning Flash */}
      {lightning && (
        <div className="absolute inset-0 bg-white opacity-40 animate-flash z-10"></div>
      )}
      <style>{`
        @keyframes flash {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.4; }
        }
        .animate-flash {
          animation: flash 0.2s ease-in-out;
        }
      `}</style>
    </>
  );
}
