/**
 * Analytics service for Umami tracking
 * Provides type-safe event tracking for user interactions
 */

// Extend Window interface to include umami
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
    };
  }
}

/**
 * Event categories for better organization
 */
export type EventCategory =
  | "weather"
  | "time"
  | "season"
  | "navigation"
  | "interaction"
  | "audio"
  | "modal";

/**
 * Track a custom event with Umami
 * @param eventName - Name of the event to track
 * @param properties - Optional properties to attach to the event
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean>
): void {
  try {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track(eventName, properties);
    }
  } catch (error) {
    console.error("Failed to track event:", eventName, error);
  }
}

/**
 * Track weather mode changes
 */
export function trackWeatherChange(mode: string, auto: boolean = false): void {
  trackEvent("weather_change", {
    mode,
    auto,
  });
}

/**
 * Track time of day changes
 */
export function trackTimeOfDayChange(timeOfDay: string, auto: boolean = false): void {
  trackEvent("time_of_day_change", {
    time_of_day: timeOfDay,
    auto,
  });
}

/**
 * Track season changes
 */
export function trackSeasonChange(season: string, auto: boolean = false): void {
  trackEvent("season_change", {
    season,
    auto,
  });
}

/**
 * Track stat/section clicks
 */
export function trackStatClick(statType: string): void {
  trackEvent("stat_click", {
    stat_type: statType,
  });
}

/**
 * Track modal open/close
 */
export function trackModalAction(action: "open" | "close", modalType: string): void {
  trackEvent("modal_action", {
    action,
    modal_type: modalType,
  });
}

/**
 * Track plane mode toggle
 */
export function trackPlaneToggle(enabled: boolean): void {
  trackEvent("plane_toggle", {
    enabled,
  });
}

/**
 * Track audio mute toggle
 */
export function trackAudioToggle(muted: boolean): void {
  trackEvent("audio_toggle", {
    muted,
  });
}

/**
 * Track language changes
 */
export function trackLanguageChange(language: string): void {
  trackEvent("language_change", {
    language,
  });
}

/**
 * Track avatar clicks
 */
export function trackAvatarClick(action?: string): void {
  trackEvent("avatar_click", {
    action: action ?? "click",
  });
}

/**
 * Track special events toggle
 */
export function trackSpecialEventsToggle(enabled: boolean): void {
  trackEvent("special_events_toggle", {
    enabled,
  });
}

/**
 * Track page load/initialization
 */
export function trackPageView(): void {
  // Umami automatically tracks page views, but we can add custom properties
  trackEvent("page_view", {
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track errors
 */
export function trackError(error: string, context?: string): void {
  trackEvent("error", {
    error,
    context: context ?? "unknown",
  });
}
