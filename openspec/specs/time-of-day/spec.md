# Time of Day Specification

## Purpose

Dynamic time-of-day system that determines the current period (morning, day, afternoon, night) based on real sunrise and sunset data, and adjusts the visual theme accordingly.

## Requirements

### Requirement: Automatic Time Detection

The system MUST calculate the current time of day using device time and sunrise/sunset data from the weather API response.

#### Scenario: Time period determination

- GIVEN the weather API has returned sunrise and sunset times
- WHEN the application initializes
- THEN the system determines the time of day as follows:
  - Morning: from (sunrise − 1 hour) to (sunrise + 2 hours)
  - Day: from (sunrise + 2 hours) to (sunset − 2 hours)
  - Afternoon: from (sunset − 2 hours) to (sunset + 1 hour)
  - Night: all other hours
- AND the corresponding visual theme is applied immediately

### Requirement: Manual Time Override

The system SHALL allow desktop users to manually select a time of day via a dropdown selector.

#### Scenario: User selects time on desktop

- GIVEN the user is on a desktop viewport
- WHEN the user clicks the time-of-day selector dropdown in the top-right area
- THEN four options appear with emojis: 🌅 Morning, ☀️ Day, 🌆 Afternoon, 🌙 Night
- AND selecting an option immediately changes the visual theme
- AND ambient audio updates to match the selected time
- AND an analytics event `time_of_day_change` is tracked with `time_of_day` and `auto: false`

#### Scenario: Time selector hidden on mobile

- GIVEN the user is on a mobile viewport
- WHEN the page is displayed
- THEN the time-of-day selector dropdown is not visible

#### Scenario: Time selector disabled during locked seasons

- GIVEN the current season is Halloween or New Year
- WHEN the user views the time-of-day selector
- THEN the dropdown is disabled and non-interactive

### Requirement: Time Visual Rendering

The system MUST render distinct visual themes for each time period.

#### Scenario: Morning theme

- GIVEN the time of day is "morning"
- WHEN the scene renders
- THEN the sky displays a light blue to orange gradient
- AND the sun is visible in a low position
- AND morning ambient audio plays

#### Scenario: Day theme

- GIVEN the time of day is "day"
- WHEN the scene renders
- THEN the sky displays a bright blue gradient
- AND the sun is centered and bright
- AND no ambient music plays

#### Scenario: Afternoon theme

- GIVEN the time of day is "afternoon"
- WHEN the scene renders
- THEN the sky displays a golden-orange gradient
- AND the sun is low on the horizon with warm lighting

#### Scenario: Night theme

- GIVEN the time of day is "night"
- WHEN the scene renders
- THEN the sky displays a deep blue/purple gradient
- AND the moon is visible and prominent
- AND stars are displayed (150 on clear weather, 50 on cloudy)
- AND night ambient audio plays
