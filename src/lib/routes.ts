const SUPPORTED_LOCALES = ["en", "es", "ca"] as const;
const SUPPORTED_SECTIONS = ["profile", "about-me", "philosophy", "notes", "side-projects"] as const;

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
type SupportedSection = (typeof SUPPORTED_SECTIONS)[number];

export interface PortfolioRoute {
  locale: SupportedLocale | null;
  section: SupportedSection | null;
  slug: string | null;
}

export function normalizeLocale(locale: string | undefined): SupportedLocale {
  const normalized = (locale ?? "en").toLowerCase().slice(0, 2);
  if (SUPPORTED_LOCALES.includes(normalized as SupportedLocale)) {
    return normalized as SupportedLocale;
  }
  return "en";
}

export function isSupportedSection(section: string | null | undefined): section is SupportedSection {
  if (!section) return false;
  return SUPPORTED_SECTIONS.includes(section as SupportedSection);
}

export function parsePortfolioPath(pathname: string): PortfolioRoute {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return { locale: null, section: null, slug: null };
  }

  let locale: SupportedLocale | null = null;
  let section: SupportedSection | null = null;
  let slug: string | null = null;

  const first = (segments[0] ?? "").toLowerCase();
  const maybeLocale = normalizeLocale(first);
  const firstIsLocale = SUPPORTED_LOCALES.includes(first as SupportedLocale);

  if (firstIsLocale) {
    locale = maybeLocale;
    if (segments[1] && isSupportedSection(segments[1])) {
      section = segments[1] as SupportedSection;
      if (segments[2]) {
        slug = decodeURIComponent(segments.slice(2).join("/"));
      }
    }
    return { locale, section, slug };
  }

  const sectionIndex = segments.findIndex((segment) => isSupportedSection(segment));
  if (sectionIndex >= 0) {
    section = segments[sectionIndex] as SupportedSection;
    if (segments[sectionIndex + 1]) {
      slug = decodeURIComponent(segments.slice(sectionIndex + 1).join("/"));
    }
  }

  return { locale, section, slug };
}

export function buildPortfolioPath(locale: string, section: string, slug?: string): string {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedSection = isSupportedSection(section) ? section : "profile";
  const suffix = slug ? `/${encodeURIComponent(slug)}` : "";
  return `/${normalizedLocale}/${normalizedSection}${suffix}`;
}

export function replacePortfolioRoute(locale: string, section: string, slug?: string): void {
  if (typeof window === "undefined") return;
  const nextPath = buildPortfolioPath(locale, section, slug);
  if (window.location.pathname === nextPath) {
    return;
  }
  window.history.replaceState({}, "", nextPath);
}

export function pushPortfolioRoute(locale: string, section: string, slug?: string): void {
  if (typeof window === "undefined") return;
  const nextPath = buildPortfolioPath(locale, section, slug);
  window.history.pushState({}, "", nextPath);
}

export function buildPortfolioAbsoluteLink(origin: string, locale: string, section: string, slug?: string): string {
  return `${origin}${buildPortfolioPath(locale, section, slug)}`;
}

export function getSupportedSections(): readonly string[] {
  return SUPPORTED_SECTIONS;
}
