import { experienceTimelineEn } from "@/data/experience";
import { Locale } from "./types";

export const en: Locale = {
  translation: {
    // Weather System
    loadingWeather: "Loading Barcelona weather...",
    current: "Current",

    selectMoment: "Select moment",
    morning: "Morning",
    day: "Day",
    afternoon: "Afternoon",
    night: "Night",

    selectWeather: "Select weather",
    clear: "Clear",
    cloudy: "Cloudy",
    rain: "Rain",
    thunderstorm: "Thunderstorm",

    selectSeason: "Select season",
    christmas: "Christmas",
    halloween: "Halloween",
    summer: "Summer",
    easter: "Easter",
    newYear: "New Year",
    none: "None",

    // Plane System
    planeActivated: "Plane activated!",
    planeControls: "Use ↑ ↓ to control it",

    // Portfolio Page
    name: "Jordi Orriols",
    title: "Multimedia Engineering Lead",
    projects: "Projects",
    companies: "Companies",
    leading: "Leading",
    experience: "Experience",
    years: "years",

    sendMessage: "Send message",

    // Work Timeline
    workTimelineTitle: "Work Timeline",
    workTimelineSubtitle: "A detailed view of my professional journey",
    goalsAndAchievements: "Goals and Achievements",
    technologies: "Technologies",
    experienceTimeline: experienceTimelineEn,

    // Contact Form
    contactTitle: "Send me a message",
    contactSubtitle:
      "I’d love to hear from you. Fill out the form and I’ll get back to you soon.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    message: "Message",

    firstNamePlaceholder: "Your first name",
    lastNamePlaceholder: "Your last name",
    emailPlaceholder: "Your email",
    messagePlaceholder: "Write your message here...",

    cancel: "Cancel",
    send: "Send message",
    sending: "Sending...",
    messageSent: "Message sent!",
    messageResponse: "I’ll reply as soon as possible.",
  },
};
