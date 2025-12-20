import { COMPANY } from "./companies";
import {
  TECH_CLIENTAREA,
  TECH_HP,
  TECH_MITEK,
  TECH_ONNERGY,
  TECH_PORTAVENTURA,
  TECH_TIBIDABO,
  TECH_WEFOX,
} from "./technologies";

export type ExperienceEntry = {
  period: string;
  title: string;
  company: string;
  description: string;
  achievements?: string[];
  tech: string[];
  tags?: string[];
};

export const experienceTimelineEn: ExperienceEntry[] = [
  {
    period: "Oct 2023 – Present",
    title: "Tech Lead React Mobile",
    company: COMPANY.PORTAVENTURA,
    description:
      "Leading the Mobile Team (React / React Native) responsible for PortAventura’s official app, ensuring top user experience, stability, and optimized purchase flows.",
    achievements: [
      "Raised app store rating from ~2.0 → ~4.0 by tackling key UX pain points and iterating through data-driven releases.",
      "Introduced Feature Flags and continuous feedback loops to prioritize work by business impact.",
      "Aligned product and tech through measurable goals and reduced critical production issues.",
    ],
    tech: TECH_PORTAVENTURA,
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
    company: COMPANY.WEFOX,
    description:
      "First-line management role leading a cross-functional team (~7 people) focused on product delivery, team performance, and agile culture.",
    achievements: [
      "Built a high-performance team achieving ~80% sprint completion consistency from February onward.",
      "Introduced A/B testing and LaunchDarkly for data-driven product decisions.",
      "Led onboarding, performance reviews, and psychological safety practices across the team.",
    ],
    tech: TECH_WEFOX,
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
    company: COMPANY.MITEK,
    description:
      "Led code quality initiatives and designed a serverless architecture for internal demos and R&D tooling.",
    achievements: [
      "Reduced infrastructure costs by ~70% migrating to AWS serverless (Lambda / CloudFormation).",
      "Mentored junior engineers and built onboarding material recognized by Agile Coaches.",
      "Developed a dynamic demo platform for sales enablement and partner showcases.",
    ],
    tech: TECH_MITEK,
    tags: ["Serverless -70% cost", "Mentoring", "CI/CD", "Product Demo Platform"],
  },
  {
    period: "2017 – Jul 2020",
    title: "R&D / FullStack Engineer",
    company: COMPANY.HP,
    description:
      "Architected frontend solutions and improved quality processes for R&D projects through component-driven development and testing culture.",
    achievements: [
      "Migrated large projects from JavaScript → TypeScript, improving long-term stability.",
      "Increased test coverage from ~20% → ~90% and reduced false positives significantly.",
      "Introduced Docker-based dev setup, Visual Regression Testing, and Jenkins automation.",
    ],
    tech: TECH_HP,
    tags: ["TypeScript Migration", "Unit Tests 20%→90%", "Visual Regression", "Dev Tooling"],
  },
  {
    period: "Mar 2016 – Jul 2017",
    title: "Software Architect",
    company: COMPANY.ONNERGY,
    description:
      "Technical architect standardizing code practices, designing cloud infrastructure, and leading customer integrations.",
    achievements: [
      "Designed auto-scaling architecture on Microsoft Azure for production environments.",
      "Reduced duplicated code by introducing reusable component patterns and multi-brand support.",
      "Delivered real-time APIs (Socket.io) and supported clients during deployment phases.",
    ],
    tech: TECH_ONNERGY,
    tags: ["Cloud Architecture", "Code Reuse", "Client Delivery", "Scalable Systems"],
  },
  {
    period: "Jul 2011 – Nov 2014",
    title: "Software Architect / Founder",
    company: COMPANY.CLIENTAREA,
    description:
      "End-to-end ownership of product and technology: architecture design, business strategy, and B2B client delivery.",
    achievements: [
      "Designed AWS architecture (EC2, RDS, S3, CloudFront, Route53) with strong security practices.",
      "Led product planning, technical onboarding, and B2B sales strategy.",
    ],
    tech: TECH_CLIENTAREA,
    tags: ["AWS Architecture", "Product Leadership", "B2B Strategy"],
  },
  {
    period: "2009 – 2016 (various part-time roles)",
    title: "Ride Operator & Product Designer",
    company: COMPANY.TIBIDABO,
    description:
      "Customer-facing role and early product design experiences focused on children’s entertainment.",
    achievements: [
      "Designed the ‘TibiCity Driving Licence’, still sold at the park today.",
      "Trained new hires and improved customer service workflows.",
    ],
    tech: TECH_TIBIDABO,
    tags: ["Customer Service", "Product Design", "Training"],
  },
];

export const experienceTimelineEs: ExperienceEntry[] = [
  {
    period: "Oct 2023 – Presente",
    title: "Tech Lead React Mobile",
    company: COMPANY.PORTAVENTURA,
    description:
      "Liderando el equipo móvil (React / React Native) responsable de la app oficial de PortAventura, garantizando la mejor experiencia de usuario, estabilidad y flujos de compra optimizados.",
    achievements: [
      "Mejoré la valoración en las tiendas de aplicaciones de ~2.0 → ~4.0 abordando los principales puntos de dolor de UX e iterando con lanzamientos basados en datos.",
      "Introduje Feature Flags y bucles de retroalimentación continua para priorizar el trabajo por impacto en el negocio.",
      "Alineé producto y tecnología mediante objetivos medibles y reduje incidencias críticas en producción.",
    ],
    tech: TECH_PORTAVENTURA,
    tags: [
      "Liderazgo de equipo",
      "Decisiones basadas en datos",
      "App store +2→4",
      "Feature Flags",
      "Pagos",
    ],
  },
  {
    period: "Oct 2022 – Oct 2023",
    title: "Engineering Lead",
    company: COMPANY.WEFOX,
    description:
      "Rol de gestión de primera línea liderando un equipo multifuncional (~7 personas) enfocado en la entrega de producto, el rendimiento del equipo y la cultura ágil.",
    achievements: [
      "Construí un equipo de alto rendimiento alcanzando una consistencia del 80% en la finalización de sprints desde febrero.",
      "Introduje A/B testing y LaunchDarkly para decisiones de producto basadas en datos.",
      "Lideré onboarding, evaluaciones de rendimiento y prácticas de seguridad psicológica en el equipo.",
    ],
    tech: TECH_WEFOX,
    tags: [
      "Gestión de personas",
      "Coaching ágil",
      "A/B Testing",
      "80% tasa de entrega",
      "Contratación y onboarding",
    ],
  },
  {
    period: "Jun 2020 – Oct 2022",
    title: "Senior Software Engineer",
    company: COMPANY.MITEK,
    description:
      "Lideré iniciativas de calidad de código y diseñé una arquitectura serverless para demos internas y herramientas de I+D.",
    achievements: [
      "Reduje los costes de infraestructura en ~70% migrando a AWS serverless (Lambda / CloudFormation).",
      "Mentoricé a ingenieros junior y creé material de onboarding reconocido por los Agile Coaches.",
      "Desarrollé una plataforma de demos dinámica para ventas y presentaciones a partners.",
    ],
    tech: TECH_MITEK,
    tags: ["Serverless -70% coste", "Mentoría", "CI/CD", "Plataforma de demos de producto"],
  },
  {
    period: "2017 – Jul 2020",
    title: "Ingeniero FullStack / I+D",
    company: COMPANY.HP,
    description:
      "Diseñé soluciones frontend y mejoré procesos de calidad para proyectos de I+D mediante desarrollo basado en componentes y cultura de testing.",
    achievements: [
      "Migré grandes proyectos de JavaScript → TypeScript, mejorando la estabilidad a largo plazo.",
      "Aumenté la cobertura de tests de ~20% → ~90% y reduje significativamente los falsos positivos.",
      "Introduje entorno de desarrollo basado en Docker, testing visual y automatización con Jenkins.",
    ],
    tech: TECH_HP,
    tags: [
      "Migración a TypeScript",
      "Tests unitarios 20%→90%",
      "Testing visual",
      "Herramientas de desarrollo",
    ],
  },
  {
    period: "Mar 2016 – Jul 2017",
    title: "Arquitecto de Software",
    company: COMPANY.ONNERGY,
    description:
      "Arquitecto técnico estandarizando prácticas de código, diseñando infraestructura cloud y liderando integraciones con clientes.",
    achievements: [
      "Diseñé arquitectura autoescalable en Microsoft Azure para entornos de producción.",
      "Reduje código duplicado introduciendo componentes reutilizables y soporte multibrand.",
      "Desarrollé APIs en tiempo real (Socket.io) y di soporte durante las fases de despliegue.",
    ],
    tech: TECH_ONNERGY,
    tags: [
      "Arquitectura cloud",
      "Reutilización de código",
      "Entrega al cliente",
      "Sistemas escalables",
    ],
  },
  {
    period: "Jul 2011 – Nov 2014",
    title: "Arquitecto de Software / Fundador",
    company: COMPANY.CLIENTAREA,
    description:
      "Responsable completo del producto y la tecnología: diseño de arquitectura, estrategia de negocio y entrega B2B.",
    achievements: [
      "Diseñé arquitectura AWS (EC2, RDS, S3, CloudFront, Route53) con buenas prácticas de seguridad.",
      "Lideré la planificación del producto, onboarding técnico y estrategia comercial B2B.",
    ],
    tech: TECH_CLIENTAREA,
    tags: ["Arquitectura AWS", "Liderazgo de producto", "Estrategia B2B"],
  },
  {
    period: "2009 – 2016 (roles a tiempo parcial)",
    title: "Operador de atracciones y Diseñador de producto",
    company: "Parque de Atracciones Tibidabo",
    description:
      "Rol de atención al cliente y primeras experiencias en diseño de producto enfocado en entretenimiento infantil.",
    achievements: [
      "Diseñé la ‘Licencia de Conducción TibiCity’, aún vendida en el parque.",
      "Formé a nuevos empleados y mejoré los flujos de atención al cliente.",
    ],
    tech: TECH_TIBIDABO,
    tags: ["Atención al cliente", "Diseño de producto", "Formación"],
  },
];

export const experienceTimelineCa: ExperienceEntry[] = [
  {
    period: "Oct 2023 – Present",
    title: "Tech Lead React Mobile",
    company: COMPANY.PORTAVENTURA,
    description:
      "Liderant l’equip mòbil (React / React Native) responsable de l’app oficial de PortAventura, garantint la millor experiència d’usuari, estabilitat i fluxos de compra optimitzats.",
    achievements: [
      "Vam augmentar la valoració de l’app store de ~2.0 → ~4.0 abordant punts clau de UX i iterant amb llançaments basats en dades.",
      "Vam introduir Feature Flags i bucles de feedback continu per prioritzar la feina segons l’impacte de negoci.",
      "Vam alinear producte i tecnologia amb objectius mesurables i vam reduir incidències crítiques en producció.",
    ],
    tech: TECH_PORTAVENTURA,
    tags: [
      "Lideratge d’equip",
      "Decisions basades en dades",
      "App store +2→4",
      "Feature Flags",
      "Pagaments",
    ],
  },
  {
    period: "Oct 2022 – Oct 2023",
    title: "Engineering Lead",
    company: COMPANY.WEFOX,
    description:
      "Rol de gestió de primera línia liderant un equip multifuncional (~7 persones) enfocat en el lliurament de producte, el rendiment de l’equip i la cultura àgil.",
    achievements: [
      "Vaig construir un equip d’alt rendiment amb una consistència del 80% en la finalització dels sprints des del febrer.",
      "Vaig introduir A/B testing i LaunchDarkly per a decisions de producte basades en dades.",
      "Vaig liderar l’onboarding, revisions de rendiment i pràctiques de seguretat psicològica dins de l’equip.",
    ],
    tech: TECH_WEFOX,
    tags: [
      "Gestió de persones",
      "Coaching àgil",
      "A/B Testing",
      "80% taxa de lliurament",
      "Contractació i onboarding",
    ],
  },
  {
    period: "Jun 2020 – Oct 2022",
    title: "Senior Software Engineer",
    company: COMPANY.MITEK,
    description:
      "Vaig liderar iniciatives de qualitat de codi i vaig dissenyar una arquitectura serverless per a demos internes i eines de R+D.",
    achievements: [
      "Vaig reduir els costos d’infraestructura un ~70% migrant a AWS serverless (Lambda / CloudFormation).",
      "Vaig fer de mentor a enginyers júnior i vaig crear material d’onboarding reconegut pels Agile Coaches.",
      "Vaig desenvolupar una plataforma de demos dinàmica per vendes i presentacions a partners.",
    ],
    tech: TECH_MITEK,
    tags: ["Serverless -70% cost", "Mentoria", "CI/CD", "Plataforma de demos"],
  },
  {
    period: "2017 – Jul 2020",
    title: "Enginyer FullStack / R+D",
    company: COMPANY.HP,
    description:
      "Vaig dissenyar solucions frontend i vaig millorar processos de qualitat per a projectes de R+D amb desenvolupament basat en components i cultura de testing.",
    achievements: [
      "Vaig migrar projectes grans de JavaScript → TypeScript millorant l’estabilitat a llarg termini.",
      "Vaig augmentar la cobertura de tests del ~20% → ~90% i vaig reduir falsos positius.",
      "Vaig introduir entorn de desenvolupament amb Docker, testing visual i automatització amb Jenkins.",
    ],
    tech: TECH_HP,
    tags: [
      "Migració a TypeScript",
      "Tests unitaris 20%→90%",
      "Testing visual",
      "Eines de desenvolupament",
    ],
  },
  {
    period: "Mar 2016 – Jul 2017",
    title: "Arquitecte de Software",
    company: COMPANY.ONNERGY,
    description:
      "Arquitecte tècnic estandarditzant pràctiques de codi, dissenyant infraestructura cloud i liderant integracions amb clients.",
    achievements: [
      "Vaig dissenyar arquitectura autoescalable a Microsoft Azure per a entorns de producció.",
      "Vaig reduir codi duplicat introduint components reutilitzables i suport multibrand.",
      "Vaig desenvolupar APIs en temps real (Socket.io) i vaig donar suport durant els desplegaments.",
    ],
    tech: TECH_ONNERGY,
    tags: [
      "Arquitectura cloud",
      "Reutilització de codi",
      "Lliurament al client",
      "Sistemes escalables",
    ],
  },
  {
    period: "Jul 2011 – Nov 2014",
    title: "Arquitecte de Software / Fundador",
    company: COMPANY.CLIENTAREA,
    description:
      "Responsable complet del producte i la tecnologia: disseny d’arquitectura, estratègia de negoci i lliurament B2B.",
    achievements: [
      "Vaig dissenyar arquitectura AWS (EC2, RDS, S3, CloudFront, Route53) amb bones pràctiques de seguretat.",
      "Vaig liderar la planificació del producte, onboarding tècnic i estratègia comercial B2B.",
    ],
    tech: TECH_CLIENTAREA,
    tags: ["Arquitectura AWS", "Lideratge de producte", "Estratègia B2B"],
  },
  {
    period: "2009 – 2016 (feines a temps parcial)",
    title: "Operador d’atraccions i Dissenyador de producte",
    company: COMPANY.TIBIDABO,
    description:
      "Rol d’atenció al client i primeres experiències en disseny de producte enfocat en l’entreteniment infantil.",
    achievements: [
      "Vaig dissenyar el ‘Permís de Conducció TibiCity’, encara venut al parc avui dia.",
      "Vaig formar nous empleats i vaig millorar els fluxos d’atenció al client.",
    ],
    tech: TECH_TIBIDABO,
    tags: ["Atenció al client", "Disseny de producte", "Formació"],
  },
];
