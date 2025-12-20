import { describe, it, expect } from 'vitest';
import { experienceTimelineEn } from './experience';
import { technologiesData } from './technologies';
import { companiesData } from './companies';

describe('Data Files', () => {
  describe('experience data', () => {
    it('exports experience timeline', () => {
      expect(experienceTimelineEn).toBeDefined();
      expect(Array.isArray(experienceTimelineEn)).toBe(true);
    });

    it('experience entries have required fields', () => {
      if (experienceTimelineEn.length > 0) {
        const entry = experienceTimelineEn[0];
        expect(entry).toHaveProperty('id');
        expect(entry).toHaveProperty('title');
        expect(entry).toHaveProperty('company');
      }
    });
  });

  describe('technologies data', () => {
    it('exports technologies data', () => {
      expect(technologiesData).toBeDefined();
      expect(Array.isArray(technologiesData) || typeof technologiesData === 'object').toBe(true);
    });
  });

  describe('companies data', () => {
    it('exports companies data', () => {
      expect(companiesData).toBeDefined();
      expect(Array.isArray(companiesData) || typeof companiesData === 'object').toBe(true);
    });
  });
});
