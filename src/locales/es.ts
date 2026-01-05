import { experienceTimelineEs } from "@/data/experience";
import type { Locale } from "./types";

export const es: Locale = {
  translation: {
    // Weather System
    loadingWeather: "Cargando clima de Barcelona...",
    current: "Actual",

    selectMoment: "Seleccionar momento",
    morning: "Mañana",
    day: "Dia",
    afternoon: "Tarde",
    night: "Noche",

    selectWeather: "Seleccionar clima",
    clear: "Despejado",
    cloudy: "Nublado",
    rain: "Lluvia",
    thunderstorm: "Tormenta",
    snow: "Nieve",

    selectSeason: "Seleccionar temporada",
    christmas: "Navidad",
    halloween: "Halloween",
    summer: "Verano",
    easter: "Pascua",
    newYear: "Año Nuevo",
    none: "Ninguna",

    // Plane System
    planeActivated: "¡Avión activado!",
    planeControls: "Usa ↑ ↓ para controlarlo",
    dangerousFlyingTitle: "¡Condiciones de Vuelo Peligrosas!",
    dangerousFlyingMessage:
      "Es demasiado peligroso volar con {}. ¿Quieres establecer automáticamente mejores condiciones para volar?",
    dangerousFlyingMessageNight:
      "Es demasiado peligroso volar de noche. ¿Quieres establecer automáticamente mejores condiciones para volar?",
    dangerousFlyingMessageBoth:
      "Es demasiado peligroso volar de noche con {}. ¿Quieres establecer automáticamente mejores condiciones para volar?",
    yes: "Sí",
    no: "No",

    // Portfolio Page
    name: "Jordi Orriols",
    title: "Lider de Ingeniería Multimedia",
    projects: "Proyectos",
    companies: "Compañías",
    leading: "Liderando",
    experience: "Experiencia",
    years: "años",

    sendMessage: "Enviar mensaje",

    // Companies
    companiesTitle: "Empresas",
    companiesSubtitle: "Algunas de las empresas con las que he tenido el placer de trabajar",

    // Work Timeline
    workTimelineTitle: "Línea de Tiempo Laboral",
    workTimelineSubtitle: "Una visión detallada de mi trayectoria profesional",
    goalsAndAchievements: "Metas y Logros",
    technologies: "Tecnologías",
    experienceTimeline: experienceTimelineEs,

    // Contact Form
    contactTitle: "Envíame un mensaje",
    contactSubtitle: "Me encantaría saber de ti. Completa el formulario y te responderé pronto.",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo electrónico",
    message: "Mensaje",

    firstNamePlaceholder: "Tu nombre",
    lastNamePlaceholder: "Tu apellido",
    emailPlaceholder: "Tu correo electrónico",
    messagePlaceholder: "Escribe tu mensaje aquí...",

    cancel: "Cancelar",
    send: "Enviar mensaje",
    sending: "Enviando...",
    messageSent: "¡Mensaje enviado!",
    messageResponse: "Te responderé lo antes posible.",
  },
};
