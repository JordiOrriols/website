import { describe, it, expect } from "vitest";
import { experienceTimelineEn } from "./experience";
import {
  TECH,
  TECH_CLIENTAREA,
  TECH_HP,
  TECH_MITEK,
  TECH_ONNERGY,
  TECH_PORTAVENTURA,
  TECH_TIBIDABO,
  TECH_WEFOX,
} from "./technologies";
import { COMPANY, companiesGallery } from "./companies";

describe("Data Files", () => {
  describe("experience data", () => {
    it("exports experience timeline array", () => {
      expect(Array.isArray(experienceTimelineEn)).toBe(true);
      expect(experienceTimelineEn.length).toBeGreaterThan(0);
    });

    it("experience entries have required fields", () => {
      experienceTimelineEn.forEach((entry) => {
        expect(entry).toHaveProperty("period");
        expect(entry).toHaveProperty("title");
        expect(entry).toHaveProperty("company");
        expect(entry).toHaveProperty("description");
        expect(entry).toHaveProperty("tech");
        expect(Array.isArray(entry.tech)).toBe(true);
        expect(typeof entry.period).toBe("string");
        expect(typeof entry.title).toBe("string");
        expect(typeof entry.description).toBe("string");
      });
    });

    it.each(experienceTimelineEn)("entry has valid data: $title", (entry) => {
      expect(typeof entry.period).toBe("string");
      expect(typeof entry.title).toBe("string");
      expect(typeof entry.company).toBe("string");
      expect(entry.tech.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("technologies data", () => {
    it("exports TECH constants", () => {
      expect(TECH).toBeDefined();
      expect(Array.isArray(TECH) || typeof TECH === "object").toBe(true);
    });

    it.each([
      ["TECH_CLIENTAREA", TECH_CLIENTAREA],
      ["TECH_HP", TECH_HP],
      ["TECH_MITEK", TECH_MITEK],
      ["TECH_ONNERGY", TECH_ONNERGY],
      ["TECH_PORTAVENTURA", TECH_PORTAVENTURA],
      ["TECH_TIBIDABO", TECH_TIBIDABO],
      ["TECH_WEFOX", TECH_WEFOX],
    ])("%s is defined", (name, tech) => {
      expect(tech).toBeDefined();
      expect(Array.isArray(tech) || typeof tech === "object").toBe(true);
    });
  });

  describe("companies data", () => {
    it("exports COMPANY constants", () => {
      expect(COMPANY).toBeDefined();
      expect(typeof COMPANY).toBe("object");
    });

    it.each([
      "PORTAVENTURA",
      "RANDSTAD",
      "WEFOX",
      "MITEK",
      "HP",
      "ONNERGY",
      "CLIENTAREA",
      "TIBIDABO",
    ])("COMPANY.%s is defined", (companyKey) => {
      expect(COMPANY[companyKey as keyof typeof COMPANY]).toBeDefined();
      expect(typeof COMPANY[companyKey as keyof typeof COMPANY]).toBe("string");
    });

    it("exports companiesGallery array", () => {
      expect(Array.isArray(companiesGallery)).toBe(true);
      expect(companiesGallery.length).toBeGreaterThan(0);
    });

    it.each(companiesGallery)("gallery item has title and image: $title", (item) => {
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("image");
      expect(typeof item.title).toBe("string");
    });
  });
});
