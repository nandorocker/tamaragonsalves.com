// Internationalization utility functions for global and page-specific UI strings

// Static imports for JSON files
import enGlobal from '../i18n/en/global.json';
import ptGlobal from '../i18n/pt/global.json';
import enHome from '../i18n/en/home.json';
import ptHome from '../i18n/pt/home.json';
import enBooks from '../i18n/en/books.json';
import ptBooks from '../i18n/pt/books.json';
import enVideos from '../i18n/en/videos.json';
import ptVideos from '../i18n/pt/videos.json';
import enProjects from '../i18n/en/projects.json';
import ptProjects from '../i18n/pt/projects.json';

export type Language = 'en' | 'pt';

// Translation type - now supports nested objects for page-specific translations
export type Translations = Record<string, any>;

// Static translation data
const globalTranslations = {
  en: enGlobal,
  pt: ptGlobal
};

const pageTranslations: Record<Language, Record<string, any>> = {
  en: { home: enHome },
  pt: { home: ptHome }
};

// Content-specific translations (books, videos, projects)
const contentTranslations = {
  en: {
    books: enBooks,
    videos: enVideos,
    projects: enProjects
  },
  pt: {
    books: ptBooks,
    videos: ptVideos,
    projects: ptProjects
  }
};

/**
 * Load global translations for a specific language
 */
export async function loadTranslations(lang: Language): Promise<Translations> {
  return globalTranslations[lang] || {};
}

/**
 * Load page-specific translations for a specific language and page
 */
export async function loadPageTranslations(lang: Language, page: string): Promise<Translations> {
  return pageTranslations[lang]?.[page] || {};
}

/**
 * Load all translations (global + page-specific + content-specific) for a language and page
 * Page-specific translations override global ones if there are conflicts
 * Content translations are merged at the root level
 */
export async function loadAllTranslations(lang: Language, page: string = 'home'): Promise<Translations> {
  const [globalTrans, pageTrans] = await Promise.all([
    loadTranslations(lang),
    loadPageTranslations(lang, page)
  ]);

  // Get content translations for this language
  const contentTrans = contentTranslations[lang] || {};

  // Merge translations with page-specific overriding global, and content translations added at root level
  return { 
    ...globalTrans, 
    ...pageTrans,
    ...contentTrans
  };
}

/**
 * Get a translation for the given key path in the specified language
 * Supports nested object keys using dot notation (e.g., 'videos.broadeningWomensRights.title')
 */
export async function getTranslation(lang: Language, keyPath: string, page: string = 'home'): Promise<string> {
  const translations = await loadAllTranslations(lang, page);
  
  const translation = getNestedValue(translations, keyPath);
  
  if (translation === undefined) {
    console.warn(`Translation not found for key: ${keyPath} in language: ${lang}`);
    return `[${keyPath}]`;
  }
  
  return String(translation);
}

/**
 * Helper function to get nested values from object using dot notation
 */
function getNestedValue(obj: any, keyPath: string): any {
  return keyPath.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Set nested value in object using dot notation
 */
function setNestedValue(obj: any, keyPath: string, value: any): void {
  const keys = keyPath.split('.');
  const lastKey = keys.pop()!;
  
  const target = keys.reduce((current, key) => {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    return current[key];
  }, obj);
  
  target[lastKey] = value;
}

/**
 * Synchronous version for build-time usage with pre-loaded translations
 * Supports nested object keys using dot notation
 */
export function getTranslationSync(translations: Translations, keyPath: string): any {
  const translation = getNestedValue(translations, keyPath);
  
  if (translation === undefined) {
    console.warn(`Translation not found for key: ${keyPath}`);
    return `[${keyPath}]`;
  }
  
  // Return the translation as-is (could be string, array, object, etc.)
  return translation;
}

/**
 * Create a translation function for a specific language and page
 */
export function createTranslator(lang: Language, page: string = 'home') {
  return {
    async t(keyPath: string): Promise<string> {
      return getTranslation(lang, keyPath, page);
    },
    
    // Synchronous version that requires pre-loaded translations
    tSync(translations: Translations, keyPath: string): string {
      return getTranslationSync(translations, keyPath);
    }
  };
}

// Default language
let currentLanguage: Language = 'en';

/**
 * Get the current language setting
 */
export function getCurrentLanguage(): Language {
  return currentLanguage;
}

/**
 * Set the current language
 */
export function setLanguage(lang: Language): void {
  currentLanguage = lang;
  
  // Store in localStorage if available (client-side)
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('language', lang);
  }
}

/**
 * Initialize language from localStorage or browser preference
 */
export function initializeLanguage(): Language {
  if (typeof window !== 'undefined') {
    // Try to get from localStorage first
    const stored = localStorage.getItem('language') as Language;
    if (stored && (stored === 'en' || stored === 'pt')) {
      currentLanguage = stored;
      return stored;
    }
    
    // Fall back to browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('pt')) {
      currentLanguage = 'pt';
      return 'pt';
    }
  }
  
  // Default to English
  currentLanguage = 'en';
  return 'en';
}

// Language configuration
export const languages = {
  en: 'English',
  pt: 'Português',
};

export const defaultLang = 'en';

/**
 * Get language from URL path
 */
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

/**
 * Translation function factory for use in Astro components
 * This maintains compatibility with the old system by loading global translations
 */
export function useTranslations(lang: Language = defaultLang) {
  return function t(key: string): any {
    try {
      // Get global translations directly
      const translations = globalTranslations[lang] || {};
      return getNestedValue(translations, key) || key;
    } catch (error) {
      console.error(`Error in useTranslations for key ${key}:`, error);
      return key;
    }
  }
}

/**
 * For Astro's getStaticPaths function
 */
export function getStaticPaths() {
  return Object.keys(languages).map((lang) => {
    return { params: { lang } };
  });
}
