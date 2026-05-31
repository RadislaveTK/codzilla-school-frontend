"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, dictionaries, locales } from "./dictionaries";

const I18nContext = createContext(null);

function readPath(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === "undefined") {
      return defaultLocale;
    }

    const savedLocale = window.localStorage.getItem("codzilla-locale");
    return locales.includes(savedLocale) ? savedLocale : defaultLocale;
  });

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => {
    const dictionary = dictionaries[locale] || dictionaries[defaultLocale];

    const setLocale = (nextLocale) => {
      if (!locales.includes(nextLocale)) {
        return;
      }

      window.localStorage.setItem("codzilla-locale", nextLocale);
      document.documentElement.lang = nextLocale;
      setLocaleState(nextLocale);
    };

    const t = (path) =>
      readPath(dictionary, path) ??
      readPath(dictionaries[defaultLocale], path) ??
      path;

    return { locale, setLocale, t };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
