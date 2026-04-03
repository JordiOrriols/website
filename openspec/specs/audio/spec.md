# Ambient Audio Specification

## Purpose

Audio management system using Howler.js that plays background ambient sounds based on weather and time conditions, event-triggered sound effects, and provides a mute/unmute toggle for desktop users.

## Requirements

### Requirement: Background Ambient Audio

The system MUST play looping ambient audio based on current weather and time-of-day conditions.

#### Scenario: Rain ambient audio

- GIVEN the weather is "rain" or "thunderstorm"
- WHEN the weather scene is active
- THEN a rain ambient sound plays on loop at 0.6 volume

#### Scenario: Morning ambient audio

- GIVEN the weather is not rain/thunderstorm/snow and the time is "morning"
- WHEN the morning scene is active
- THEN a morning nature sound plays on loop at 0.6 volume

#### Scenario: Night ambient audio

- GIVEN the weather is not rain/thunderstorm/snow and the time is "night"
- WHEN the night scene is active
- THEN a night ambient sound plays on loop at 0.6 volume

#### Scenario: No ambient audio

- GIVEN the weather is clear/cloudy and the time is "day" or "afternoon"
- WHEN the scene is active
- THEN no background ambient audio plays

### Requirement: Audio Crossfade Transitions

The system MUST smoothly transition between ambient sounds when conditions change.

#### Scenario: Crossfade on condition change

- GIVEN ambient audio is currently playing
- WHEN weather or time-of-day conditions change
- THEN the current sound fades out over 1.5 seconds
- AND the new ambient sound fades in over 1.5 seconds

### Requirement: Event Sound Effects

The system MUST play one-shot sound effects for specific events.

#### Scenario: Thunder sound on thunderstorm

- GIVEN the weather is "thunderstorm"
- WHEN the thunderstorm scene renders
- THEN a random thunder sound variant (1 of 3) plays at 0.4 volume

#### Scenario: Fireworks sound on New Year

- GIVEN the season is New Year
- WHEN the New Year scene renders
- THEN a random fireworks sound variant (1 of 3) plays at 0.5 volume

#### Scenario: Click sound on interaction

- GIVEN the user clicks a button or opens a modal
- WHEN the click occurs
- THEN a click sound plays at 1.0 volume

#### Scenario: Notification sound on plane activation

- GIVEN the user activates plane mode or flight conditions are auto-corrected
- WHEN the event occurs
- THEN a notification sound plays at 1.0 volume

### Requirement: Mute/Unmute Toggle

The system SHALL provide a mute/unmute button for desktop users.

#### Scenario: Mute button appearance

- GIVEN the user is on a desktop viewport
- WHEN the user views the bottom-right area
- THEN a button is visible showing 🔊 (unmuted) or 🔇 (muted)

#### Scenario: Toggling mute

- GIVEN the user clicks the mute button
- WHEN the toggle occurs
- THEN all sounds (ambient and event) immediately mute or unmute
- AND the muted state persists even if weather or time conditions change
- AND an analytics event `audio_toggle` is tracked with `muted` flag

#### Scenario: Mute button hidden on mobile

- GIVEN the user is on a mobile viewport
- WHEN the page is displayed
- THEN the mute button is not visible

### Requirement: Lazy Loading

The system SHOULD load audio files on demand rather than preloading all sounds.

#### Scenario: Sound loaded on first use

- GIVEN a sound has not been played yet
- WHEN the sound is triggered for the first time
- THEN the audio file is loaded from `/public/audio/`
- AND the loaded sound is cached in memory for subsequent plays
