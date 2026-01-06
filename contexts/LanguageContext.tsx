"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { en } from "@/locales/en";
import { zh } from "@/locales/zh";

type Locale = "en" | "zh";
type Dictionary = typeof en;

interface LanguageContextType {
  locale: Locale;
  toggleLanguage: () => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    // Detect system language
    const systemLang = navigator.language.toLowerCase();
    if (systemLang.startsWith("zh")) {
      setLocale("zh");
    } else {
      setLocale("en");
    }
  }, []);

  const toggleLanguage = () => {
    setLocale((prev) => (prev === "en" ? "zh" : "en"));
  };

  const t = locale === "en" ? en : zh;

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
