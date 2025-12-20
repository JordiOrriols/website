import { renderHook, act } from "@testing-library/react";
import { useAmbientAudio } from "./ambient";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock Howler
vi.mock("howler", () => {
  const mockHowl = vi.fn(function (config: any) {
    this.src = config.src;
    this.loop_ = false;
    this.volume_ = config.volume || 0.6;
    this.muted_ = false;
    this._sounds = [];
    this.loop = vi.fn((val?: boolean) => {
      if (val !== undefined) this.loop_ = val;
      return this;
    });
    this.play = vi.fn(() => 1);
    this.stop = vi.fn();
    this.pause = vi.fn();
    this.volume = vi.fn((val?: number) => {
      if (val !== undefined) this.volume_ = val;
      return this.volume_;
    });
    this.mute = vi.fn((val?: boolean) => {
      if (val !== undefined) this.muted_ = val;
      return this;
    });
    this.fade = vi.fn();
    this.playing = vi.fn(() => true);
    return this;
  });

  return {
    Howl: mockHowl,
  };
});

describe("useAmbientAudio", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns expected callback functions", () => {
    const { result } = renderHook(() => useAmbientAudio("clear" as any, "day" as any));

    expect(result.current).toHaveProperty("playThunder");
    expect(result.current).toHaveProperty("playFireworks");
    expect(result.current).toHaveProperty("playClick");
    expect(result.current).toHaveProperty("playNotification");
    expect(result.current).toHaveProperty("toggleMute");
    expect(result.current).toHaveProperty("muted");
  });

  it("muted starts as false", () => {
    const { result } = renderHook(() => useAmbientAudio("clear" as any, "day" as any));

    expect(result.current.muted).toBe(false);
  });

  it("toggleMute changes muted state", () => {
    const { result } = renderHook(() => useAmbientAudio("clear" as any, "day" as any));

    expect(result.current.muted).toBe(false);

    act(() => {
      result.current.toggleMute();
    });

    expect(result.current.muted).toBe(true);

    act(() => {
      result.current.toggleMute();
    });

    expect(result.current.muted).toBe(false);
  });

  it("playThunder is callable without error", () => {
    const { result } = renderHook(() => useAmbientAudio("clear" as any, "day" as any));

    expect(() => {
      act(() => {
        result.current.playThunder();
      });
    }).not.toThrow();
  });

  it("playFireworks is callable without error", () => {
    const { result } = renderHook(() => useAmbientAudio("clear" as any, "day" as any));

    expect(() => {
      act(() => {
        result.current.playFireworks();
      });
    }).not.toThrow();
  });

  it("playClick is callable without error", () => {
    const { result } = renderHook(() => useAmbientAudio("clear" as any, "day" as any));

    expect(() => {
      act(() => {
        result.current.playClick();
      });
    }).not.toThrow();
  });

  it("playNotification is callable without error", () => {
    const { result } = renderHook(() => useAmbientAudio("clear" as any, "day" as any));

    expect(() => {
      act(() => {
        result.current.playNotification();
      });
    }).not.toThrow();
  });

  it("handles weather change from clear to rain", () => {
    const { rerender, result } = renderHook(
      ({ weather, timeOfDay }) => useAmbientAudio(weather as any, timeOfDay as any),
      {
        initialProps: { weather: "clear", timeOfDay: "day" },
      }
    );

    const initialMuted = result.current.muted;

    rerender({ weather: "rain", timeOfDay: "day" });

    // After weather change, muted state should still be the same
    expect(result.current.muted).toBe(initialMuted);
  });

  it("handles timeOfDay change from day to night", () => {
    const { rerender, result } = renderHook(
      ({ weather, timeOfDay }) => useAmbientAudio(weather as any, timeOfDay as any),
      {
        initialProps: { weather: "clear", timeOfDay: "day" },
      }
    );

    const initialMuted = result.current.muted;

    rerender({ weather: "clear", timeOfDay: "night" });

    expect(result.current.muted).toBe(initialMuted);
  });
});
