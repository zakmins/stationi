import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en, type Dict } from "./en";
import { fr } from "./fr";
import { ar } from "./ar";

export type Lang = "fr" | "en" | "ar";
export const dictionaries: Record<Lang, Dict> = { fr, en, ar };
export const languages: { code: Lang; label: string }[] = [
  { code: "ar", label: "AR" },
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

const Ctx = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void }>({ lang: "fr", t: fr, setLang: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    const saved = localStorage.getItem("stationi-lang") as Lang | null;
    if (saved && saved in dictionaries) setLangState(saved);
  }, []);
  useEffect(() => {
    const d = dictionaries[lang];
    document.documentElement.lang = d.meta.lang;
    document.documentElement.dir = d.meta.dir;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("stationi-lang", l);
  };
  return <Ctx.Provider value={{ lang, t: dictionaries[lang], setLang }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
