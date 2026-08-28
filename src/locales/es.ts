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
    enablePlane: "Activar modo avión",
    disablePlane: "Desactivar modo avión",
    enableSound: "Activar sonido",
    disableSound: "Desactivar sonido",
    dangerousFlyingTitle: "¡Condiciones de Vuelo Peligrosas!",
    dangerousFlyingMessage:
      "Es demasiado peligroso volar con {}. ¿Quieres establecer automáticamente mejores condiciones para volar?",
    dangerousFlyingMessageNight:
      "Es demasiado peligroso volar de noche. ¿Quieres establecer automáticamente mejores condiciones para volar?",
    dangerousFlyingMessageBoth:
      "Es demasiado peligroso volar de noche con {}. ¿Quieres establecer automáticamente mejores condiciones para volar?",
    changeConditions: "Cambiar Condiciones",
    skip: "Omitir",

    // Portfolio Page
    name: "Jordi Orriols",
    title: "Engineering Lead - TypeScript, React Native, NestJS, AWS",
    valueStatement:
      "Construyo productos digitales complejos sin convertir la tecnologia en complejidad innecesaria.",
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

    // About Me Section
    aboutMeLabel: "Sobre mí",
    aboutMeTitle: "Liderazgo de ingenieria orientado a impacto",
    aboutMeStatement:
      "Lidero equipos de producto e ingenieria con una prioridad: claridad en decisiones, calidad en delivery e impacto de negocio medible.",
    aboutMeDescription1:
      "Trabajo desde Barcelona entre TypeScript, React, React Native, NestJS y AWS. Mi foco es construir sistemas que los equipos entiendan, operen y evolucionen con confianza.",
    aboutMeDescription2:
      "Me importan los trade-offs que generan progreso real: entregas mas pequeñas, feedback rapido y resultados de producto que justifiquen cada decision tecnica.",
    aboutMeLocation: "Barcelona, España",
    aboutMeHighlights: [
      "Liderazgo mediante contexto, no autoridad",
      "Simplicidad sobre sofisticacion",
      "Impacto de producto sobre codigo perfecto",
      "Crecimiento del equipo como metrica central",
      "Sistemas mantenibles por otros",
    ],

    // Philosophy Section
    philosophyLabel: "Filosofía",
    philosophyTitle: "Principios de decision que guian mi trabajo",
    philosophyIntro:
      "Estos principios me ayudan a alinear direccion de producto, decisiones tecnicas y autonomia del equipo en contextos de alta presion.",
    philosophyPrinciples: [
      {
        number: "01",
        title: "La simplicidad es arquitectura",
        description:
          "Solo añado complejidad cuando resuelve un problema real. Quitar complejidad mas tarde siempre cuesta mas.",
      },
      {
        number: "02",
        title: "Producto antes que tecnologia",
        description:
          "Frameworks y migraciones son medios, no objetivos. La buena decision es la que mejora resultados de usuario y negocio.",
      },
      {
        number: "03",
        title: "Mantenible por el equipo",
        description:
          "Si una sola persona puede evolucionar un sistema, no esta terminado. El entendimiento compartido tambien es calidad.",
      },
      {
        number: "04",
        title: "Trade-offs explicitos",
        description:
          "Casi toda decision tiene coste. Hago explicitos beneficios, riesgos y puntos de revision antes de decidir.",
      },
      {
        number: "05",
        title: "Autonomia con alineacion",
        description:
          "Liderar es crear contexto para que el equipo decida bien sin depender de aprobaciones en cada paso.",
      },
    ],

    // Notes Section
    notesLabel: "Notas",
    notesTitle: "Pequeños escritos sobre liderazgo en ingeniería",
    notesIntro:
      "Notas cortas donde recojo decisiones, trade-offs y aprendizajes de delivery.",
    openNote: "Abrir nota",
    copyLink: "Copiar enlace",
    notesItems: [
      {
        title: "Entregar bajo presión",
        shortText:
          "Cómo dividir una hoja de ruta con mucha presión en releases medibles sin perder confianza.",
        tags: ["delivery", "liderazgo"],
        slug: "entregar-bajo-presion",
      },
      {
        title: "La simplicidad como decisión de producto",
        shortText:
          "Por qué reducir complejidad de arquitectura puede mejorar el time-to-value más que añadir funcionalidades.",
        tags: ["arquitectura", "producto"],
        slug: "simplicidad-decision-producto",
      },
      {
        title: "Autonomía de equipo con límites claros",
        shortText:
          "El equilibrio entre alineación y libertad para avanzar más rápido con menos sorpresas.",
        tags: ["equipos", "proceso"],
        slug: "autonomia-equipo-limites",
      },
    ],

    // Side Projects Section
    sideProjectsLabel: "Side Projects",
    sideProjectsTitle: "Cosas que construyo por curiosidad",
    sideProjectsIntro:
      "Experimentos pequeños para probar ideas de interacción, hipótesis de producto y límites técnicos.",
    openProject: "Abrir proyecto",
    projectLink: "Visitar proyecto",
    sideProjectsItems: [
      {
        title: "Watch Lab",
        shortDescription:
          "Conceptos interactivos de relojes centrados en movimiento, timing y claridad visual.",
        slug: "watch-lab",
        link: "https://jordiorriols.cat",
        images: ["/images/image.jpeg", "/images/image.jpeg"],
      },
      {
        title: "Booking Flow Playground",
        shortDescription:
          "Prototipos rápidos para validar hipótesis del funnel de reserva con impacto medible.",
        slug: "booking-flow-playground",
        link: "https://jordiorriols.cat",
        images: ["/images/image.jpeg", "/images/image.jpeg"],
      },
      {
        title: "Team Ops Dashboard",
        shortDescription:
          "Un dashboard ligero para visibilidad de delivery, incidencias y ownership entre equipos.",
        slug: "team-ops-dashboard",
        link: "https://jordiorriols.cat",
        images: ["/images/image.jpeg", "/images/image.jpeg"],
      },
    ],

    // Analytics Consent
    analyticsConsentTitle: "Preferencias de analitica",
    analyticsConsentDescription:
      "Permite analitica anonima para entender que secciones ven y abren los visitantes.",
    analyticsConsentAccept: "Permitir analitica",
    analyticsConsentDecline: "Rechazar analitica",
    analyticsConsentManage: "Privacidad",
  },
};
