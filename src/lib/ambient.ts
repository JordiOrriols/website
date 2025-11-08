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
    return { background: ["rain"] };
  if (timeOfDay === "morning") return { background: ["morning"] };
  if (timeOfDay === "night") return { background: ["night"] };
  return { background: ["morning"] };
};

export const useAmbientAudio = (
  weather: WeatherType,
  timeOfDay: TimeOfDayType
) => {
  const howlsRef = useRef<Map<AmbientAudioKey, Howl>>(new Map());
  const timersRef = useRef<number[]>([]);
  const lastConfigRef = useRef<AmbientConfig | null>(null);
  const [muted, setMuted] = useState(false);

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

  const playSound = useCallback(
    (
      key: AmbientAudioKey,
      { loop = false, volume = 1 }: { loop?: boolean; volume?: number } = {}
    ) => {
      const sound = howlsRef.current.get(key) ?? loadSound(key);
      sound.loop(loop);
      sound.volume(muted ? 0 : volume);
      if (!sound.playing()) sound.play();
    },
    [loadSound, muted]
  );

  const playThunder = useCallback(() => {
    const key = ["thunderOne", "thunderTwo", "thunderThree"][
      Math.floor(Math.random() * 3)
    ] as AmbientAudioKey;
    playSound(key, { loop: false, volume: 0.4 });
  }, [playSound]);

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

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      howlsRef.current.forEach((howl) => howl.mute(next));
      return next;
    });
  }, []);

  useEffect(() => {
    const newCfg = getAudioConfig(weather, timeOfDay);
    const lastCfg = lastConfigRef.current;

    // Verifica si realmente cambió la configuración
    const sameBackground =
      lastCfg &&
      newCfg.background.length === lastCfg.background.length &&
      newCfg.background.every((key, i) => key === lastCfg.background[i]);

    if (sameBackground) return; // No reiniciar audio si no cambia la escena

    lastConfigRef.current = newCfg;

    // Limpieza de timers anteriores
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    // Detiene todos los sonidos previos
    howlsRef.current.forEach((howl) => howl.stop());

    // Reproduce nuevos fondos
    newCfg.background.forEach((key) => {
      playSound(key, { loop: true, volume: 0.7 });
    });

    // Programa sonidos aleatorios
    scheduleRandom(newCfg.random);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [weather, timeOfDay, playSound, scheduleRandom]);

  return { playThunder, toggleMute, muted };
};
