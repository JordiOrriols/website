# Umami Analytics Integration Summary

## Overview
Successfully integrated Umami analytics for comprehensive user interaction tracking across the portfolio website.

## Files Created

### 1. `/src/lib/analytics.ts`
- Core analytics service with type-safe tracking functions
- Handles 12 different event types
- Graceful error handling when Umami is unavailable
- TypeScript interfaces for all tracked events

### 2. `/src/lib/analytics.test.ts`
- Comprehensive test coverage (20 tests)
- Tests all tracking functions
- Validates error handling
- Verifies graceful degradation

### 3. `/docs/ANALYTICS.md`
- Complete documentation of analytics implementation
- Usage examples for each tracking function
- Event properties reference
- Privacy information
- Testing guide

## Files Modified

### 1. `/index.html`
- Added Umami tracking script with website ID
- Script loads deferred for performance

### 2. `/src/pages/portfolio.tsx`
- Imported analytics tracking functions
- Added tracking to:
  - Weather mode changes (with auto detection flag)
  - Time of day changes (with auto detection flag)
  - Season changes (with auto detection flag)
  - Stat clicks
  - Modal open/close actions
  - Plane mode toggle
  - Audio mute/unmute
  - Special events toggle (via avatar click)

### 3. `/src/components/language-selector.tsx`
- Added language change tracking
- Tracks: `ca`, `es`, `en`

### 4. `/src/components/avatar.tsx`
- Added avatar click tracking with action context
- Tracks special events toggle action

## Events Being Tracked

### User Interactions (12 event types)
1. **weather_change** - Weather dropdown selection
   - Properties: `mode`, `auto`
   
2. **time_of_day_change** - Time of day dropdown selection
   - Properties: `time_of_day`, `auto`
   
3. **season_change** - Season dropdown selection
   - Properties: `season`, `auto`
   
4. **stat_click** - Stat card clicks
   - Properties: `stat_type` (`projects`, `companies`, `leading_years`, `experience_years`, `contact`)
   
5. **modal_action** - Modal open/close
   - Properties: `action` (`open`/`close`), `modal_type`
   
6. **plane_toggle** - Plane mode enable/disable
   - Properties: `enabled`
   
7. **audio_toggle** - Audio mute/unmute
   - Properties: `muted`
   
8. **language_change** - Language selection
   - Properties: `language` (`ca`, `es`, `en`)
   
9. **avatar_click** - Avatar interactions
   - Properties: `action`
   
10. **special_events_toggle** - Special events enable/disable
    - Properties: `enabled`
    
11. **page_view** - Page loads (automatic + custom)
    - Properties: `timestamp`
    
12. **error** - Error tracking
    - Properties: `error`, `context`

## Key Features

### Privacy-First
- No cookies
- No personal data collection
- GDPR compliant
- Self-hostable option available

### Developer-Friendly
- Type-safe TypeScript implementation
- Comprehensive test coverage
- Graceful degradation
- No blocking errors
- Well-documented API

### Analytics Insights Available
- Real-time visitor tracking
- Event frequency and trends
- User flow analysis
- Geographic distribution
- Device and browser breakdown
- Modal engagement metrics
- Feature usage patterns
- Language preferences

## Testing

All tests passing:
```bash
npm run test -- src/lib/analytics.test.ts
✓ 20 tests passed
```

Full test suite:
```bash
npm run test
✓ 270 tests passed | 1 skipped
```

TypeScript compilation:
```bash
npm run compile
✓ No errors
```

## Usage Examples

### Simple Event Tracking
```typescript
import { trackEvent } from '@/lib/analytics';

trackEvent('custom_event', { 
  property: 'value' 
});
```

### Weather Change Tracking
```typescript
import { trackWeatherChange } from '@/lib/analytics';

const handleWeatherChange = (mode: string) => {
  setWeather(mode);
  trackWeatherChange(mode, isAutoMode);
};
```

### Modal Tracking
```typescript
import { trackModalAction } from '@/lib/analytics';

const openModal = (type: string) => {
  setActiveModal(type);
  trackModalAction('open', type);
};

const closeModal = () => {
  trackModalAction('close', activeModal);
  setActiveModal(null);
};
```

## Next Steps

### Immediate
- Monitor dashboard for first events
- Verify all events are being tracked correctly
- Check event property values

### Future Enhancements
1. Form submission tracking (success/failure)
2. Scroll depth tracking
3. Time spent on sections
4. A/B testing support
5. Custom user segments
6. Funnel analysis for modal flows
7. Performance metrics
8. Error rate tracking

## Access

Visit Umami dashboard:
- URL: https://cloud.umami.is
- Website ID: `b02f3e1f-36f9-43a7-a970-22862ca69948`

## Benefits

1. **User Behavior Insights**
   - Understand which features users engage with most
   - Identify popular content sections
   - Track language preferences
   - Monitor weather/season selector usage

2. **Product Decisions**
   - Data-driven feature prioritization
   - Identify unused features
   - Optimize user flows
   - Improve engagement

3. **Performance Monitoring**
   - Track page loads
   - Monitor error rates
   - Identify bottlenecks

4. **Privacy Compliance**
   - No cookie consent required
   - GDPR compliant out of the box
   - Respects user privacy

## Success Metrics

The implementation successfully tracks:
- ✅ All user clicks (stats, buttons, toggles)
- ✅ All dropdown changes (weather, time, season)
- ✅ Modal interactions (open/close for each type)
- ✅ Language changes
- ✅ Avatar interactions
- ✅ Feature toggles (plane, audio, special events)
- ✅ Page views
- ✅ Errors (with context)

Total: 12 distinct event types tracking 30+ user actions
