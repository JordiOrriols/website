export type ExperienceEntry = {
  period: string;
  title: string;
  company: string;
  description: string;
  achievements?: string[];
  tech: string[];
  tags?: string[];
};

export const experienceTimeline: ExperienceEntry[] = [
  {
    period: "Oct 2023 – Present",
    title: "Tech Lead React Mobile",
    company: "PortAventura World (via RANDSTAD)",
    description:
      "Leading the Mobile Team (React / React Native) responsible for PortAventura’s official app, ensuring top user experience, stability, and optimized purchase flows.",
    achievements: [
      "Raised app store rating from ~2.0 → ~4.0 by tackling key UX pain points and iterating through data-driven releases.",
      "Introduced Feature Flags and continuous feedback loops to prioritize work by business impact.",
      "Aligned product and tech through measurable goals and reduced critical production issues.",
    ],
    tech: [
      "React",
      "React Native",
      "TypeScript",
      "AWS",
      "Feature Flags",
      "Android",
      "iOS",
      "Purchase Flows",
    ],
    tags: [
      "Team Leadership",
      "Data-driven decisions",
      "App store +2→4",
      "Feature Flags",
      "Payments",
    ],
  },
  {
    period: "Oct 2022 – Oct 2023",
    title: "Engineering Lead",
    company: "wefox",
    description:
      "First-line management role leading a cross-functional team (~7 people) focused on product delivery, team performance, and agile culture.",
    achievements: [
      "Built a high-performance team achieving ~80% sprint completion consistency from February onward.",
      "Introduced A/B testing and LaunchDarkly for data-driven product decisions.",
      "Led onboarding, performance reviews, and psychological safety practices across the team.",
    ],
    tech: [
      "React",
      "TypeScript",
      "LaunchDarkly",
      "Jest",
      "Storybook",
      "AWS API Gateway",
    ],
    tags: [
      "People Management",
      "Agile Coaching",
      "A/B Testing",
      "80% Delivery Rate",
      "Hiring & Onboarding",
    ],
  },
  {
    period: "Jun 2020 – Oct 2022",
    title: "Senior Software Engineer",
    company: "Mitek Systems",
    description:
      "Led code quality initiatives and designed a serverless architecture for internal demos and R&D tooling.",
    achievements: [
      "Reduced infrastructure costs by ~70% migrating to AWS serverless (Lambda / CloudFormation).",
      "Mentored junior engineers and built onboarding material recognized by Agile Coaches.",
      "Developed a dynamic demo platform for sales enablement and partner showcases.",
    ],
    tech: [
      "React",
      "React Native",
      "Serverless (Lambda, API Gateway)",
      "CloudFormation",
      "Cognito",
      "Sentry",
      "Jest",
      "Storybook",
    ],
    tags: [
      "Serverless -70% cost",
      "Mentoring",
      "CI/CD",
      "Product Demo Platform",
    ],
  },
  {
    period: "2017 – Jul 2020",
    title: "R&D / FullStack Engineer",
    company: "HP (via ERNI)",
    description:
      "Architected frontend solutions and improved quality processes for R&D projects through component-driven development and testing culture.",
    achievements: [
      "Migrated large projects from JavaScript → TypeScript, improving long-term stability.",
      "Increased test coverage from ~20% → ~90% and reduced false positives significantly.",
      "Introduced Docker-based dev setup, Visual Regression Testing, and Jenkins automation.",
    ],
    tech: [
      "React",
      "Electron",
      "TypeScript",
      "Docker",
      "Jenkins",
      "Puppeteer",
      "Visual Regression",
    ],
    tags: [
      "TypeScript Migration",
      "Unit Tests 20%→90%",
      "Visual Regression",
      "Dev Tooling",
    ],
  },
  {
    period: "Mar 2016 – Jul 2017",
    title: "Software Architect",
    company: "Onnergy / Gadgeon (Belgium)",
    description:
      "Technical architect standardizing code practices, designing cloud infrastructure, and leading customer integrations.",
    achievements: [
      "Designed auto-scaling architecture on Microsoft Azure for production environments.",
      "Reduced duplicated code by introducing reusable component patterns and multi-brand support.",
      "Delivered real-time APIs (Socket.io) and supported clients during deployment phases.",
    ],
    tech: ["Azure", "Node.js", "MongoDB", "Socket.io", "AngularJS", "Ionic"],
    tags: [
      "Cloud Architecture",
      "Code Reuse",
      "Client Delivery",
      "Scalable Systems",
    ],
  },
  {
    period: "Jul 2011 – Nov 2014",
    title: "Software Architect / Founder",
    company: "ClientArea (London, self-employed)",
    description:
      "End-to-end ownership of product and technology: architecture design, business strategy, and B2B client delivery.",
    achievements: [
      "Designed AWS architecture (EC2, RDS, S3, CloudFront, Route53) with strong security practices.",
      "Led product planning, technical onboarding, and B2B sales strategy.",
    ],
    tech: [
      "AWS EC2",
      "AWS RDS",
      "AWS S3",
      "CloudFront",
      "Route53",
      "AngularJS",
      "PHP",
      "MySQL",
    ],
    tags: ["AWS Architecture", "Product Leadership", "B2B Strategy"],
  },
  {
    period: "2009 – 2016 (various part-time roles)",
    title: "Ride Operator & Product Designer",
    company: "Tibidabo Amusement Park",
    description:
      "Customer-facing role and early product design experiences focused on children’s entertainment.",
    achievements: [
      "Designed the ‘TibiCity Driving Licence’, still sold at the park today.",
      "Trained new hires and improved customer service workflows.",
    ],
    tech: [],
    tags: ["Customer Service", "Product Design", "Training"],
  },
];
