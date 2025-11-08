import { useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";
import { WeatherType } from "@/pages/portfolio";

export type AmbientAudioKey = "rain" | "thunder" | "click" | "night";

const audioFiles: Record<AmbientAudioKey, string> = {
  rain: "/audio/rain-02.mp3",
  thunder: "/audio/thunder-03.mp3",
  click: "/audio/click-01.mp3",
  night: "/audio/night-01.mp3",
};

// Configuración por escena
export const sceneAudioConfig: Record<
  WeatherType,
  {
    background: AmbientAudioKey[];
    random?: {
      key: AmbientAudioKey;
      minDelay: number;
      maxDelay: number;
      volume?: number;
    }[];
  }
> = {
  clear: { background: [] },
  cloudy: { background: [] },
  snow: { background: [] },
  rain: {
    background: ["rain"],
    // random: [{ key: "thunder", minDelay: 8, maxDelay: 20, volume: 0.9 }],
  },
  thunderstorm: {
    background: ["rain"],
    // random: [{ key: "thunder", minDelay: 8, maxDelay: 20, volume: 0.9 }],
  },
};

export const useAmbientAudio = (weather: WeatherType) => {
  const howlsRef = useRef<Map<AmbientAudioKey, Howl>>(new Map());
  const timersRef = useRef<number[]>([]);

  // Carga un sonido si no existe
  const loadSound = useCallback((key: AmbientAudioKey) => {
    if (howlsRef.current.has(key)) return howlsRef.current.get(key)!;
    const sound = new Howl({
      src: [audioFiles[key]],
      loop: false,
      volume: 1,
    });
    howlsRef.current.set(key, sound);
    return sound;
  }, []);

  // Reproduce un sonido (loop o one-shot)
  const playSound = useCallback(
    (
      key: AmbientAudioKey,
      { loop = false, volume = 1 }: { loop?: boolean; volume?: number } = {}
    ) => {
      const sound = howlsRef.current.get(key) ?? loadSound(key);
      sound.loop(loop);
      sound.volume(volume);
      sound.play();
    },
    [loadSound]
  );

  // Trueno manual
  const playThunder = useCallback(() => {
    playSound("thunder", { loop: false, volume: 1 });
  }, [playSound]);

  // Programador de sonidos aleatorios
  const scheduleRandom = useCallback(
    (random?: (typeof sceneAudioConfig)[WeatherType]["random"]) => {
      if (!random) return;
      random.forEach((item) => {
        const loop = () => {
          const delay =
            item.minDelay + Math.random() * (item.maxDelay - item.minDelay);
          const timer = window.setTimeout(() => {
            playSound(item.key, { loop: false, volume: item.volume ?? 1 });
            loop();
          }, delay * 1000);
          timersRef.current.push(timer);
        };
        loop();
      });
    },
    [playSound]
  );

  // Cambio de escena
  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const cfg = sceneAudioConfig[weather] || { background: [] };

    // reproducir los de fondo
    cfg.background.forEach((key) => {
      playSound(key, { loop: true, volume: 0.7 });
    });

    // programar aleatorios
    scheduleRandom(cfg.random);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      howlsRef.current.forEach((howl) => howl.stop());
    };
  }, [weather, playSound, scheduleRandom]);

  return { playThunder };
};
