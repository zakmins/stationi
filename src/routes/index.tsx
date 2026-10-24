import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/i18n/context";
import { Navbar, Hero, Numbers } from "@/components/landing/Top";
import { Problem, Evidence, Shortfall, How, Why } from "@/components/landing/Middle";
import { Pilot, Footer } from "@/components/landing/Bottom";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STATIONI" },
      { name: "description", content: "Reconnaissance de plaques algériennes par IA, ajoutée à votre barrière existante. Fonctionne même sans internet." },
      { property: "og:title", content: "STATIONI" },
      { property: "og:description", content: "Caméra + boîtier local sur votre barrière existante. Demandez un pilote." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <Hero />
        <Numbers />
        <Problem />
        <Evidence />
        <Shortfall />
        <How />
        <Why />
        <Pilot />
      </main>
      <Footer />
    </I18nProvider>
  );
}
