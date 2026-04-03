# Design: Add Scroll Cards Layout

## Technical Approach

Replace the current single centered card layout in `portfolio.tsx` with a `ScrollCards` container that renders multiple viewport-height sections with CSS scroll-snap. Each card section animates based on distance from the active card using Framer Motion spring animations.

AboutMe and Philosophy follow the established card pattern: `bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl`.

## Architecture Decisions

### Decision: ProfileCard Encapsulates Modal Logic

Extracting HomeSection + all modals + activeModal state into a self-contained ProfileCard:

- Portfolio.tsx is currently ~560 lines; this extracts ~100 lines of modal rendering
- ProfileCard owns its own `activeModal` state, `handleStatClick`, `closeModal`
- Receives only what it can't own: `season`, `showPlane`, `playClick`, `onClickAvatar`
- Makes the card fully self-contained for the ScrollCards array
- HomeSection remains untouched — ProfileCard wraps it

### Decision: ScrollCards as a Generic Container

Using a generic container accepting `{ key: string; component: ReactNode }[]`:

- New cards added by pushing to the array
- No coupling between container and content
- Follows existing declarative composition pattern

### Decision: Scroll-Snap Over Virtual Scroll

Using CSS `scroll-snap-type: y mandatory` with `scroll-snap-align: start`:

- Native browser behavior, performant
- Works with Framer Motion animations
- No library dependency needed
- Accessible with keyboard and touch

### Decision: Translation Keys Over Hardcoded Text

All text uses i18n translation keys:

- Project supports EN, ES, CA via i18next
- Follows existing `t("key")` pattern
- Arrays accessed via `returnObjects: true`

## Data Flow

```
ScrollCards (scroll container, manages activeIndex)
  ├── CardSection[0] → ProfileCard (owns activeModal state, wraps HomeSection + modals)
  │                      ├── HomeSection (avatar, name, stats — existing, unchanged)
  │                      └── AnimatePresence modals (contact, projects, companies, leading, experience)
  ├── CardSection[1] → AboutMe (uses useTranslation for all text)
  └── CardSection[2] → Philosophy (uses useTranslation for all text)
```

ProfileCard receives from portfolio.tsx:

- `season`, `showPlane` (for HomeSection/Avatar)
- `playClick` (for sound on stat/modal clicks)
- `onClickAvatar` (for special events toggle)

ProfileCard owns internally:

- `activeModal` state
- `handleStatClick()`, `closeModal()`
- `experienceTimeline` from translations
- All modal rendering (ContactForm, ProjectsGallery, Gallery, WorkTimeline)

CardSection animation states:

- Active card: opacity 1, scale 1, y 0
- Above card: opacity 0, scale 0.9, y -40
- Below card: opacity 0.4, scale 0.96, y 40

## File Changes

### New files:

- `src/components/sections/profile-card.tsx` — ProfileCard wrapping HomeSection + modals + modal state
- `src/components/sections/profile-card.test.tsx` — Tests for ProfileCard
- `src/components/scroll-cards.tsx` — Generic scroll-snapped card stack container
- `src/components/scroll-cards.test.tsx` — Tests for ScrollCards
- `src/components/sections/about-me.tsx` — About Me section
- `src/components/sections/about-me.test.tsx` — Tests for AboutMe
- `src/components/sections/philosophy.tsx` — Philosophy section
- `src/components/sections/philosophy.test.tsx` — Tests for Philosophy

### Modified files:

- `src/pages/portfolio.tsx` — Remove modal rendering, replace centered layout with ScrollCards
- `src/locales/types.ts` — Add new Translation keys
- `src/locales/en.ts` — English translations
- `src/locales/es.ts` — Spanish translations
- `src/locales/ca.ts` — Catalan translations
