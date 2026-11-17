"use client";

import { useSiteLanguage, toEnglishCatalogue, toHinglishCatalogue } from "@/components/LanguageProvider";

export default function LocalizedKitCopy({ value }: { value: string }) {
  const language = useSiteLanguage();
  const localized = language === "en"
    ? toEnglishCatalogue(value)
    : language === "hinglish"
      ? toHinglishCatalogue(value)
      : value;

  return <>{localized}</>;
}
