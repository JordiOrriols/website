import { describe, it, expect } from "vitest";
import {
  parsePortfolioPath,
  buildPortfolioPath,
  normalizeLocale,
  isSupportedSection,
  buildPortfolioAbsoluteLink,
} from "./routes";

describe("routes helpers", () => {
  it("parses locale, section and slug from clean path", () => {
    expect(parsePortfolioPath("/en/notes/shipping-under-pressure")).toEqual({
      locale: "en",
      section: "notes",
      slug: "shipping-under-pressure",
    });
  });

  it("parses section without locale", () => {
    expect(parsePortfolioPath("/notes/shipping-under-pressure")).toEqual({
      locale: null,
      section: "notes",
      slug: "shipping-under-pressure",
    });
  });

  it("returns nulls when section is unsupported", () => {
    expect(parsePortfolioPath("/en/unknown/path")).toEqual({
      locale: "en",
      section: null,
      slug: null,
    });
  });

  it("builds clean portfolio path", () => {
    expect(buildPortfolioPath("es", "side-projects", "watch-lab")).toBe("/es/side-projects/watch-lab");
  });

  it("roundtrips encoded slugs", () => {
    const built = buildPortfolioPath("en", "notes", "decision/notes");
    expect(built).toBe("/en/notes/decision%2Fnotes");

    const parsed = parsePortfolioPath(built);
    expect(parsed).toEqual({
      locale: "en",
      section: "notes",
      slug: "decision/notes",
    });
  });

  it("normalizes locale variants", () => {
    expect(normalizeLocale("EN-US")).toBe("en");
    expect(normalizeLocale("ca-ES")).toBe("ca");
    expect(normalizeLocale("fr")).toBe("en");
  });

  it("recognizes supported sections", () => {
    expect(isSupportedSection("notes")).toBe(true);
    expect(isSupportedSection("invalid")).toBe(false);
  });

  it("builds absolute link", () => {
    expect(buildPortfolioAbsoluteLink("https://jordiorriols.cat", "en", "notes", "note-1")).toBe(
      "https://jordiorriols.cat/en/notes/note-1"
    );
  });
});
