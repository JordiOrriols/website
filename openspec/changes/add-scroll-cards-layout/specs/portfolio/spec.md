# Delta for Portfolio

## ADDED Requirements

### Requirement: Profile Card

The system MUST encapsulate the profile section and all its modals into a self-contained ProfileCard component.

#### Scenario: ProfileCard renders home section
- GIVEN the ProfileCard is displayed
- WHEN the card is active
- THEN it renders the avatar, profile name, title, stats, and language selector

#### Scenario: ProfileCard manages modals internally
- GIVEN the user clicks a stat card within ProfileCard
- WHEN "Companies" or "Experience" is clicked
- THEN the corresponding modal opens within the ProfileCard
- AND the home section animates to background (scale 0.95, opacity 0.3)
- AND a click sound plays
- AND analytics events are tracked

#### Scenario: ProfileCard closes modals
- GIVEN a modal is open within ProfileCard
- WHEN the user clicks the close button
- THEN the modal closes
- AND the home section animates back to full display

### Requirement: Scroll Cards Layout

The system MUST display portfolio content as a vertical scroll-snapped card stack where each card occupies one viewport height.

#### Scenario: Card stack rendering
- GIVEN the portfolio page is loaded
- WHEN the user views the page
- THEN multiple cards are displayed in a vertical scroll-snapped layout
- AND only one card is fully visible at a time

#### Scenario: Scroll transition animation
- GIVEN the user is viewing a card
- WHEN the user scrolls to the next card
- THEN the current card fades out and scales down (opacity 0, scale 0.9)
- AND the next card fades in and scales up (opacity 1, scale 1)
- AND the transition uses spring-based animation

#### Scenario: Non-active card interaction prevention
- GIVEN a card is not the currently active card
- WHEN the user attempts to interact with it
- THEN pointer events are disabled on non-active cards

### Requirement: About Me Section

The system MUST display an About Me section as a scroll card with profile information, bio, location, and professional highlights.

#### Scenario: About Me content display
- GIVEN the user scrolls to the About Me card
- WHEN the card becomes active
- THEN the section displays a section label, title, profile photo, two bio paragraphs, a location badge with map pin icon, and a highlights list with check icons

#### Scenario: About Me responsive layout
- GIVEN the user is on a desktop viewport
- WHEN the About Me card is displayed
- THEN the photo and text appear side by side
- GIVEN the user is on a mobile viewport
- WHEN the About Me card is displayed
- THEN the photo and text stack vertically

#### Scenario: About Me translations
- GIVEN any supported language is selected
- WHEN the About Me card is displayed
- THEN all text content is displayed in the selected language

### Requirement: Philosophy Section

The system MUST display a Philosophy section as a scroll card with numbered design principles.

#### Scenario: Philosophy content display
- GIVEN the user scrolls to the Philosophy card
- WHEN the card becomes active
- THEN the section displays a section label, title, and five numbered principles each with title and description

#### Scenario: Philosophy hover interaction
- GIVEN the user is on a desktop viewport
- WHEN the user hovers over a principle
- THEN the principle number and title transition to the accent color

#### Scenario: Philosophy staggered animation
- GIVEN the Philosophy card becomes visible
- WHEN the principles render
- THEN each principle animates in with a staggered delay (0.08s per item) sliding from the left

#### Scenario: Philosophy translations
- GIVEN any supported language is selected
- WHEN the Philosophy card is displayed
- THEN all principle titles and descriptions are displayed in the selected language
