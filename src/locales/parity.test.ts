import { describe, it, expect } from "vitest";
import { en } from "./en";
import { es } from "./es";
import { ca } from "./ca";

const locales = [en, es, ca] as const;

describe("Locale parity", () => {
  it("keeps notes and side projects keys in all locales", () => {
    locales.forEach((locale) => {
      expect(locale.translation).toHaveProperty("notesLabel");
      expect(locale.translation).toHaveProperty("notesTitle");
      expect(locale.translation).toHaveProperty("notesIntro");
      expect(locale.translation).toHaveProperty("openNote");
      expect(locale.translation).toHaveProperty("copyLink");
      expect(locale.translation).toHaveProperty("sideProjectsLabel");
      expect(locale.translation).toHaveProperty("sideProjectsTitle");
      expect(locale.translation).toHaveProperty("sideProjectsIntro");
      expect(locale.translation).toHaveProperty("openProject");
      expect(locale.translation).toHaveProperty("projectLink");
    });
  });

  it("keeps note list shape aligned across locales", () => {
    locales.forEach((locale) => {
      const notes = locale.translation.notesItems;
      expect(notes).toHaveLength(3);

      notes.forEach((note) => {
        expect(note.title.length).toBeGreaterThan(0);
        expect(note.shortText.length).toBeGreaterThan(0);
        expect(note.slug.length).toBeGreaterThan(0);
        expect(note.tags.length).toBeGreaterThan(0);
      });
    });
  });

  it("keeps side projects list shape aligned across locales", () => {
    locales.forEach((locale) => {
      const projects = locale.translation.sideProjectsItems;
      expect(projects).toHaveLength(3);

      projects.forEach((project) => {
        expect(project.title.length).toBeGreaterThan(0);
        expect(project.shortDescription.length).toBeGreaterThan(0);
        expect(project.slug.length).toBeGreaterThan(0);
        expect(project.link.length).toBeGreaterThan(0);
        expect(project.images).toHaveLength(2);
      });
    });
  });
});
