import { experienceTimelineCa } from "@/data/experience";
import { Locale } from "./types";

export const ca: Locale = {
  translation: {
    // Weather System
    loadingWeather: "Carregant el temps de Barcelona...",
    current: "Actual",

    selectMoment: "Selecciona el moment",
    morning: "Matí",
    day: "Dia",
    afternoon: "Tarda",
    night: "Nit",

    selectWeather: "Selecciona el temps",
    clear: "Clar",
    cloudy: "Ennuvolat",
    rain: "Pluja",
    thunderstorm: "Tempesta",

    selectSeason: "Selecciona la temporada",
    christmas: "Nadal",
    halloween: "Halloween",
    summer: "Estiu",
    easter: "Pasqua",
    newYear: "Any Nou",
    none: "Cap",

    // Plane System
    planeActivated: "Avió activat!",
    planeControls: "Fes servir ↑ ↓ per controlar-lo",

    // Portfolio Page
    name: "Jordi Orriols",
    title: "Líder d'Enginyeria Multimèdia",
    projects: "Projectes",
    companies: "Empreses",
    leading: "Liderant",
    experience: "Experiència",
    years: "anys",

    sendMessage: "Envia missatge",

    // Work Timeline
    workTimelineTitle: "Línia de Temps Laboral",
    workTimelineSubtitle:
      "Una visió detallada de la meva trajectòria professional",
    goalsAndAchievements: "Objectius i Assoliments",
    technologies: "Tecnologies",
    experienceTimeline: experienceTimelineCa,

    // Contact Form
    contactTitle: "Envia'm un missatge",
    contactSubtitle:
      "M'encantaria saber de tu. Omple el formulari i et respondré aviat.",
    firstName: "Nom",
    lastName: "Cognom",
    email: "Correu electrònic",
    message: "Missatge",

    firstNamePlaceholder: "El teu nom",
    lastNamePlaceholder: "El teu cognom",
    emailPlaceholder: "El teu correu electrònic",
    messagePlaceholder: "Escriu el teu missatge aquí...",

    cancel: "Cancel·lar",
    send: "Envia missatge",
    sending: "Enviant...",
    messageSent: "Missatge enviat!",
    messageResponse: "Et respondré tan aviat com sigui possible.",
  },
};
