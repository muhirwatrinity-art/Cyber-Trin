import React, { createContext, useContext, useState } from 'react';
import { getDictionary } from '../translations/dictionary';
import type { Language, LocalizedText } from '../types';
import { loadLanguage, saveLanguage } from '../utils/storage';

interface LanguageContextValue {
  lang: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  dict: ReturnType<typeof getDictionary>;
  pick: (item: LocalizedText) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Language>(() => loadLanguage());

  const setLanguage = (next: Language) => {
    setLangState(next);
    saveLanguage(next);
    document.documentElement.lang = next === 'lu' ? 'lg' : 'en';
  };

  const toggleLanguage = () => {
    setLanguage(lang === 'en' ? 'lu' : 'en');
  };

  const dict = getDictionary(lang);

  const pick = (item: LocalizedText) => item[lang] || item.en;

  return (
    <LanguageContext.Provider
      value={{ lang, setLanguage, toggleLanguage, dict, pick }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
