import { ui } from './ui';

// Type helper for nested translation keys
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<typeof ui[typeof defaultLang]>;

export const languages = {
  en: 'English',
  pt: 'Português',
};

export const defaultLang = 'en';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui = defaultLang) {
  return function t(key: string): any {
    // Handle nested keys with dot notation
    if (key.includes('.')) {
      const keys = key.split('.');
      let value: any = ui[lang];
      
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
      
      // Fallback to default language if not found
      if (value === undefined) {
        let fallback: any = ui[defaultLang];
        for (const k of keys) {
          fallback = fallback?.[k];
          if (fallback === undefined) break;
        }
        return fallback || key;
      }
      
      return value;
    }
    
    // Handle direct keys
    const langValue = (ui[lang] as any)[key];
    const defaultValue = (ui[defaultLang] as any)[key];
    return langValue || defaultValue || key;
  }
}

// For Astro's getStaticPaths function
export function getStaticPaths() {
  return Object.keys(languages).map((lang) => {
    return { params: { lang } };
  });
}
