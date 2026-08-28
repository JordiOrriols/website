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
    title: "Engineering Lead - TypeScript, React Native, NestJS, AWS",
    valueStatement:
      "Construeixo productes digitals complexos sense convertir la tecnologia en complexitat innecessaria.",
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
    aboutMeTitle: "Lideratge d'enginyeria orientat a impacte",
    aboutMeStatement:
      "Lidero equips de producte i enginyeria amb una prioritat: claredat en decisions, qualitat en delivery i impacte de negoci mesurable.",
    aboutMeDescription1:
      "Treballo des de Barcelona entre TypeScript, React, React Native, NestJS i AWS. El meu focus es construir sistemes que els equips entenguin, operin i evolucionin amb confiança.",
    aboutMeDescription2:
      "M'importen els trade-offs que generen progres real: entregues mes petites, feedback rapid i resultats de producte que justifiquin cada decisio tecnica.",
    aboutMeLocation: "Barcelona, Espanya",
    aboutMeHighlights: [
      "Lideratge mitjancant context, no autoritat",
      "Simplicitat sobre sofisticacio",
      "Impacte de producte sobre codi perfecte",
      "Creixement de l'equip com a metrica central",
      "Sistemes mantenibles per altres",
    ],

    // Philosophy Section
    philosophyLabel: "Filosofia",
    philosophyTitle: "Principis de decisio que guien el meu treball",
    philosophyIntro:
      "Aquests principis m'ajuden a alinear direccio de producte, decisions tecniques i autonomia de l'equip en contextos d'alta pressio.",
    philosophyPrinciples: [
      {
        number: "01",
        title: "La simplicitat es arquitectura",
        description:
          "Nomes afegeixo complexitat quan resol un problema real. Treure complexitat despres sempre costa mes.",
      },
      {
        number: "02",
        title: "Producte abans que tecnologia",
        description:
          "Frameworks i migracions son mitjans, no objectius. La bona decisio es la que millora resultats d'usuari i negoci.",
      },
      {
        number: "03",
        title: "Mantenible per l'equip",
        description:
          "Si nomes una persona pot evolucionar un sistema, no esta acabat. L'entesa compartida tambe es qualitat.",
      },
      {
        number: "04",
        title: "Trade-offs explicits",
        description:
          "Gairebe tota decisio te cost. Faig explicits beneficis, riscos i punts de revisio abans de decidir.",
      },
      {
        number: "05",
        title: "Autonomia amb alineacio",
        description:
          "Liderar es crear context perque l'equip decideixi be sense dependre d'aprovacions a cada pas.",
      },
    ],

    // Notes Section
    notesLabel: "Notes",
    notesTitle: "Petits escrits sobre lideratge en enginyeria",
    notesIntro:
      "Notes curtes on recullo decisions, trade-offs i aprenentatges de delivery.",
    openNote: "Obrir nota",
    copyLink: "Copiar enllac",
    notesItems: [
      {
        title: "Entregar sota pressio",
        shortText:
          "Com dividir un roadmap amb molta pressio en releases mesurables sense perdre confiança.",
        tags: ["delivery", "lideratge"],
        slug: "entregar-sota-pressio",
      },
      {
        title: "La simplicitat com a decisio de producte",
        shortText:
          "Per que reduir la complexitat de l'arquitectura pot millorar el time-to-value mes que afegir funcionalitats.",
        tags: ["arquitectura", "producte"],
        slug: "simplicitat-decisio-producte",
      },
      {
        title: "Autonomia d'equip amb limits clars",
        shortText:
          "L'equilibri entre alineacio i llibertat per avancar mes rapid amb menys sorpreses.",
        tags: ["equips", "proces"],
        slug: "autonomia-equip-limits",
      },
    ],

    // Side Projects Section
    sideProjectsLabel: "Side Projects",
    sideProjectsTitle: "Coses que construeixo per curiositat",
    sideProjectsIntro:
      "Experiments petits per provar idees d'interaccio, hipotesis de producte i limits tecnics.",
    openProject: "Obrir projecte",
    projectLink: "Visitar projecte",
    sideProjectsItems: [
      {
        title: "Watch Lab",
        shortDescription:
          "Conceptes interactius de rellotges centrats en moviment, timing i claredat visual.",
        slug: "watch-lab",
        link: "https://jordiorriols.cat",
        images: ["/images/image.jpeg", "/images/image.jpeg"],
      },
      {
        title: "Booking Flow Playground",
        shortDescription:
          "Prototips rapids per validar hipotesis del funnel de reserva amb impacte mesurable.",
        slug: "booking-flow-playground",
        link: "https://jordiorriols.cat",
        images: ["/images/image.jpeg", "/images/image.jpeg"],
      },
      {
        title: "Team Ops Dashboard",
        shortDescription:
          "Un dashboard lleuger per visibilitat de delivery, incidencies i ownership entre equips.",
        slug: "team-ops-dashboard",
        link: "https://jordiorriols.cat",
        images: ["/images/image.jpeg", "/images/image.jpeg"],
      },
    ],

    // Analytics Consent
    analyticsConsentTitle: "Preferencies d'analitica",
    analyticsConsentDescription:
      "Permet analitica anonima per entendre quines seccions veuen i obren els visitants.",
    analyticsConsentAccept: "Permetre analitica",
    analyticsConsentDecline: "Rebutjar analitica",
    analyticsConsentManage: "Privacitat",
  },
};
