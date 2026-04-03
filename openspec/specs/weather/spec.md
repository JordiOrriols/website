# Weather System Specification

## Purpose

Dynamic weather visualization system that fetches real weather data for Barcelona and renders animated weather scenes. Supports five weather types with automatic detection and manual override.

## Requirements

### Requirement: Automatic Weather Detection

The system MUST fetch current weather conditions from the Open-Meteo API for Barcelona (41.3851°N, 2.1734°E) on page load.

#### Scenario: Successful weather fetch

- GIVEN the application is loading
- WHEN the Open-Meteo API responds successfully
- THEN the current weather code is mapped to one of five weather types:
  - WMO codes 0–1 → Clear
  - WMO codes 2–3, 45, 48 → Cloudy
  - WMO codes 51–67, 80–82 → Rain
  - WMO codes 71, 73, 75 → Snow
  - WMO codes 95–96, 99 → Thunderstorm
- AND the corresponding weather scene is rendered immediately

#### Scenario: API failure fallback

- GIVEN the application is loading
- WHEN the Open-Meteo API is unreachable or returns an error
- THEN the system MUST default to "clear" weather
- AND the application continues loading normally without user-visible errors

### Requirement: Loading State

The system MUST display a loading screen while fetching weather data.

#### Scenario: Weather loading indicator

- GIVEN the application has started
- WHEN weather data has not yet been received
- THEN a loading screen is displayed with a spinner and text "Loading Barcelona weather..."
- AND the loading screen disappears once weather data is resolved

### Requirement: Manual Weather Override

The system SHALL allow desktop users to manually select a weather type via a dropdown selector.

#### Scenario: User selects weather on desktop

- GIVEN the user is on a desktop viewport
- WHEN the user clicks the weather selector dropdown in the top-right corner
- THEN five options appear with emojis: ☀️ Clear, ☁️ Cloudy, 🌧️ Rain, ⚡ Thunderstorm, ❄️ Snow
- AND selecting an option immediately changes the weather scene
- AND an analytics event `weather_change` is tracked with `mode` and `auto: false`

#### Scenario: Weather selector hidden on mobile

- GIVEN the user is on a mobile viewport
- WHEN the page is displayed
- THEN the weather selector dropdown is not visible

#### Scenario: Weather selector disabled during locked seasons

- GIVEN the current season is Halloween or New Year
- WHEN the user views the weather selector
- THEN the dropdown is disabled and non-interactive

### Requirement: Weather Visual Rendering

The system MUST render distinct visual scenes for each weather type, varying by time of day.

#### Scenario: Clear weather rendering

- GIVEN the weather is set to "clear"
- WHEN the scene renders
- THEN the sky gradient, sun or moon, stars, and cloud count reflect the current time of day
- AND a maximum of 8 clouds are displayed

#### Scenario: Rain weather rendering

- GIVEN the weather is set to "rain"
- WHEN the scene renders
- THEN a gray sky gradient is displayed regardless of time of day
- AND animated rain particles fall across the screen
- AND a maximum of 50 clouds are displayed

#### Scenario: Thunderstorm rendering

- GIVEN the weather is set to "thunderstorm"
- WHEN the scene renders
- THEN a dark gray sky gradient is displayed
- AND heavy rain (500 particles) falls across the screen
- AND lightning flashes appear across the sky
- AND thunder sound effects play

#### Scenario: Snow rendering

- GIVEN the weather is set to "snow"
- WHEN the scene renders
- THEN a gray sky gradient is displayed
- AND animated snowfall particles are displayed
- AND a maximum of 50 clouds are displayed

#### Scenario: Cloudy rendering

- GIVEN the weather is set to "cloudy"
- WHEN the scene renders
- THEN increased cloud coverage is displayed
- AND no precipitation particles appear
