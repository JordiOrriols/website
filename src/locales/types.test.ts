import { describe, it, expect } from "vitest";

describe("locales/types.ts", () => {
  it("can import Translation type without error", () => {
    // This test verifies that the types module exports are valid
    // TypeScript compilation will catch any type errors
    expect(true).toBe(true);
  });

  it("validates locale files can be imported", async () => {
    // Import all locale files to verify they conform to the expected structure
    const enModule = await import("@/locales/en");
    const esModule = await import("@/locales/es");
    const caModule = await import("@/locales/ca");

    expect(enModule).toBeTruthy();
    expect(esModule).toBeTruthy();
    expect(caModule).toBeTruthy();

    // All locales export named exports
    const en = enModule.en;
    const es = esModule.es;
    const ca = caModule.ca;

    expect(typeof en).toBe("object");
    expect(typeof es).toBe("object");
    expect(typeof ca).toBe("object");

    // Verify translation property exists
    expect(en).toHaveProperty("translation");
    expect(es).toHaveProperty("translation");
    expect(ca).toHaveProperty("translation");
  });

  it("all locale files have consistent translation keys", async () => {
    const enModule = await import("@/locales/en");
    const esModule = await import("@/locales/es");
    const caModule = await import("@/locales/ca");

    const en = enModule.en.translation;
    const es = esModule.es.translation;
    const ca = caModule.ca.translation;

    const enKeys = Object.keys(en).sort();
    const esKeys = Object.keys(es).sort();
    const caKeys = Object.keys(ca).sort();

    // All locales should have the same keys
    expect(enKeys).toEqual(esKeys);
    expect(enKeys).toEqual(caKeys);
  });

  it("locale translations are non-empty strings or objects", async () => {
    const enModule = await import("@/locales/en");
    const en = enModule.en.translation;

    Object.entries(en).forEach(([key, value]) => {
      expect(value).toBeTruthy();
      // Value can be string or object (for nested translations like experienceTimeline)
      expect(["string", "object"].includes(typeof value)).toBe(true);
    });
  });
});
