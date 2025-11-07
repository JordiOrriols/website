import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";
import { clear } from "console";
import { title } from "process";

i18n
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      es: {
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

          selectSeason: "Seleccionar temporada",
          christmas: "Navidad",
          halloween: "Halloween",
          easter: "Pascua",
          valentine: "San Valentín",
          newYear: "Año Nuevo",

          // Plane System
          planeActivated: "¡Avión activado!",
          planeControls: "Usa ↑ ↓ para controlarlo",

          // Portfolio Page
          name: "Jordi Orriols",
          title: "Lider de Ingeniería Multimedia",
          projects: "Proyectos",
          companies: "Compañías",
          leading: "Liderando",
          experience: "Experiencia",
          years: "años",

          sendMessage: "Enviar mensaje",

          // Work Timeline
          workTimelineTitle: "Línea de Tiempo Laboral",
          workTimelineSubtitle:
            "Una visión detallada de mi trayectoria profesional",
          goalsAndAchievements: "Metas y Logros",
          technologies: "Tecnologías",

          // Contact Form
          contactTitle: "Envíame un mensaje",
          contactSubtitle:
            "Me encantaría saber de ti. Completa el formulario y te responderé pronto.",
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
      },
    },

    lng: "en",
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
