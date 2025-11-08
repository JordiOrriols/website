import { useEffect, useRef } from "react";

// Hook para sonidos ambientales
export const useAmbientSound = (weatherCondition) => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Crear sonidos ambientales según el clima
    if (!audioRef.current) {
      const audioContext = new window.AudioContext();
      audioRef.current = { context: audioContext, sources: [] };
    }

    const { context } = audioRef.current;

    // Limpiar sonidos anteriores
    audioRef.current.sources.forEach((source) => {
      try {
        source.stop();
      } catch (e) {
        // Ignorar errores si ya está detenido
      }
    });
    audioRef.current.sources = [];

    // Crear sonido ambiente según el clima
    if (weatherCondition === "rain" || weatherCondition === "thunderstorm") {
      // Sonido de lluvia usando ruido blanco
      const bufferSize = 2 * context.sampleRate;
      const noiseBuffer = context.createBuffer(
        1,
        bufferSize,
        context.sampleRate
      );
      const output = noiseBuffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = context.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const bandpass = context.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.value = 1000;
      bandpass.Q.value = 0.5;

      const gainNode = context.createGain();
      gainNode.gain.value = 0.15;

      whiteNoise.connect(bandpass);
      bandpass.connect(gainNode);
      gainNode.connect(context.destination);

      whiteNoise.start();
      audioRef.current.sources.push(whiteNoise);

      // Truenos ocasionales si es tormenta
      if (weatherCondition === "thunderstorm") {
        const createThunder = () => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();

          oscillator.connect(gain);
          gain.connect(context.destination);

          oscillator.frequency.value = 50;
          oscillator.type = "sawtooth";

          gain.gain.setValueAtTime(0.3, context.currentTime);
          gain.gain.exponentialRampToValueAtTime(
            0.01,
            context.currentTime + 0.8
          );

          oscillator.start(context.currentTime);
          oscillator.stop(context.currentTime + 0.8);
        };

        const thunderInterval = setInterval(() => {
          if (Math.random() > 0.7) {
            createThunder();
          }
        }, 500);

        return () => clearInterval(thunderInterval);
      }
    } else if (
      weatherCondition === "night-clear" ||
      weatherCondition === "christmas-snow"
    ) {
      // Sonido ambiental suave nocturno
      const oscillator1 = context.createOscillator();
      const oscillator2 = context.createOscillator();
      const gainNode = context.createGain();

      oscillator1.type = "sine";
      oscillator1.frequency.value = 220;
      oscillator2.type = "sine";
      oscillator2.frequency.value = 330;

      gainNode.gain.value = 0.05;

      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator1.start();
      oscillator2.start();

      audioRef.current.sources.push(oscillator1, oscillator2);
    }

    return () => {
      audioRef.current.sources.forEach((source) => {
        try {
          source.stop();
        } catch (e) {
          // Ignorar errores
        }
      });
      audioRef.current.sources = [];
    };
  }, [weatherCondition]);

  return null;
};
