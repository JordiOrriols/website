import { useEffect, useRef, useCallback, useState } from "react";
import { Howl } from "howler";
import { TimeOfDayType, WeatherType } from "@/pages/portfolio";

export type AmbientAudioKey =
  | "rain"
  | "thunderOne"
  | "thunderTwo"
  | "thunderThree"
  | "click"
  | "notification"
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
  notification: "/audio/notification-01.mp3",
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
  else if (weather === "snow") return { background: [] };
  else if (timeOfDay === "morning") return { background: ["morning"] };
  else if (timeOfDay === "night") return { background: ["night"] };
  return { background: [] };
};

export const useAmbientAudio = (
  weather: WeatherType,
  timeOfDay: TimeOfDayType
) => {
  const howlsRef = useRef<Map<AmbientAudioKey, Howl>>(new Map());
  const timersRef = useRef<number[]>([]);
  const lastConfigRef = useRef<AmbientConfig | null>(null);
  const [muted, setMuted] = useState(false);

  const FADE_DURATION = 1500; // ms

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
      {
        loop = false,
        volume = 1,
        fade = false,
      }: { loop?: boolean; volume?: number; fade?: boolean } = {}
    ) => {
      const sound = howlsRef.current.get(key) ?? loadSound(key);
      sound.loop(loop);
      const startVol = muted ? 0 : fade ? 0 : volume;
      sound.volume(startVol);
      const id = sound.play();
      if (fade) {
        sound.fade(0, muted ? 0 : volume, FADE_DURATION, id);
      }
      return id;
    },
    [loadSound, muted]
  );

  const playThunder = useCallback(() => {
    const key = ["thunderOne", "thunderTwo", "thunderThree"][
      Math.floor(Math.random() * 3)
    ] as AmbientAudioKey;
    playSound(key, { loop: false, volume: 0.4 });
  }, [playSound]);

  const playClick = useCallback(() => {
    playSound("click", { loop: false, volume: 1 });
  }, [playSound]);

  const playNotification = useCallback(() => {
    playSound("notification", { loop: false, volume: 1 });
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

    const sameBackground =
      lastCfg &&
      newCfg.background.length === lastCfg.background.length &&
      newCfg.background.every((key, i) => key === lastCfg.background[i]);

    if (sameBackground) return;

    lastConfigRef.current = newCfg;

    // --- FADE OUT de sonidos activos ---
    howlsRef.current.forEach((howl) => {
      // obtener ids de reproducción activos
      const ids: number[] = (howl["_sounds"] as any[])
        .map((s) => s._id)
        .filter((id) => howl.playing(id));
      ids.forEach((id) => {
        const currentVol = howl.volume(id);
        howl.fade(currentVol, 0, FADE_DURATION, id);
        const t = window.setTimeout(() => {
          try {
            howl.stop(id);
          } catch (e) {}
        }, FADE_DURATION);
        timersRef.current.push(t);
      });
    });

    // limpiar timers previos
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    // --- START nuevos sonidos con fade-in al mismo tiempo ---
    newCfg.background.forEach((key) => {
      playSound(key, { loop: true, volume: 0.6, fade: true });
    });

    scheduleRandom(newCfg.random);
  }, [weather, timeOfDay, playSound, scheduleRandom, muted]);

  return { playThunder, playClick, playNotification, toggleMute, muted };
};
