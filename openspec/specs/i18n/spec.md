# Internationalization Specification

## Purpose

Multi-language support system enabling the application to be displayed in English, Spanish, or Catalan. Handles automatic browser language detection, manual selection, and translation fallback chains.

## Requirements

### Requirement: Browser Language Detection

The system MUST automatically detect the user's preferred language from browser settings on first visit.

#### Scenario: Supported language detected

- GIVEN a user visits the site for the first time
- WHEN the browser language matches a supported language (EN, ES, or CA)
- THEN the application loads in that language

#### Scenario: Unsupported language detected

- GIVEN a user visits the site for the first time
- WHEN the browser language does not match any supported language
- THEN the application defaults to English (EN)

### Requirement: Language Selection UI

The system MUST display a language selector that is always visible.

#### Scenario: Language selector appearance

- GIVEN the application is loaded
- WHEN the user views the top-right corner
- THEN a rounded pill with three buttons is visible: CA | ES | EN
- AND the current language is highlighted with a dark background and white text
- AND non-current languages are displayed with gray text and no highlight

### Requirement: Manual Language Switching

The system SHALL allow users to switch languages instantly without page reload.

#### Scenario: User changes language

- GIVEN the application is displayed in English
- WHEN the user clicks the "ES" button in the language selector
- THEN all translated text across the entire application updates instantly to Spanish
- AND the "ES" button becomes highlighted
- AND the language preference is persisted for future visits
- AND an analytics event `language_change` is tracked with `language: "es"`

### Requirement: Translation Coverage

The system MUST translate all user-facing text including UI labels, form placeholders, section titles, weather names, time labels, season names, modal content, and button text.

#### Scenario: Full translation scope

- GIVEN any supported language is selected
- WHEN the user navigates the application
- THEN all visible text is displayed in the selected language
- AND visual themes, colors, and functionality remain unchanged

### Requirement: Translation Fallback Chain

The system MUST provide a fallback chain for missing translations.

#### Scenario: Missing translation key

- GIVEN a translation key exists in English but is missing in the selected language
- WHEN the application attempts to display that text
- THEN the English translation is shown as fallback

#### Scenario: Missing key in all languages

- GIVEN a translation key is missing from all language files
- WHEN the application attempts to display that text
- THEN the raw key name is displayed
