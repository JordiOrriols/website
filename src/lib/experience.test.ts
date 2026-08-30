import { describe, it, expect } from "vitest";
import {
  parseExperiencePeriod,
  getYearsBetween,
  calculateTotalExperienceYears,
  calculateLeadingYears,
} from "./experience";
import { experienceTimelineEn } from "@/data/experience";
import type { ExperienceEntry } from "@/data/experience";

const NOW = new Date(2026, 7, 30); // 2026-08-30, fixed reference date for deterministic tests

describe("parseExperiencePeriod", () => {
  it("treats an open-ended period ('Present') as ending now", () => {
    const { start, end } = parseExperiencePeriod("Oct 2023 – Present", NOW);
    expect(start).toEqual(new Date(2023, 9, 1));
    expect(end).toEqual(NOW);
  });

  it("parses a fully bounded month/year range", () => {
    const { start, end } = parseExperiencePeriod("Jun 2020 – Oct 2022", NOW);
    expect(start).toEqual(new Date(2020, 5, 1));
    expect(end).toEqual(new Date(2022, 10, 0)); // last day of October 2022
  });

  it("defaults to January for a bare start year", () => {
    const { start } = parseExperiencePeriod("2017 – Jul 2020", NOW);
    expect(start).toEqual(new Date(2017, 0, 1));
  });

  it("defaults to December and ignores trailing text for a bare end year", () => {
    const { end } = parseExperiencePeriod("2009 – 2016 (various part-time roles)", NOW);
    expect(end).toEqual(new Date(2016, 11, 31));
  });
});

describe("getYearsBetween", () => {
  it("computes fractional years between two dates", () => {
    const years = getYearsBetween(new Date(2020, 0, 1), new Date(2021, 0, 1));
    expect(years).toBeCloseTo(1, 1);
  });
});

describe("calculateTotalExperienceYears", () => {
  it("counts from the earliest non-excluded entry, ignoring excluded ones", () => {
    const entries: ExperienceEntry[] = [
      { period: "Jul 2011 – Nov 2014", title: "A", company: "A", description: "", tech: [] },
      {
        period: "2009 – 2016",
        title: "B",
        company: "B",
        description: "",
        tech: [],
        excludeFromExperienceTotal: true,
      },
    ];
    expect(calculateTotalExperienceYears(entries, NOW)).toBe(15);
  });

  it("returns 0 for an empty list", () => {
    expect(calculateTotalExperienceYears([], NOW)).toBe(0);
  });

  it("matches the real experience data (career starts Jul 2011, excluding the part-time Tibidabo role)", () => {
    expect(calculateTotalExperienceYears(experienceTimelineEn, NOW)).toBe(15);
  });
});

describe("calculateLeadingYears", () => {
  it("sums the durations of leadership-flagged entries only", () => {
    const entries: ExperienceEntry[] = [
      {
        period: "Oct 2022 – Oct 2023",
        title: "Lead",
        company: "A",
        description: "",
        tech: [],
        isLeadership: true,
      },
      { period: "Jun 2020 – Oct 2022", title: "IC", company: "B", description: "", tech: [] },
    ];
    expect(calculateLeadingYears(entries, NOW)).toBe(1);
  });

  it("returns 0 when no entry is flagged as leadership", () => {
    const entries: ExperienceEntry[] = [
      { period: "Jun 2020 – Oct 2022", title: "IC", company: "B", description: "", tech: [] },
    ];
    expect(calculateLeadingYears(entries, NOW)).toBe(0);
  });

  it("matches the real experience data (Tech Lead + Engineering Lead roles)", () => {
    expect(calculateLeadingYears(experienceTimelineEn, NOW)).toBe(4);
  });
});
