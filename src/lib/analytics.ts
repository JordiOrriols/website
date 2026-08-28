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

/**
 * Track section visibility in viewport
 */
export function trackSectionVisible(section: string): void {
  trackEvent("section_visible", {
    section,
  });
}

/**
 * Track block visibility in viewport with section context
 */
export function trackBlockVisible(section: string, block: string): void {
  trackEvent("block_visible", {
    section,
    block,
  });
}

/**
 * Track when localized content cards are displayed
 */
export function trackContentDisplayed(
  contentType: "note" | "side_project",
  slug: string,
  section: string
): void {
  trackEvent("content_displayed", {
    content_type: contentType,
    slug,
    section,
  });
}

/**
 * Track note interactions
 */
export function trackNoteOpened(slug: string): void {
  trackEvent("note_opened", {
    slug,
  });
}

/**
 * Track note link copy action
 */
export function trackNoteLinkCopied(slug: string): void {
  trackEvent("note_link_copied", {
    slug,
  });
}

/**
 * Track side project interactions
 */
export function trackSideProjectOpened(slug: string): void {
  trackEvent("side_project_opened", {
    slug,
  });
}

/**
 * Track external side project link clicks
 */
export function trackSideProjectLinkClicked(slug: string, url: string): void {
  trackEvent("side_project_link_clicked", {
    slug,
    url,
  });
}
