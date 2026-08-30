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
    enableReducedMotion: "Activar movimiento reducido",
    disableReducedMotion: "Desactivar movimiento reducido",
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
    title: "Engineering Lead - TypeScript, React Native, AWS",
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
    philosophyTitleShort: "Mis principios",
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
    notesIntro: "Notas cortas donde recojo decisiones, trade-offs y aprendizajes de delivery.",
    levelTwo: "Nivel 2",
    backToNotes: "Volver a notas",
    openNote: "Abrir nota",
    copyLink: "Copiar enlace",
    notesItems: [
      {
        title: "Entregar bajo presión",
        shortText:
          "Dividir objetivos con alta presión en entregas pequeñas protege la confianza y la calidad.",
        longText:
          "En programas con mucha presión, intentar cerrar todo en una única gran release suele ocultar riesgos y retrasar decisiones clave. Prefiero dividir en hitos pequeños con resultado medible, responsables claros y puntos de revisión definidos.\n\nEste enfoque mejora la conversación con producto, dirección y marketing, y reduce tensión innecesaria en el equipo. El progreso se vuelve visible antes, el feedback llega a tiempo y la confianza se construye con evidencia.",
        tags: ["delivery", "liderazgo"],
        slug: "shipping-under-pressure",
      },
      {
        title: "La simplicidad como decisión de producto",
        shortText:
          "Reducir complejidad de arquitectura suele mejorar más el time-to-value que añadir una feature extra.",
        longText:
          "La complejidad técnica no es gratis: frena al equipo, complica operaciones y aumenta la probabilidad de incidencias. Por eso trato la simplicidad como una decisión de producto, porque impacta directamente en velocidad, estabilidad y resultados de negocio.\n\nNo se trata de tener menos código, sino de tener sistemas claros que cualquier equipo pueda entender y evolucionar. Con trade-offs explícitos, priorizar valor hoy sin bloquear el mañana es mucho más realista.",
        tags: ["arquitectura", "producto"],
        slug: "simplicity-product-decision",
      },
      {
        title: "Autonomía de equipo con límites claros",
        shortText:
          "La autonomía funciona cuando existe alineación clara, contexto compartido y límites explícitos.",
        longText:
          "Autonomía sin contexto genera deriva; control sin confianza bloquea decisiones. Liderar bien significa definir objetivos, límites y principios para que el equipo pueda decidir sin esperar aprobación en cada paso.\n\nCuando las expectativas son claras, los equipos coordinan mejor, aprenden más rápido y asumen ownership real de los resultados. Ahí es donde velocidad de delivery y crecimiento de personas se refuerzan.",
        tags: ["equipos", "proceso"],
        slug: "team-autonomy-guardrails",
      },
    ],

    // Side Projects Section
    sideProjectsLabel: "Side Projects",
    sideProjectsTitle: "Cosas que construyo por curiosidad",
    sideProjectsIntro:
      "Experimentos pequeños para probar ideas de interacción, hipótesis de producto y límites técnicos.",
    backToProjects: "Volver a proyectos",
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
    analyticsConsentTitle: "Privacidad",
    analyticsConsentDescription:
      "Permite analitica anonima para entender que secciones ven y abren los visitantes.",
    analyticsConsentAccept: "Permitir",
    analyticsConsentDecline: "Rechazar",
    analyticsConsentManage: "Privacidad",

    // Fly With Me Page
    flyWithMeHeroEmoji: "✈️",
    flyWithMeHeroTitle: "¿Te vienes a volar?",
    flyWithMeHeroIntro: [
      "Te cuento un poco cómo suelo organizarlo, porque hay algunas cosas que está bien saber antes de buscar fecha.",
      "Vuelo desde el Aeroclub de Sabadell y normalmente alquilo una **Cessna 172**, una avioneta de cuatro plazas y uno de los modelos más utilizados del mundo. Aunque tenga cuatro plazas, por peso normalmente volamos **2 o 3 personas en total, contándome a mí**.",
    ],
    flyWithMeSections: [
      {
        emoji: "⚖️",
        title: "Lo primero: ¿cuántos somos y cuánto pesamos?",
        paragraphs: [
          "Antes de buscar avión necesitaré saber **quién viene y el peso aproximado de cada persona**.",
          "En una avioneta pequeña el peso y su distribución son importantes. Antes de cada vuelo calculo la carga y el centrado y, dependiendo de cuánto pesemos, también tenemos que ajustar cuánto combustible llevamos.",
          "Siempre intento reservar una **Cessna 172S**, que nos da algo más de margen, pero depende de la disponibilidad.",
          "Así que si quieres venir acompañado, primero dime quiénes seríamos y cuánto pesa aproximadamente cada uno y miro que la combinación sea viable.",
          "No solemos llevar equipaje: móvil, una botella pequeña de agua y poca cosa más.",
        ],
      },
      {
        emoji: "🗺️",
        title: "¿Dónde podemos ir?",
        paragraphs: [
          "La mayoría de vuelos que hago son de **1 h a 1 h 30 min**.",
          "Algunas de mis rutas favoritas son:",
          "🌊 **Costa:** salir de Sabadell hacia Mataró, llegar al mar y seguir la costa hacia Blanes/Lloret antes de volver.",
          "⛰️ **Montserrat / interior:** salir hacia Igualada, pasar por la zona de Montserrat y, dependiendo del tiempo y la duración del vuelo, continuar hacia Sau/Montseny.",
          "🏔️ **Pirineos:** también podemos hacer vuelos más largos hacia La Seu d'Urgell/Cerdanya. Estos ya suelen ser planes de unas dos horas de vuelo y especialmente en invierno son muy bonitos.",
          "La ruta que pensamos inicialmente **nunca está 100 % garantizada**. Ese mismo día miro meteorología, viento, nubes y espacios aéreos y decidimos qué tiene más sentido.",
          "Si el tiempo no acompaña, no pasa absolutamente nada: **cancelamos y buscamos otro día**.",
        ],
      },
      {
        emoji: "🕐",
        title: "¿Cuánto tiempo necesitamos?",
        paragraphs: [
          "Aunque volemos solamente una hora, ir a volar lleva bastante más tiempo.",
          "Antes tengo que preparar la documentación, meteorología y planificación del vuelo y después hacemos juntos la inspección exterior del avión y el briefing antes de subir.",
          "Si además nos tomamos algo tranquilamente en el Aeroclub antes o después, calcula aproximadamente **4 horas para todo el plan**.",
          "Si hacemos un vuelo más largo, aterrizamos en otro aeropuerto o aprovechamos para comer allí, podemos convertirlo fácilmente en un plan de medio día.",
        ],
      },
      {
        emoji: "🎧",
        title: "¿Cómo es volar en una avioneta?",
        paragraphs: [
          "Es bastante diferente a volar en un avión de línea.",
          "La avioneta hace más ruido, por eso volamos con auriculares y podemos hablar entre nosotros durante todo el vuelo. También notarás más los movimientos del aire.",
          "En general intentaremos volar **a primera hora o a última hora del día**, cuando el aire suele estar más tranquilo.",
          "Si te preocupan especialmente las turbulencias, dímelo. Las rutas de montaña pueden moverse más por el efecto del viento sobre el terreno, mientras que **la ruta de la costa suele ser especialmente tranquila**.",
          "Y si nunca has volado en avioneta y te da un poco de respeto, también podemos empezar simplemente con **un vuelo corto** y volver. No tenemos ninguna obligación de hacer una ruta determinada.",
          "Si durante el vuelo alguien no se encuentra bien, nos damos la vuelta y volvemos a Sabadell. Sin problema.",
          "Durante el briefing también os explicaré las cosas básicas del avión y, una vez en vuelo y cuando las condiciones lo permitan, os podré enseñar cómo funcionan los mandos.",
        ],
      },
      {
        emoji: "💰",
        title: "¿Cuánto cuesta?",
        paragraphs: [
          "Esto es importante: **no hago vuelos comerciales ni cobro por llevar a nadie a volar**. Vuelo como hobby y alquilo el avión al Aeroclub.",
          "Lo que hacemos es **compartir entre todos los ocupantes los costes del vuelo, incluyéndome a mí**. Todos pagamos exactamente la misma parte.",
          "El avión se factura por tiempo de motor y suele costar aproximadamente **300–350 € por hora de vuelo en total**.",
          "Por ejemplo, si somos tres, normalmente acabamos pagando alrededor de **100–120 € cada uno por una hora**, yo incluido. Si somos dos, evidentemente la parte de cada uno será mayor.",
          "Al terminar el vuelo hacemos números con el coste real y normalmente me hacéis un Bizum.",
        ],
      },
      {
        emoji: "📅",
        title: "¿Y cómo buscamos fecha?",
        paragraphs: [
          "Lo ideal es organizarlo con **unas dos semanas de antelación**, porque además de cuadrar nuestras agendas necesito encontrar una avioneta disponible.",
          "Elegir un día **no significa que el vuelo esté todavía confirmado**: es simplemente una propuesta de fecha.",
          "Una vez lo tengamos, miro disponibilidad de aviones y, si tenemos uno disponible, hago la reserva y te confirmo el vuelo.",
          "Y a partir de ahí... ¡a esperar que la meteo nos acompañe! ✈️",
        ],
      },
    ],
    flyWithMeBookingLabel: "Reserva tu vuelo",
    flyWithMeFindDateButton: "Buscar fecha",
  },
};
