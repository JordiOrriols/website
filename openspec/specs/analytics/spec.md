# Analytics Specification

## Purpose

Privacy-focused analytics system using Umami to track user interactions without cookies or personal data. Distinguishes between automatic (system-detected) and manual (user-initiated) events.

## Requirements

### Requirement: Event Tracking

The system MUST track user interactions by sending events to Umami via the global `window.umami.track()` function.

#### Scenario: Weather change event

- GIVEN the weather changes (auto-detected or user-selected)
- WHEN the change occurs
- THEN a `weather_change` event is tracked with properties `mode` (weather type) and `auto` (boolean)

#### Scenario: Time of day change event

- GIVEN the time of day changes
- WHEN the change occurs
- THEN a `time_of_day_change` event is tracked with properties `time_of_day` and `auto` (boolean)

#### Scenario: Season change event

- GIVEN the season changes
- WHEN the change occurs
- THEN a `season_change` event is tracked with properties `season` and `auto` (boolean)

#### Scenario: Stat click event

- GIVEN the user clicks a stat card (projects, companies, experience, years)
- WHEN the click occurs
- THEN a `stat_click` event is tracked with property `stat_type`

#### Scenario: Modal action event

- GIVEN a modal opens or closes
- WHEN the action occurs
- THEN a `modal_action` event is tracked with properties `action` ("open" or "close") and `modal_type`

#### Scenario: Plane toggle event

- GIVEN the user enables or disables plane mode
- WHEN the toggle occurs
- THEN a `plane_toggle` event is tracked with property `enabled` (boolean)

#### Scenario: Audio toggle event

- GIVEN the user mutes or unmutes audio
- WHEN the toggle occurs
- THEN an `audio_toggle` event is tracked with property `muted` (boolean)

#### Scenario: Language change event

- GIVEN the user changes the language
- WHEN the selection occurs
- THEN a `language_change` event is tracked with property `language` (en/es/ca)

#### Scenario: Avatar click event

- GIVEN the user clicks the avatar
- WHEN the click occurs
- THEN an `avatar_click` event is tracked with property `action`

#### Scenario: Special events toggle

- GIVEN the user toggles the special events panel
- WHEN the toggle occurs
- THEN a `special_events_toggle` event is tracked with property `enabled` (boolean)

#### Scenario: Error event

- GIVEN the application catches an error
- WHEN the error is handled
- THEN an `error` event is tracked with properties `error` (message) and `context` (optional)

### Requirement: Auto vs Manual Distinction

The system MUST distinguish between automatically detected changes and user-initiated changes.

#### Scenario: Automatic detection flagged

- GIVEN weather, time, or season is determined by automatic detection
- WHEN the corresponding event is tracked
- THEN the `auto` property is set to `true`

#### Scenario: Manual selection flagged

- GIVEN the user manually selects weather, time, or season via dropdown
- WHEN the corresponding event is tracked
- THEN the `auto` property is set to `false`

### Requirement: Silent Failure

The system MUST NOT allow analytics errors to affect user experience.

#### Scenario: Umami unavailable

- GIVEN Umami tracking script is not loaded or `window.umami` is undefined
- WHEN an event is triggered
- THEN the error is logged to console
- AND the application continues functioning normally
- AND the user sees no error message

### Requirement: Non-Blocking

The system MUST NOT delay user interactions for analytics tracking.

#### Scenario: Event tracking does not block UI

- GIVEN any user interaction that triggers an analytics event
- WHEN the event fires
- THEN the UI responds immediately
- AND analytics tracking runs asynchronously without blocking the interaction
