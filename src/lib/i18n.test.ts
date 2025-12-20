import { describe, it, expect } from 'vitest';
import i18n from './i18n';

describe('i18n', () => {
  it('exports i18n instance', () => {
    expect(i18n).toBeDefined();
  });

  it('i18n has required methods', () => {
    expect(i18n.changeLanguage).toBeDefined();
    expect(i18n.t).toBeDefined();
  });

  it('can get current language', () => {
    const language = i18n.language;
    expect(typeof language).toBe('string');
  });

  it('can change language', async () => {
    const currentLang = i18n.language;
    await i18n.changeLanguage('en');
    expect(i18n.language).toBeDefined();
  });

  it('can translate keys', () => {
    const translated = i18n.t('contact');
    expect(typeof translated).toBe('string');
  });
});
