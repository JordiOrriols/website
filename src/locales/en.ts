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
    title: "Multimedia Engineering Lead",
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
    aboutMeTitle: "Building digital experiences that matter",
    aboutMeDescription1:
      "I'm a Multimedia Engineering Lead based in Barcelona, passionate about creating innovative digital products that combine cutting-edge technology with thoughtful design.",
    aboutMeDescription2:
      "With over 12 years of experience in the industry, I've led teams and projects across multiple sectors, always focusing on delivering exceptional user experiences.",
    aboutMeLocation: "Barcelona, Spain",
    aboutMeHighlights: [
      "Multimedia Engineering Lead",
      "12+ years of experience",
      "Team leadership & mentoring",
      "Full-stack development",
      "Product-driven mindset",
    ],

    // Philosophy Section
    philosophyLabel: "Philosophy",
    philosophyTitle: "Principles that guide my work",
    philosophyPrinciples: [
      {
        number: "01",
        title: "User First",
        description:
          "Every decision starts with the user. Technology should serve people, not the other way around.",
      },
      {
        number: "02",
        title: "Simplicity",
        description:
          "The best solutions are the simplest ones. Complexity is easy; simplicity requires deep understanding.",
      },
      {
        number: "03",
        title: "Craftsmanship",
        description:
          "Quality is not negotiable. Every line of code, every pixel, every interaction matters.",
      },
      {
        number: "04",
        title: "Continuous Learning",
        description:
          "Technology evolves fast. Staying curious and adaptable is key to building what's next.",
      },
      {
        number: "05",
        title: "Collaboration",
        description:
          "Great products are built by great teams. Open communication and shared ownership drive results.",
      },
    ],

    // Notes Section
    notesLabel: "Notes",
    notesTitle: "Small writing on engineering leadership",
    notesIntro: "Short notes where I capture decisions, trade-offs, and lessons from delivery.",
    openNote: "Open note",
    copyLink: "Copy link",
    notesItems: [
      {
        title: "Shipping under pressure",
        shortText:
          "How to split a high-pressure roadmap into measurable releases without losing trust.",
        tags: ["delivery", "leadership"],
        slug: "shipping-under-pressure",
      },
      {
        title: "Simplicity as a product decision",
        shortText:
          "Why reducing architecture complexity can improve time-to-value more than adding features.",
        tags: ["architecture", "product"],
        slug: "simplicity-product-decision",
      },
      {
        title: "Team autonomy with clear guardrails",
        shortText:
          "The balance between alignment and freedom that helps teams move faster with fewer surprises.",
        tags: ["teams", "process"],
        slug: "team-autonomy-guardrails",
      },
    ],

    // Side Projects Section
    sideProjectsLabel: "Side Projects",
    sideProjectsTitle: "Things I build out of curiosity",
    sideProjectsIntro:
      "Small experiments to test interaction ideas, product bets, and technical boundaries.",
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
