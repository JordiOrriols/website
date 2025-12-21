# Analytics Event Flow Diagram

## User Interaction → Analytics Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                       USER INTERACTIONS                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  COMPONENT HANDLERS                                              │
│                                                                  │
│  • handleWeatherModeChange()                                     │
│  • handleTimeOfDayModeChange()                                   │
│  • handleSeasonModeChange()                                      │
│  • handleStatClick()                                             │
│  • closeModal()                                                  │
│  • handleShowPlane()                                             │
│  • toggleMute()                                                  │
│  • handleLanguageChange()                                        │
│  • handleOnClick() (Avatar)                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  ANALYTICS SERVICE (/src/lib/analytics.ts)                       │
│                                                                  │
│  • trackWeatherChange(mode, auto)                                │
│  • trackTimeOfDayChange(timeOfDay, auto)                         │
│  • trackSeasonChange(season, auto)                               │
│  • trackStatClick(statType)                                      │
│  • trackModalAction(action, modalType)                           │
│  • trackPlaneToggle(enabled)                                     │
│  • trackAudioToggle(muted)                                       │
│  • trackLanguageChange(language)                                 │
│  • trackAvatarClick(action)                                      │
│  • trackSpecialEventsToggle(enabled)                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  window.umami.track()                                            │
│                                                                  │
│  Generic tracking function that sends events to Umami            │
│  with event name and properties                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  UMAMI CLOUD (cloud.umami.is)                                    │
│                                                                  │
│  • Receives and stores events                                    │
│  • Processes analytics data                                      │
│  • Generates insights and reports                                │
│  • Respects privacy (no cookies, no PII)                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  ANALYTICS DASHBOARD                                             │
│                                                                  │
│  View insights:                                                  │
│  • Real-time visitors                                            │
│  • Event counts and trends                                       │
│  • User flows                                                    │
│  • Geographic distribution                                       │
│  • Device/browser breakdown                                      │
└─────────────────────────────────────────────────────────────────┘
```

## Event Examples by Component

### Portfolio Page (`portfolio.tsx`)

```typescript
User clicks weather dropdown
  ↓
handleWeatherModeChange("rain")
  ↓
trackWeatherChange("rain", false)
  ↓
window.umami.track("weather_change", { mode: "rain", auto: false })
```

### Language Selector (`language-selector.tsx`)

```typescript
User clicks language button
  ↓
handleLanguageChange("es")
  ↓
trackLanguageChange("es")
  ↓
window.umami.track("language_change", { language: "es" })
```

### Avatar Component (`avatar.tsx`)

```typescript
User clicks avatar
  ↓
handleOnClick()
  ↓
trackAvatarClick("toggle_special_events")
  ↓
window.umami.track("avatar_click", { action: "toggle_special_events" })
```

## Error Handling Flow

```
Component Handler
  ↓
Track Function (try/catch)
  ↓
Is window.umami available?
  ├─ YES → Send event to Umami
  │          ↓
  │        Event tracked successfully
  │
  └─ NO → Silent fail
           ↓
         Continue app execution
         (No user impact)
```

## Event Property Structure

```typescript
// Weather Change Event
{
  event: "weather_change",
  properties: {
    mode: "rain" | "clear" | "cloudy" | "thunderstorm" | "snow" | "auto",
    auto: true | false
  }
}

// Modal Action Event
{
  event: "modal_action",
  properties: {
    action: "open" | "close",
    modal_type: "projects" | "companies" | "leading_years" |
                "experience_years" | "contact"
  }
}

// Language Change Event
{
  event: "language_change",
  properties: {
    language: "ca" | "es" | "en"
  }
}

// Plane Toggle Event
{
  event: "plane_toggle",
  properties: {
    enabled: true | false
  }
}
```

## Data Flow Architecture

```
┌─────────────┐
│   Browser   │
│  (Client)   │
└──────┬──────┘
       │ User Action
       ▼
┌─────────────┐
│  React App  │
│ Components  │
└──────┬──────┘
       │ Event Handler
       ▼
┌─────────────┐
│  Analytics  │
│   Service   │
└──────┬──────┘
       │ Track Function
       ▼
┌─────────────┐
│ window.     │
│ umami.track │
└──────┬──────┘
       │ HTTPS Request
       ▼
┌─────────────┐
│ Umami Cloud │
│   Servers   │
└──────┬──────┘
       │ Process & Store
       ▼
┌─────────────┐
│  Analytics  │
│  Database   │
└──────┬──────┘
       │ Query
       ▼
┌─────────────┐
│  Dashboard  │
│     UI      │
└─────────────┘
```

## Integration Points

### 1. Script Loading (index.html)

```html
<script
  defer
  src="https://cloud.umami.is/script.js"
  data-website-id="b02f3e1f-36f9-43a7-a970-22862ca69948"
></script>
```

### 2. Service Import (components)

```typescript
import { trackWeatherChange } from "@/lib/analytics";
```

### 3. Event Tracking (handlers)

```typescript
const handleChange = (value: string) => {
  // Update state
  setValue(value);

  // Track event
  trackWeatherChange(value, isAuto);
};
```

## Metrics Dashboard Structure

```
┌────────────────────────────────────────────────────────┐
│ UMAMI DASHBOARD                                         │
├────────────────────────────────────────────────────────┤
│                                                         │
│ Overview                                                │
│ ├─ Total Visitors                                       │
│ ├─ Page Views                                           │
│ ├─ Bounce Rate                                          │
│ └─ Average Time                                         │
│                                                         │
│ Events (Custom)                                         │
│ ├─ weather_change        ████████ 45 events            │
│ ├─ stat_click           ██████ 32 events               │
│ ├─ modal_action         █████ 28 events                │
│ ├─ language_change      ███ 15 events                  │
│ ├─ plane_toggle         ██ 8 events                    │
│ ├─ audio_toggle         ██ 7 events                    │
│ └─ [other events...]                                    │
│                                                         │
│ Geographic Distribution                                 │
│ ├─ Spain           ████████ 60%                        │
│ ├─ United States   ███ 20%                             │
│ ├─ United Kingdom  ██ 10%                              │
│ └─ Other           █ 10%                                │
│                                                         │
│ Devices                                                 │
│ ├─ Desktop  ██████ 55%                                  │
│ ├─ Mobile   ████ 35%                                    │
│ └─ Tablet   █ 10%                                       │
│                                                         │
└────────────────────────────────────────────────────────┘
```

## Privacy-First Design

```
Traditional Analytics          Umami Analytics
┌──────────────┐             ┌──────────────┐
│ Cookies      │ ✗           │ No Cookies   │ ✓
│ IP Tracking  │ ✗           │ IP Hashed    │ ✓
│ PII Storage  │ ✗           │ No PII       │ ✓
│ Cross-site   │ ✗           │ Single-site  │ ✓
│ Consent Req. │ ✗           │ No Consent   │ ✓
│ GDPR Comply  │ ✗           │ GDPR OK      │ ✓
└──────────────┘             └──────────────┘
```
