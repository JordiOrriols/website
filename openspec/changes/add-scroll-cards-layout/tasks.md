# Tasks

## 1. ProfileCard Component (TDD)

- [x] 1.1 Create `src/components/sections/profile-card.test.tsx` with tests: renders HomeSection, manages activeModal state, opens modals on stat click, closes modals, renders all modal types (contact, projects, companies, leading_years, experience_years), plays click sound, passes season/showPlane to HomeSection
- [x] 1.2 Create `src/components/sections/profile-card.tsx` — extract from portfolio.tsx: HomeSection + activeModal state + handleStatClick + closeModal + playClick + all AnimatePresence modals (ContactForm, ProjectsGallery, Gallery, WorkTimeline) with ErrorBoundary wrappers. Props: `season`, `showPlane`, `playClick`, `onClickAvatar`
- [x] 1.3 Verify tests pass, fix lint errors

## 2. ScrollCards Component (TDD)

- [x] 2.1 Create `src/components/scroll-cards.test.tsx` with tests: renders all cards, sets active index on scroll, applies correct animations (visible/above/below), pointer-events disabled on non-active cards
- [x] 2.2 Create `src/components/scroll-cards.tsx` — typed component accepting `cards: { key: string; component: ReactNode }[]`, scroll-snap container, activeIndex tracking via scroll event, CardSection wrappers with Framer Motion animations
- [x] 2.3 Verify tests pass, fix lint errors

## 3. AboutMe Component (TDD)

- [x] 3.1 Add translation keys to `src/locales/types.ts`: `aboutMeLabel`, `aboutMeTitle`, `aboutMeDescription1`, `aboutMeDescription2`, `aboutMeLocation`, `aboutMeHighlights` (string array)
- [x] 3.2 Add English translations to `src/locales/en.ts`
- [x] 3.3 Add Spanish translations to `src/locales/es.ts`
- [x] 3.4 Add Catalan translations to `src/locales/ca.ts`
- [x] 3.5 Create `src/components/sections/about-me.test.tsx` with tests: renders section label, title, profile photo, bio paragraphs, location badge, highlights list, all from translation keys
- [x] 3.6 Create `src/components/sections/about-me.tsx` — typed component using `useTranslation()`, profile photo, bio text, MapPin location, CheckCircle2 highlights, matching card styling, responsive layout
- [x] 3.7 Verify tests pass, fix lint errors

## 4. Philosophy Component (TDD)

- [x] 4.1 Add translation keys to `src/locales/types.ts`: `philosophyLabel`, `philosophyTitle`, `philosophyPrinciples` (array of `{ number: string; title: string; description: string }`)
- [x] 4.2 Add English translations to `src/locales/en.ts`
- [x] 4.3 Add Spanish translations to `src/locales/es.ts`
- [x] 4.4 Add Catalan translations to `src/locales/ca.ts`
- [x] 4.5 Create `src/components/sections/philosophy.test.tsx` with tests: renders section label, title, all 5 principles with numbers/titles/descriptions, staggered animations
- [x] 4.6 Create `src/components/sections/philosophy.tsx` — typed component using `useTranslation()`, numbered principles, group-hover transitions, staggered Framer Motion animations, matching card styling
- [x] 4.7 Verify tests pass, fix lint errors

## 5. Portfolio Page Integration

- [x] 5.1 Import ScrollCards, ProfileCard, AboutMe, Philosophy in `src/pages/portfolio.tsx`
- [x] 5.2 Remove modal rendering code from portfolio.tsx (moved to ProfileCard)
- [x] 5.3 Remove activeModal state, handleStatClick, closeModal from portfolio.tsx (moved to ProfileCard)
- [x] 5.4 Define `scrollCards` array: profile (ProfileCard with season/showPlane/playClick/onClickAvatar), aboutme (AboutMe), philosophy (Philosophy)
- [x] 5.5 Replace current centered-card layout with `<ScrollCards cards={scrollCards} />`
- [x] 5.6 Update portfolio tests for new structure
- [x] 5.7 Verify all existing tests still pass
- [x] 5.8 Run lint and type-check, fix any issues

## 6. Delta Specs

- [x] 6.1 Create delta spec at `openspec/changes/add-scroll-cards-layout/specs/portfolio/spec.md`
