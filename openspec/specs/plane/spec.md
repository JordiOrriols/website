# Plane Mode Specification

## Purpose

Interactive plane mode allowing desktop users to fly an animated plane across the screen using keyboard controls. Includes safety checks for dangerous weather/time conditions, a flight safety dialog with auto-correction, and physics-based movement.

## Requirements

### Requirement: Plane Activation

The system SHALL provide a plane toggle button for desktop users.

#### Scenario: Plane button visibility

- GIVEN the user is on a desktop viewport
- WHEN the user views the bottom-right area
- THEN a plane toggle button is visible

#### Scenario: Plane button hidden on mobile

- GIVEN the user is on a mobile viewport
- WHEN the page is displayed
- THEN the plane toggle button is not visible

### Requirement: Flight Safety Check

The system MUST check for dangerous conditions before activating plane mode.

#### Scenario: Safe conditions activation

- GIVEN the weather is "clear" or "cloudy" and the time is not "night"
- WHEN the user clicks the plane toggle button
- THEN the plane appears on screen immediately
- AND a notification sound plays
- AND the avatar changes to an "aviator" version
- AND an analytics event `plane_toggle` is tracked with `enabled: true`

#### Scenario: Dangerous weather conditions

- GIVEN the weather is "thunderstorm", "rain", or "snow"
- WHEN the user clicks the plane toggle button
- THEN a Flight Safety Dialog appears with title "Dangerous Flying Conditions!"
- AND the dialog explains the danger due to weather conditions
- AND two buttons are shown: "Change Conditions" and "Skip"

#### Scenario: Dangerous night conditions

- GIVEN the time is "night" (regardless of weather)
- WHEN the user clicks the plane toggle button
- THEN a Flight Safety Dialog appears with appropriate night-related warning
- AND two buttons are shown: "Change Conditions" and "Skip"

#### Scenario: Combined dangerous conditions

- GIVEN both dangerous weather and night conditions exist
- WHEN the user clicks the plane toggle button
- THEN the dialog message references both weather and time dangers

### Requirement: Flight Safety Dialog Actions

The system MUST handle the user's response to the safety dialog.

#### Scenario: User chooses "Change Conditions"

- GIVEN the Flight Safety Dialog is displayed
- WHEN the user clicks "Change Conditions"
- THEN the weather is automatically set to "clear"
- AND the time is automatically set to "morning"
- AND the plane activates
- AND a notification sound plays

#### Scenario: User chooses "Skip"

- GIVEN the Flight Safety Dialog is displayed
- WHEN the user clicks "Skip"
- THEN the dialog closes
- AND the plane is NOT activated
- AND current weather and time conditions are unchanged

### Requirement: Plane Controls

The system MUST allow keyboard control of the plane using arrow keys.

#### Scenario: Vertical movement

- GIVEN the plane is active
- WHEN the user presses the ↑ (ArrowUp) key
- THEN the plane moves upward with acceleration of 0.05 per frame
- AND the maximum upward velocity is capped at -2

#### Scenario: Downward movement

- GIVEN the plane is active
- WHEN the user presses the ↓ (ArrowDown) key
- THEN the plane moves downward with acceleration of 0.05 per frame
- AND the maximum downward velocity is capped at +2

#### Scenario: Horizontal auto-scroll

- GIVEN the plane is active
- WHEN time passes
- THEN the plane moves horizontally to the right at a constant speed of 0.3% per frame

#### Scenario: No response to other keys

- GIVEN the plane is active
- WHEN the user presses keys other than ↑ or ↓
- THEN the plane movement is not affected
- AND normal keyboard behavior (typing, etc.) continues

### Requirement: Plane Physics

The system MUST apply damping and boundary constraints to plane movement.

#### Scenario: Velocity damping

- GIVEN the plane is moving vertically
- WHEN no vertical key is pressed
- THEN the vertical velocity is multiplied by 0.95 each frame (gradual slowdown)

#### Scenario: Screen wrapping

- GIVEN the plane reaches the right edge (x > 115%)
- WHEN the plane crosses the boundary
- THEN the plane wraps to the left side (x = -15%)
- AND continues moving right

#### Scenario: Vertical boundaries

- GIVEN the plane is moving vertically
- WHEN the plane reaches the top or bottom boundary
- THEN the vertical position is clamped between 0% and 83%

#### Scenario: Rotation feedback

- GIVEN the plane is moving
- WHEN the vertical velocity changes
- THEN the plane rotates proportionally (velocity × 30 degrees)
- AND nose-up when moving upward, nose-down when moving downward

### Requirement: Plane Activation Notification

The system MUST display a control hint when the plane first activates.

#### Scenario: Control hint display

- GIVEN the plane has just been activated
- WHEN the plane appears on screen
- THEN a notification appears: "Plane activated! Use ↑ ↓ to control it"
- AND the notification automatically disappears after 6 seconds

### Requirement: Plane Deactivation

The system MUST allow the user to deactivate plane mode.

#### Scenario: User deactivates plane

- GIVEN the plane is active
- WHEN the user clicks the plane toggle button again
- THEN the plane disappears with an exit animation
- AND the avatar returns to its normal (non-aviator) version
- AND an analytics event `plane_toggle` is tracked with `enabled: false`
