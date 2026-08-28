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
    title: "Engineering Lead - TypeScript, React Native, NestJS, AWS",
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
        shortText: "Splitting high-pressure goals into small releases protects trust and delivery quality.",
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
        shortText:
          "Teams move faster when autonomy is paired with clear alignment and boundaries.",
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
    analyticsConsentTitle: "Analytics preferences",
    analyticsConsentDescription:
      "Allow anonymous analytics to understand which sections visitors view and open.",
    analyticsConsentAccept: "Allow analytics",
    analyticsConsentDecline: "Decline analytics",
    analyticsConsentManage: "Privacy settings",
  },
};
