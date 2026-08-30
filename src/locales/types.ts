import type { ExperienceEntry } from "@/data/experience";

interface Translation {
  // Weather System
  loadingWeather: string;
  current: string;

  selectMoment: string;
  morning: string;
  day: string;
  afternoon: string;
  night: string;

  selectWeather: string;
  clear: string;
  cloudy: string;
  rain: string;
  thunderstorm: string;
  snow: string;

  selectSeason: string;
  christmas: string;
  halloween: string;
  summer: string;
  easter: string;
  newYear: string;
  none: string;

  // Plane System
  planeActivated: string;
  planeControls: string;
  enablePlane: string;
  disablePlane: string;
  enableSound: string;
  disableSound: string;
  enableReducedMotion: string;
  disableReducedMotion: string;
  dangerousFlyingTitle: string;
  dangerousFlyingMessage: string;
  dangerousFlyingMessageNight: string;
  dangerousFlyingMessageBoth: string;
  changeConditions: string;
  skip: string;

  // Portfolio Page
  name: string;
  title: string;
  valueStatement: string;
  projects: string;
  companies: string;
  leading: string;
  experience: string;
  years: string;

  sendMessage: string;

  // Companies
  companiesTitle: string;
  companiesSubtitle: string;

  // Work Timeline
  workTimelineTitle: string;
  workTimelineSubtitle: string;
  goalsAndAchievements: string;
  technologies: string;

  // Contact Form
  contactTitle: string;
  contactSubtitle: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;

  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;

  cancel: string;
  send: string;
  sending: string;
  messageSent: string;
  messageResponse: string;

  experienceTimeline: ExperienceEntry[];

  // Profile Section
  profileLabel: string;

  // About Me Section
  aboutMeLabel: string;
  aboutMeTitle: string;
  aboutMeStatement: string;
  aboutMeDescription1: string;
  aboutMeDescription2: string;
  aboutMeLocation: string;
  aboutMeHighlights: string[];

  // Philosophy Section
  philosophyLabel: string;
  philosophyTitle: string;
  philosophyTitleShort: string;
  philosophyIntro: string;
  philosophyPrinciples: { number: string; title: string; description: string }[];

  // Notes Section
  notesLabel: string;
  notesTitle: string;
  notesIntro: string;
  levelTwo: string;
  backToNotes: string;
  openNote: string;
  copyLink: string;
  notesItems: {
    title: string;
    shortText: string;
    longText?: string;
    tags: string[];
    slug: string;
  }[];

  // Side Projects Section
  sideProjectsLabel: string;
  sideProjectsTitle: string;
  sideProjectsIntro: string;
  backToProjects: string;
  openProject: string;
  projectLink: string;
  sideProjectsItems: {
    title: string;
    shortDescription: string;
    slug: string;
    link: string;
    images: string[];
  }[];

  // Analytics Consent
  analyticsConsentTitle: string;
  analyticsConsentDescription: string;
  analyticsConsentAccept: string;
  analyticsConsentDecline: string;
  analyticsConsentManage: string;

  // Fly With Me Page
  flyWithMeHeroEmoji: string;
  flyWithMeHeroTitle: string;
  flyWithMeHeroShortLabel: string;
  flyWithMeHeroIntro: string[];
  flyWithMeSections: { emoji: string; title: string; shortLabel: string; paragraphs: string[] }[];
  flyWithMeBookingLabel: string;
  flyWithMeFindDateButton: string;
}

import type { ResourceLanguage } from "i18next";

export interface Locale extends ResourceLanguage {
  translation: Translation;
}
