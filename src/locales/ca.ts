import { experienceTimelineCa } from "@/data/experience";
import type { Locale } from "./types";

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
    snow: "Neu",

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
    enablePlane: "Activar mode avió",
    disablePlane: "Desactivar mode avió",
    enableSound: "Activar so",
    disableSound: "Desactivar so",
    dangerousFlyingTitle: "Condicions de Vol Perilloses!",
    dangerousFlyingMessage:
      "És massa perillós volar amb {}. Vols establir automàticament millors condicions per volar?",
    dangerousFlyingMessageNight:
      "És massa perillós volar de nit. Vols establir automàticament millors condicions per volar?",
    dangerousFlyingMessageBoth:
      "És massa perillós volar de nit amb {}. Vols establir automàticament millors condicions per volar?",
    changeConditions: "Canviar Condicions",
    skip: "Ometre",

    // Portfolio Page
    name: "Jordi Orriols",
    title: "Líder d'Enginyeria Multimèdia",
    projects: "Projectes",
    companies: "Empreses",
    leading: "Liderant",
    experience: "Experiència",
    years: "anys",

    sendMessage: "Envia missatge",

    // Companies
    companiesTitle: "Empreses",
    companiesSubtitle: "Algunes de les empreses amb les quals he tingut el plaer de treballar",

    // Work Timeline
    workTimelineTitle: "Línia de Temps Laboral",
    workTimelineSubtitle: "Una visió detallada de la meva trajectòria professional",
    goalsAndAchievements: "Objectius i Assoliments",
    technologies: "Tecnologies",
    experienceTimeline: experienceTimelineCa,

    // Contact Form
    contactTitle: "Envia'm un missatge",
    contactSubtitle: "M'encantaria saber de tu. Omple el formulari i et respondré aviat.",
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

    // About Me Section
    aboutMeLabel: "Sobre mi",
    aboutMeTitle: "Construint experiències digitals que importen",
    aboutMeDescription1: "Soc un Multimedia Engineering Lead a Barcelona, apassionat per crear productes digitals innovadors que combinen tecnologia d'avantguarda amb un disseny acurat.",
    aboutMeDescription2: "Amb més de 12 anys d'experiència en la indústria, he liderat equips i projectes en diversos sectors, sempre enfocat a oferir experiències d'usuari excepcionals.",
    aboutMeLocation: "Barcelona, Espanya",
    aboutMeHighlights: [
      "Multimedia Engineering Lead",
      "Més de 12 anys d'experiència",
      "Lideratge d'equips i mentoria",
      "Desenvolupament full-stack",
      "Mentalitat orientada al producte",
    ],

    // Philosophy Section
    philosophyLabel: "Filosofia",
    philosophyTitle: "Principis que guien el meu treball",
    philosophyPrinciples: [
      { number: "01", title: "L'usuari primer", description: "Cada decisió comença amb l'usuari. La tecnologia ha de servir les persones, no al revés." },
      { number: "02", title: "Simplicitat", description: "Les millors solucions són les més simples. La complexitat és fàcil; la simplicitat requereix comprensió profunda." },
      { number: "03", title: "Artesania", description: "La qualitat no és negociable. Cada línia de codi, cada píxel, cada interacció importa." },
      { number: "04", title: "Aprenentatge continu", description: "La tecnologia evoluciona ràpid. Mantenir-se curiós i adaptable és clau per construir el que ve." },
      { number: "05", title: "Col·laboració", description: "Els grans productes els construeixen grans equips. La comunicació oberta i la propietat compartida generen resultats." },
    ],
  },
};
