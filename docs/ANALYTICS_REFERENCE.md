# Analytics Events Quick Reference

## All Tracked Events

| #   | Event Name              | Trigger                       | Properties             | Component        |
| --- | ----------------------- | ----------------------------- | ---------------------- | ---------------- |
| 1   | `weather_change`        | User changes weather dropdown | `mode`, `auto`         | Portfolio        |
| 2   | `time_of_day_change`    | User changes time dropdown    | `time_of_day`, `auto`  | Portfolio        |
| 3   | `season_change`         | User changes season dropdown  | `season`, `auto`       | Portfolio        |
| 4   | `stat_click`            | User clicks stat card         | `stat_type`            | Portfolio        |
| 5   | `modal_action`          | Modal opens/closes            | `action`, `modal_type` | Portfolio        |
| 6   | `plane_toggle`          | Plane mode toggled            | `enabled`              | Portfolio        |
| 7   | `audio_toggle`          | Audio muted/unmuted           | `muted`                | Portfolio        |
| 8   | `language_change`       | Language selected             | `language`             | LanguageSelector |
| 9   | `avatar_click`          | Avatar clicked                | `action`               | Avatar           |
| 10  | `special_events_toggle` | Special events toggled        | `enabled`              | Portfolio        |
| 11  | `page_view`             | Page loads                    | `timestamp`            | Auto + Manual    |
| 12  | `error`                 | Error occurs                  | `error`, `context`     | Error Handler    |

## Property Values

### Weather Modes (`mode`)

- `clear`
- `cloudy`
- `rain`
- `thunderstorm`
- `snow`
- `auto`

### Time of Day (`time_of_day`)

- `morning`
- `day`
- `afternoon`
- `night`
- `auto`

### Seasons (`season`)

- `easter`
- `summer`
- `halloween`
- `christmas`
- `newYear`
- `none`
- `auto`

### Stat Types (`stat_type`)

- `projects` - Projects gallery
- `companies` - Companies gallery
- `leading_years` - Leading experience section
- `experience_years` - Work timeline
- `contact` - Contact form

### Modal Types (`modal_type`)

Same as stat types (modals open from stats)

### Languages (`language`)

- `ca` - Catalan
- `es` - Spanish
- `en` - English

### Actions (`action`)

- `open` - For modal_action
- `close` - For modal_action
- `toggle_special_events` - For avatar_click
- Custom strings for other actions

### Boolean Flags

- `enabled` - true/false
- `muted` - true/false
- `auto` - true/false

## Usage in Code

```typescript
// Import what you need
import {
  trackWeatherChange,
  trackStatClick,
  trackModalAction,
  // ... other functions
} from "@/lib/analytics";

// Track weather change
trackWeatherChange("rain", false);

// Track stat click
trackStatClick("projects");

// Track modal open
trackModalAction("open", "projects");

// Track modal close
trackModalAction("close", "projects");

// Track plane toggle
trackPlaneToggle(true);

// Track audio toggle
trackAudioToggle(false);

// Track language change
trackLanguageChange("es");
```

## Event Flow Example

### User Journey: View Projects

```
1. User clicks "Projects" stat
   → trackStatClick('projects')
   → trackModalAction('open', 'projects')

2. User views projects in modal
   (browsing, no event)

3. User closes modal
   → trackModalAction('close', 'projects')
```

### User Journey: Change Settings

```
1. User changes weather to rain
   → trackWeatherChange('rain', false)

2. User changes time to night
   → trackTimeOfDayChange('night', false)

3. User toggles plane mode
   → trackPlaneToggle(true)

4. User mutes audio
   → trackAudioToggle(true)
```

## Testing Events

### In Development

```bash
# Run the analytics tests
npm run test -- src/lib/analytics.test.ts

# Check browser console
# Open DevTools → Console
# Look for: window.umami (should be defined)
```

### In Production

1. Open Umami dashboard
2. Navigate to your website
3. Click "Realtime" to see live events
4. Perform actions on the site
5. See events appear in dashboard

## Common Patterns

### Toggle Pattern

```typescript
const handleToggle = () => {
  const newState = !currentState;
  setState(newState);
  trackSomeToggle(newState);
};
```

### Dropdown Change Pattern

```typescript
const handleChange = (value: string) => {
  const isAuto = value.includes("auto");
  setState(value);
  trackSomeChange(value, isAuto);
};
```

### Modal Pattern

```typescript
const openModal = (type: string) => {
  setModal(type);
  trackStatClick(type);
  trackModalAction("open", type);
};

const closeModal = () => {
  if (activeModal) {
    trackModalAction("close", activeModal);
  }
  setModal(null);
};
```

## Error Handling

All tracking functions handle errors gracefully:

```typescript
// ✓ Safe - won't crash if Umami not loaded
trackWeatherChange("rain", false);

// ✓ Safe - won't crash on network errors
trackStatClick("projects");

// ✓ Safe - won't crash on invalid data
trackEvent("custom", { any: "data" });
```

## Dashboard Queries

### Most Popular Features

```
Events → Sort by Count
Look for highest stat_click events
```

### Weather Preferences

```
Events → Filter: weather_change
Group by: properties.mode
```

### Language Distribution

```
Events → Filter: language_change
Group by: properties.language
```

### Modal Engagement

```
Events → Filter: modal_action
Filter: properties.action = "open"
Group by: properties.modal_type
```

## Troubleshooting

### Events not appearing?

1. Check Umami script is loaded: `console.log(window.umami)`
2. Check browser console for errors
3. Verify website ID in index.html
4. Check network tab for requests to umami.is

### Wrong data being sent?

1. Check tracking function parameters
2. Verify property names match documentation
3. Check TypeScript types
4. Review analytics.ts implementation

### Performance concerns?

- All events are async (non-blocking)
- Script loads deferred
- No impact on user experience
- Failed events don't break app
