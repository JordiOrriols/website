import { useEffect, useRef, useCallback, useState } from "react";
import { Howl } from "howler";
import { TimeOfDayType, WeatherType } from "@/pages/portfolio";

export type AmbientAudioKey =
  | "rain"
  | "thunderOne"
  | "thunderTwo"
  | "thunderThree"
  | "click"
  | "morning"
  | "night";

const audioFiles: Record<AmbientAudioKey, string> = {
  rain: "/audio/rain-02.mp3",
  thunderOne: "/audio/thunder-01.mp3",
  thunderTwo: "/audio/thunder-02.mp3",
  thunderThree: "/audio/thunder-03.mp3",
  morning: "/audio/morning-01.mp3",
  night: "/audio/night-01.mp3",

  click: "/audio/click-01.mp3",
};

interface AmbientConfig {
  background: AmbientAudioKey[];
  random?: {
    key: AmbientAudioKey;
    minDelay: number;
    maxDelay: number;
    volume?: number;
  }[];
}

const getAudioConfig = (
  weather: WeatherType,
  timeOfDay: TimeOfDayType
): AmbientConfig => {
  if (weather === "thunderstorm" || weather === "rain")
    return {
      background: ["rain"],
    };
  else if (timeOfDay === "morning")
    return {
      background: ["morning"],
    };
  else if (timeOfDay === "night")
    return {
      background: ["night"],
    };
  return {
    background: ["morning"],
  };
};

export const useAmbientAudio = (
  weather: WeatherType,
  timeOfDay: TimeOfDayType
) => {
  const howlsRef = useRef<Map<AmbientAudioKey, Howl>>(new Map());
  const timersRef = useRef<number[]>([]);
  const [muted, setMuted] = useState(false);

  // Carga un sonido si no existe
  const loadSound = useCallback((key: AmbientAudioKey) => {
    if (howlsRef.current.has(key)) return howlsRef.current.get(key)!;
    const sound = new Howl({
      src: [audioFiles[key]],
      loop: false,
      volume: 0.6,
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
      sound.volume(muted ? 0 : volume);
      sound.play();
    },
    [loadSound, muted]
  );

  // Trueno manual
  const playThunder = useCallback(() => {
    const key = ["thunderOne", "thunderTwo", "thunderThree"][
      Math.floor(Math.random() * 3)
    ];
    playSound(key, { loop: false, volume: 0.4 });
  }, [playSound]);

  // Programador de sonidos aleatorios
  const scheduleRandom = useCallback(
    (random?: AmbientConfig["random"]) => {
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

  // Cambia mute global
  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      // Aplica mute global a todos los sonidos
      howlsRef.current.forEach((howl) => howl.mute(next));
      return next;
    });
  }, []);

  // Cambio de escena
  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const cfg = getAudioConfig(weather, timeOfDay);

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
  }, [weather, timeOfDay, playSound, scheduleRandom]);

  return { playThunder, toggleMute, muted };
};
