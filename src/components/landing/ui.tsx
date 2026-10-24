import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function TaglineReveal({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {lines.map((line, lineIndex) => (
        <div key={line} className="flex flex-wrap gap-x-3 gap-y-1">
          {line.split(" ").map((word, wordIndex) => (
            <motion.span
              key={`${lineIndex}-${wordIndex}-${word}`}
              className="inline-block text-4xl font-semibold leading-none tracking-[-0.04em] text-foreground md:text-5xl lg:text-6xl"
              initial={{ opacity: 0.3, y: 18, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: lineIndex * 0.2 + wordIndex * 0.08, ease: [0.32, 0.72, 0, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Counter({ value, decimals, locale }: { value: number; decimals: number; locale: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: setN });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>{n.toLocaleString(locale === "ar" ? "ar-DZ-u-nu-latn" : locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>;
}

export function SectionHead({ eyebrow, title, light, className }: { eyebrow: string; title: string; light?: boolean; className?: string }) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className={cn("eyebrow", light && "text-cta")}>{eyebrow}</p>
      <h2 className={cn("mt-3 text-3xl font-semibold leading-tight md:text-4xl", light ? "text-navy-foreground" : "text-foreground")}>{title}</h2>
    </Reveal>
  );
}

export function CtaButton({ children, href = "#pilot", variant = "cta", className }: { children: ReactNode; href?: string; variant?: "cta" | "outline" | "ghostLight"; className?: string }) {
  const styles = {
    cta: "bg-cta text-cta-foreground shadow-soft hover:-translate-y-0.5 hover:brightness-105 hover:shadow-lift active:translate-y-0",
    outline: "border border-input bg-card text-foreground hover:border-brand/50 hover:bg-brand-soft",
    ghostLight: "border border-navy-muted/40 text-navy-foreground hover:border-cta/50 hover:bg-navy-foreground/10",
  }[variant];
  return (
    <a href={href} className={cn("inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]", styles, className)}>
      {children}
    </a>
  );
}

export function Plate({ text = "00123 116 16", className }: { text?: string; className?: string }) {
  return (
    <div dir="ltr" className={cn("inline-flex items-center gap-2 rounded-md border-2 border-foreground bg-plate px-3 py-1.5 font-mono text-lg font-bold tracking-[0.12em] text-foreground shadow-soft", className)} aria-label={`License plate ${text}`}>
      {text}
    </div>
  );
}

export function Bars({ data, max, unit = "%", accent = "brand" }: { data: { label: string; value: number }[]; max: number; unit?: string; accent?: "brand" | "cta" }) {
  return (
    <ul className="space-y-4">
      {data.map((d, i) => (
        <li key={d.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="text-foreground">{d.label}</span>
            <span className="shrink-0 font-semibold tabular-nums text-foreground" dir="ltr">{d.value}{unit === "%" ? "%" : ` ${unit}`}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className={cn("h-full rounded-full", accent === "brand" ? "bg-brand" : "bg-cta")}
              initial={{ width: 0 }}
              whileInView={{ width: `${(d.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
