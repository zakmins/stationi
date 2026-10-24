# STATIONI Smart Parking

Build a modern, high-conversion, single-page landing page for STATIONI (ستاسيوني), an Algerian deep-tech startup that modernizes existing parking lots with AI license plate recognition, without replacing their infrastructure.
## GOAL 
The page has two audiences: (1) parking owners and operators, residential developers, and commercial site managers, who should book a pilot; (2) jury members, incubators and partners, who should see credibility and field evidence. Primary CTA everywhere: "Request a pilot" / "Demander un pilote". Secondary CTA: "See how it works".
## LANGUAGES 
- Trilingual: French (default), Arabic (full RTL layout), English. Add a language switcher in the navbar. - Use i18n with a translation file per language. When Arabic is active, set dir="rtl" and mirror the layout properly.
- Tagline FR: "Moderniser les parkings existants, sans remplacer leur infrastructure."
- Tagline EN: "Modernize existing parking lots without replacing their infrastructure." - Tagline AR: "حدّث المواقف القائمة دون استبدال بنيتها التحتية."
## DESIGN
i attached the logos (dark and white themes)
- Typography: a confident serif for headings (Source Serif 4 or Merriweather), a clean sans for body (Inter). Arabic: Cairo or Tajawal. - Style: clean, premium, institutional but technical. Rounded cards (16px), soft shadows, generous whitespace, subtle scroll-reveal animations, no stock-photo clichés. - Fully responsive, mobile-first, accessible (good contrast, alt text, focus states). - Use lucide icons. For visuals, build CSS/SVG illustrations (camera → box → barrier flow, a license plate mock such as "00123 116 16"), and use placeholders where real photos will go.
## SECTIONS (in order) 
1. **Navbar** (sticky): logo, links (Problem, Solution, Segments, Pilot, Team), language switcher, orange CTA button "Request a pilot".
2. **Hero** - Headline: "Your parking lot, automated. Your barrier, kept." - Subheadline: STATIONI adds a camera and a local box to your existing barrier. It reads Algerian license plates, decides access locally, and logs every passage, even when the internet is down. - CTAs: "Request a pilot" + "See how it works".
- Trust badges: "Incubated at V2V Incubator, ENSIA", "ProtoMarket 2026 – MESRS", "TRL 4 → 5".
3. **Key numbers strip** (animated counters): - 157 users surveyed in Algiers - 1.95 / 5 average parking satisfaction (74% rate 1 or 2) - 4.61 / 5 declared importance of saving time at entry/exit - 3 field sites documented

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6863593d-fdbe-4e1d-bd2e-d077796e7f3d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
