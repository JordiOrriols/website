# Portfolio Sections Specification

## Purpose

Main portfolio display system encompassing the home section with profile information, stat cards, and a modal system for viewing companies gallery, work experience timeline, and projects grid. Includes responsive layout and animated transitions.

## Requirements

### Requirement: Home Section Display

The system MUST display a home section with the user's profile information and interactive stat cards.

#### Scenario: Home section content

- GIVEN the application has loaded
- WHEN the home section is displayed
- THEN the following elements are visible:
  - A circular profile avatar (changes based on season and plane mode)
  - Profile name "Jordi Orriols"
  - Title "Multimedia Engineering Lead"
  - Four stat cards showing: Projects (15), Companies (12), Leading (3 years), Experience (12 years)

#### Scenario: Clickable stat cards

- GIVEN the stat cards are displayed
- WHEN the user clicks "Companies" or "Experience"
- THEN the corresponding modal opens
- AND a click sound plays
- AND analytics events `stat_click` and `modal_action` (action: "open") are tracked

#### Scenario: Disabled stat cards

- GIVEN the stat cards are displayed
- WHEN the user views "Projects" and "Leading" stat cards
- THEN those cards are not clickable and do not open modals

### Requirement: Home Section Animation on Modal

The system MUST animate the home section when a modal opens or closes.

#### Scenario: Home section dims on modal open

- GIVEN no modal is open
- WHEN a modal opens
- THEN the home section animates to: scale 0.95, opacity 0.3, slight 3D rotation on X-axis
- AND the home section moves to a lower z-index (behind the modal)
- AND the animation takes approximately 300ms with a spring easing

#### Scenario: Home section restores on modal close

- GIVEN a modal is open
- WHEN the modal closes
- THEN the home section animates back to: scale 1.0, opacity 1.0, no rotation
- AND the home section returns to its normal z-index

### Requirement: Companies Gallery Modal

The system MUST display a gallery of company logos in a modal.

#### Scenario: Companies gallery display

- GIVEN the user opens the companies modal
- WHEN the modal is displayed
- THEN company logos appear in a responsive grid layout
- AND each logo has a hover effect (increased shadow, slight scale)
- AND images are lazy-loaded

### Requirement: Experience Timeline Modal

The system MUST display a vertical work timeline in a modal.

#### Scenario: Experience timeline display

- GIVEN the user opens the experience modal
- WHEN the modal is displayed
- THEN a vertical timeline appears with staggered entry animations (0.08s delay per entry)
- AND each entry shows: period (date range), title, company, description, achievements (if present), and technology badges

#### Scenario: Experience timeline responsive layout

- GIVEN the experience modal is open on desktop
- WHEN the timeline renders
- THEN a timeline line and circular nodes appear on the left side
- AND entries appear to the right of the timeline

#### Scenario: Experience timeline mobile layout

- GIVEN the experience modal is open on mobile
- WHEN the timeline renders
- THEN the timeline line and nodes are hidden
- AND entries display in a compact stacked layout

### Requirement: Projects Gallery Modal

The system MUST display a grid of project previews in a modal.

#### Scenario: Projects gallery display

- GIVEN the user opens the projects modal
- WHEN the modal is displayed
- THEN projects appear in a responsive grid (3 columns on desktop, 1–2 on mobile)
- AND each project shows an image preview with title
- AND on hover, a dark overlay appears with the title and an external link icon

### Requirement: Modal System

The system MUST manage modal display with proper layering and transition animations.

#### Scenario: Modal opens

- GIVEN no modal is currently open
- WHEN the user triggers a modal (via stat click or other action)
- THEN the modal appears with a fade-in animation
- AND the background scene continues animating behind the modal
- AND a click sound plays

#### Scenario: Modal closes

- GIVEN a modal is open
- WHEN the user clicks the close button
- THEN the modal fades out
- AND the home section animates back to full display
- AND a click sound plays
- AND an analytics event `modal_action` with action "close" is tracked

### Requirement: Responsive Layout

The system MUST adapt the layout between desktop and mobile viewports.

#### Scenario: Desktop layout

- GIVEN a desktop viewport (md breakpoint and above)
- WHEN the page is displayed
- THEN all control dropdowns (weather, time, season) are visible in the top-right
- AND all control buttons (mute, special events, plane) are visible in the bottom-right
- AND the language selector is visible in the top-right

#### Scenario: Mobile layout

- GIVEN a mobile viewport (below md breakpoint)
- WHEN the page is displayed
- THEN the control dropdowns (weather, time, season) are hidden
- AND the control buttons (mute, special events, plane) are hidden
- AND the language selector remains visible
- AND modals appear near full-screen
