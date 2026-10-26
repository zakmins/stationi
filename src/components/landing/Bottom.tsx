import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Logo } from "./Top";
import { Reveal, SectionHead } from "./ui";
import { cn } from "@/lib/utils";

export function Roadmap() {
  const { t } = useI18n();
  return (
    <section id="roadmap" className="bg-muted/60 py-20 md:py-28">
      <div className="container-page">
        <SectionHead eyebrow={t.roadmap.eyebrow} title={t.roadmap.title} />
        <ol className="relative mt-12 grid gap-5 md:grid-cols-4">
          <div className="absolute inset-x-0 top-5 hidden h-0.5 bg-border md:block" />
          {t.roadmap.phases.map((p, i) => (
            <Reveal key={i} delay={i * 0.07} className="relative">
              <span className={cn("relative grid size-10 place-items-center rounded-full text-sm font-bold", i === 1 ? "bg-cta text-cta-foreground" : "bg-primary text-primary-foreground")}>{i + 1}</span>
              <p className="mt-4 text-xs font-semibold tracking-widest text-brand" dir="ltr" style={{ textAlign: "start" }}>{p.m}</p>
              <h3 className="mt-1 font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal><p className="card-base mt-10 p-5 text-center font-medium text-foreground">{t.roadmap.sites}</p></Reveal>
      </div>
    </section>
  );
}

export function Team() {
  const { t } = useI18n();
  return (
    <section id="team" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHead eyebrow={t.team.eyebrow} title={t.team.title} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.team.members.map((m, i) => (
            <Reveal key={i} delay={i * 0.06} className="card-base p-6">
              <div className="grid size-14 place-items-center rounded-full bg-brand-soft font-serif text-lg font-bold text-brand">
                {m.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{m.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">{t.team.incubator}</p>
      </div>
    </section>
  );
}

type Fields = { name: string; company: string; phone: string; email: string; type: string; spaces: string; message: string };
const empty: Fields = { name: "", company: "", phone: "", email: "", type: "", spaces: "", message: "" };

export function Pilot() {
  const { t } = useI18n();
  const p = t.pilot;
  const [v, setV] = useState<Fields>(empty);
  const [err, setErr] = useState<Partial<Record<keyof Fields, string>>>({});
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: typeof err = {};
    (["name", "company", "phone", "email", "type"] as const).forEach((k) => { if (!v[k].trim()) x[k] = p.errors.required; });
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) x.email = p.errors.email;
    if (v.phone && !/^\+?[\d\s.-]{9,15}$/.test(v.phone)) x.phone = p.errors.phone;
    if (v.spaces && !(Number(v.spaces) > 0)) x.spaces = p.errors.spaces;
    setErr(x);
    if (Object.keys(x).length === 0) setDone(true);
  };

  const input = "mt-1.5 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring dark:border-process-border dark:bg-background";
  const field = (k: keyof Fields, type = "text") => (
    <label className="block text-sm font-medium text-foreground">
      {p.fields[k]}
      <input type={type} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} className={cn(input, err[k] && "border-destructive")} aria-invalid={!!err[k]} />
      {err[k] && <span className="mt-1 block text-xs text-destructive">{err[k]}</span>}
    </label>
  );

  return (
    <section id="pilot" className="bg-navy py-20 text-navy-foreground md:py-28 dark:bg-process-background dark:text-process-foreground">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{p.title}<br /><span className="text-cta">{p.title2}</span></h2>
          <p className="mt-5 max-w-md text-navy-muted dark:text-process-muted">{p.sub}</p>
        </Reveal>
        <Reveal delay={0.08} className="min-w-0 rounded-lg bg-card p-6 text-foreground shadow-lift md:p-8 dark:bg-process-card dark:text-process-foreground">
          {done ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto size-12 text-success" />
              <p className="mt-4 text-lg font-semibold">{p.success}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.successSub}</p>
              <button onClick={() => { setV(empty); setDone(false); }} className="mt-6 text-sm font-semibold text-brand underline">{p.again}</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
              {field("name")}{field("company")}{field("phone", "tel")}{field("email", "email")}
              <label className="block text-sm font-medium">
                {p.fields.type}
                <Select value={v.type} onValueChange={(type) => setV({ ...v, type })}>
                  <SelectTrigger
                    aria-invalid={!!err.type}
                    className={cn(input, "flex h-11 cursor-pointer items-center justify-between shadow-none focus:ring-2 focus:ring-ring", err.type && "border-destructive")}
                  >
                    <SelectValue placeholder={p.choose} />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-border bg-card p-1.5 text-foreground shadow-lift">
                    {Object.entries(p.types).map(([k, label]) => (
                      <SelectItem key={k} value={k} className="rounded-md px-3 py-2.5 focus:bg-brand-soft focus:text-foreground">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {err.type && <span className="mt-1 block text-xs text-destructive">{err.type}</span>}
              </label>
              {field("spaces", "number")}
              <label className="block text-sm font-medium sm:col-span-2">
                {p.fields.message}
                <textarea rows={4} value={v.message} onChange={(e) => setV({ ...v, message: e.target.value })} className={input} />
              </label>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-cta px-5 py-3 text-sm font-semibold text-cta-foreground shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-lift active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:col-span-2">
                {p.submit} <Send className="size-4 rtl:rotate-180" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  const f = t.footer;
  const links: [string, string][] = [["#problem", t.nav.problem], ["#how", t.nav.solution], ["#pilot", t.nav.pilot]];
  return (
    <footer className="border-t border-navy-muted/20 bg-navy py-14 text-navy-foreground dark:border-process-border dark:bg-process-background dark:text-process-foreground">
      <div className="container-page grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo src="/logo_dark.png" lightText />
          <p className="mt-4 max-w-sm text-sm text-navy-muted dark:text-process-muted">{f.desc}</p>
          <p className="mt-3 text-xs text-navy-muted dark:text-process-muted">{f.plan}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">{f.links}</p>
          <ul className="mt-3 space-y-2 text-sm text-navy-muted dark:text-process-muted">{links.map(([h, l]) => <li key={h}><a href={h} className="hover:text-navy-foreground dark:hover:text-process-foreground">{l}</a></li>)}</ul>
        </div>
        <div>
          <p className="text-sm font-semibold">{f.contact}</p>
          <ul className="mt-3 space-y-2 text-sm text-navy-muted dark:text-process-muted">
            <li className="flex items-center gap-2"><MapPin className="size-4" />{f.location}</li>
            <li className="flex items-center gap-2"><Mail className="size-4" /><a href="#pilot" className="hover:text-navy-foreground dark:hover:text-process-foreground">{t.nav.cta}</a></li>
          </ul>
        </div>
      </div>
      <p className="container-page mt-10 text-xs text-navy-muted dark:text-process-muted">{f.rights}</p>
    </footer>
  );
}
