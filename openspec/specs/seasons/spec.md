# Seasons and Special Events Specification

## Purpose

Date-based seasonal system that detects special events (Easter, Summer, Halloween, Christmas, New Year) and applies unique visual scenes and behavioral constraints. Some seasons lock the weather and time-of-day selectors.

## Requirements

### Requirement: Automatic Season Detection

The system MUST determine the current season based on the device date.

#### Scenario: Season detection rules

- GIVEN the application initializes
- WHEN the current date is checked
- THEN the season is determined as follows:
  - Easter: month is April
  - Summer: month is June, July, or August
  - Halloween: month is October, day is 25–31
  - Christmas: month is November or December (except Dec 29–31)
  - New Year: (month is December, day ≥ 29) or (month is January, day ≤ 2)
  - None: all other dates
- AND the corresponding visual effects are applied immediately

### Requirement: Manual Season Override

The system SHALL allow desktop users to manually select a season via a dropdown selector that appears after toggling Special Events.

#### Scenario: Activating the season selector

- GIVEN the user is on a desktop viewport
- WHEN the user clicks the "Special Events" toggle button in the bottom-right area
- THEN the season selector dropdown becomes visible
- AND an analytics event `special_events_toggle` is tracked with `enabled: true`

#### Scenario: Selecting a season

- GIVEN the season selector is visible
- WHEN the user selects an option (🐣 Easter, ☀️ Summer, 👻 Halloween, 🎄 Christmas, 🎉 New Year, 💼 None)
- THEN the selected season is applied immediately
- AND an analytics event `season_change` is tracked

### Requirement: Halloween Scene

The system MUST render a special Halloween scene during the Halloween period.

#### Scenario: Halloween visual effects

- GIVEN the season is Halloween
- WHEN the scene renders
- THEN a dark purple gradient background is displayed
- AND a night sky with moon is always shown
- AND 6 animated ghosts float across the screen
- AND 50 stars are visible
- AND the city skyline appears in dark purple tones

### Requirement: New Year Scene

The system MUST render a special New Year scene during the New Year period.

#### Scenario: New Year visual effects

- GIVEN the season is New Year
- WHEN the scene renders
- THEN a night sky background is always displayed
- AND the moon is visible
- AND animated fireworks appear across the screen
- AND 50 stars are visible
- AND fireworks sound effects play

### Requirement: Dropdown Locking During Special Seasons

The system MUST disable weather and time-of-day selectors during Halloween and New Year seasons.

#### Scenario: Dropdowns locked during Halloween

- GIVEN the season is Halloween
- WHEN the user views the weather or time-of-day selectors
- THEN both dropdowns appear disabled and non-interactive
- AND the season selector remains accessible

#### Scenario: Dropdowns locked during New Year

- GIVEN the season is New Year
- WHEN the user views the weather or time-of-day selectors
- THEN both dropdowns appear disabled and non-interactive
- AND the season selector remains accessible

#### Scenario: Dropdowns unlocked for other seasons

- GIVEN the season is Easter, Summer, Christmas, or None
- WHEN the user views the weather or time-of-day selectors
- THEN both dropdowns remain fully functional
