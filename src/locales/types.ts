import { ExperienceEntry } from "@/data/experience";

export interface Translation {
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

  // Portfolio Page
  name: string;
  title: string;
  projects: string;
  companies: string;
  leading: string;
  experience: string;
  years: string;

  sendMessage: string;

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
}

export interface Locale {
  translation: Translation;
}
