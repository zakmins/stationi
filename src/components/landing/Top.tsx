import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Award, Building2, Check, ChevronDown, Gauge, Menu, MoonStar, SunMedium, X } from "lucide-react";
import { useI18n, languages, type Lang } from "@/i18n/context";
import { CtaButton, Counter, Reveal } from "./ui";
import { cn } from "@/lib/utils";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document === "undefined") return "light";
    const stored = localStorage.getItem("stationi-theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("stationi-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDark = theme === "dark";

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    const root = document.documentElement;
    const rect = buttonRef.current?.getBoundingClientRect();

    if (rect) {
      root.style.setProperty("--theme-transition-x", `${rect.left + rect.width / 2}px`);
      root.style.setProperty("--theme-transition-y", `${rect.top + rect.height / 2}px`);
    }

    const updateTheme = () => {
      root.classList.toggle("dark", nextTheme === "dark");
      root.style.colorScheme = nextTheme;
      localStorage.setItem("stationi-theme", nextTheme);
      setTheme(nextTheme);
    };
    const transitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => unknown;
    };

    if (transitionDocument.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      transitionDocument.startViewTransition(updateTheme);
    } else {
      updateTheme();
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-nav-shell-foreground/15 bg-nav-shell-foreground/5 text-nav-shell-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-cta/50 hover:bg-nav-shell-foreground/10 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
    </button>
  );
}

export function LangSwitch() {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [pendingLang, setPendingLang] = useState<Lang | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const selected = languages.find((language) => language.code === lang) ?? languages[0]!;
  const languageNames = { ar: "العربية", fr: "Français", en: "English" };
  const confirmationCopy = {
    en: { title: "Change language?", message: "The page will refresh to apply your language selection.", cancel: "Cancel", confirm: "Change language" },
    fr: { title: "Changer de langue ?", message: "La page va s’actualiser pour appliquer votre choix de langue.", cancel: "Annuler", confirm: "Changer de langue" },
    ar: { title: "هل تريد تغيير اللغة؟", message: "سيتم تحديث الصفحة لتطبيق اختيارك للغة.", cancel: "إلغاء", confirm: "تغيير اللغة" },
  }[lang];

  useEffect(() => {
    if (!open) return;
    const closeOnPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnKeyDown);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!pendingLang) return;
    confirmRef.current?.focus();
    const closeOnKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPendingLang(null);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnKeyDown);
    };
  }, [pendingLang]);

  const confirmLanguageChange = () => {
    if (!pendingLang) return;
    localStorage.setItem("stationi-lang", pendingLang);
    window.location.reload();
  };

  return (
    <>
    <div ref={wrapperRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Language: ${selected.label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "inline-flex h-10 min-w-[4.25rem] cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 text-xs font-bold tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "border-nav-shell-foreground/15 text-nav-shell-foreground hover:border-cta/50 hover:bg-nav-shell-foreground/10",
        )}
      >
        {selected.label}
        <ChevronDown className={cn("size-3.5 transition-transform duration-500", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Choose language"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="absolute end-0 top-full z-[60] mt-3 w-60 overflow-hidden rounded-3xl border border-border bg-background/95 p-2 text-foreground shadow-lift backdrop-blur-xl"
          >
            <div className="mb-1 flex items-center justify-between px-3 pb-2 pt-2">
              <div>
                <p className="text-sm font-semibold">Choose language</p>
              </div>
              <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-[10px] font-bold tracking-wide text-brand">
                {selected.label}
              </span>
            </div>
            <div className="h-px bg-border/80" />
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                role="menuitemradio"
                aria-checked={lang === language.code}
                onClick={() => {
                  setOpen(false);
                  if (lang !== language.code) setPendingLang(language.code);
                }}
                className={cn(
                  "mt-1 flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-start transition-colors duration-200",
                  lang === language.code
                    ? "bg-brand-soft text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-xl text-xs font-bold tracking-wide transition-colors",
                      lang === language.code
                        ? "bg-brand text-primary-foreground"
                        : "bg-secondary text-secondary-foreground",
                    )}
                  >
                    {language.label}
                  </span>
                  <span className="text-sm font-medium">{languageNames[language.code]}</span>
                </span>
                {lang === language.code && (
                  <span className="grid size-6 place-items-center rounded-full bg-background text-brand shadow-sm">
                    <Check className="size-3.5" />
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    {typeof document !== "undefined" && createPortal(
      <AnimatePresence>
        {pendingLang && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setPendingLang(null);
                triggerRef.current?.focus();
              }
            }}
          >
            <motion.section
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="language-confirm-title"
              aria-describedby="language-confirm-description"
              dir={lang === "ar" ? "rtl" : "ltr"}
              className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lift"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
            >
            <div className="mb-5 grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand">
              <span className="text-xs font-bold tracking-wide">{languages.find((language) => language.code === pendingLang)?.label}</span>
            </div>
            <h2 id="language-confirm-title" className="text-xl font-semibold">{confirmationCopy.title}</h2>
            <p id="language-confirm-description" className="mt-2 text-sm leading-relaxed text-muted-foreground">{confirmationCopy.message}</p>
            <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setPendingLang(null);
                  triggerRef.current?.focus();
                }}
                className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:bg-muted active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {confirmationCopy.cancel}
              </button>
              <button
                ref={confirmRef}
                type="button"
                onClick={confirmLanguageChange}
                className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-cta px-5 text-sm font-semibold text-cta-foreground shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-lift active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {confirmationCopy.confirm}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </button>
            </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    )}
    </>
  );
}

export function Logo({ src, className, lightText = false }: { src?: string; className?: string; lightText?: boolean }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const resolvedSrc = src ?? (isDark ? "/logo_dark.png" : "/logo_light.png");

  return (
    <a href="#top" className={cn("flex items-center gap-2.5", className)} aria-label="STATIONI">
      <img src={resolvedSrc} alt="STATIONI logo" className="h-9 w-auto" />
      <span className={cn("font-serif text-lg font-bold tracking-wide", lightText ? "text-white" : "text-black dark:text-white")}>STATIONI</span>
    </a>
  );
}

export function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#top");
  const links = [
    ["#problem", t.nav.problem],
    ["#how", t.nav.solution],
    ["#pilot", t.nav.pilot],
  ];

  useEffect(() => {
    const sections = ["top", "problem", "how", "pilot"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.15, 0.4, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-cta/70 bg-nav-shell text-nav-shell-foreground shadow-lift">
      <nav className="mx-auto flex h-[4.5rem] w-full items-center justify-between gap-3 px-4 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] sm:px-6 lg:px-10">
          <Logo className="shrink-0 gap-2" lightText={false} />
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  aria-current={activeHref === href ? "location" : undefined}
                  className={cn(
                    "relative inline-flex items-center rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ease-out",
                    activeHref === href
                      ? "bg-cta text-cta-foreground shadow-soft"
                      : "text-nav-shell-muted hover:bg-nav-shell-foreground/10 hover:text-nav-shell-foreground",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <div className="hidden sm:block"><LangSwitch /></div>
            <ThemeToggle />
            <CtaButton className="hidden px-4 py-2.5 text-sm transition-colors duration-300 hover:translate-y-0 hover:brightness-110 md:inline-flex">{t.nav.cta}</CtaButton>
            <button
              type="button"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-nav-shell-foreground/15 bg-nav-shell-foreground/5 text-nav-shell-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-cta/50 hover:bg-nav-shell-foreground/10 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={t.nav.menu}
              aria-expanded={open}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
      </nav>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-x-0 top-full border-t border-nav-shell-foreground/10 bg-nav-shell p-4 text-nav-shell-foreground shadow-lift lg:hidden"
            >
              <ul className="mx-auto grid max-w-3xl gap-1">
                {links.map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      aria-current={activeHref === href ? "location" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200",
                        activeHref === href ? "bg-cta text-cta-foreground" : "text-nav-shell-muted hover:bg-nav-shell-foreground/10 hover:text-nav-shell-foreground",
                      )}
                    >
                      {label}
                      <ArrowRight className="size-4 rtl:rotate-180" />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mx-auto mt-2 flex max-w-3xl items-center justify-between gap-3 border-t border-nav-shell-foreground/10 px-1 pt-3">
                <LangSwitch />
                <CtaButton className="px-4 py-2.5 text-sm transition-colors duration-300 hover:translate-y-0 hover:brightness-110">{t.nav.cta}</CtaButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </header>
  );
}

function HeroVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-2xl">
      <img
        src="/CAR.png"
        alt="Car approaching a camera controlled parking barrier"
        className="hero-car-glow block aspect-[3/2] w-full object-contain"
        fetchPriority="high"
      />
    </figure>
  );
}

export function Hero() {
  const { t } = useI18n();
  const icons = [Building2, Award, Gauge];
  return (
    <section id="top" className="relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal><p className="eyebrow">{t.hero.eyebrow}</p></Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-[680px] bg-gradient-to-r from-foreground via-foreground/80 to-foreground/55 bg-clip-text text-4xl font-semibold leading-[1.08] text-transparent sm:text-5xl lg:text-6xl">
              {t.hero.title1}
              <br />
              <span className="text-brand">{t.hero.title2}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}><p className="mt-6 max-w-[680px] text-lg leading-relaxed text-muted-foreground">{t.hero.sub}</p></Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
            <CtaButton>{t.hero.cta} <ArrowRight className="size-4 rtl:rotate-180" /></CtaButton>
            <CtaButton href="#how" variant="outline">{t.hero.cta2}</CtaButton>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-2.5">
            {t.hero.badges.map((b, i) => {
              const I = icons[i] ?? Award;
              return (
                <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground">
                  <I className="size-3.5 text-brand" /> {b}
                </span>
              );
            })}
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:translate-x-8 xl:translate-x-12"><HeroVisual /></Reveal>
      </div>
    </section>
  );
}

export function Numbers() {
  const { t, lang } = useI18n();
  return (
    <section className="border-t border-stats-accent/50 bg-stats-background py-12 text-stats-foreground md:py-14">
      <div className="container-page grid grid-cols-2 gap-8 lg:grid-cols-4">
        {t.numbers.map((n, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className="font-serif text-4xl font-semibold md:text-5xl" dir="ltr" style={{ textAlign: "start" }}>
              <Counter value={n.value} decimals={n.decimals} locale={lang} />
              <span className="text-2xl text-stats-accent">{n.suffix}</span>
            </p>
            <p className="mt-2 text-sm leading-snug text-stats-muted">{n.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
