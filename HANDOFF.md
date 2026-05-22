# HANDOFF — Hôtel Ambalakely site

This file is the **single source of truth** for whoever picks up this project on another machine. It contains everything needed to continue working without context loss : architecture, decisions, real data, what's done, what's next, and the strict rules to follow.

Last updated: 2026-05-22 (Sanity CMS setup on PC 2)

---

## 0. The prompt to paste into Claude Code on the other PC

Copy-paste this block as the first message to Claude Code in the new repo:

> I'm continuing work on Hôtel Ambalakely (a real boutique hotel in Madagascar). The full context, architecture decisions, real verified facts, and todo list are in HANDOFF.md at the project root. Read HANDOFF.md first, then look at the current task list. The site is deployed at https://ambalakely.vercel.app. I will continue on this PC in parallel to my other machine — be careful with git conflicts. Reference documents are in docs/ (original PDF, Word, PPT from Mamy + Hasina).

That's it. Claude reads HANDOFF.md and has everything.

---

## 1. What this is

- **Hôtel Ambalakely** : real 10-room boutique hotel in Fianarantsoa, Madagascar, owned by Mamy + Hasina Randriamahazo since October 2018.
- They also run **Trans Groupe Hasina (TGH)**, a travel agency they founded ~20 years ago, organising tours across all of Madagascar.
- Existing site is on Squarespace at `https://hotelambalakely.com`. We are rebuilding it on Next.js (this repo), deploying to Vercel, and planning to migrate the domain when ready.
- Stack: Next.js 15 (App Router) + TypeScript + Tailwind v4 + GSAP + Lenis + Mapbox + Phosphor Icons + Vercel hosting + Resend (planned).

## 2. Current state of deployment

- **Prod URL** : `https://ambalakely.vercel.app`
- **Domain custom** (`hotelambalakely.com`) : NOT migrated yet. Still pointing to Squarespace.
- **Branch** : `feat/dining-hero-polish` (working branch, not yet merged to main)
- **Last commit** : the "truth pass" replacing all invented facts with verified data
- **Build status** : green, all TypeScript checks pass

Vercel project : `tahinas-projects-0021cf78/ambalakely`. Use `npx vercel --prod --yes` to deploy, then `npx vercel alias <new-url> ambalakely.vercel.app` to alias.

## 3. The cardinal rules (NEVER break these)

1. **No invented facts.** Every price, hour, bed material, bio detail must come from the documents in `docs/` (see section 6). When in doubt, leave a `// TODO: verify with Hasina` comment instead of guessing.
2. **No "best rate guaranteed" / gambling marketing.** This is an editorial hotel, not a Booking.com clone. Keep the voice restrained.
3. **No evangelization / écoles du dimanche / Sunday school mentioned.** Hope for the Future's real religious activities exist but are kept off the business-facing site by editorial decision.
4. **Single contact point** : `hello@hotelambalakely.com` + `+261 34 11 254 34`. NEVER expose internal staff phones (M. Héris, M. Mamy direct, Mme Mamitiana, `transg.hasina@moov.mg`).
5. **No menu/dishes section on /dining for now.** Prices stay, hours stay, restaurant intro stays. The "signature dishes" section is removed until Hasina validates a selection.
6. **No fake stars/ratings.** The previous "4.9 / 127 reviews on TripAdvisor and Booking" was invented. Until we have the real number from a live API or screenshot from Hasina, the rating block on /reviews shows just "Avis vérifiés sur TripAdvisor et Booking" without a number.
7. **French is primary, English secondary, Norwegian niche.** Madagascar is francophone + the existing site is FR. Norwegian content via TGH is bonus.
8. **Photos** : 47 real WebP photos live at `/public/photos/p01_*.webp` to `p47_*.webp` (33 MB total, optimized from 131 MB JPG originals at 75% quality reduction). They are NOT yet mapped to components — the site still uses the original Squarespace CDN URLs. Component integration is the next pending task.
9. **TGH and the hotel are TWO sister businesses** but share the same owners and team. TGH appears as a section on `/about` only — no separate page yet.
10. **Sanity CMS was prepared then reverted.** We decided to fix all content in `.ts` files first, then migrate to Sanity once content is stable. See section 11.

## 4. Architecture overview

```
src/
├── app/
│   ├── page.tsx              homepage
│   ├── layout.tsx            root layout (Geist + Geist Mono fonts)
│   ├── template.tsx          page transitions
│   ├── about/                Mamy + Hasina + TGH
│   ├── community/            Hope for the Future + Akanimamy
│   ├── dining/               Toko Telo restaurant (no menu currently)
│   ├── experiences/          activities/excursions
│   ├── faq/                  searchable FAQ
│   ├── journal/              blog (3 fake articles to be replaced)
│   │   └── [slug]/           individual article pages
│   ├── plan-your-trip/       RN7 itineraries
│   └── rooms/                rooms hub + [category]
├── components/
│   ├── atoms/                BookingButton, Container, Section, Heading, etc.
│   ├── molecules/            PageHero, BookingDrawer, FaqSearch, etc.
│   └── sections/             Hero, Stay, Dining, Story, Reviews, etc.
├── lib/
│   ├── data/                 hotel.ts, categories.ts, rooms.ts, experiences.ts,
│   │                         articles.ts, itineraries.ts, faq.ts, comparison.ts
│   ├── motion/               ScrollReveal, SmoothScrollProvider
│   └── utils/                cn.ts, format.ts (formatMga)
└── styles/                   globals.css

public/
├── photos/                   47 real WebP photos (not yet wired)
└── favicon.ico
```

### Design system in globals.css
- Single font scale h1/h2 : `text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em]` (canonical)
- `.lede-display` : 28/40 page-intro paragraph
- `.lede` : 22/28 sub-section intro
- `.prose-editorial`, `.pull-quote`, `.caption`, `.concierge-note`, `.spec-row`, `.hair-rule`
- Sand-12 palette + ore accent
- All section captions removed where redundant with h2

## 5. Real verified data — DO NOT change without re-checking the source documents

### Hotel basics (from `Tarifs Publics 2026.pdf` and `Kirsten beskrivelse.docx`)
- Name: **Hôtel Ambalakely**
- Founded: **October 2018** by Mamy + Hasina Randriamahazo
- 10 rooms, capacity 20–28 guests
- Location: **on the RN7, 12 km north of Fianarantsoa**
- GPS: **21°25' S, 47°10' E**, altitude **1 082 m**
- Postal address: **BP 1188, Fianarantsoa 301, Madagascar**
- Contact public unique: `hello@hotelambalakely.com` + `+261 34 11 254 34`
- Concept: **"Eny ambanivohitra"** = "à la campagne" (their phrase from the PDF)
- Languages: FR, EN, NO, MG

### Room categories (from PDF Tarifs 2026 + Kirsten doc)

| Category | Rooms | Numbers | Size | Capacity | Public price | Day use |
|---|---|---|---|---|---|---|
| **Supérieure** | 2 | 14 (Rogaland Suite), 15 (Kristiansand Suite) | 43 m² | 1–4 | **255 000 Ar** | 192 000 Ar |
| **Confort** | 4 | 1, 2, 11, 12 | 29 m² | 1–3 | **226 000 Ar** | 170 000 Ar |
| **Standard** | 4 | 4, 5, 6, 7 | 21 m² | 1–2 | **182 000 Ar** | 137 000 Ar |

Extras:
- Local tax + tourist sticker: **3 000 Ar** per stay
- Extra bed: **35 000 Ar** (free under 12)
- Day use rate from PDF 2026: **75 %** of public rate (Kirsten doc said 50 %, PDF is more recent)
- Bed materials: **palissandre + katrafay** (NOT voamboana — that was an earlier invention)
- Bed dimensions: king 200×200, single 90×200, double 180×200
- All bathrooms private with hot water all day
- 220 V, French type E plugs, generator backup
- Mosquito nets in every room

### Restaurant Toko Telo (PDF + Kirsten doc)

- 50 seats ground floor
- Upstairs terrace = pizzeria, open 10h–21h30
- Hours: breakfast **5h30–9h**, lunch **11h–14h**, dinner **18h30–21h30**
- Check-in: **12h–13h**, check-out: **11h**
- Day room: 50 % (Kirsten doc) or 75 % (PDF). Use PDF figure.
- Payment: cash MGA/EUR, cheque, Visa/Mastercard with 5% fee, voucher, transfer
- Multifunctional: weddings, baptisms, conferences (up to 80 people indoor, ~100 in the garden)

Prices (PDF 2026):
- Petit déjeuner Malagasy: **25 000 Ar**
- Petit déjeuner complet: **38 000 Ar**
- Lunch/dinner 1 service: **40 000 Ar**
- Lunch/dinner 2 services: **59 000 Ar**
- Lunch/dinner 3 services: **72 000 Ar**
- Children 5–12: 50 %
- Children under 5: free
- Picnic basket: **50 000 Ar**

Transfers (PDF 2026):
- Fianarantsoa airport ↔ hotel: **70 000 Ar** for 1–3 people
- Hotel ↔ Fianarantsoa town: **65 000 Ar** for 1–3 people

**Confirmed signature dishes** (mentioned in Squarespace and/or Kirsten doc — but NOT currently displayed on /dining per user direction):
- Zébu Marengo
- Kjøttkaker (Norwegian meatballs)
- Krumkake (Norwegian rolled wafer)

DO NOT list other dishes (Ravitoto, Trondra, etc.) without explicit confirmation.

### Founders bios (verified from "Site web — pour les Norvégiens" docx)

- **Hasina RANDRIAMAHAZO** : studied at **Universitetet i Stavanger**, Norway. Spent **5 years** in Norway. Speaks Norwegian fluently. Her mother was a lifelong friend of a Norwegian missionary's daughter in Madagascar; her father had Norwegian colleagues. She has travelled to North Cape ("Midnattsolen" / midnight sun).
- **Mamy RANDRIANANDRAINA** (different family name) : a "practical man and a great connoisseur of Madagascar". Network and field knowledge.
- **Together**: 20 years of tourism business via Trans Groupe Hasina, focused on responsible and sustainable tourism.
- Hasina mentions Mamy as "mon mari" (my husband) in the Akanimamy PPT, so they are married.

DO NOT invent further bio details (agronomy, 15 years development, godmother, 4 winters Oslo, children, dogs, etc.). Stick to the above.

### Team (verified from Norwegian docx)

- **André RANDRIANIRINA** : financial manager since 2013, hiking enthusiast (Andringitra, Isalo Window)
- **Seheno RANDRIAMANANA R.** : travel consultant, from Ihosy (near Isalo). Former student of Hasina at Université de Fianarantsoa in "Sustainable and ecotourism"
- **M. Héris** : receptionist (do not name on the public site)
- **Mme Mamitiana** : staff (do not name on the public site)

### Hope for the Future (verified from "Akanimamy by Seheno.pptx")

- Founded **2014** in the **Tanambao quartier** of Ambalakely
- **130 active children**
- Tanambao commune has ~4 000 inhabitants
- **9 programs** in the PPT, of which we keep **8 publicly** (we filter out the religious ones per user direction):
  1. Education (after-school support, French/Malagasy/maths, hot lunch on school days)
  2. ~~Évangélisation: écoles du dimanche, chorale, visites d'églises~~ ← FILTERED OUT
  3. Santé et hygiène
  4. Danse, musique et sport
  5. Environnement et agriculture
  6. Arts et travaux pratiques
  7. Clubs de langues (anglais, norvégien, français en projet)
  8. Histoire et connaissances générales
  9. Formation professionnelle
  10. Mimes et théâtre (à venir)
- Sponsor mentioned: **Famille Demay** ("la famille", c'est de la famille). Do NOT name them publicly — they're private donors.

### Akanimamy (the building)

- "**Akany**" (foyer/nid) + "**mamy**" (doux) = **"doux foyer / nid douillet"**
- Land: 2 000 m² acquired in **2019**
- Building: **152 m²** (approx 8 × 19 m)
- Construction started **1er septembre 2020**
- Murs et toiture terminés (au moment du PPT)
- Reste à faire : sanitaires, cuisine, terrains basket/volley
- Planned features: library (books from Norwegian guests + French school), board games, project chef office, storage, basketball/volleyball court, fruit trees, vegetable garden, fish farm with ducks, Ravintsara plantation

### Origin myth of "Ambalakely" name (verified from cultural excursion content shared by user)

- Roi **Raindratsara** lived at the top of Mount **Ialagnanindro**
- 3 children: **Ivohibato**, **Lalangina**, **Isandra**
- During colonisation, heir **Ramaharo** had 16 children (9 boys, 7 girls). Only one boy survived.
- Two types of enclos: **VALAKELY** (small, for peasants' zebus) and **VALABE** (large, royal)
- After the death of 8 of Ramaharo's sons, many zebus were sacrificed (in valakely). The place was named "AMBALAKELY" = "at the small enclos"
- Ramaharo's **Lapa** (palace) is visitable
- He encouraged the construction of the **RN7**

### 3 real Betsileo cultural circuits (from user-shared content)

- **Circuit Antsolaitra** (2–4 h, Easy) : Betsileo village, Maison Royale Prince Ramaharo, ferronnerie, tissage, recyclage de pneus, briqueterie artisanale, scènes vie rurale, point de vue
- **Circuit Vatolahy** (3h30–4 h, Medium) : Village Antokomasiaky, maison Betsileo, cité royale, pierre levée + maison rouge **Tranomena**, ancienne fromagerie
- **Circuit Matsiatra** (4 h, Difficult) : marche le long de la rivière Matsiatra, **valabe** (étable), ancien camp militaire colonial, maison royale, tombeau royal

Stats Ambalakely commune: 12 km from Fianarantsoa, **17 000 inhabitants**, 54 km² in the district de Lalangina.

### Other excursions (verified Squarespace + Kirsten doc)

- **Ranomafana National Park** : 50 km NE, ~1h drive. Lemurs (Milne-Edwards' sifaka, golden bamboo lemur). Around 280 000 Ar/person all-in.
- **Sahambavy tea estate** : 13 km E. Only commercial tea plantation in Madagascar. ~90 000 Ar/person + driver.
- **Fianarantsoa old town (UNESCO)** : 12 min drive, ~80 000 Ar/person + driver. Pierrot Men photography studio.
- **Ambositra woodcarving** : 2h N, ~180 000 Ar/person + driver
- **Ambalavao** : 70 km S, ~1h15. Wine (Soavita, Lazan'i Betsileo), Antemoro paper (avoha bark), Wednesday ox market, lemur reserve
- **Andringitra/Tsaranoro trek** : 3 days, ~1 200 000 Ar/person all-in
- **Tsaranoro stargazing** : overnight, ~400 000 Ar/person all-in
- **Train Fianarantsoa → East coast** : 500 m from hotel
- **Vohimasina walking tour** : starts ~1 km from gate, 2 h to full day, FREE for hotel guests
- **Hope for the Future visit** : Tuesdays/Thursdays half-days, FREE

### 9 real guest reviews (verbatim from hotelambalakely.com, FR)

Already in `src/lib/data/rooms.ts`:
1. Polly P. — TripAdvisor — "Un véritable joyau ! Un bel emplacement construit dans le style Betsileo, avec un personnel amical."
2. KingfisherOslo — TripAdvisor — "Emplacement unique à la campagne. L'Hôtel Ambalakely est un véritable joyau situé à 10 minutes."
3. Ada — Booking — "Un trésor rare au milieu de Madagascar ! Excellent séjour. Nous sommes toujours accueillis avec des sourires."
4. Bernt R. — TripAdvisor — "Excellente nuit à Ambalakely. C'est l'endroit parfait où séjourner, très agréable ambiance."
5. Ruth Barbara W. — Google — "Très bel hôtel avec jardin paisible. Le repas était excellent. Chambres spacieuses et propres."
6. Anna Maria — Google — "Bel endroit ! Le propriétaire parle un anglais parfait, nous avons eu un surclassement de chambre."
7. Femke V. — TripAdvisor — "Super endroit où séjourner. Nous y avons passé une seule nuit mais aurions aimé rester plus longtemps."
8. Kristin O. V. — TripAdvisor — "Très bel endroit. Un très bon service, une excellente nourriture et une atmosphère relaxante fantastique."
9. Giovanni — Booking — "Un must absolu si vous êtes en ville. Emplacement idyllique, juste à côté des rizières absolument tranquille."

### Madagascar's "Small Five" (great content marketing — from Norwegian docx)
1. Mouse Lemur (Microcebus)
2. Brookesia Micra
3. Pachypodium (small baobab)
4. Anodonthyla eximia
5. Trachelophorus giraffa (giraffe weevil)

This is unique vs Africa's "Big Five" — gold for a journal article.

## 6. The source documents (in `docs/`)

- `Publics 2026 Hôtel Ambalakely - Tarifs et Politiques de Vente.pdf` : the master pricing document for 2026
- `Hotel Ambalakely beskrivelse Kirsten.docx` : detailed description in Norwegian, source for hours, room numbers, bed materials
- `Akanimamy by Seheno.pptx` : Hope for the Future overview, source for programs + Akanimamy
- `Site web-contenus pour les norvégiens version 2 pour Max.docx` : Norwegian-language website content, source for TGH bio + Hasina's Norway story + activities

**Re-read these before changing any verified fact.**

## 7. Photos — 47 real WebP files

Location: `public/photos/p01_*.webp` to `p47_*.webp` (33 MB total).

Generated from `~/Desktop/hotel/photos_optimisationeeded/` (original 131 MB JPG) via:
```
cwebp -q 82 -resize 2560 0 input.jpg -o output.webp -quiet
```

**Status** : uploaded to `/public`, NOT yet wired into components. The site currently still references Squarespace CDN URLs (works, but not the highest quality).

**Next step for photos**:
- Identify what each photo shows (room, exterior, garden, dining, etc.)
- Map to components: Hero, Story (homepage), room category galleries, /dining, /community
- Replace Squarespace URLs with `/photos/p**.webp` paths
- Use Next/Image with proper `sizes` attribute for responsive

A simple way: build a temporary `/admin/photos` page that lists all 47 in a grid with their filenames, deploy it, look at it, then write down the mapping (manual but accurate).

## 8. What's done (recent commits on `feat/dining-hero-polish`)

- Editorial pass on Reviews + Story + Article byline (Substack-style)
- Typography unified to one canonical h1/h2 scale (44/56)
- Format helpers DRY (`formatMga` in single util)
- Currency unified to "Ariary" everywhere
- Lede-display utility extracted
- Rating data unified between UI and JSON-LD via `HOTEL.rating`
- Page transitions sand fade
- Phosphor icons added to Footer contact, FAQ pills, Location, Plan-your-trip
- /rooms/[category] world-class pass : quick facts spec sheet, icon list features, room thumbnails
- Section captions redondantes retirées (Experiences, The house, Guests)
- FAQ search/pills désticked
- /community : icônes Phosphor sur numbers + missions
- /community 01/02/03 numérotation retirée des 3 piliers
- Sanity setup tested then reverted (deferred to later)
- **Truth pass** : all fake data replaced with verified facts (massive last commit)
- /dining menu/dishes section removed (per user direction, 2026-05-22)

## 9. What's pending (priority order)

### Tier 1 — Truth (1 task remaining)
- **T1.7 — Map 47 real photos to components**
  - Identify which photo shows what
  - Replace Squarespace CDN URLs in Hero, Story, room categories, Dining, Community, Trust
  - Use `next/image` with responsive sizes

### Tier 2 — Foundation pages
- **`/fianarantsoa-region` pillar (NEW page)** : the destination authority page, 2 500+ words, photo-rich. Content: Raindratsara legend, VALA etymology, Betsileo culture (NE house orientation, sacred brick-making), the Lapa, Pierrot Men, Madagascar's Small Five, panorama + map. SEO killer.
- **Refaire `/excursions`** with the 3 real Betsileo circuits (Antsolaitra, Vatolahy, Matsiatra) + Ranomafana, Sahambavy, Ambositra, Andringitra, Ambalavao, Antemoro, Fianarantsoa old town, train station.
- **Confirm /about** with verified bios + TGH (already mostly done in truth pass — review one more time).
- **Confirm /community** (already mostly done).
- **/dining** : decide whether to add the signature dishes section back when Hasina validates, or keep without menu.

### Tier 3 — SEO + Content moat
- **Google Business Profile** setup + listings
- **Search Console** registered + sitemap submitted
- **5 cornerstone journal articles** :
  1. "The legend of Ambalakely : how a village was named after sacrificial enclos"
  2. "Madagascar's Small Five vs Africa's Big Five"
  3. "Eny ambanivohitra : the village concept that built our hotel"
  4. "5 winters in Stavanger and 7 highland years"
  5. "Where to stay on the RN7"
- **Existing 3 fake articles** in `data/articles.ts` (Hasina-voice essays previously invented) should be **deleted or archived** — they are not real and shouldn't be on the site. The real Squarespace blog has 4 hiking articles by Max William RAFALIARISON; we should either import those properly or leave /journal empty until Hasina writes.

### Tier 4 — CMS (DONE on `feat/cms-setup` branch, see section 11)
- ✅ Sanity installed at `sanity@5.26`, `next-sanity@12`, `@sanity/client@7`, `@sanity/vision@5`, `@sanity/image-url@2`
- ✅ Studio mounted at `/studio` (login OK, list views OK ; doc-edit crashes — workaround = `sanity.io/manage`, see section 11)
- ✅ 10 schemas (FR/EN bilingual via `localeString`/`localeText`/`localePortableText`)
- ✅ 88 docs migrated (1 hotel, 3 roomCategory, 9 review, 3 article, 10 excursion, 3 itinerary, 47 faq, 4 staff, 1 community, 7 page)
- ✅ 47 photos uploaded as Sanity assets
- ⚠️ Frontend wiring : partial (6 of ~22 files). Pattern established. Remaining listed in this section's pending list.

### Tier 5 — i18n
- **FR ↔ EN bilingual** : `next-intl` is already installed. Add EN translations to all pages. Default route: FR. EN at `/en/...`. Hreflang properly set.

### Tier 6 — Distribution
- **Domain migration** : transfer DNS from Squarespace (Squarespace Domains LLC, expires 2027-03-15) → point A record `@` to `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`. Squarespace site becomes inaccessible.
- **Long-term** : transfer registrar to Cloudflare for ~10€/year instead of ~20€ Squarespace.
- **301 redirects** from old Squarespace URLs.
- **Backlinks outreach** : Géo, Lonely Planet, Le Routard, Condé Nast Traveler, Norwegian travel mags via Hasina's network, Tourism Board Madagascar.

### Functional missing (also pending)
- **Booking system** : `BookingDrawer.tsx` is a static form. No API route exists. Needs Resend integration with POST `/api/booking-request` sending an email to `hello@hotelambalakely.com`.
- **Newsletter** : `NewsletterSignup.tsx` has a fake `setTimeout(600ms)`. Needs Resend audiences integration.

## 10. Commands

Project uses **pnpm** (lockfile is `pnpm-lock.yaml`). If you don't have pnpm:
```bash
corepack enable && corepack prepare pnpm@latest --activate
```

```bash
# Install
pnpm install

# Dev (port 3000)
pnpm dev

# Typecheck
pnpm typecheck    # or: npx tsc --noEmit

# Build
pnpm build

# Sanity scripts (need .env.local with SANITY_API_WRITE_TOKEN)
pnpm migrate:sanity     # idempotent, re-populates 88 docs
pnpm photos:upload      # idempotent, uploads 47 webp photos

# Deploy (Vercel)
npx vercel --prod --yes
npx vercel alias <new-deploy-url> ambalakely.vercel.app

# Lint
pnpm lint
```

Environment variables (`.env.local`, never committed):
```
NEXT_PUBLIC_MAPBOX_TOKEN=<copy from your other PC>
NEXT_PUBLIC_SANITY_PROJECT_ID=zfb59l35
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_WRITE_TOKEN=<copy from your other PC — read+write Editor token>

# Sentry (already configured)
NEXT_PUBLIC_SENTRY_DSN=...
SENTRY_DSN=...
SENTRY_ORG=mita-studio
SENTRY_PROJECT=hotel-ambalakely
SENTRY_AUTH_TOKEN=...

# Resend (add these — see section 16)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL="Hôtel Ambalakely <hello@hotelambalakely.com>"
RESEND_AUDIENCE_ID=<from resend.com/audiences>
```

Copy `.env.local` directly from the other PC (it's gitignored). To regenerate the Sanity write token: https://www.sanity.io/manage/project/zfb59l35/api → Tokens → Add API token (Editor).

If deploying on the second PC, you'll need:
- Vercel CLI login: `npx vercel login` (the user account that owns the `ambalakely` project)
- Or pull the existing `.vercel` folder from the original PC

## 11. Sanity CMS — current state (set up on PC 2, branch `feat/cms-setup`)

### Sanity project info
- **Org** : "Hôtel Ambalakely" — `o03TtHcBm` (own org, separate from Mpiaradia and Maison de la Poterie)
- **Project** : `hotel-ambalakely` — `zfb59l35`
- **Dataset** : `production`
- **Plan** : Growth Trial (30 days, then auto-downgrades to Free — no CC required)
- **API token** : `migration-script` (Editor perms) saved in local `.env.local` (never committed)
- **CORS** : `http://localhost:3000` allowed with credentials

### What's wired
- **Schemas** in `sanity/schemas/` : 10 doc types (hotel, roomCategory, review, article, excursion, itinerary, faq, staff, community, page)
- **Locale helpers** in `sanity/lib/locale.ts` : `localeString`, `localeText`, `localePortableText` for FR/EN bilingual fields + `pickLocale()` runtime helper
- **GROQ queries** in `sanity/lib/queries.ts` : each projects to a flat shape matching the `.ts` exports (coalesce fr → en → "")
- **Fetchers** in `sanity/lib/fetch.ts` : React.cache-wrapped, with graceful fallback to `.ts` if Sanity returns empty/fails. ISR 60s in prod.
- **Migration script** `scripts/migrate-to-sanity.ts` (run via `pnpm migrate:sanity`) : idempotent (`createOrReplace` + deterministic `_id`s). 88 docs migrated.
- **Photo upload script** `scripts/upload-photos.ts` (run via `pnpm photos:upload`) : 47 webp uploaded as Sanity assets. Mapping at `scripts/photo-asset-map.json`. Photos NOT yet wired to schemas — that's T1.7.
- **Verify script** `scripts/verify-sanity.ts` : GROQ counts + samples to sanity-check the dataset.

### Frontend wiring status (Phase B, partial)
- ✅ Components wired to Sanity (server fetch with fallback): **Reviews, Footer, Book, HotelJsonLd / RestaurantJsonLd / BreadcrumbJsonLd, Experiences (section), Journal (section)**
- ⚠️ Not yet wired (~16 files, same pattern — see Tier 4 reste in `tasks` of the PR description):
  - Pages : `about`, `dining`, `experiences`, `faq`, `journal/page.tsx`, `journal/[slug]`, `plan-your-trip`, `rooms`, `rooms/[category]`
  - Client components : `BookingDrawer`, `FaqSearch` (need data via prop from server parent)
  - Metadata generators : `sitemap`, `robots`, `opengraph-image`, `layout` (`metadata` → `generateMetadata`)
  - `RoomComparison` (uses `comparison.ts` which isn't in Sanity schema)

### Known bug — Studio `useEffectEvent` (now contourné par redirect)
Le local `/studio` ne charge plus le bundle Sanity. La route est un simple redirect server-side vers `https://hotel-ambalakely.sanity.studio/` (Studio cloud déployé).

Raison : `next/dist/compiled/react` n'expose pas `useEffectEvent` même si notre `react@19.2.5` le fait. Sanity 5.26 (`useResetHistoryParams`) en dépend → le bundle webpack échoue à la fois en dev (édition de docs) **et au build production** (`pnpm build` rouge tant que le studio était bundlé). Tentatives : `pnpm dedupe`, downgrade, alias React, `transpilePackages` — aucune n'a marché.

**Fix appliqué (2026-05-22)** : `src/app/studio/[[...tool]]/page.tsx` ne fait plus que `redirect('https://hotel-ambalakely.sanity.studio/')`. Layout simplifié (plus d'import `next-sanity/studio`). Hasina édite via le cloud, le build production est vert.

Restaurer le studio local (quand Sanity patchera) : revenir au composant `<NextStudio config={config} />` + re-importer `metadata, viewport` depuis `next-sanity/studio` dans le layout.

### How to re-run the migration (idempotent)
```bash
pnpm migrate:sanity     # re-populates 88 docs (createOrReplace, no dupes)
pnpm photos:upload      # re-uploads photos (skips existing by originalFilename)
pnpm tsx scripts/verify-sanity.ts   # prints counts + samples
```

## 12. Git workflow

- Working branch: `feat/dining-hero-polish`
- Main branch: `main`
- **When pushing from the other PC**, do a `git pull --rebase` first to avoid divergence. Better : work on a separate branch on the other PC (e.g. `feat/photo-mapping` for photo work) and merge later.
- Do NOT force-push.
- Do NOT amend commits already pushed.
- Each commit message starts with a tag: `feat:`, `fix:`, `truth:`, `refactor:`, `chore:`.
- Repo URL: `https://github.com/tahina-randria/ambalakely.git`

## 13. Voice / tone rules

- **French** for all user-facing text.
- **Vous** form (the hotel context is professional).
- **Direct, factual, restrained**. No "découvrez", "plongez", "véritable joyau" (except in real guest reviews).
- **Pas de "—" tirets cadratins** dans le copy fr. Phrases courtes.
- **Hasina-voice** for editorial moments: intimate, specific, sensory. "À cinq heures de l'après-midi les rizières deviennent dorées." Not "The most beautiful sunset experience."
- **No emojis in copy** ever.
- **No "luxury" / "world-class" / "exceptional" / "unique experience"** in user-facing text (only in code comments).

## 14. Common pitfalls to avoid

- **Don't invent prices.** Check PDF Tarifs 2026 in `docs/`.
- **Don't add Hasina or Mamy "quotes" you made up.** Only use real ones from the documents.
- **Don't add menu dishes beyond Zébu Marengo / Kjøttkaker / Krumkake** (and even those are deferred — see Rule 5).
- **Don't add the religious activities of HFF** (Sunday school, evangelisation, choir).
- **Don't expose `transg.hasina@moov.mg`, internal phones, or `BP 1188`** as primary contact. Only `hello@hotelambalakely.com` + `+261 34 11 254 34` publicly.
- **Don't add "TripAdvisor 4.9 stars" or any rating number** unless you have a screenshot or live API confirming it.
- **Don't add 100+ pages of thin content** chasing SEO. We agreed on the realistic depth approach: ~12-15 deep pages, then grow journal at 1-2 articles/month.

## 15. Last context

User wants to be **#1 ranking when people search Madagascar tourism**. We discussed but agreed the realistic strategy is:
- Tier 1 (truth) and Tier 2 (foundation) first — DO NOT skip ahead
- Then sustained content marketing via journal (5 cornerstone articles to start)
- Then i18n EN
- Then domain migration
- Then backlinks outreach
- Long-term : possibly expand to 100+ pages covering all Madagascar regions, but earned through depth, not volume

If user pushes "more content faster", remind them : 1 great article > 10 thin ones. Hasina's voice is the moat — quality of writing is what makes the site unique vs Lonely Planet.

## 16. Resend — booking + newsletter (2026-05-22)

### What's wired
- **`src/lib/email/client.ts`** : `getResend()` returns a singleton or `null` if `RESEND_API_KEY` is absent (routes degrade to 503).
- **`src/lib/email/templates/`** : React Email components — `BookingRequest` (notif Hasina), `BookingAck` (accusé client FR), `NewsletterWelcome` (FR), `_shared` (Shell + design tokens).
- **`src/app/api/booking-request/route.ts`** : POST handler. Zod schema (arrival/departure ISO dates, guests 1–20, name, email, phone?, message?, honeypot `company`). Rate limit in-memory 5/h/IP. Sends 2 emails (notif `hello@hotelambalakely.com` + accusé client). 1–4 guests only — 5+ goes to WhatsApp/email direct.
- **`src/app/api/newsletter/route.ts`** : POST handler. Zod schema (email + honeypot). Adds to Resend audience (`resend.contacts.create`) + welcome email. Rate limit 10/h/IP. Idempotent (re-subscribe is a no-op).
- **`BookingDrawer.tsx`** : full form (dates, guests, name, email, phone, message), state machine `idle | submitting | success | error`, honeypot, success panel. Group flow (5+ guests) unchanged.
- **`NewsletterSignup.tsx`** : POST `/api/newsletter`, error display, honeypot.

### Required env vars (Hasina or the dev sets these)
```
RESEND_API_KEY=re_...                                            # Resend dashboard → API Keys
RESEND_FROM_EMAIL="Hôtel Ambalakely <hello@hotelambalakely.com>" # needs verified domain
RESEND_AUDIENCE_ID=...                                            # Resend dashboard → Audiences
```

If unset, the routes return 503 (no crash). The build does not require them.

### Setup steps (one-time, manual — needs user)
1. **Create Resend account** at https://resend.com (free tier: 100 emails/day, 1 domain).
2. **Add and verify domain `hotelambalakely.com`** in Resend → Domains. Add the 3 DNS records (SPF, DKIM, DMARC) to whatever DNS host is current (Squarespace right now, Cloudflare later). Wait for verification (5–30 min).
3. **Create an audience** "Newsletter Ambalakely" → copy `audienceId`.
4. **Create an API key** with full access scoped to this project → copy `re_...`.
5. **Paste into `.env.local`** locally + add to Vercel project env (Production + Preview).
6. **Test end-to-end** : `pnpm dev`, fill the booking drawer with a real email, confirm both emails arrive. Then test newsletter signup.

Until the domain is verified, dev can use `RESEND_FROM_EMAIL="Hôtel Ambalakely <onboarding@resend.dev>"` — this works without DNS but flagged as "via resend.dev".

### Operational notes
- **Rate limits in-memory** : the `Map<ip, timestamps[]>` resets per server restart. Fine for low traffic. If we hit Vercel multiple cold starts, consider Upstash Redis later.
- **Honeypot `company`** : an empty hidden input. Bots fill it, real users don't. Server returns 200 OK silently when filled (no email sent).
- **Reply-To** : booking notif emails set `replyTo: data.email` so Hasina can reply directly to the guest.
- **Bilingual** : current templates are FR only. EN versions can be added when i18n lands (Tier 5).

## 17. Consent / GDPR (2026-05-22)

### What's wired
- **`src/lib/consent/index.tsx`** : `ConsentProvider`, `useConsent()` hook, `readConsent()` helper, types. localStorage key `ambalakely.consent.v1` (bump version to re-prompt).
- **`src/components/molecules/CookieBanner.tsx`** : footer-fixed banner, "Tout accepter" / "Refuser" / "Personnaliser" with per-category checkboxes (Mesure d'audience, Suivi d'erreurs). Only renders post-hydration if no choice yet.
- **`src/lib/analytics/sentry.ts`** : `initSentryClient()` + `disableSentryClient()` — idempotent, no-op without DSN/prod.
- **`src/components/atoms/SentryConsentSync.tsx`** : observes consent → calls init/disable on Sentry.
- **`src/components/atoms/PostHogProvider.tsx`** : reads consent, skips init until analytics consent is on, calls `opt_out_capturing` on refusal.
- **`instrumentation-client.ts`** : at boot, reads localStorage; only inits Sentry if user already opted in on a previous visit.

### Categories
- **analytics** → PostHog (autocapture, pageviews). Opt-in.
- **errorTracking** → Sentry (errors + session replay 10%). Opt-in.
- **Vercel Analytics + Speed Insights** : cookieless, no PII, no consent required per Vercel docs → always on.

### Behaviour
- First visit : banner shown. No PostHog, no Sentry yet.
- Click "Tout accepter" → consent saved, PostHog + Sentry init.
- Click "Refuser" → consent saved (all false), nothing inits.
- Click "Personnaliser" → checkboxes appear, "Enregistrer ma sélection" persists granular choice.
- Choice persists across visits (localStorage). To re-prompt, bump the storage key version or call `consent.reset()` from a UI footer link (not yet added).

### To extend later
- Footer link "Gérer les cookies" calling `useConsent().reset()` so users can change their mind.
- Translate the banner copy when `next-intl` lands.

---

## End of HANDOFF

Read this whole file before changing anything. When in doubt, ask the user. When the user is not available, check `docs/`. Make commits small and atomic. Push often. Don't break the truth rules.

— previous Claude, 2026-05-22
