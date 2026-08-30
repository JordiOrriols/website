import type { ExperienceEntry } from "@/data/experience";

const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

function parseBound(
  token: string | undefined,
  fallbackMonth: number
): { year: number; month: number } | null {
  if (!token) return null;
  const match = token.trim().match(/^([A-Za-z]{3})?\s*(\d{4})/);
  if (!match) return null;
  const [, monthAbbr, yearStr] = match;
  const month = monthAbbr ? (MONTHS[monthAbbr.toLowerCase()] ?? fallbackMonth) : fallbackMonth;
  return { year: Number(yearStr), month };
}

// Parses period strings like "Oct 2023 – Present", "Jun 2020 – Oct 2022", "2017 – Jul 2020".
// An unparseable end token (e.g. "Present"/"Presente") is treated as ongoing (end = now).
export function parseExperiencePeriod(
  period: string,
  now: Date = new Date()
): { start: Date; end: Date } {
  const [rawStart, rawEnd] = period.split(/\s[–-]\s/);

  const startBound = parseBound(rawStart, 0);
  const start = startBound ? new Date(startBound.year, startBound.month, 1) : now;

  const endBound = parseBound(rawEnd, 11);
  const end = endBound ? new Date(endBound.year, endBound.month + 1, 0) : now;

  return { start, end };
}

export function getYearsBetween(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / MS_PER_YEAR;
}

// Total years since the earliest non-excluded entry's start date, rounded to the nearest whole year.
export function calculateTotalExperienceYears(
  entries: ExperienceEntry[],
  now: Date = new Date()
): number {
  const included = entries.filter((entry) => !entry.excludeFromExperienceTotal);
  if (included.length === 0) return 0;

  const earliestStart = included.reduce((earliest, entry) => {
    const { start } = parseExperiencePeriod(entry.period, now);
    return start < earliest ? start : earliest;
  }, now);

  return Math.round(getYearsBetween(earliestStart, now));
}

// Sum of durations of entries flagged as leadership roles, rounded to the nearest whole year.
export function calculateLeadingYears(entries: ExperienceEntry[], now: Date = new Date()): number {
  const totalYears = entries
    .filter((entry) => entry.isLeadership)
    .reduce((sum, entry) => {
      const { start, end } = parseExperiencePeriod(entry.period, now);
      return sum + getYearsBetween(start, end);
    }, 0);

  return Math.round(totalYears);
}
