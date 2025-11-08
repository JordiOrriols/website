import { WeatherType } from "@/pages/portfolio";
import { useEffect, useRef, useCallback } from "react";

type SourceHandle = {
  node: AudioNode;
  stop?: () => void;
};

type AmbientRef = {
  context: AudioContext;
  masterGain: GainNode;
  sources: SourceHandle[];
  timers: number[];
};

const resumeContextIfNeeded = async (ctx: AudioContext) => {
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      // ignore
    }
  }
};

export const useAmbientSound = (weatherCondition: WeatherType) => {
  const ref = useRef<AmbientRef | null>(null);

  const playThunder = useCallback(async () => {
    const amb = ref.current;
    if (!amb) return;

    const ctx = amb.context;
    await resumeContextIfNeeded(ctx);

    const createNoiseBuffer = (durationSec = 1) => {
      const sampleRate = ctx.sampleRate;
      const length = Math.ceil(durationSec * sampleRate);
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
      return buffer;
    };

    const now = ctx.currentTime;
    const buf = createNoiseBuffer(3 + Math.random() * 3);
    const src = ctx.createBufferSource();
    src.buffer = buf;

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 300 + Math.random() * 200;

    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 800 + Math.random() * 1000;
    bp.Q.value = 0.6;

    const sweep = ctx.createBiquadFilter();
    sweep.type = "lowpass";
    const startF = 1500 + Math.random() * 800;
    const endF = 200 + Math.random() * 200;
    sweep.frequency.setValueAtTime(startF, now);
    sweep.frequency.exponentialRampToValueAtTime(endF, now + (2 + Math.random() * 3));

    const gain = ctx.createGain();
    const peak = 0.6 + Math.random() * 0.6;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peak, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (2.5 + Math.random() * 4));

    const panner = ctx.createStereoPanner();
    panner.pan.value = Math.random() * 2 - 1;

    const delay1 = ctx.createDelay();
    delay1.delayTime.value = 0.12 + Math.random() * 0.2;
    const delay2 = ctx.createDelay();
    delay2.delayTime.value = 0.25 + Math.random() * 0.3;
    const fb1 = ctx.createGain();
    fb1.gain.value = 0.35 + Math.random() * 0.3;
    const fb2 = ctx.createGain();
    fb2.gain.value = 0.25 + Math.random() * 0.25;

    src.connect(lp);
    lp.connect(bp);
    bp.connect(sweep);
    sweep.connect(gain);
    gain.connect(panner);
    panner.connect(amb.masterGain);

    panner.connect(delay1);
    delay1.connect(fb1);
    fb1.connect(delay1);
    fb1.connect(amb.masterGain);

    panner.connect(delay2);
    delay2.connect(fb2);
    fb2.connect(delay2);
    fb2.connect(amb.masterGain);

    src.start(now);

    amb.sources.push({ node: src, stop: () => src.stop() });
    amb.sources.push({ node: delay1 });
    amb.sources.push({ node: delay2 });
  }, []);

  useEffect(() => {
    if (!ref.current) {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const masterGain = context.createGain();
      masterGain.gain.value = 0.6;
      masterGain.connect(context.destination);
      ref.current = { context, masterGain, sources: [], timers: [] };
    }

    const amb = ref.current;
    const ctx = amb.context;

    resumeContextIfNeeded(ctx);

    const clearAll = () => {
      amb.sources.forEach((s) => {
        try {
          if (s.stop) s.stop();
          s.node.disconnect();
        } catch {}
      });
      amb.sources = [];
      amb.timers.forEach(clearTimeout);
      amb.timers = [];
    };

    const createNoiseBuffer = (durationSec = 1) => {
      const sampleRate = ctx.sampleRate;
      const length = Math.ceil(durationSec * sampleRate);
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
      return buffer;
    };

    const playRainDrop = (when: number, options?: { pan?: number; volume?: number; duration?: number }) => {
      const { pan = Math.random() * 2 - 1, volume = 0.15, duration = 0.07 } = options || {};
      const buf = createNoiseBuffer(duration);
      const src = ctx.createBufferSource();
      src.buffer = buf;

      const dropGain = ctx.createGain();
      dropGain.gain.setValueAtTime(0.0001, when);
      dropGain.gain.exponentialRampToValueAtTime(volume, when + 0.005);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, when + duration);

      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 600 + Math.random() * 300;

      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 2500 + Math.random() * 2000;
      bp.Q.value = 1 + Math.random() * 3;

      const panner = ctx.createStereoPanner();
      panner.pan.value = pan;

      src.connect(hp);
      hp.connect(bp);
      bp.connect(dropGain);
      dropGain.connect(panner);
      panner.connect(amb.masterGain);

      src.start(when);
      // stop after a little longer to free resources
      const stopFn = () => {
        try {
          src.stop();
        } catch {}
        try {
          src.disconnect();
        } catch {}
        try {
          dropGain.disconnect();
        } catch {}
      };

      amb.sources.push({ node: src, stop: stopFn });
    };

    const playNoiseLayer = (opts: { filterFreq: number; q?: number; gain: number; pan?: number; lowpassAfter?: number | null }) => {
      const buffer = createNoiseBuffer(2);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = opts.filterFreq;
      filter.Q.value = opts.q ?? 0.7;

      const g = ctx.createGain();
      g.gain.value = opts.gain;

      const panner = ctx.createStereoPanner();
      panner.pan.value = opts.pan ?? Math.random() * 2 - 1;

      src.connect(filter);
      filter.connect(g);
      g.connect(panner);
      panner.connect(amb.masterGain);

      src.start();

      // optional post lowpass to simulate distance (long tail)
      if (opts.lowpassAfter) {
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = opts.lowpassAfter;
        // chain additional delay/reverb-ish feel
        const delay = ctx.createDelay();
        delay.delayTime.value = 0.08;
        const fb = ctx.createGain();
        fb.gain.value = 0.3;
        panner.connect(delay);
        delay.connect(lp);
        lp.connect(fb);
        fb.connect(delay);
        fb.connect(amb.masterGain);
        amb.sources.push({ node: delay });
      }

      amb.sources.push({
        node: src,
        stop: () => {
          try {
            src.stop();
          } catch {}
        },
      });
    };

    // play a thunder (rumble) with randomness
    const playThunder = (minDelayMs = 0) => {
      const now = ctx.currentTime + minDelayMs / 1000;
      // long noise buffer for rumble
      const buf = createNoiseBuffer(3 + Math.random() * 3); // 3-6s
      const src = ctx.createBufferSource();
      src.buffer = buf;

      // lowpass to shape to rumble
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 300 + Math.random() * 200; // center ~100-500Hz

      // bandpass for some higher harmonics that make it interesting
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 800 + Math.random() * 1000;
      bp.Q.value = 0.6;

      // dynamic filter sweep to simulate pitch bending of thunder
      const sweep = ctx.createBiquadFilter();
      sweep.type = "lowpass";
      const startF = 1500 + Math.random() * 800;
      const endF = 200 + Math.random() * 200;
      sweep.frequency.setValueAtTime(startF, now);
      sweep.frequency.exponentialRampToValueAtTime(
        endF,
        now + (2 + Math.random() * 3)
      );

      const gain = ctx.createGain();
      // stronger attack, long decay
      const peak = 0.6 + Math.random() * 0.6;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(peak, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + (2.5 + Math.random() * 4)
      );

      // a bit of stereo spread via panner
      const panner = ctx.createStereoPanner();
      panner.pan.value = Math.random() * 2 - 1;

      // simple reverb-ish using multiple delays
      const delay1 = ctx.createDelay();
      delay1.delayTime.value = 0.12 + Math.random() * 0.2;
      const delay2 = ctx.createDelay();
      delay2.delayTime.value = 0.25 + Math.random() * 0.3;
      const fb1 = ctx.createGain();
      fb1.gain.value = 0.35 + Math.random() * 0.3;
      const fb2 = ctx.createGain();
      fb2.gain.value = 0.25 + Math.random() * 0.25;

      // routing
      src.connect(lp);
      lp.connect(bp);
      bp.connect(sweep);
      sweep.connect(gain);
      gain.connect(panner);
      panner.connect(amb.masterGain);

      // reverb-ish taps
      panner.connect(delay1);
      delay1.connect(fb1);
      fb1.connect(delay1);
      fb1.connect(amb.masterGain);

      panner.connect(delay2);
      delay2.connect(fb2);
      fb2.connect(delay2);
      fb2.connect(amb.masterGain);

      src.start(now);

      // small second, distant rumble after main with random tiny delay
      const secondDelay = (500 + Math.random() * 1800) / 1000;
      const buf2 = createNoiseBuffer(1 + Math.random() * 2);
      const src2 = ctx.createBufferSource();
      src2.buffer = buf2;
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.0001, now + secondDelay);
      g2.gain.exponentialRampToValueAtTime(
        0.15 + Math.random() * 0.3,
        now + secondDelay + 0.02
      );
      g2.gain.exponentialRampToValueAtTime(
        0.0001,
        now + secondDelay + (1 + Math.random() * 2)
      );
      src2.connect(g2);
      g2.connect(amb.masterGain);
      src2.start(now + secondDelay);

      amb.sources.push({
        node: src,
        stop: () => {
          try {
            src.stop();
          } catch {}
        },
      });
      amb.sources.push({
        node: src2,
        stop: () => {
          try {
            src2.stop();
          } catch {}
        },
      });
      amb.sources.push({ node: delay1 });
      amb.sources.push({ node: delay2 });
    };

    // MAIN: clear previous and create new according to weather
    clearAll();

    if (weatherCondition === "rain" || weatherCondition === "thunderstorm") {
      amb.masterGain.gain.setValueAtTime(0.45, ctx.currentTime);

      playNoiseLayer({ filterFreq: 6000, q: 0.8, gain: 0.035, pan: -0.3 });
      playNoiseLayer({ filterFreq: 1800, q: 0.9, gain: 0.12, pan: 0.4, lowpassAfter: 800 });
      playNoiseLayer({ filterFreq: 400, q: 0.8, gain: 0.06, pan: 0.1 });

      const scheduleDrops = (durationSec = 20) => {
        const t0 = ctx.currentTime;
        const end = t0 + durationSec;
        let cursor = t0;
        while (cursor < end) {
          const spacing = 0.02 + Math.random() * 0.45;
          cursor += spacing;
          const vol = 0.03 + Math.random() * 0.18;
          const dur = 0.03 + Math.random() * 0.15;
          const msDelay = Math.max(0, (cursor - ctx.currentTime) * 1000);
          const tId = window.setTimeout(() => {
            playRainDrop(ctx.currentTime, {
              pan: Math.random() * 2 - 1,
              volume: vol,
              duration: dur,
            });
          }, msDelay);
          amb.timers.push(tId);
        }

        const rescheduleId = window.setTimeout(() => {
          if (ref.current && (weatherCondition === "rain" || weatherCondition === "thunderstorm")) {
            scheduleDrops(durationSec);
          }
        }, durationSec * 1000 - 200);
        amb.timers.push(rescheduleId);
      };

      scheduleDrops(12);

      if (weatherCondition === "thunderstorm") {
        const scheduleThunderCycle = () => {
          const nextMs = 2000 + Math.random() * 16000;
          const id = window.setTimeout(() => {
            const rumbles = 1 + Math.floor(Math.random() * 3);
            for (let i = 0; i < rumbles; i++) {
              const delay = Math.random() * 1200;
              const tId = window.setTimeout(() => playThunder(), delay);
              amb.timers.push(tId);
            }
            if (ref.current && weatherCondition === "thunderstorm") scheduleThunderCycle();
          }, nextMs);
          amb.timers.push(id);
        };
        scheduleThunderCycle();
      }
    } else if (weatherCondition === "clear") {
      amb.masterGain.gain.setValueAtTime(0.18, ctx.currentTime);

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = "sine";
      osc2.type = "sine";
      osc1.frequency.value = 220;
      osc2.frequency.value = 220 * 1.02;

      const padGain = ctx.createGain();
      padGain.gain.value = 0.04;

      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 1200;

      osc1.connect(lp);
      osc2.connect(lp);
      lp.connect(padGain);
      padGain.connect(amb.masterGain);

      osc1.start();
      osc2.start();

      amb.sources.push({ node: osc1, stop: () => osc1.stop() });
      amb.sources.push({ node: osc2, stop: () => osc2.stop() });
    } else {
      amb.masterGain.gain.setValueAtTime(0.0, ctx.currentTime);
    }

    return () => clearAll();
  }, [weatherCondition, playThunder]);

  return { playThunder };
};
