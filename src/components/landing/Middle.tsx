import { useState } from "react";
import { AlertTriangle, Building, Camera, CheckCircle2, Cloud, Cpu, Database, Flag, HardDrive, Home, Plug, ShieldCheck, ShoppingBag, Timer, Wallet, XCircle, Zap } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Bars, Plate, Reveal, SectionHead, TaglineReveal } from "./ui";
import { cn } from "@/lib/utils";

export function Problem() {
  const { t } = useI18n();
  const icons = [Home, Wallet, ShoppingBag];
  return (
    <section id="problem" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHead eyebrow={t.problem.eyebrow} title={t.problem.title} />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="grid gap-4">
            {t.problem.cards.map((c, i) => {
              const I = icons[i] ?? Zap;
              return (
                <Reveal key={i} delay={i * 0.06} className="card-base flex min-w-0 gap-4 p-5">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><I className="size-5" /></div>
                  <div className="min-w-0"><h3 className="font-semibold text-foreground">{c.title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.text}</p></div>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="card-base p-6 md:p-8">
            <h3 className="mb-6 font-semibold text-foreground">{t.problem.chartTitle}</h3>
            <Bars data={t.problem.chart} max={100} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Evidence() {
  const { t } = useI18n();
  const e = t.evidence;
  return (
    <section className="bg-muted/60 py-20 md:py-28">
      <div className="container-page">
        <SectionHead eyebrow={e.eyebrow} title={e.title} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {e.cases.map((c, i) => (
            <Reveal key={i} delay={i * 0.06} className="card-base flex min-w-0 flex-col overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden border-b border-border bg-secondary">
                <img
                  src={["/bz.jpg", "/gr.jpg", "/ar.jpg"][i]}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <span className="rounded-full bg-warning-soft px-2.5 py-1 text-[11px] font-semibold text-warning">{c.tag}</span>
                <h3 className="mt-3 font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="card-base mt-6 p-6 md:p-8">
          <h3 className="mb-6 flex items-center gap-2 font-semibold text-foreground"><Timer className="size-4 text-cta" />{e.chartTitle}</h3>
          <Bars data={e.chart} max={60} unit={e.unit} accent="cta" />
        </Reveal>
      </div>
    </section>
  );
}

export function Shortfall() {
  const { t } = useI18n();
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <SectionHead eyebrow={t.shortfall.eyebrow} title={t.shortfall.title} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t.shortfall.cols.map((c, i) => (
            <Reveal key={i} delay={i * 0.06} className="card-base min-w-0 p-6">
              <XCircle className="size-6 text-destructive" />
              <h3 className="mt-4 font-semibold text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function How() {
  const { t } = useI18n();
  const icons = [Camera, Cpu, ShieldCheck, Plug, Database];
  return (
    <section id="how" className="bg-process-background py-20 text-process-foreground transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:py-28">
      <div className="container-page">
        <SectionHead eyebrow={t.how.eyebrow} title={t.how.title} />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {t.how.steps.map((s, i) => {
            const I = icons[i] ?? Zap;
            return (
              <li key={i} className="list-none">
                <Reveal delay={i * 0.07} className="h-full">
                  <div className="group h-full rounded-2xl border border-process-border bg-process-card p-5 text-process-foreground shadow-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-brand/50 hover:shadow-lift">
                  <div className="flex items-center justify-between">
                    <div className="grid size-11 place-items-center rounded-xl bg-cta text-cta-foreground transition-transform duration-500 group-hover:scale-105"><I className="size-5" /></div>
                    <span className="font-serif text-3xl text-process-muted/70 transition-colors duration-300 group-hover:text-brand">0{i + 1}</span>
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-widest text-process-muted">{t.how.stepLabel} {i + 1}</p>
                  <h3 className="mt-1 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-process-muted">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
          {t.how.flow.map((f, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="rounded-full border border-process-border bg-process-card px-3 py-1.5 text-process-muted">{f}</span>
              {i < t.how.flow.length - 1 && <span className="text-cta rtl:rotate-180">→</span>}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function TaglineRevealSection() {
  return (
    <section className="py-6 md:py-10">
      <div className="container-page">
        <Reveal className="rounded-[2rem] border border-border bg-card/80 p-6 shadow-soft md:p-10">
          <TaglineReveal
            lines={[
              "A smarter parking lot",
              "without a second queue at the gate.",
            ]}
            className="max-w-4xl text-balance"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function Resilience() {
  const { t } = useI18n();
  const r = t.resilience;
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <SectionHead eyebrow={r.eyebrow} title={r.title} />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-destructive/30 bg-card p-6">
            <h3 className="flex items-center gap-2 font-semibold text-foreground"><Cloud className="size-5 text-destructive" />{r.left.title}</h3>
            <ul className="mt-5 space-y-3">{r.left.items.map((x, i) => <li key={i} className="flex gap-2.5 text-sm text-muted-foreground"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />{x}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.08} className="rounded-2xl border-2 border-success/40 bg-success-soft p-6">
            <h3 className="flex items-center gap-2 font-semibold text-foreground"><HardDrive className="size-5 text-success" />{r.right.title}</h3>
            <ul className="mt-5 space-y-3">{r.right.items.map((x, i) => <li key={i} className="flex gap-2.5 text-sm text-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />{x}</li>)}</ul>
          </Reveal>
        </div>
        <Reveal><p className="mt-10 text-center font-serif text-2xl font-semibold text-foreground md:text-3xl">« {r.closing} »</p></Reveal>
      </div>
    </section>
  );
}

export function Segments() {
  const { t } = useI18n();
  const s = t.segments;
  const [active, setActive] = useState(0);
  const tab = s.tabs[active] ?? s.tabs[0]!;
  const icons = [Home, Wallet, Building];
  return (
    <section id="segments" className="bg-muted/60 py-20 md:py-28">
      <div className="container-page">
        <SectionHead eyebrow={s.eyebrow} title={s.title} />
        <div className="mt-10 flex flex-wrap gap-2" role="tablist">
          {s.tabs.map((x, i) => {
            const I = icons[i] ?? Zap;
            return (
              <button key={x.id} role="tab" aria-selected={active === i} onClick={() => setActive(i)}
                className={cn("inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active === i ? "bg-primary text-primary-foreground shadow-soft" : "border border-border bg-card text-muted-foreground hover:border-brand/40 hover:bg-brand-soft hover:text-foreground")}>
                <I className="size-4" />{x.label}
              </button>
            );
          })}
        </div>
        <div className="card-base mt-6 grid gap-8 p-6 md:grid-cols-2 md:p-8">
          <div>
            <div className="flex flex-wrap gap-2">
              {s.core.map((c, i) => <span key={i} className="rounded-lg bg-navy px-3 py-2 text-sm font-semibold text-navy-foreground">{c}</span>)}
            </div>
            <div className="my-3 h-6 w-0.5 bg-border ms-6" />
            <div className="flex flex-wrap gap-2">
              {tab.rules.map((r, i) => <span key={i} className="rounded-lg border border-brand/30 bg-brand-soft px-3 py-2 text-sm font-medium text-brand">{r}</span>)}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow">{s.targetLabel}</p>
            <p className="mt-2 text-lg font-medium text-foreground">{tab.target}</p>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{s.footnote}</p>
      </div>
    </section>
  );
}

export function Why() {
  const { t } = useI18n();
  const icons = [Zap, Flag, Timer];
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <SectionHead eyebrow={t.why.eyebrow} title={t.why.title} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t.why.cards.map((c, i) => {
            const I = icons[i] ?? Zap;
            return (
              <Reveal key={i} delay={i * 0.06} className="h-full">
                <article className="group card-base h-full p-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-lift">
                  <div className="grid size-11 place-items-center rounded-xl bg-cta/15 text-cta transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 group-hover:bg-cta/25">
                    <I className="size-5 transition-transform duration-500 group-hover:rotate-[-8deg]" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-brand">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Compat() {
  const { t } = useI18n();
  return (
    <section className="bg-muted/60 py-20 md:py-28">
      <div className="container-page">
        <SectionHead eyebrow={t.compat.eyebrow} title={t.compat.title} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t.compat.cards.map((c, i) => (
            <Reveal key={c.letter} delay={i * 0.06} className={cn("card-base p-6", i === 0 && "border-2 border-success/40")}>
              <span className={cn("grid size-10 place-items-center rounded-full font-serif text-lg font-bold", i === 0 ? "bg-success text-primary-foreground" : i === 1 ? "bg-warning-soft text-warning" : "bg-muted text-muted-foreground")}>{c.letter}</span>
              <h3 className="mt-4 font-semibold text-foreground">{c.title}</h3>
              {c.note && <p className="mt-1 text-xs font-medium text-muted-foreground">{c.note}</p>}
              <p className="mt-4 text-sm font-semibold text-brand">→ {c.action}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Product() {
  const { t } = useI18n();
  const p = t.product;
  const tone = { working: "bg-success-soft text-success", bench: "bg-warning-soft text-warning", next: "bg-secondary text-muted-foreground" } as const;
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <SectionHead eyebrow={p.eyebrow} title={p.title} />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="card-base overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted text-start"><tr><th className="p-4 text-start font-semibold">{p.component}</th><th className="p-4 text-start font-semibold">{p.status}</th></tr></thead>
              <tbody>
                {p.rows.map((r, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="p-4 text-foreground">{r.name}</td>
                    <td className="p-4"><span className={cn("whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold", tone[r.status as keyof typeof tone])}>{p.statuses[r.status as keyof typeof p.statuses]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="border-t border-border p-4 text-xs text-muted-foreground">{p.accuracy}</p>
          </Reveal>
          <Reveal delay={0.08} className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
            <div className="card-base p-5" aria-label={p.dash.title}>
              <p className="text-sm font-semibold text-foreground">{p.dash.title}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-secondary p-3"><p className="text-[11px] text-muted-foreground">{p.dash.occupancy}</p><p className="font-serif text-2xl font-semibold" dir="ltr">72%</p></div>
                <div className="rounded-xl bg-secondary p-3"><p className="text-[11px] text-muted-foreground">{p.dash.vehicles}</p><p className="font-serif text-2xl font-semibold" dir="ltr">86</p></div>
              </div>
              <p className="mt-4 text-[11px] font-medium text-muted-foreground">{p.dash.log}</p>
              <ul className="mt-2 space-y-2 text-xs">
                {[["00123 116 16", 1, "08:42"], ["04512 117 31", 0, "08:39"], ["11873 120 16", 1, "08:35"]].map(([pl, inn, tm]) => (
                  <li key={pl as string} className="flex items-center justify-between rounded-lg border border-border px-2.5 py-1.5">
                    <span className="font-mono" dir="ltr">{pl}</span>
                    <span className={cn("rounded-full px-2 py-0.5 font-semibold", inn ? "bg-success-soft text-success" : "bg-secondary text-muted-foreground")}>{inn ? p.dash.in : p.dash.out}</span>
                    <span className="text-muted-foreground" dir="ltr">{tm}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[10px] italic text-muted-foreground">{p.dash.mock}</p>
            </div>
            <div className="mx-auto w-full max-w-[200px] rounded-[2rem] border-4 border-navy bg-card p-4 shadow-lift" aria-label={p.app.title}>
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-navy/20" />
              <p className="text-xs font-semibold text-foreground">{p.app.hello}</p>
              <div className="mt-3 flex justify-center"><Plate className="px-2 py-1 text-xs" /></div>
              <div className="mt-4 rounded-xl bg-success-soft p-3 text-center text-[11px] font-semibold text-success"><CheckCircle2 className="mx-auto mb-1 size-4" />{p.app.open}</div>
              <p className="mt-3 text-[10px] text-muted-foreground">{p.app.last} · <span dir="ltr">08:42</span></p>
              <button tabIndex={-1} className="mt-3 w-full rounded-lg bg-cta py-2 text-[11px] font-semibold text-cta-foreground">{p.app.guest}</button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
