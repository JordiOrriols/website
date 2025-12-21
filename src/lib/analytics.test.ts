import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  trackEvent,
  trackWeatherChange,
  trackTimeOfDayChange,
  trackSeasonChange,
  trackStatClick,
  trackModalAction,
  trackPlaneToggle,
  trackAudioToggle,
  trackLanguageChange,
  trackAvatarClick,
  trackSpecialEventsToggle,
  trackPageView,
  trackError,
} from "./analytics";

describe("Analytics Service", () => {
  beforeEach(() => {
    // Reset window.umami before each test
    delete (window as Window & { umami?: unknown }).umami;
  });

  describe("trackEvent", () => {
    it("should track event when umami is available", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackEvent("test_event", { foo: "bar" });

      expect(mockTrack).toHaveBeenCalledWith("test_event", { foo: "bar" });
    });

    it("should not throw when umami is not available", () => {
      expect(() => {
        trackEvent("test_event");
      }).not.toThrow();
    });

    it("should handle errors gracefully", () => {
      const mockTrack = vi.fn(() => {
        throw new Error("Test error");
      });
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

      expect(() => {
        trackEvent("test_event");
      }).not.toThrow();

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe("trackWeatherChange", () => {
    it("should track weather change with correct properties", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackWeatherChange("sunny", true);

      expect(mockTrack).toHaveBeenCalledWith("weather_change", {
        mode: "sunny",
        auto: true,
      });
    });

    it("should default auto to false", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackWeatherChange("rainy");

      expect(mockTrack).toHaveBeenCalledWith("weather_change", {
        mode: "rainy",
        auto: false,
      });
    });
  });

  describe("trackTimeOfDayChange", () => {
    it("should track time of day change", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackTimeOfDayChange("morning", false);

      expect(mockTrack).toHaveBeenCalledWith("time_of_day_change", {
        time_of_day: "morning",
        auto: false,
      });
    });
  });

  describe("trackSeasonChange", () => {
    it("should track season change", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackSeasonChange("summer", true);

      expect(mockTrack).toHaveBeenCalledWith("season_change", {
        season: "summer",
        auto: true,
      });
    });
  });

  describe("trackStatClick", () => {
    it("should track stat click", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackStatClick("projects");

      expect(mockTrack).toHaveBeenCalledWith("stat_click", {
        stat_type: "projects",
      });
    });
  });

  describe("trackModalAction", () => {
    it("should track modal open", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackModalAction("open", "contact");

      expect(mockTrack).toHaveBeenCalledWith("modal_action", {
        action: "open",
        modal_type: "contact",
      });
    });

    it("should track modal close", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackModalAction("close", "projects");

      expect(mockTrack).toHaveBeenCalledWith("modal_action", {
        action: "close",
        modal_type: "projects",
      });
    });
  });

  describe("trackPlaneToggle", () => {
    it("should track plane toggle enabled", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackPlaneToggle(true);

      expect(mockTrack).toHaveBeenCalledWith("plane_toggle", {
        enabled: true,
      });
    });

    it("should track plane toggle disabled", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackPlaneToggle(false);

      expect(mockTrack).toHaveBeenCalledWith("plane_toggle", {
        enabled: false,
      });
    });
  });

  describe("trackAudioToggle", () => {
    it("should track audio mute", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackAudioToggle(true);

      expect(mockTrack).toHaveBeenCalledWith("audio_toggle", {
        muted: true,
      });
    });
  });

  describe("trackLanguageChange", () => {
    it("should track language change", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackLanguageChange("es");

      expect(mockTrack).toHaveBeenCalledWith("language_change", {
        language: "es",
      });
    });
  });

  describe("trackAvatarClick", () => {
    it("should track avatar click with action", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackAvatarClick("settings");

      expect(mockTrack).toHaveBeenCalledWith("avatar_click", {
        action: "settings",
      });
    });

    it("should default to click action", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackAvatarClick();

      expect(mockTrack).toHaveBeenCalledWith("avatar_click", {
        action: "click",
      });
    });
  });

  describe("trackSpecialEventsToggle", () => {
    it("should track special events toggle", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackSpecialEventsToggle(true);

      expect(mockTrack).toHaveBeenCalledWith("special_events_toggle", {
        enabled: true,
      });
    });
  });

  describe("trackPageView", () => {
    it("should track page view with timestamp", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackPageView();

      expect(mockTrack).toHaveBeenCalled();
      const callArgs = mockTrack.mock.calls[0] as [string, { timestamp: string }];
      expect(callArgs[0]).toBe("page_view");
      expect(callArgs[1]).toHaveProperty("timestamp");
    });
  });

  describe("trackError", () => {
    it("should track error with context", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackError("Test error", "test_context");

      expect(mockTrack).toHaveBeenCalledWith("error", {
        error: "Test error",
        context: "test_context",
      });
    });

    it("should default context to unknown", () => {
      const mockTrack = vi.fn();
      (window as Window & { umami?: { track: typeof mockTrack } }).umami = {
        track: mockTrack,
      };

      trackError("Test error");

      expect(mockTrack).toHaveBeenCalledWith("error", {
        error: "Test error",
        context: "unknown",
      });
    });
  });
});
