# Analytics Implementation with Umami

This document describes the analytics setup using Umami for tracking user interactions across the portfolio website.

## Setup

The Umami tracking script is included in `index.html`:

```html
<script
  defer
  src="https://cloud.umami.is/script.js"
  data-website-id="b02f3e1f-36f9-43a7-a970-22862ca69948"
></script>
```

## Analytics Service

The analytics service is implemented in `src/lib/analytics.ts` and provides type-safe event tracking functions.

### Core Functions

- **`trackEvent(eventName, properties)`** - Generic event tracking
- **`trackWeatherChange(mode, auto)`** - Track weather mode changes
- **`trackTimeOfDayChange(timeOfDay, auto)`** - Track time of day changes
- **`trackSeasonChange(season, auto)`** - Track season changes
- **`trackStatClick(statType)`** - Track stat/section clicks
- **`trackModalAction(action, modalType)`** - Track modal open/close
- **`trackPlaneToggle(enabled)`** - Track plane mode enable/disable
- **`trackAudioToggle(muted)`** - Track audio mute/unmute
- **`trackLanguageChange(language)`** - Track language selection
- **`trackAvatarClick(action)`** - Track avatar interactions
- **`trackSpecialEventsToggle(enabled)`** - Track special events toggle
- **`trackPageView()`** - Track page views
- **`trackError(error, context)`** - Track errors

## Tracked Events

### User Interactions

| Event                   | Description                 | Properties             |
| ----------------------- | --------------------------- | ---------------------- |
| `weather_change`        | User changes weather mode   | `mode`, `auto`         |
| `time_of_day_change`    | User changes time of day    | `time_of_day`, `auto`  |
| `season_change`         | User changes season         | `season`, `auto`       |
| `stat_click`            | User clicks a stat card     | `stat_type`            |
| `modal_action`          | User opens/closes a modal   | `action`, `modal_type` |
| `plane_toggle`          | User toggles plane mode     | `enabled`              |
| `audio_toggle`          | User mutes/unmutes audio    | `muted`                |
| `language_change`       | User changes language       | `language`             |
| `avatar_click`          | User clicks avatar          | `action`               |
| `special_events_toggle` | User toggles special events | `enabled`              |
| `page_view`             | Page load                   | `timestamp`            |
| `error`                 | Error occurred              | `error`, `context`     |

### Implementation Examples

#### Weather Change

```typescript
// In portfolio.tsx
const handleWeatherModeChange = (value: string) => {
  const v = value as WeatherMode;
  setWeatherMode(v);
  const isAuto = v.includes("auto");
  // ... set weather state
  trackWeatherChange(v, isAuto);
};
```

#### Modal Actions

```typescript
// Opening a modal
const handleStatClick = (statType: SectionsType) => {
  setActiveModal(statType);
  playClick();
  trackStatClick(statType);
  trackModalAction("open", statType);
};

// Closing a modal
const closeModal = () => {
  if (activeModal) {
    trackModalAction("close", activeModal);
  }
  setActiveModal(null);
  playClick();
};
```

#### Language Change

```typescript
// In language-selector.tsx
const handleLanguageChange = (langCode: string) => {
  setLanguage(langCode);
  trackLanguageChange(langCode);
};
```

## Event Properties

### Weather Modes

- `clear`, `cloudy`, `rain`, `thunderstorm`, `snow`, `auto`

### Time of Day

- `morning`, `day`, `afternoon`, `night`, `auto`

### Seasons

- `easter`, `summer`, `halloween`, `christmas`, `newYear`, `none`, `auto`

### Stat Types

- `projects` - Projects gallery
- `companies` - Companies gallery
- `leading_years` - Leading experience
- `experience_years` - Work timeline
- `contact` - Contact form

### Languages

- `ca` - Catalan
- `es` - Spanish
- `en` - English

## Error Handling

The analytics service gracefully handles errors:

- If Umami is not loaded, events are silently ignored
- Tracking errors are logged to console but don't break the app
- All tracking functions are wrapped in try-catch blocks

## Testing

The analytics service is fully tested in `src/lib/analytics.test.ts`:

```bash
npm run test -- src/lib/analytics.test.ts
```

Tests cover:

- Event tracking with Umami available
- Graceful degradation when Umami is unavailable
- Error handling
- All specific tracking functions
- Property validation

## Accessing Analytics Data

Visit your Umami dashboard at https://cloud.umami.is to view:

- Real-time visitor data
- Event counts and trends
- User flow analysis
- Geographic distribution
- Device and browser breakdown

## Privacy

Umami is privacy-focused and GDPR compliant:

- No cookies used
- No personal data collected
- No cross-site tracking
- Open-source and self-hostable

## Future Enhancements

Potential improvements:

- Track form submission success/failure
- Track scroll depth
- Track time spent on each section
- A/B testing support
- Custom user segments
- Funnel analysis
