import { experienceTimelineEn } from "@/data/experience";
import type { Locale } from "./types";

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
    snow: "Snow",

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
    enablePlane: "Enable plane mode",
    disablePlane: "Disable plane mode",
    enableSound: "Enable sound",
    disableSound: "Disable sound",
    enableReducedMotion: "Enable reduced motion",
    disableReducedMotion: "Disable reduced motion",
    dangerousFlyingTitle: "Dangerous Flying Conditions!",
    dangerousFlyingMessage:
      "It's too dangerous to fly during {} conditions. Would you like to automatically set better conditions for flying?",
    dangerousFlyingMessageNight:
      "It's too dangerous to fly at night. Would you like to automatically set better conditions for flying?",
    dangerousFlyingMessageBoth:
      "It's too dangerous to fly at night with {} weather. Would you like to automatically set better conditions for flying?",
    changeConditions: "Change Conditions",
    skip: "Skip",

    // Portfolio Page
    name: "Jordi Orriols",
    title: "Engineering Lead - TypeScript, React Native, AWS",
    valueStatement:
      "I build complex digital products without turning technology into unnecessary complexity.",
    projects: "Projects",
    companies: "Companies",
    leading: "Leading",
    experience: "Experience",
    years: "years",

    sendMessage: "Send message",

    // Companies
    companiesTitle: "Companies",
    companiesSubtitle: "Some of the companies I've had the pleasure to work with",

    // Work Timeline
    workTimelineTitle: "Work Timeline",
    workTimelineSubtitle: "A detailed view of my professional journey",
    goalsAndAchievements: "Goals and Achievements",
    technologies: "Technologies",
    experienceTimeline: experienceTimelineEn,

    // Contact Form
    contactTitle: "Send me a message",
    contactSubtitle: "I’d love to hear from you. Fill out the form and I’ll get back to you soon.",
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
    // About Me Section
    aboutMeLabel: "About Me",
    aboutMeTitle: "Engineering leadership focused on impact",
    aboutMeStatement:
      "I lead product and engineering teams with one priority: clarity in decisions, quality in delivery, and measurable business impact.",
    aboutMeDescription1:
      "I am based in Barcelona and I work across TypeScript, React, React Native, NestJS, and AWS. My focus is to build systems teams can understand, operate, and evolve with confidence.",
    aboutMeDescription2:
      "I care about trade-offs that create real progress: smaller deliveries, fast feedback, and product outcomes that justify every technical decision.",
    aboutMeLocation: "Barcelona, Spain",
    aboutMeHighlights: [
      "Leadership through context, not authority",
      "Simplicity over sophistication",
      "Product impact over perfect code",
      "Team growth as a core metric",
      "Systems others can maintain",
    ],

    // Philosophy Section
    philosophyLabel: "Philosophy",
    philosophyTitle: "Decision principles behind my work",
    philosophyTitleShort: "My principles",
    philosophyIntro:
      "These principles help me align product direction, technical decisions, and team autonomy in high-pressure contexts.",
    philosophyPrinciples: [
      {
        number: "01",
        title: "Simplicity is architecture",
        description:
          "I add complexity only when it solves a real problem. Removing complexity later is always more expensive.",
      },
      {
        number: "02",
        title: "Product before technology",
        description:
          "Frameworks and migrations are means, not goals. The right choice is the one that improves outcomes for users and business.",
      },
      {
        number: "03",
        title: "Maintainable by the team",
        description:
          "If only one person can evolve a system, it is not done. Shared understanding is part of the definition of quality.",
      },
      {
        number: "04",
        title: "Explicit trade-offs",
        description:
          "Almost every decision has a cost. I make gains, risks, and revisitation points explicit before committing.",
      },
      {
        number: "05",
        title: "Autonomy with alignment",
        description:
          "Leadership is creating the context so teams can decide well without waiting for approval in every step.",
      },
    ],

    // Notes Section
    notesLabel: "Notes",
    notesTitle: "Small writing on engineering leadership",
    notesIntro: "Short notes where I capture decisions, trade-offs, and lessons from delivery.",
    levelTwo: "Level 2",
    backToNotes: "Back to notes",
    openNote: "Open note",
    copyLink: "Copy link",
    notesItems: [
      {
        title: "Shipping under pressure",
        shortText:
          "Splitting high-pressure goals into small releases protects trust and delivery quality.",
        longText:
          "In high-pressure programs, promising one big release usually creates hidden risk and late surprises. I prefer to split delivery into smaller milestones with measurable outcomes, clear owners, and explicit review points.\n\nThis creates transparency with product, leadership, and marketing, while helping teams preserve focus under pressure. Progress becomes visible early, decisions get better with real feedback, and confidence is earned through evidence instead of optimism.",
        tags: ["delivery", "leadership"],
        slug: "shipping-under-pressure",
      },
      {
        title: "Simplicity as a product decision",
        shortText:
          "Simpler architecture often improves time-to-value more than adding one more feature.",
        longText:
          "Technical complexity is not neutral: it slows onboarding, increases incidents, and delays change. I treat simplicity as a product decision because maintainability directly impacts speed, reliability, and user outcomes.\n\nThe goal is not minimal code, but clear systems teams can understand and evolve. When trade-offs are explicit, it becomes easier to prioritize what delivers business value now while keeping future options open.",
        tags: ["architecture", "product"],
        slug: "simplicity-product-decision",
      },
      {
        title: "Team autonomy with clear guardrails",
        shortText: "Teams move faster when autonomy is paired with clear alignment and boundaries.",
        longText:
          "Autonomy without context creates drift, and control without trust creates bottlenecks. Effective leadership defines goals, boundaries, and decision principles so teams can move independently without losing coherence.\n\nWhen expectations are explicit, teams can decide faster, coordinate better across functions, and own outcomes end to end. This is where delivery speed and people growth reinforce each other.",
        tags: ["teams", "process"],
        slug: "team-autonomy-guardrails",
      },
    ],

    // Side Projects Section
    sideProjectsLabel: "Side Projects",
    sideProjectsTitle: "Things I build out of curiosity",
    sideProjectsIntro:
      "Small experiments to test interaction ideas, product bets, and technical boundaries.",
    backToProjects: "Back to projects",
    openProject: "Open project",
    projectLink: "Visit project",
    sideProjectsItems: [
      {
        title: "Watch Lab",
        shortDescription:
          "Interactive watch concepts focused on motion, timing, and visual clarity.",
        slug: "watch-lab",
        link: "https://jordiorriols.cat",
        images: ["/images/image.jpeg", "/images/image.jpeg"],
      },
      {
        title: "Booking Flow Playground",
        shortDescription:
          "Rapid prototypes to validate booking funnel hypotheses with measurable user outcomes.",
        slug: "booking-flow-playground",
        link: "https://jordiorriols.cat",
        images: ["/images/image.jpeg", "/images/image.jpeg"],
      },
      {
        title: "Team Ops Dashboard",
        shortDescription:
          "A lightweight dashboard for delivery visibility, incidents, and cross-team ownership.",
        slug: "team-ops-dashboard",
        link: "https://jordiorriols.cat",
        images: ["/images/image.jpeg", "/images/image.jpeg"],
      },
    ],

    // Analytics Consent
    analyticsConsentTitle: "Privacy",
    analyticsConsentDescription:
      "Allow anonymous analytics to understand which sections visitors view and open.",
    analyticsConsentAccept: "Allow",
    analyticsConsentDecline: "Decline",
    analyticsConsentManage: "Privacy",

    // Fly With Me Page
    flyWithMeHeroEmoji: "✈️",
    flyWithMeHeroTitle: "Want to come flying?",
    flyWithMeHeroIntro: [
      "Here's a quick rundown of how I usually organize these flights, since there are a few things worth knowing before we pick a date.",
      "I fly out of the Sabadell Aeroclub and usually rent a **Cessna 172**, a four-seat aircraft and one of the most widely used models in the world. Even though it has four seats, weight limits usually mean we fly with **2 or 3 people total, myself included**.",
    ],
    flyWithMeSections: [
      {
        emoji: "⚖️",
        title: "First things first: how many of us, and how much do we weigh?",
        paragraphs: [
          "Before I look for a plane I'll need to know **who's coming and roughly how much each person weighs**.",
          "In a small aircraft, weight and how it's distributed really matter. Before every flight I calculate the load and balance, and depending on how much we weigh, we may also need to adjust how much fuel we carry.",
          "I always try to book a **Cessna 172S**, which gives us a bit more margin, but it depends on availability.",
          "So if you'd like to bring someone along, first tell me who we'd be and roughly how much each person weighs, and I'll check the combination works.",
          "We don't usually bring luggage: a phone, a small bottle of water, and not much else.",
        ],
      },
      {
        emoji: "🗺️",
        title: "Where can we go?",
        paragraphs: [
          "Most of the flights I do are **1 to 1.5 hours**.",
          "Some of my favorite routes:",
          "🌊 **Coast:** leave Sabadell towards Mataró, reach the sea, and follow the coastline towards Blanes/Lloret before heading back.",
          "⛰️ **Montserrat / inland:** head towards Igualada, pass by the Montserrat area, and depending on weather and flight length, continue towards Sau/Montseny.",
          "🏔️ **Pyrenees:** we can also do longer flights towards La Seu d'Urgell/Cerdanya. These are usually around two-hour flights and are especially beautiful in winter.",
          "The route we plan at first is **never 100% guaranteed**. On the day itself I check weather, wind, clouds and airspace, and we decide what makes the most sense.",
          "If the weather doesn't cooperate, that's completely fine: **we cancel and find another day**.",
        ],
      },
      {
        emoji: "🕐",
        title: "How much time do we need?",
        paragraphs: [
          "Even if we only fly for an hour, going flying takes quite a bit longer than that.",
          "Beforehand I need to prepare the paperwork, weather briefing and flight planning, and afterwards we do the aircraft's walk-around inspection and briefing together before boarding.",
          "If we also grab something at the Aeroclub before or after, plan for roughly **4 hours for the whole plan**.",
          "If we do a longer flight, land at another airport, or grab lunch there, it can easily turn into a half-day plan.",
        ],
      },
      {
        emoji: "🎧",
        title: "What's it like flying in a light aircraft?",
        paragraphs: [
          "It's quite different from flying on an airliner.",
          "The aircraft is noisier, so we fly with headsets and can talk to each other throughout the flight. You'll also notice air movement more.",
          "In general we'll try to fly **early morning or late in the day**, when the air tends to be calmer.",
          "If turbulence worries you, let me know. Mountain routes can move more due to wind over terrain, while **the coastal route tends to be especially calm**.",
          "And if you've never flown in a light aircraft and it makes you a little nervous, we can simply start with **a short flight** and head back. We're under no obligation to fly a specific route.",
          "If anyone feels unwell during the flight, we turn around and head back to Sabadell. No problem at all.",
          "During the briefing I'll also explain the basics of the aircraft, and once we're flying and conditions allow, I can show you how the controls work.",
        ],
      },
      {
        emoji: "💰",
        title: "How much does it cost?",
        paragraphs: [
          "This is important: **I don't run commercial flights or charge anyone to fly**. I fly as a hobby and rent the plane from the Aeroclub.",
          "What we do is **split the flight costs between everyone on board, myself included**. Everyone pays exactly the same share.",
          "The aircraft is billed by engine time and usually costs around **€300–350 per flight hour in total**.",
          "For example, if there are three of us, we usually end up paying around **€100–120 each for one hour**, myself included. If there are two of us, obviously each share will be bigger.",
          "After the flight we work out the real cost and you usually send me a bank transfer.",
        ],
      },
      {
        emoji: "📅",
        title: "So how do we pick a date?",
        paragraphs: [
          "Ideally we organize this **around two weeks in advance**, since besides matching our schedules I also need to find an available aircraft.",
          "Picking a day **doesn't mean the flight is confirmed yet** — it's simply a proposed date.",
          "Once we have one, I check aircraft availability and, if there's one free, I book it and confirm the flight with you.",
          "And from there... let's hope the weather cooperates! ✈️",
        ],
      },
    ],
    flyWithMeBookingLabel: "Book your flight",
    flyWithMeFindDateButton: "Find a date",
  },
};
