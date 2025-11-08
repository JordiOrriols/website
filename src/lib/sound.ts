import { useEffect, useRef } from "react";

// Hook para gestionar sonidos
export const useSoundEffects = () => {
  const clickSoundRef = useRef(null);
  const hoverSoundRef = useRef(null);

  useEffect(() => {
    // Crear sonidos usando Web Audio API
    const audioContext = new window.AudioContext();

    clickSoundRef.current = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    };

    hoverSoundRef.current = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 600;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.05
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    };
  }, []);

  const playClick = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current();
    }
  };

  const playHover = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current();
    }
  };

  return { playClick, playHover };
};
