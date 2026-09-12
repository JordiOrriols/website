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
    enableReducedMotion: "Activar moviment reduit",
    disableReducedMotion: "Desactivar moviment reduit",
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
    title: "Engineering Lead - TypeScript, React Native, AWS",
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

    // Profile Section
    profileLabel: "Perfil",

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
    philosophyTitleShort: "Els meus principis",
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
    notesIntro: "Notes curtes on recullo decisions, trade-offs i aprenentatges de delivery.",
    notesItems: [
      {
        title: "Entregar sota pressio",
        shortText:
          "Dividir objectius amb molta pressio en entregues petites protegeix la confiança i la qualitat.",
        longText:
          "En programes amb pressio alta, intentar entregar-ho tot en una gran release acostuma a amagar riscos i retardar decisions importants. Prefereixo dividir el delivery en fites petites amb resultats mesurables, responsables clars i punts de revisio definits.\n\nAquest enfocament millora la coordinacio amb producte, direccio i marketing, i redueix friccio dins l'equip. El progres es veu abans, el feedback arriba a temps i la confiança es construeix amb evidencia.",
        tags: ["delivery", "lideratge"],
        slug: "shipping-under-pressure",
      },
      {
        title: "La simplicitat com a decisio de producte",
        shortText:
          "Reduir complexitat d'arquitectura sol millorar mes el time-to-value que afegir una feature extra.",
        longText:
          "La complexitat tecnica no es neutra: frena l'equip, complica operacions i incrementa incidencies. Per aixo tracto la simplicitat com una decisio de producte, perque impacta directament en velocitat, estabilitat i resultats.\n\nNo es una questio de tenir menys codi, sino de tenir sistemes clars que qualsevol equip pugui entendre i evolucionar. Amb trade-offs explicits, prioritzar valor avui sense hipotecar el dema es molt mes viable.",
        tags: ["arquitectura", "producte"],
        slug: "simplicity-product-decision",
      },
      {
        title: "Autonomia d'equip amb limits clars",
        shortText:
          "L'autonomia funciona millor amb alineacio clara, context compartit i limits explicits.",
        longText:
          "Autonomia sense context genera desviacions; control sense confiança crea colls d'ampolla. Liderar be vol dir definir objectius, limits i principis perque l'equip pugui decidir sense esperar aprovacions constants.\n\nQuan les expectatives son clares, els equips coordinen millor, aprenen mes rapid i assumeixen ownership real dels resultats. Aqui es on velocitat de delivery i creixement de persones es reforcen.",
        tags: ["equips", "proces"],
        slug: "team-autonomy-guardrails",
      },
    ],

    // Side Projects Section
    sideProjectsLabel: "Side Projects",
    sideProjectsTitle: "Coses que construeixo per curiositat",
    sideProjectsIntro:
      "Experiments petits per provar idees d'interaccio, hipotesis de producte i limits tecnics.",
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
    analyticsConsentTitle: "Privacitat",
    analyticsConsentDescription:
      "Permet analitica anonima per entendre quines seccions veuen i obren els visitants.",
    analyticsConsentAccept: "Permetre",
    analyticsConsentDecline: "Rebutjar",
    analyticsConsentManage: "Privacitat",

    // Fly With Me Page
    flyWithMeHeroEmoji: "✈️",
    flyWithMeHeroTitle: "Et ve de gust volar?",
    flyWithMeHeroShortLabel: "Inici",
    flyWithMeHeroIntro: [
      "Un breu resum abans de buscar data, perquè hi ha algunes coses que està bé saber primer.",
      "Volo des de l'Aeroclub de Sabadell i normalment llogo una **Cessna 172** (avioneta de quatre places, un dels models més utilitzats del món). Per pes solem volar **2 o 3 persones en total, comptant-me a mi**.",
    ],
    flyWithMeSections: [
      {
        emoji: "⚖️",
        title: "Primer de tot: quants som i quant pesem?",
        shortLabel: "Pes",
        paragraphs: [
          "Abans de buscar avió necessitaré saber **qui ve i el pes aproximat de cada persona**.",
          "El pes i la seva distribució són molt importants en una avioneta petita. Calculo la càrrega i el centratge abans de cada vol, ajustant el combustible si cal.",
          "Sempre intento reservar una **Cessna 172S**, que ens dona una mica més de marge, segons la disponibilitat.",
          "Si vols venir acompanyat, digue'm primer qui seríem i quant pesa aproximadament cadascú, i miro que la combinació sigui viable.",
          "No solem portar equipatge: mòbil, una ampolla petita d'aigua i poca cosa més.",
        ],
      },
      {
        emoji: "🗺️",
        title: "On podem anar?",
        shortLabel: "Rutes",
        paragraphs: [
          "La majoria de vols que faig són d'**1 h a 1 h 30 min**.",
          "Algunes de les meves rutes preferides són:",
          "🌊 **Costa:** Sabadell → Mataró → costa cap a Blanes/Lloret i tornada.",
          "⛰️ **Montserrat / interior:** cap a Igualada i la zona de Montserrat, de vegades continuant cap a Sau/Montseny segons el temps i la durada del vol.",
          "🏔️ **Pirineus:** vols més llargs, d'unes dues hores, cap a la Seu d'Urgell/Cerdanya, especialment bonics a l'hivern.",
          "La ruta que pensem inicialment **mai no està 100 % garantida**: aquell mateix dia miro meteorologia, vent, núvols i espais aeris, i decidim què té més sentit.",
          "Si el temps no acompanya, no passa absolutament res: **cancel·lem i busquem un altre dia**.",
        ],
      },
      {
        emoji: "🕐",
        title: "Quant de temps necessitem?",
        shortLabel: "Temps",
        paragraphs: [
          "Encara que volem només una hora, anar a volar porta bastant més temps.",
          "Abans preparo la documentació, meteorologia i planificació del vol; després fem junts la inspecció exterior de l'avió i el briefing abans de pujar.",
          "Si a més fem un mos tranquil·lament a l'Aeroclub abans o després, calcula aproximadament **4 hores per a tot el pla**.",
          "Si fem un vol més llarg, aterrem en un altre aeroport o aprofitem per dinar allà, podem convertir-ho fàcilment en un pla de mig dia.",
        ],
      },
      {
        emoji: "🎧",
        title: "Com és volar en una avioneta?",
        shortLabel: "Experiència",
        paragraphs: [
          "És força diferent de volar en un avió de línia.",
          "L'avioneta fa més soroll, per això volem amb auriculars i podem parlar durant tot el vol. També notaràs més l'aire.",
          "En general intentarem volar **a primera hora o a última hora del dia**, quan l'aire sol estar més tranquil.",
          "Si et preocupen especialment les turbulències, digue-m'ho. Les rutes de muntanya es poden moure més per l'efecte del vent sobre el terreny, mentre que **la ruta de la costa sol ser especialment tranquil·la**.",
          "Si mai has volat en avioneta i et fa una mica de respecte, podem començar amb **un vol curt** i tornar, sense obligació de fer una ruta concreta.",
          "Si durant el vol algú no se sent bé, girem cua i tornem a Sabadell. Sense problema.",
          "Durant el briefing explico les coses bàsiques de l'avió i, un cop en vol, si les condicions ho permeten, us ensenyo com funcionen les comandes.",
        ],
      },
      {
        emoji: "💰",
        title: "Quant costa?",
        shortLabel: "Preu",
        paragraphs: [
          "Això és important: **no faig vols comercials ni cobro per portar ningú a volar**. Volo com a hobby i llogo l'avió a l'Aeroclub.",
          "**Compartim els costos del vol a parts iguals entre tots els ocupants, incloent-me a mi**.",
          "L'avió es factura per temps de motor i sol costar aproximadament **300–350 € per hora de vol en total**.",
          "Per exemple, entre tres solem pagar al voltant de **100–120 € cadascú per una hora**, jo inclòs; entre dos, la part de cadascú és més gran.",
          "En acabar el vol fem números amb el cost real i normalment em feu un Bizum.",
        ],
      },
      {
        emoji: "📅",
        title: "I com busquem data?",
        shortLabel: "Data",
        paragraphs: [
          "L'ideal és organitzar-ho amb **unes dues setmanes d'antelació**, per quadrar les nostres agendes i trobar una avioneta disponible.",
          "Triar un dia **no vol dir que el vol ja estigui confirmat**: és simplement una proposta de data.",
          "Un cop el tinguem, miro disponibilitat d'avions i, si en tenim un de disponible, faig la reserva i et confirmo el vol.",
          "I a partir d'aquí... a esperar que la meteo ens acompanyi! ✈️",
        ],
      },
    ],
    flyWithMeBookingLabel: "Reserva el teu vol",
    flyWithMeFindDateButton: "Buscar data",
  },
};
