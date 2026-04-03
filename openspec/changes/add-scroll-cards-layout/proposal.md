# Proposal: Add Scroll Cards Layout with About Me and Philosophy Sections

## Intent

Add a vertical scroll-snapped card stack layout to the portfolio page, replacing the current single-card centered layout. This introduces two new content sections (About Me and Philosophy) displayed as separate cards that users scroll through, alongside the existing profile card.

## Scope

In scope:

- New `ProfileCard` component extracting HomeSection + all its modals (companies gallery, experience timeline, projects gallery, contact form) + modal state management + click handling into a self-contained card
- New `ScrollCards` container component with scroll-snap vertical card stack behavior
- New `AboutMe` section component with profile photo, bio text, location, and highlights
- New `Philosophy` section component with numbered design principles
- Integration into the portfolio page, replacing the current single-card layout
- i18n support for all new text content (EN, ES, CA)
- Full TypeScript typing for all components
- Unit tests for all new components
- Accessibility: semantic HTML, aria attributes

Out of scope:

- Changes to weather, time-of-day, season, or audio systems
- Backend/API changes
- Mobile-specific scroll behavior optimizations beyond basic responsiveness

## Approach

1. Create `ProfileCard` component that encapsulates: HomeSection, activeModal state, handleStatClick, closeModal, playClick, and all modal rendering (ContactForm, ProjectsGallery, Gallery, WorkTimeline) with AnimatePresence and ErrorBoundary wrappers. It receives season, showPlane, playClick, onClickAvatar as props from portfolio.tsx. This extracts ~100 lines from portfolio.tsx into a self-contained card.
2. Create a generic `ScrollCards` component that accepts `{ key, component }[]` and renders a full-viewport scroll-snapped vertical stack with Framer Motion animations
3. Create `AboutMe` section using i18n keys, matching HomeSection card styling
4. Create `Philosophy` section with numbered principles, staggered animations, and i18n keys
5. Integrate in `portfolio.tsx` by wrapping ProfileCard → AboutMe → Philosophy in ScrollCards
6. Add translation keys to all locale files and the Translation interface
7. Write tests (TDD) for each new component
