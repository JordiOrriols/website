import React, { useEffect, useState } from "react";

interface Props {
  playThunder: () => void;
}

export default function Lightning(props: Props) {
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    // Lightning effect
    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        try {
          setLightning(true);
          setTimeout(() => setLightning(false), 200);
          props.playThunder();
        } catch (error) {
          // noop
          void error;
        }
      }
    }, 1000);

    return () => clearInterval(lightningInterval);
  }, []);

  return (
    <>
      {/* Lightning Flash */}
      {lightning && <div className="absolute inset-0 bg-white opacity-40 animate-flash z-10"></div>}
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
