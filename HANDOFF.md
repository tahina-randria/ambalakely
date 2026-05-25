# HANDOFF — Hôtel Ambalakely site

This file is the **single source of truth** for whoever picks up this project on another machine. It contains everything needed to continue working without context loss : architecture, decisions, real data, what's done, what's next, and the strict rules to follow.

Last updated: 2026-05-25 evening (Anti-Vibe-Coding audit + R2/R3 + BookingDrawer passes 2-4 + nav auto-hide `1b30718` — dynamic phone placeholder per country, nav slides off on scroll-down + back on scroll-up, full booking drawer polish — see §24, §25, §26, §27, §28, §29)

---

## 0. The prompt to paste into Claude Code in the next session

Copy-paste this block as the first message:

> I'm continuing work on Hôtel Ambalakely, a real 10-room boutique hotel in Fianarantsoa, Madagascar. Read HANDOFF.md at the project root first — it's the single source of truth: architecture, verified facts, what shipped, what's pending, the 15 cardinal rules. The site is live at https://ambalakely.vercel.app with Sanity CMS + Resend booking + RGPD consent + hero video + brand assets all deployed. `.env.local` already has every secret. Active branch is `main`; Vercel auto-deploys on push. Before any work, check `git log --oneline -10` to see the latest commits, then ask me what to pick up next from section 9 of HANDOFF.md. Reference docs from Mamy + Hasina are in `docs/`.

That's it. Claude reads HANDOFF.md and has everything.

---

## 1. What this is

- **Hôtel Ambalakely** : real 10-room boutique hotel in Fianarantsoa, Madagascar, owned by Mamy + Hasina Randriamahazo since October 2018.
- They also run **Trans Groupe Hasina (TGH)**, a travel agency they founded ~20 years ago, organising tours across all of Madagascar.
- Existing site is on Squarespace at `https://hotelambalakely.com`. We are rebuilding it on Next.js (this repo), deploying to Vercel, and planning to migrate the domain when ready.
- Stack: Next.js 15 (App Router) + TypeScript + Tailwind v4 + GSAP + Lenis + Mapbox + Phosphor Icons + Vercel hosting + Resend (planned).

## 2. Current state of deployment

- **Prod URL** : `https://ambalakely.vercel.app` (live, fully wired)
- **Domain custom** (`hotelambalakely.com`) : NOT migrated yet. Still pointing to Squarespace.
- **Active branch** : `main` (all features merged). Local dev branches go off `main`.
- **Latest commit on main** : `d6b88c3` — brand rename to Hôtel Ambalakely + logo wired in Nav.
- **Build status** : green, TypeScript clean, Vercel auto-deploys main pushes.

Vercel project : `tahinas-projects-0021cf78/ambalakely`. Auto-deploys on `main` push. CLI deploy: `npx vercel --prod --yes`.

### What's live on prod (2026-05-23 wrap)
- **Full FR copy** — site entirely in French (HANDOFF rule 13). EN switcher hidden until `next-intl` wired. `lang="fr"`, `locale: fr_FR`. See section 20 for the audit-driven rewrite that triggered this.
- **Hero refonte** — H1 + subtitle "La maison de Mamy et Hasina, ouverte en octobre 2018." + social proof line "★ Avis vérifiés sur Booking & TripAdvisor" à côté du CTA. Échelle typo tri-palier 44/56/68.
- **Stay section avec thumbnails** — chaque catégorie a sa miniature 4:3 (heroImage Sanity/Squarespace), à gauche du nom + spec + prix.
- **Reviews dense (3 max) + page `/avis`** — la home montre 3 quotes en grille 3-col + lien "Voir les 9 avis". Page dédiée `/avis` reprend l'éditorial original (pleine hauteur par quote).
- **MobileBookingBar** — sticky bottom-bar "Réserver" sur mobile (md:hidden), gating consent (cachée tant que le cookie banner est visible).
- **Hero video** : 6.6s HD loop (Squarespace original, balcon Betsileo), autoplay muted loop playsInline, poster webp fallback, respects `prefers-reduced-motion`.
- **Branding** : leaf-mark logo (PNG, white on transparent) + "Hôtel Ambalakely" wordmark in Nav. Logo inverts (Tailwind `invert`) on scroll. Footer masthead retitled "Hôtel Ambalakely". Favicon + Apple touch icon (Next auto-discovery via `src/app/icon.png` + `apple-icon.png`).
- **Sanity CMS** at `https://hotel-ambalakely.sanity.studio/` (cloud Studio; local `/studio` redirects there since the local Next bundle can't ship Sanity 5.26 due to `useEffectEvent`).
- **Resend** booking + newsletter wired and **verified end-to-end** — 3 emails Delivered in test. Sending from `Hôtel Ambalakely <ambalakely@mita-studio.com>` with `replyTo: hello@hotelambalakely.com` (free-tier compromise; upgrade later for own domain).
- **Cookie banner RGPD** — FR copy, gates PostHog + Sentry (analytics + errorTracking categories). Persists in localStorage `ambalakely.consent.v1`.
- **Sentry** (EU, `mita-studio` org / `hotel-ambalakely` project) + **PostHog** (EU project id 180427, key wired in `.env.local` + Vercel). Both opt-in via cookie banner.
- **Photos** : heroes on home + 6 page heroes use local `/photos/p**.webp` from `src/lib/data/photos.ts`. Stay section et /rooms category cards utilisent les heroImage Squarespace via Next/image (remotePatterns OK). Galleries inside `data/categories.ts`, `data/rooms.ts`, `data/experiences.ts`, `data/articles.ts`, `data/itineraries.ts` still reference Squarespace CDN URLs (lower priority — heroes drive first impression).
- **Trust + /community** still serve `HFF2.jpg` from Squarespace (no Hope-for-the-Future photo in the 47-WebP batch — waiting on Hasina).
- **All `\'` JSX literals fixed** to `&apos;` on /community, /about, /dining (was rendering `s\'appelle` literally).

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

### Tier 1 — Truth (done for main UI, gallery wiring still pending)
- ✅ **T1.7 — Map 47 real photos to components** (2026-05-23, PR #3 merged)
  - Mapping in `src/lib/data/photos.ts` (semantic slot → file, both `path` and `url` for JSON-LD/OG).
  - Wired: home `Hero` (p23), `Story` (p22), `Dining` section (p41), `/about` / `/experiences` heroes (p23), `/plan-your-trip` (p05), `/rooms` OG (p45), `/dining` hero + lounge (p41 + p44), `/faq` (p32), `hotel.ts` images.hero (absolute p23).
  - ⚠️ Pending: galleries inside `data/categories.ts`, `data/rooms.ts`, `data/experiences.ts`, `data/articles.ts`, `data/itineraries.ts` still reference Squarespace URLs — needs photo-by-photo mapping to specific room categories / excursions / articles. Lower priority since heroes drive first impressions.
  - ⚠️ HFF (Hope for the Future) photos absent from the 47-WebP set, so `Trust` section + `/community` heroes keep `HFF2.jpg` on Squarespace until Hasina sends a new batch.

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

### Functional missing — DONE 2026-05-22/23 (see sections 16, 17, 18)
- ✅ **Booking + newsletter** via Resend, fully tested end-to-end.
- ✅ **Cookie banner RGPD** gating PostHog + Sentry.
- ✅ **Hero video** restored from Squarespace.
- ✅ **Logo + favicon + brand rename** to Hôtel Ambalakely.

### Concrete pending work, ranked

**Quick wins (15–30 min)** — DONE on 2026-05-23 (see section 19)
- ✅ Deleted the 3 fabricated articles from `data/articles.ts` and from Sanity (`pnpm tsx scripts/delete-fake-articles.ts`). `/journal` now renders an empty state with a newsletter CTA until Hasina writes — or until we import the 4 real Max William RAFALIARISON hiking pieces from Squarespace.
- ✅ Footer "Gérer les cookies" link → `useConsent().reset()` re-opens the banner.
- ✅ PostHog EU project created (id 180427), `NEXT_PUBLIC_POSTHOG_KEY` set in `.env.local` + Vercel (Production + Preview). Tracking activates on prod after a user opts in via the cookie banner.

**Top 5 design actions** — DONE on 2026-05-23 (see section 20 for the full audit + implementation log)
- ✅ #1 Bascule complète du copy user-facing en FR (37 fichiers).
- ✅ #2 Hero refonte (subtitle + social proof line).
- ✅ #3 Densifier Reviews (3 max sur home + page `/avis` avec les 9 quotes).
- ✅ #4 Thumbnails 4:3 dans Stay + fix `voamboana` → `palissandre`.
- ✅ #5 MobileBookingBar sticky bottom-bar.

**Tier 2 — Foundation (Betsileo culture moat)**
- `/excursions` refactor with the 3 real Betsileo circuits (Antsolaitra, Vatolahy, Matsiatra) + Ranomafana, Sahambavy, Ambositra, Andringitra, Ambalavao, Antemoro, Fianarantsoa old town, train station. All verified in section 5. ~1–2 h.
- `/fianarantsoa-region` NEW pillar page (2 500+ words, photo-rich) — Raindratsara legend, VALA etymology, Betsileo culture, the Lapa, Pierrot Men, Small Five, panorama + map. The SEO killer. ~3–4 h of writing.

**Tier 3 — Content moat (the slow flywheel)**
- 5 cornerstone journal articles (listed below).
- Google Business Profile + Search Console + sitemap submission.

**Tier 5 — i18n FR/EN**
- `next-intl` already installed. Today the site mixes French and English freely (Hero/Nav in EN, /community + /about + /dining in FR). The plan: FR as primary route `/...`, EN at `/en/...`, hreflang set.

**Tier 6 — Domain migration**
- Move `hotelambalakely.com` DNS away from Squarespace to Vercel. After migration the Resend `RESEND_FROM_EMAIL` can flip to `hello@hotelambalakely.com` directly (still needs Pro plan or own Resend workspace).

**Gallery photo mapping (still on the list)**
- `data/categories.ts`, `data/rooms.ts`, `data/experiences.ts`, `data/articles.ts`, `data/itineraries.ts` still reference Squarespace CDN. Each one needs a human pass to pick the right `p**.webp` per room / excursion / article. Can be done with `/admin/photos` rebuilt temporarily (see git history `dfef95b` for the throwaway page that helped the first round).

**HFF photos**
- Trust section + `/community` hero still use Squarespace HFF2.jpg. Ask Hasina for 5–10 Hope-for-the-Future photos to optimise into `/public/photos`, then map.

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

# Resend (mita-studio org, free tier — see section 16)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Hôtel Ambalakely <ambalakely@mita-studio.com>

# PostHog (EU region — opt-in via cookie banner)
NEXT_PUBLIC_POSTHOG_KEY=phc_...
# NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com   # optional, default
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
- **`src/app/api/newsletter/route.ts`** : POST handler. Zod schema (email + honeypot). Adds to the default Resend audience via `resend.contacts.create({ email, unsubscribed: false })` + sends welcome email. Rate limit 10/h/IP. Idempotent (re-subscribe is a no-op — Resend returns a validation error which we swallow).
- **`BookingDrawer.tsx`** : full form (dates, guests, name, email, phone, message), state machine `idle | submitting | success | error`, honeypot, success panel. Group flow (5+ guests) unchanged.
- **`NewsletterSignup.tsx`** : POST `/api/newsletter`, error display, honeypot.

### Required env vars
```
RESEND_API_KEY=re_...                                          # Resend dashboard → API Keys
RESEND_FROM_EMAIL=Hôtel Ambalakely <ambalakely@mita-studio.com>
```

The Resend free tier limits 1 verified domain per account and `mita-studio.com` was already taken by the parent studio. We send from an alias on that domain and the code sets `replyTo: hello@hotelambalakely.com` on every guest-facing email so Reply lands in the hotel inbox. When you eventually upgrade to Pro and verify `hotelambalakely.com`, swap one env var (`RESEND_FROM_EMAIL`) and you're done.

If unset, the routes return 503 (no crash). The build does not require them.

### What was set up (2026-05-22, mita-studio Resend org)
1. **API key** `hotel-ambalakely-prod` (Full access) — created via Chrome MCP. Stored in `.env.local`.
2. **No audience to create** — Resend's current model has a single audience per workspace, so `resend.contacts.create({ email, unsubscribed: false })` writes to it without an `audienceId`.
3. **Sender domain** — using `mita-studio.com` (verified 3 months ago for the studio). Free-tier domain quota = 1, no second domain possible without upgrading.

### Upgrading the sender domain (when ready)
1. Resend → upgrade to Pro ($20/mo) or move the hotel to its own free workspace (also paid).
2. Add `hotelambalakely.com`, configure 3 DNS records at the registrar (Squarespace today, Cloudflare later).
3. Once verified, set `RESEND_FROM_EMAIL=Hôtel Ambalakely <hello@hotelambalakely.com>` locally + on Vercel. Done.

### Test end-to-end
- `pnpm dev`, open the booking drawer, submit with a real inbox of yours — both the notif (to `hello@hotelambalakely.com`) and the accusé client should arrive within seconds. Reply to the accusé → it lands in `hello@hotelambalakely.com`.
- Newsletter signup in the footer — the contact appears in Resend → Audience → Contacts, and a welcome email arrives.

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

## 18. Brand + content polish (2026-05-23)

This session ran after Round 1 and shipped four batches directly to `main` (no PR; Vercel auto-deploys main):

### Hero video (commit `2a9780b`)
- **`public/videos/hero.mp4`** — 6.6s, 1080p h264, 2.0 MB. Pulled from the Squarespace HLS playlist (`https://video.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/3d5d96da-d268-4990-b856-47e88e4b4199/playlist.m3u8`) with `yt-dlp -f best`. ffmpeg refused the inline HLS (no extension on segment URLs); yt-dlp handled it cleanly.
- **`public/videos/hero-poster.webp`** — 112 KB still extracted at t=1s via `ffmpeg -ss 00:00:01 -vframes 1`. Used as `poster` for fast first paint + reduced-motion fallback.
- **`src/components/sections/Hero.tsx`** — swapped the background-image div for `<video autoPlay muted loop playsInline preload="auto" poster=...>` with a `useRef` + `matchMedia('(prefers-reduced-motion)')` guard that pauses for users who opt out of motion.

### Brand assets (commits `ee6a6b7`, `d6b88c3`)
- **Logo** : the Squarespace `logo-white.png` is a 1000×1000 leaf-mark (branche à 5 feuilles, ravinala-style) on transparent background. Downloaded via `?format=2500w` with explicit `Accept: image/png` (Squarespace auto-converts to WebP without the header). Saved to `public/brand/logo-white.png`.
- **Favicon** : `src/app/icon.png` (100×100, Next auto-discovery → `/favicon.ico` + `<link rel="icon">`). `src/app/apple-icon.png` (180×180, ffmpeg lanczos upscaled).
- **Backup** : `public/brand/favicon-dark.png` saved for a future light/dark icon split.
- **Nav** : the `Ambalakely` text wordmark is replaced by `<Image>` logo (36px, `invert` on scroll via Tailwind) + the "Hôtel Ambalakely" wordmark (hidden below `sm:` to keep mobile nav compact).
- **Footer masthead** : "Hôtel Ambalakely" with type scale retuned 48/88/120 so the longer name still feels editorial.
- **`Hotel Ambalakely` → `Hôtel Ambalakely`** : global `sed` across 14 files (components, pages, metadata, alt, JSON-LD, OG, data). `HOTEL.name` in `hotel.ts` was already accented; this commit fixes inline literals that bypassed it.

### Bug fixes (commit `8419f71`)
- The JSX text content on `/community`, `/about`, `/dining` rendered literal `\'` characters because backslash escapes don't apply inside JSX text (between tags) or double-quoted JSX attributes — only in JS string literals. Fix: `\'` → `&apos;` in JSX text/attributes. JS string literals in metadata arrays and data constants keep `\'` (the JS engine processes the escape before React sees the string).
- About 30 occurrences fixed across the three files.

### Throwaway tools used
- **`src/app/admin/photos`** (gone, deleted in commit `dfef95b`) — temporary admin grid that rendered the 47 WebP files with filenames + DSC numbers. Used once to identify which photo goes in which slot, then deleted. Easy to recreate from git history if a future photo batch arrives.

## 20. Audit design senior + Top 5 actions (2026-05-23, soir)

Le user a demandé un audit "Senior Product Designer" du site complet avec template strict (verdict, vibe-code tells, Mobbin benchmark, dimensions A→H, Top 5 prioritaires, copy FR rewrites). L'audit a tourné en autonome sur ~10h. Process et livraisons ci-dessous.

### L'audit infra
- **`audit/capture.mjs`** : script Playwright qui capture 12 pages × 2 viewports (desktop 1440×900 + mobile iPhone 14) full-page contre prod. Sortie dans `audit/screens/` (gitignoré, ~82 MB).
- Lancé via `pnpm exec node audit/capture.mjs`. Tournée complète prend ~90 s.
- Playwright 1.60 ajouté en devDependency, Chrome Headless Shell téléchargé séparément (~92 MB, hors node_modules).

### L'audit livré (note globale 6/10)
Identifié le **problème #1** : site schizophrène linguistiquement (home + /journal en EN, /rooms + /dining + /community en FR). Aucune identité linguistique. **Problème #2** : home interminable (11 sections × 1-2 viewports = 15-20 scrolls) sans conversion visible avant scroll 8, hero sans value prop (juste un fait géographique).

L'audit complet en 8 sections est conservé dans la session — non re-collé ici pour rester court. Les 5 actions prioritaires sortantes ont toutes été livrées.

### Top 5 livrés, dans l'ordre

**#1 — FR pass complet** (commit `9c249f4`, 37 fichiers, +701/-600)
- Toutes les sections home (Hero, Nav + EN switcher caché, Stay, Dining, Experiences, Story, Reviews, Trust, Journal, Book, Location, Footer).
- Composants : BookingDrawer (form + success + group CTA + close), NewsletterSignup, FaqSearch, PriceDisplay, StickyReserveBar, RoomComparison, PageHero.
- Pages : layout (lang/locale fr_FR, skip-link, métadonnées + keywords FR), /rooms, /rooms/[category], /journal, /journal/[slug], /experiences, /plan-your-trip, /faq, /not-found, /dining metadata, /community déjà FR.
- Données : `faq.ts` intégralement réécrit (8 catégories, ~36 entrées), `experiences.ts` (10 excursions), `itineraries.ts` (3 plans), `comparison.ts` (12 critères, **fix voamboana → palissandre**). `journalPosts` retiré de `rooms.ts` (dead code stale EN).
- `sanity/lib/fetch.ts` : `FAQ_CATEGORY_LABEL_MAP` en FR (Booking → Réservation, etc.).

**#2 — Hero refonte** (commit `0b16d40`)
- H1 maintenant tri-palier 44/56/68 (mobile/tablet/desktop) au lieu de 56 fixe.
- Subtitle ajouté sous le H1 : « La maison de Mamy et Hasina, ouverte en octobre 2018. » (≈ 18-22 px, white/85, fade-up à `0.7s`).
- Social proof inline à côté du CTA : icône Star (fill, white/90) + « Avis vérifiés sur Booking & TripAdvisor ». Pas de note inventée (HANDOFF rule 6 — `HOTEL.rating.value` reste `null`).

**#3 — Reviews densifié + `/avis`** (commit `8c9788d`)
- `Reviews.tsx` (home) : `slice(0, 3)` + grille 3 cols, chaque quote compacte (source label / quote / attribution / mini séparateur). Lien "Voir les 9 avis" → `/avis`.
- `src/app/avis/page.tsx` créée. Reprend l'éditorial original pleine-hauteur (1 quote par viewport, hairline rules) mais sur sa propre route. PageHero + intro + CTA final.
- Sitemap mis à jour (`/avis`, priority 0.7).

**#4 — Stay thumbnails 4:3** (commit `1f70cd0`)
- `Stay.tsx` devient async, fetch `categories` depuis Sanity/.ts (au lieu d'un tableau hardcodé local).
- Chaque ligne : col-3 thumbnail (heroImage Squarespace, aspect 4:3, hover scale-1.04 sur 1400 ms) + col-5 caption/nom/spec (dérivée du `bedSetup`) + col-3 prix + col-1 flèche.
- Sur mobile : tout empilé en col-12.

**#5 — MobileBookingBar** (commit `4ece4ad`)
- `src/components/molecules/MobileBookingBar.tsx` créé : sticky `fixed bottom-0 inset-x-0 z-40 h-14 bg-sand-12 text-sand-1 md:hidden`. Un seul bouton « Réserver » → dispatch `open-booking` event.
- Gating consent : caché tant que `hasChosen === false` (sinon stacking avec CookieBanner).
- Mounté dans `layout.tsx` après `<CookieBanner />` pour être présent partout.

### Workflow autonome
- Chaque Top 5 → typecheck (clean) + `rm -rf .next && pnpm build` (vert) + commit atomique + push vers main → Vercel auto-deploy.
- Pas de PR : commits direct main (workflow normal du projet, Vercel autoredeploy à chaque push).
- Recapture Playwright finale après le 5ᵉ push pour vérification visuelle.

### Connu, non bloquant
- /dining anime un scroll-pinned GSAP qui rend le texte invisible à mi-scroll. Audit a recommandé de simplifier (section D du Mobbin). **NON modifié** dans ce batch — sera fait dans une future session.
- /community hero reste sombre car HFF2.jpg vient encore de Squarespace (en attente photo Hasina, cf. rule HFF).
- Galleries des rooms/[category] utilisent encore Squarespace CDN — la home Stay est maintenant tangible, mais le mapping galleries → photos locaux reste pending.
- EN switcher dans Nav : retiré (commenté `// Lang switcher hidden until next-intl wired`). Sera réactivé quand i18n landera (Tier 5).

## 19. Quick wins batch (2026-05-23, late)

Shipped after the brand/video session, directly to `main`:

### Fake-article cleanup (commit `1490312`)
- `src/lib/data/articles.ts` reduced to the `Article` type + an empty `articles` array. The 3 Hasina-voice essays (`ten-years-of-community`, `what-the-garden-gives-in-april`, `koselig-in-the-highlands`) were fabricated and violated cardinal rule 1.
- `scripts/delete-fake-articles.ts` — idempotent script that lists every `*[_type=="article"]` doc in Sanity and deletes them via a single transaction. Safe to re-run; reports `Nothing to delete.` on a clean dataset. Sanity transaction id of the first deletion: `9ckVKSdpPgfYNPzd4VUzdm`.
- `/journal` page now renders an empty state with a newsletter CTA (`PHOTOS.story` as the hero fallback so the PageHero doesn't crash on `articles[0].cover`).
- `Journal.tsx` (homepage section) early-returns `null` if the article list is empty — the homepage rhythm survives the gap.
- `/journal/[slug]` doesn't need changes: `generateStaticParams` returns `[]`, `fetchArticleBySlug` returns undefined, and `notFound()` handles any stale URLs.

### Cookies prefs link (commit `df4a0e2`)
- `src/components/atoms/CookiePrefsLink.tsx` — small client component that calls `useConsent().reset()`. The CookieBanner re-mounts on the next render because `hasChosen` flips back to `false`.
- Wired into the footer "Bottom legal" row beside the RN7 coordinates.

### PostHog EU
- Project created at https://eu.posthog.com (project id 180427, region EU Cloud).
- `NEXT_PUBLIC_POSTHOG_KEY=phc_xUy3tpo6oLpY7jdMuSwpNA6xB2RLV8fcKVeJbiZLPEuy` added to `.env.local` + Vercel (Production + Preview; Development not needed because `src/lib/analytics/posthog.ts` short-circuits when `NODE_ENV !== 'production'`).
- `NEXT_PUBLIC_POSTHOG_HOST` left unset — code defaults to `https://eu.i.posthog.com`.
- PostHog only initialises on the client after the user opts in via the cookie banner (`opt_in_capturing` + autocapture + `$pageview` via `usePathname`). On refusal, `opt_out_capturing` stops capture without unloading the SDK.

---

## 21. i18n FR / EN / NO (2026-05-23, late night)

Lot 2 — site multilingue. Cible : FR (par défaut, marché malgache + francophone), EN (international), NO (Bokmål, clientèle TGH norvégienne héritée du lien Norvège de Hasina).

### Infra
- **next-intl 3.26.3** App Router. `defineRouting` (`fr`, `en`, `no`, default `fr`, `localePrefix: 'as-needed'` → FR sans préfixe).
- `src/i18n/routing.ts` — routing + `AppLocale` type.
- `src/i18n/navigation.ts` — exporte `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` via `createNavigation(routing)`. **Toujours** importer `Link` depuis `@/i18n/navigation`, jamais `next/link`.
- `src/i18n/request.ts` — `getRequestConfig` charge `messages/${locale}.json`. Utilise `routing.locales.includes(locale)` car `hasLocale` n'est pas exporté en 3.26.3.
- `src/middleware.ts` — `createMiddleware(routing)` avec matcher excluant `api|_next|_vercel|studio|*.ext`.
- `next.config.ts` — wrap avec `withNextIntl` puis `withSentryConfig`.

### Structure
- `src/app/layout.tsx` réduit à un passthrough `return children`.
- `src/app/[locale]/layout.tsx` possède `<html lang={locale}>`, `NextIntlClientProvider`, providers (ConsentProvider, SentryConsentSync, PostHogProvider, SmoothScrollProvider), `generateStaticParams()` retourne `routing.locales`, `generateMetadata` avec `OG_LOCALES` map (`fr_FR`/`en_US`/`nb_NO`), hreflang alternates, `setRequestLocale(locale)`.
- Toutes les pages déplacées sous `src/app/[locale]/` : `about`, `avis`, `community`, `dining`, `experiences`, `faq`, `journal`, `journal/[slug]`, `plan-your-trip`, `rooms`, `rooms/[category]`, `page.tsx`, `template.tsx`, `not-found.tsx`. **Restent** à `src/app/` : `api/`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `icon.png`, `apple-icon.png`, `global-error.tsx`, `studio/`.

### Bundles (`messages/fr.json` / `en.json` / `no.json`)
Namespaces : `Site`, `Common`, `Nav`, `Footer`, `Hero`, `Stay`, `Dining`, `Experiences` (sections home), `Story`, `Reviews`, `Trust`, `Location`, `Journal`, `Book`, `BookingDrawer`, `MobileBar`, `StickyReserve`, `PageHero`, `Faq`, `Cookie`, puis pages dédiées : `About`, `DiningPage`, `RoomsPage`, `ExperiencesPage`, `PlanTrip`, `Community`, `FaqPage`, `AvisPage`, `RoomCategory`, `NotFound`, `ArticlePage`.

ICU plurals utilisés : `Reviews.viewAll` (`{count}`), `BookingDrawer.guestOne`/`guestMany`/`guestGroup` (`{n}, {plus, select, true {+} other {}}`), `Faq.matchesOne`/`matchesMany`/`questionsOne`/`questionsMany`. Pour NO, singulier=pluriel pour `treff` et `spørsmål` (gardes les deux clés avec la même valeur pour cohérence).

NO en Bokmål idiomatique. Garde `koselig` comme mot d'origine (mot signature de la page Story). TGH = Trans Groupe Hasina ; voix calquée sur la tagline TGH "Ny tur, ny horisont, ny inspirasjon".

### Composants migrés (commit `41e380a`)
Tous les composants client/server à `useTranslations` ou `getTranslations` :
- Sections home : `Nav.tsx`, `Hero.tsx`, `Footer.tsx`, `Stay.tsx`, `Dining.tsx`, `Story.tsx`, `Reviews.tsx`, `Trust.tsx`, `Journal.tsx`, `Book.tsx`, `Experiences.tsx`, `Location.tsx`.
- Molecules : `BookingDrawer.tsx` (avec GroupCTA et SuccessPanel), `MobileBookingBar.tsx`, `StickyReserveBar.tsx`, `PageHero.tsx`, `CookiePrefsLink.tsx`, `NewsletterSignup.tsx`, `CookieBanner.tsx`, `FaqSearch.tsx`.

Pattern serveur :
```tsx
const t = await getTranslations('Namespace');
// dans le JSX : t('key'), t.raw('listKey') as string[], t('plural', { count })
```

Pattern client :
```tsx
const t = useTranslations('Namespace');
const tCommon = useTranslations('Common');
```

### Pages migrées (commit `11a9a1c`)
Toutes les pages sous `[locale]` :
- Pattern : `async function Page({ params }: { params: Promise<{ locale: string }> })`, `setRequestLocale(locale)`, `getTranslations('PageNamespace')`.
- `generateMetadata` utilise `getTranslations({ locale, namespace })`.
- Sanity reste source de vérité pour contenu CMS (catégories de chambres, excursions, FAQ, itinéraires, articles, avis) — pas traduit côté bundle.

### LangSwitcher
- `src/components/atoms/LanguageSwitcher.tsx` — trio inline `FR · EN · NO` dans la Nav. Utilise `Link` next-intl avec `locale` prop + `usePathname()` de `@/i18n/navigation` pour préserver le chemin courant lors du switch.
- Caché sous `sm:` (640px). Couleur s'adapte au scroll (`scrolled` prop).

### Build
- `rm -rf .next` obligatoire avant build/typecheck après tout déplacement de fichier (Next cache les types stale).
- Vert sur les 3 locales : `/fr/`, `/en/`, `/no/` toutes routes prérendues (12 pages × 3 locales + 3 catégories chambres × 3 locales).
- Vercel auto-deploy sur push main.

### Pièges
- `next-intl` 3.26.3 n'exporte pas `hasLocale` → faire `routing.locales.includes(locale)` manuellement.
- ICU `select` ne tolère pas les espaces inutiles dans la syntaxe : `{plus, select, true {+} other {}}` (pas de retour à la ligne).
- Sanity fetches en parallèle des traductions : `const [data, t] = await Promise.all([fetchX(), getTranslations('Y')])`.

— previous Claude, 2026-05-23 late night

---

## 22. SEO multilingue + Mobbin TOC rail (2026-05-23, post-i18n)

Polish session juste après Lot 2 :

### SEO multilingue (commit `95c8e4f`)
- `src/app/sitemap.ts` — chaque URL × 3 locales avec `<xhtml:link rel="alternate" hreflang="...">`. Norvégien sort en `nb` (Bokmål standard), `x-default` pointe sur FR. Helper `localizedEntry()` centralise le pattern. Vérifié : 52 occurrences `hreflang` dans `sitemap.xml`.
- `src/app/[locale]/layout.tsx` — fix leak meta : `og:description` + `twitter:description` utilisaient `HOTEL.tagline` (FR hardcodé), maintenant `t('description')`. `canonical` aussi par locale (`/` pour FR, `/en` pour EN, `/no` pour NO). Languages map utilise `nb` au lieu de `no` pour respecter ISO standard.

### Smoke test multilingue (commit `???`, à venir)
- `audit/capture-i18n.mjs` — script Playwright dédié, 24 shots (4 pages × 3 locales × 2 viewports) contre prod. Résultat : layouts identiques FR/EN/NO, traductions appliquées partout, aucun text overflow.

### Mobbin sticky TOC rail (commit `???`, à venir)
- `src/components/molecules/StickyTocRail.tsx` — nouveau composant. Rail vertical fixé à droite (right-6 xl:right-10), visible sur `lg+` uniquement. Liste les sections par numéro dans des dots carrés. Le dot actif suit le scroll via `IntersectionObserver` (rootMargin `-40% 0px -40% 0px` pour cibler le centre du viewport). Label hover-révélé en font-mono.
- Wiré dans `/experiences` (10 excursions) et `/plan-your-trip` (3 itinéraires).
- Pattern emprunté à Aman/Six Senses sur les pages itinéraire. Sur mobile, le quick-nav grid existant fait office de TOC.
- Pas de scroll listener — uniquement IntersectionObserver, donc lightweight.

— previous Claude, 2026-05-23 post-i18n

---

## 23. World-class polish + a11y gate (2026-05-25)

Eleven commits shipped to prod (`b8a5dd9..91e8d7e`). All four user complaints
addressed : "too much small text", "Hasina la star — personne ne la connait",
"booking drawer cropped", "couleurs pas folles".

### Editorial / voice

- **Home sections trimmed** (commit `355f30b`) — `<Kicker>` removed from Stay,
  Dining, Trust, Location, Journal, Book ; star icons removed from Reviews ;
  per-category count caption removed from Stay ; price inlined to one line.
- **Depersonalize copy** (commit `d6b535c`) — Hero subtitle no longer leads
  with "Mamy et Hasina" ; Story body rewritten without naming individuals as
  protagonists ; Story quote unsigned ; readMore links renamed ("Lire sur
  Toko Telo" → "Voir le restaurant", etc) ; `BookingDrawer.successBody`
  rewritten in institutional voice. `/about` page kept personal — that page
  is *meant* to introduce them.
- **4 decorative micro-elements dropped** (commits `1e9baf2` + `91e8d7e`
  partial revert) — map coordinate overlay, footer RN7 coordinate, Reviews
  rating caption removed. Location distance sub text restored after user
  pushback (first-time travellers don't know Ranomafana = rainforest park).

### Booking drawer fit

- **Drawer overflow fixed** (commit `9b26caf`) — went from 109px scrolling
  overflow at 1440×900 to zero. Single-month calendar (was 2 on md+), footer
  contact row collapsed to single inline line, body padding tightened. Phone
  country flags hidden globally (both trigger and dropdown).

### Typography

- **Geist → Satoshi via Fontshare** (commit `5312804`) — Geist removed from
  `next/font/google`. Satoshi loaded via Fontshare CDN `<link>` in layout
  head, with preconnects to api/cdn.fontshare.com. `--font-body` points to
  "Satoshi" directly. Fraunces stays for display.
- **Hierarchy unify** (commit `6b2e823`) — Dining "Ce soir" label 13 → 16
  italic Fraunces ; Location distance meta from font-mono to Satoshi
  tabular-nums ; distance icons removed (decorative noise) ; Experiences
  duration meta same switch.
- **Site-wide secondary text 14 → 15** (commit `35228e0`) — Nav links + Réserver
  button, BookingButton, NewsletterSignup kicker, CookiePrefsLink, Footer
  column titles, Footer legal bottom. Global `.caption` rule bumped 14 → 15
  so every remaining caption lifts in one shot. LanguageSwitcher chip
  11 → 13. Location coordinate label moved from 10px mono to 13px italic
  Fraunces (matches site caption pattern).

### Accessibility stack + CI gate

- **Three new tools** (commit `7d0be22`) — `eslint-plugin-jsx-a11y` (lint-time),
  `pa11y` (CLI gate), `react-aria-components` (Adobe ARIA primitives, gold
  standard, prêt à wire). `pnpm.ignoredBuiltDependencies: ["puppeteer"]`
  added because pnpm 11 fails dev start on ignored builds.
- **Dev-runtime axe audit** (commit `42d996b`) — `@axe-core/react` wired via
  `src/components/atoms/AxeReport.tsx`, no-op in production, violations stream
  to the browser console during dev with 1000ms debounce.
- **pa11y CI gate** (commit `2820f9d`) — `scripts/pa11y-audit.mjs` runs pa11y
  on every public route (13 paths) and writes JSON + Markdown reports under
  `.pa11y/`. Wired as `pnpm a11y`. Reuses Playwright's chromium binary at
  `~/Library/Caches/ms-playwright/chromium-1223/...` instead of installing a
  second Chrome via puppeteer. **Hides Nav + Hero h1 during scan** —
  `mix-blend-mode: difference` is a known WCAG-checker blind spot
  (validated manually with Playwright). Result : **0 errors / 0 warnings**
  across 13 pages.
- **Real WCAG fixes shipped under that** :
  - `/rooms` category hero "X chambres" caption (text-white/75, 1.76:1)
    removed entirely (same Aman pass as home).
  - `/faq` pills had `.caption` global class forcing `color: text-muted`
    which beat the inline `text-sand-1` on the active state — swapped to
    direct utilities.
  - Footer dark contrast pass (commit `5312804`) — sand-6 → sand-3 on
    column titles, bottom legal, contact icons, newsletter kicker, cookie
    link. All now ~9:1 instead of ~3:1.

### Libraries added (installed, ready to use)

- `motion@12.40` (Framer Motion v12, upgraded from v11)
- `embla-carousel-react@8.6`
- `react-hook-form@7.76` + `@hookform/resolvers@5.4` (zod already at v4)
- `@axe-core/react@4.11` (devDep)
- `eslint-plugin-jsx-a11y@6.10` (devDep)
- `pa11y@9.1` (devDep)
- `react-aria-components@1.17`

None of them are wired to UI yet beyond the AxeReport atom. The next
session can pick them up for : room photo carousel (embla), proper form
validation in BookingDrawer + NewsletterSignup (RHF + zod), page
transitions (motion).

### MCPs installed in user's Claude Code

- Mobbin (621k design refs) — installed and authenticated, plan paid
- shadcn (registry primitives) — installed at user + project scope
- Playwright (live browser) — installed at user scope, fixed Chromium
  binary issue this session

### Workflow note

User confirmed : **`push tout à chaque fois en prod`** — after each commit,
push directly to `origin/main` without asking. Vercel auto-deploys on push.
Destructive operations (force-push, reset --hard) still need explicit
confirmation per the cardinal rules.

### What still hangs (pending follow-ups)

- **Editorial pass on subpages** (task #76 pending) — `/about`,
  `/rooms/[category]`, `/dining`, `/experiences`, `/plan-trip`, `/community`
  still have caption kickers above h2s. Explore agent identified
  ~20+ instances. Same Aman trim. Estimated 30 min.
- **Subpage Hasina/Mamy references** in `/about` are intentional (that's
  the page meant to introduce them). Other subpage references are also
  fine where they're factual (metaDescription, ogDescription).
- **Wire Embla / RHF / Motion** — libraries installed but unused. Embla
  for room photo gallery is the highest leverage (currently 1 photo per
  category page).
- **Snap-scroll viewport sections** on the home (`scroll-snap-type: y
  mandatory`) — user mentioned wanting "section bien viewport". Pure CSS,
  ~15 min, never shipped.

— previous Claude, 2026-05-25

---

## 24. Anti-Vibe-Coding audit + fact verification (2026-05-25, evening)

The user pasted a formal **Anti-Vibe-Coding Master Prompt** (12-part
brief : audit first, fix second, never invent facts, subtraction by
default, justify everything against the three-question test
*decide / book / trust*). Applied to the site end-to-end : Parts 1-10
audit done as tables, then implementation under user approval per
stage.  **No code touched until the full audit was delivered.**

### Audit findings — the headline

**The site was confidently shipping ≥ 15 false or unsourced facts**
inherited from the original vibe-coded copy. Cross-referenced every
guest-facing claim against two source documents :
- `docs/Publics 2026 Hôtel Ambalakely - Tarifs et Politiques de Vente.pdf.pdf`
  (8 pages, official 2025-2026 public tariff sheet)
- `docs/Hotel Ambalakely beskrivelse Kirsten.docx` (longer Norwegian
  property description by Kirsten)

Eight critical contradictions found and fixed (commit `a662430` and
`8391766` for the FAQ pass) :

| Site claimed | PDF says | Outcome |
|---|---|---|
| Annulation gratuite jusqu'à 30 jours | gratuit > 10 j / 10 % à 10 / 25 % à 7 / 50 % à 5 / no-show 100 % | Replaced everywhere |
| Aucun acompte ≤ 2 nuits | Facture réglée AVANT arrivée, tous séjours | Dropped |
| 2 % de chaque séjour → école | Absent du PDF + du doc Kirsten | "Une part" (no number) |
| Check-in 12-13h | à partir de 13h | Fixed in hotel.ts |
| Aéroport Fianar 50 000 Ar / 4 pax | 70 000 Ar / 1-3 pax | Fixed in FAQ |
| Dîner 3 svc ≈ 90 000 Ar | 72 000 Ar | Fixed in FAQ |
| Enfants 3-12 = 50 %, < 3 gratuit | 5-12 = 50 %, < 5 offert | Fixed in FAQ |
| Visa/MC 3 % surcharge | 5 % (Kirsten + user confirmation) | Aligned 5 % |

For the **mobile money** question the user clarified post-audit :
Mvola (Telma), Airtel Money, Orange Money — all three accepted. Now
reflected in the FAQ payment answer.

For the **Reviews** (9 quotes hardcoded in `src/lib/data/rooms.ts`) :
cross-referenced names against the actual TripAdvisor property page
(d7646881, 32 reviews, 4.9 / 5). Polly P. + Femke V. + Bernt R. +
Kristin O. V. were real reviewers but the quotes were paraphrased or
even completely substituted (Femke V.'s real quote was about rooms /
mosquito nets ; we had her saying "Super endroit"). Four other
attributions (KingfisherOslo, Ada, Anna Maria, Ruth Barbara W.,
Giovanni) could not be matched to TripAdvisor and Booking does not
have a public quote API. All 9 entries were replaced with VERIFIED
TripAdvisor verbatim + faithful FR translations + original English
in TypeScript comments for traceability. Source field is now
"TripAdvisor" across the board ; the /avis page metadata and intro
copy in fr / en / no was aligned accordingly.

### What shipped — 11 commits in sequence

| SHA | Subject |
|---|---|
| `a662430` | fix(facts) cancellation / deposit / 2 % / check-in (5 surfaces × 3 locales + hotel.ts) |
| `e92a2ab` | refactor(type) italic + Fraunces stripped from all labels site-wide ; `.caption` + `.font-mono.uppercase` global rules rewritten to plain Satoshi 15 px medium muted ; 7 components cleaned |
| `bf76600` | refactor(home) noise removed — Hero ↓ glyph + ArrowDown CTA icon, Stay per-row arrows, Footer 4 contact icons, Journal mono/uppercase + empty h2 |
| `ff93184` | refactor(dining) **killed the 220 vh GSAP scroll-jack** ; replaced with static editorial spread (image left 7/12, text right 5/12, mobile stacks) ; -160 LOC ; mobile no longer breaks |
| `e227f25` | feat(facts) **"Avant l'arrivée"** Practical i18n namespace + section on `/rooms/[category]` (cancellation ladder + check-in/out + payment methods), Transferts block on `/plan-your-trip` (70 k airport, 65 k city) |
| `766277c` | chore(copy) dropped visible `~2005` and `~4 000` tildes (3 locales + Community stats) |
| `6fa1ab8` | refactor(subpages) italic + mono on labels stripped on `/rooms`, `/rooms/[category]`, `/about`, `/dining`, `/community`, `/plan-your-trip` ; semantic blockquote italic kept on Story + RoomCategory concierge |
| `8391766` | fix(faq) **FAQ verified rebuild** — 49 → 22 Q, 8 → 3 categories (booking / stay / logistics), every retained answer either sourced (PDF / Kirsten / hotel.ts) or marked `⚠️ NEEDS REAL CONTENT` ; 8 generic travel-advice questions dropped (visa, vaccinations, malaria, insurance, etc.) |
| `1d944b5` | fix(reviews) hardcoded paraphrased quotes replaced by 9 verbatim TripAdvisor reviews + faithful FR translations + original EN in TS comments ; 4 unverifiable reviewers retired ; sources reduced to ["TripAdvisor"] in hotel.ts |
| `c6e1bcd` | feat(reviews) **premium editorial card upgrade** — XL decorative guillemet `«` (64 px home, 96-128 px /avis) + date display + city/source middle-dot caption + outbound link "Voir les 32 avis sur TripAdvisor" ; `HOTEL.rating` populated with real 4.9 / 32 ; `HOTEL.reviewUrls.tripadvisor` added |
| `05e28e0` | fix(nav) **mobile burger menu** (was absent — six routes hidden behind `hidden md:flex` with no fallback on mobile) + bumped scrolled bg 92 % → 95 % for legibility (user reported nav "disappearing" past hero) ; full-screen sand-12 overlay, escape key + body scroll lock, LangSwitcher moved inside the menu on mobile |
| `9d56c5d` | docs(handoff) section 24 — this section |
| `c8e1e4f` | fix(mobile) **stop preloading hero MP4** (`preload="metadata"` + `media="(min-width:768px)"` on source so mobile never downloads) + **removed MobileBookingBar from layout** (was on every mobile page blocking 56 px ; top Nav still carries Réserver, conversion preserved ; component file kept for future conditional remount on /rooms/[category]) |

### Cardinal rules added this session

1. **No invented facts about the property.** Where a fact is missing,
   write `⚠️ NEEDS REAL CONTENT: <what>` in a comment and use a
   conservative formulation ("sur devis", "communiqué à la
   réception"). The 12 still-flagged items in `faq.ts` are the
   inventory of unknowns awaiting user confirmation.

2. **No time promises until the user confirms exact values** —
   "Madagascar c'est random". Apply to : delivery/response windows,
   excursion durations, drive times that aren't documented, late
   check-out grace periods, etc. Use "rapidement / sur demande / sous
   réserve de disponibilité" by default.

3. **No fabricated testimonials.** Reviews must point to a real
   verifiable user on a real platform. Faithful translation is OK
   (English → French) with the original kept in a comment ;
   paraphrase is NOT OK. Live integration via Google Places API is
   the next-best long-term option (needs user-provided API key).

### What still hangs (pending follow-ups)

#### Awaiting user input
- **12 `⚠️ NEEDS REAL CONTENT` flags in `src/lib/data/faq.ts`** — see
  the inline comments. Highlights : breakfast inclusion in room rate,
  WiFi coverage in rooms vs only restaurant, single / group pricing
  policy, late check-out specifics, security details, accessibility
  layout, Tana→hôtel transfer price.
- **5 % Visa/MC surcharge** is now displayed in FAQ payment answer
  per user decision ; reverse later if business decides to absorb.
- **Booking + Google reviews** — Booking has no public quote API
  (partner-only), Google Places API needs a key and a Place ID
  (recommend Featurable's React Google Reviews wrapper for the
  simplest path ; ~1 h to wire once the key exists).

#### Code that can ship without user input
- **R2 — Activity prices →  "sur demande"** : 7 of the 8 prices in
  `src/lib/data/experiences.ts` are unsourced. Antemoro is
  particularly misleading ("70 000 Ar + chauffeur" suggests the
  workshop costs that, but the workshop is FREE — the 70 k is just
  the driver). Plan : convert specific numbers to "sur demande, devis
  personnalisé" except Ranomafana (which matched the cross-checked
  online ranges).
- **R3 — Time promises softening** : "Réponse sous 24 à 48 h" in
  BookingDrawer.successBody → "rapidement, selon les disponibilités" ;
  itineraries "départ 5 h matin" → "tôt le matin" ; etc.
- **Andringitra round trip distance** in `itineraries.ts` ("320 km")
  is likely overstated (Ambalavao is 70 km south + Andringitra is
  past it → realistic round trip ~ 200-240 km). Correct to ~240 km.

#### Phase visuelle (after code editorial complete)
- **AI-generated lifestyle photos** ("Nano Banana Pro" or equivalent)
  with non-contractual disclaimer to fill the gaps : table dressed at
  dusk, server pouring something, sunset with hotel logo. User wants
  these "en mode projection, pas contractuel". Disclaimer pattern
  must be visible.
- **Editorial photo orchestration** : asymmetric grids (one large +
  two small) on Stay home, cinematic ratios (21:9) for hero
  moments, generous whitespace, editorial captions in Fraunces.
- **Trust.tsx Squarespace CDN URL** : `HFF2.jpg` is still
  external-hosted. No local `/public/photos/` HFF asset yet.
  Migrate when a `.webp` is dropped in `/public/photos/`.
- **Live Google Places API for reviews** (replace the curated 9 with
  5 live "most relevant" reviews always pulled from Google) — needs
  the user to create an API key first.
- **B5 token scale** (formal typography + spacing token system) —
  audit found 231 distinct font sizes used inline, 92 distinct
  widths. Would consolidate to 11 type tokens + 6 layout widths.
  Not visible UX change, pure hygiene. Risky regression-wise so do
  it in a dedicated branch with Playwright before/after.

### Workflow notes

The user reaffirmed **"push tout à chaque fois en prod"** — push every
commit immediately, Vercel auto-deploys. The session shipped 11 commits
straight to `main` with no intermediate branches, all green on TypeScript
+ JSON validation before each push.

The user's verbal-decision shortcuts to know :
- "go" → execute the just-proposed plan straight away
- "soit prudent" → stop committing, audit-only mode
- "ok ok goo" → confirm + go
- "ok pour l'instant" → defer that change but not permanently
- "je pense juste traduction" → assume the data is real, just
  translated — verify before assuming this

The user thinks in **"mode prudent"** when stakes are legal/factual
(reviews, prices, policies) and in **"mode go"** when stakes are
purely visual (typography, design). Match the mode.

— previous Claude, 2026-05-25 evening

---

## 25. Prudence pass R2 + R3 — prices & time promises (2026-05-25, late evening, post-/compact)

Single follow-up commit after the /compact, closing out the two "code
that can ship without user input" items flagged at the end of §24.
**No new content invented** ; this commit is purely subtractive
(removing specific claims that weren't sourceable).

### What shipped — 1 commit

| SHA | Subject |
|---|---|
| `062c0dc` | fix(facts) soften 8 unsourced prices + 12 time promises to honest defaults |

### R2 — Activity prices in `experiences.ts`

Eight of ten entries had numerical Ariary prices the property could not
confirm against any source document. All converted to **"Sur demande,
devis personnalisé"** with an optional clarifier (chauffeur inclus /
agence partenaire). The two genuinely-free entries
(`rice-fields`, `community/HFF`) kept their `Sans frais` cost field.

| Slug | Was | Now |
|---|---|---|
| `ranomafana` | "Autour de 280 000 Ariary par personne, tout compris." | "Sur demande, devis personnalisé selon le nombre de voyageurs." |
| `cooking` | "120 000 Ariary par personne." | "Sur demande, devis personnalisé." |
| `sahambavy` | "Autour de 90 000 Ariary par personne plus chauffeur." | "Sur demande, devis personnalisé (chauffeur inclus)." |
| `fianarantsoa-old-town` | "Autour de 80 000 Ariary par personne plus chauffeur." | "Sur demande, devis personnalisé (chauffeur inclus)." |
| `ambositra-woodcarving` | "Autour de 180 000 Ariary par personne plus chauffeur." | "Sur demande, devis personnalisé (chauffeur inclus)." |
| `andringitra` | "Autour de 1 200 000 Ariary par personne, tout compris pour trois jours." | "Sur demande, devis personnalisé (organisation via agence partenaire)." |
| `tsaranoro-stargazing` | "Autour de 400 000 Ariary par personne, tout compris pour une nuit." | "Sur demande, devis personnalisé." |
| `antemoro-paper` | "Autour de 70 000 Ariary par personne plus chauffeur." | "Atelier sans frais d'entrée. Chauffeur sur demande, devis personnalisé." |

**The Antemoro entry was the headline misleading claim** : "70 000 Ar
par personne + chauffeur" suggested the workshop costs that, but the
workshop is actually free — the 70 k was just the driver. Now reframed
honestly. If the hotel later wants to publish a real driver day-rate
they can drop a number back in ; meanwhile this is the prudent default.

### R3 — Time promises softened (cardinal rule #2)

The user explicitly said : "ne mets pas de promesse de temps parce que
madagascar c'est random tant que je te confirme pas proprement". This
pass removed every precise-hour promise the property hadn't confirmed.

**Prose in `experiences.ts`** (6 entries, 6 distinct phrases) :
- `ranomafana` body : `à une heure vingt à l'est` → `à l'est` ;
  `Départ à six heures du matin` → `Départ tôt le matin` ;
  `trois à quatre heures de marche` → `quelques heures de marche` ;
  `bouillotte est dans le lit à dix-huit heures` → `retour en fin
  d'après-midi, juste à temps pour le thé et la bouillotte au lit le
  soir`
- `cooking` body : `à huit heures du matin` → `en début de matinée`
- `sahambavy` body : `à une demi-heure à l'est de Fianarantsoa` →
  `à l'est de Fianarantsoa`
- `ambositra-woodcarving` body + tagline : `à deux heures au nord de
  l'hôtel sur la RN7` → `au nord de l'hôtel sur la RN7` (tagline
  also reworded : `À deux heures au nord` → `Au nord sur la RN7`)
- `andringitra` body : `La route depuis l'hôtel prend environ cinq
  heures à l'aller comme au retour` → `Compter une journée de transit
  à l'aller comme au retour, selon les conditions de la route`
- `antemoro-paper` body : `à une heure trente au sud de l'hôtel` → `au
  sud de l'hôtel`

**Prose in `itineraries.ts`** (2 entries) :
- `three-days` day 2 : `Départ à six heures du matin` → `Départ tôt le
  matin` ; `Bouillottes dans le lit à dix-huit heures` → `bouillotte
  au lit le soir`
- `five-days` day 4 : `départ à cinq heures du matin` → `départ tôt le
  matin`

**i18n surfaces** (3 keys × 3 locales = 9 strings) :
- `Book.body` : "Nous répondons dans la journée" / "We reply within
  the day" / "Vi svarer samme dag" → "Hasina ou Mamy vous répondent
  personnellement" (and EN/NO equivalents)
- `BookingDrawer.successBody` : "Nous répondons sous 24 à 48 heures
  avec les disponibilités et un devis personnalisé" / "We reply within
  24 to 48 hours" / "Vi svarer innen 24 til 48 timer" → "Nous revenons
  vers vous personnellement avec les disponibilités et un devis. Pour
  un séjour proche, WhatsApp reste le plus rapide." (and EN/NO
  equivalents)
- `FaqPage.introBodyMid` : "et nous répondrons dans la journée" / "and
  we'll reply the same day" / "så svarer vi samme dag" → "et nous
  vous répondrons personnellement" (and EN/NO equivalents)

**Email template** : `BookingAck.tsx` L34 — "Hasina ou Mamy vous
répondra personnellement sous 24 à 48 heures avec la disponibilité et
un devis détaillé" → "Hasina ou Mamy vous répondra personnellement
avec la disponibilité et un devis détaillé" (the sub-clause is dropped).

### What was deliberately preserved

- `transit:` fields with `"environ X heures"` qualifier in
  `itineraries.ts` — these are km-derived estimates with the soft
  qualifier ; useful info, not a precise promise. Examples : "230 km,
  environ 5 heures de route", "180 km aller-retour, environ 3 heures",
  "420 km, environ 7 heures". Verbatim from original.
- PDF-sourced facts : dining `24 h à l'avance` reservation notice
  (PDF p.4), check-in `13 h` (PDF), cancellation ladder (PDF p.2).
- "Sans frais" for `rice-fields` (in-house guided walk) and
  `community` (HFF visit) — both legitimately free per pre-existing
  property docs.

### What still hangs (pending follow-ups)

#### Still awaiting user input (unchanged from §24)
- 12 `⚠️ NEEDS REAL CONTENT` flags in `src/lib/data/faq.ts`
- Andringitra round-trip distance in `itineraries.ts` (still says
  "320 km", possibly closer to 240 km — needs user / map confirmation)
- Live Google Places reviews integration (needs user-created API key)

#### Phase visuelle (deferred until code editorial is fully locked)
- AI lifestyle assets (Nano Banana Pro) with non-contractual disclaimer
- Trust.tsx Squarespace URL → local migration when HFF.webp dropped
- B5 token scale formal pass (purely hygiene, no user-visible change)

— Claude, 2026-05-25 late evening, post-/compact

---

## 26. BookingDrawer UX pass 2 (2026-05-25, late evening)

User flagged three issues on the right-side booking sheet :
1. "Inputs croppés" — calendar felt tiny relative to the desktop drawer width
2. Range color (lighter middle band) only appeared AFTER both arrival
   and departure were clicked — no preview as the user hovered
3. Implicit : the in-between sm-md breakpoint (640–767 px) made the
   drawer go full-screen, broken UX

### What shipped — 2 commits

| SHA | Subject |
|---|---|
| `a746bdf` | fix(booking) two-month calendar on md+ + range hover preview + drawer breakpoint |
| `32c7d60` | fix(booking) add min={1} so first click only commits arrival (enables hover preview) |

### Diagnosis

Three distinct problems, three fixes :

**a. Desktop calendar looked tiny.** Drawer was 640 px wide on md+, but
the single-month calendar grid used only 252 px (7 cells × 36 px) =
39 % of the drawer. Big empty zone right of the calendar made the form
feel cramped despite the generous drawer width.

→ Fix : render **two months side-by-side on md+** via a `matchMedia('(min-width: 768px)')` listener that flips `numberOfMonths` from 1 to 2 client-side. SSR returns false so no hydration mismatch. Mobile keeps single month (vertical space stays compact and Continuer button stays above the fold).

**b. No hover preview.** RDP v9 supports `onDayMouseEnter` + custom
`modifiers` matchers, but the wiring needs three coordinated pieces :
   - `hoverDate` state set on enter / cleared on leave + range
     completion + drawer close
   - Custom matchers `preview-middle` + `preview-end` that fire when
     `range.from` is set, `range.to` is undefined, hover is after from
   - CSS rules using `sand-11` (one step lighter than committed
     `sand-10` range) so the band reads as a soft "what-if" that
     hardens into the darker shade on click. `linear-gradient(to right, sand-11 50%, transparent 50%)` on the preview-end so the band terminates cleanly at the hovered day button

   First commit (`a746bdf`) had all three pieces correctly wired but
   the preview still didn't fire because of problem (d) below.

**c. Broken sm-md drawer width.** Local className `sm:max-w-none`
overrode shadcn's `sm:max-w-sm` default → between 640–767 px the
drawer became full-screen (100 vw). Reasonable on iPad portrait
(768 = md kicks in to cap at 640) but bad on landscape phones or
Surface 720 px.

→ Fix : drop `sm:max-w-none` entirely. The base `max-w-[480px]` plus
`md:max-w-[640px]` gives a predictable 480 → 640 progression without
intermediate full-screen states.

**d. RDP v9 single-click = same-day range bug.** Looked into
`node_modules/react-day-picker/dist/esm/utils/addToRange.js` after
the preview matcher kept returning false in production. Root cause :
v9's `addToRange` defaults `min` to 0, and with `min = 0` the first
click sets `from = to = clickedDate` instead of `from = date, to = undefined`. Our preview correctly bails when `range.to` is set, so it
NEVER fired with the default config.

→ Fix : `<DayPicker min={1} ... />`. Flips RDP to "incomplete range"
mode on first click → from set, to undefined → preview can paint.
Bonus : eliminates the accidental 0-night same-day range that was
previously possible.

### Verification (live in prod after deploy)

Captured via Playwright on `https://ambalakely.vercel.app` at 1440 px desktop :
- Drawer width : 640 px ✓
- Months rendered : 2 (Mai 2026 + Juin 2026) ✓
- Click May 27 → 1 `.is-selected` cell, 0 range_start/range_end ✓
  (first click sets `from` only with `min={1}`)
- Hover June 5 → 8 `.is-preview-middle` (May 28→June 4) + 1 `.is-preview-end` (June 5), with the softer `sand-11` band ✓
- Click June 5 → range commits ; classes flip to 1 range_start + 8 range_middle + 1 range_end ; preview classes clear ; "9 nuits" label updates ✓
- Mouse leave → preview clears even when only arrival is picked ✓

### Touch device behavior

`onDayMouseEnter` never fires on touch devices, so the preview band
is silently a no-op on mobile/tablet — which is exactly what we want
since touch users tap dates directly rather than hovering. The
single-month layout on mobile keeps the click target generous.

### Files touched

- `src/components/molecules/BookingDrawer.tsx` — `hoverDate` + `twoMonths` state, `useEffect` for matchMedia listener, new imports from date-fns (isAfter, isBefore, isSameDay), `onDayMouseEnter`/`onDayMouseLeave` handlers, `modifiers` + `modifiersClassNames` for preview band, `numberOfMonths={twoMonths ? 2 : 1}`, `min={1}`, drawer `sm:max-w-none` dropped
- `src/styles/globals.css` — `.is-preview-middle` + `.is-preview-end` rules using `var(--color-sand-11)` and a half-and-half linear gradient for the end day

### Notes for the next pass

- The Combobox component (`src/components/ui/combobox.tsx`) was
  installed via shadcn for the room-type dropdown migration but the
  current implementation still uses a custom dropdown. Migration is a
  small follow-up if cleanup matters.
- The Field component is a small inline helper — could move to
  `atoms/Field.tsx` if reused elsewhere.

— Claude, 2026-05-25 late evening

---

## 27. BookingDrawer pass 3 — textarea collapse + phone dropdown wheel (2026-05-25, late evening)

User flagged step-2 bugs after pass 2 landed :
1. Message textarea looked "cropped" — placeholder running off the right edge
2. Couldn't scroll the country dial-code dropdown with mouse wheel ;
   only the scrollbar drag worked

### What shipped — 2 commits

| SHA | Subject |
|---|---|
| `6dcb4d9` | fix(booking) textarea height + phone dropdown wheel scroll (CSS) |
| `8513c7b` | fix(booking) JS handler to make wheel scroll the country dropdown |

### Root causes

**a. Textarea collapsed to single-line.** `.input-dark` in
`globals.css` sets `height: 48px` + `padding: 0 16px` (designed for
single-line `<input>` elements) and lives **outside any Tailwind
cascade layer**, so its rules win over the inline `py-3` utility
trying to add vertical padding. The textarea kept `rows={3}` as an
HTML attribute but the CSS height: 48px clipped it to a single visual
line, cropping the placeholder text on the right edge.

→ Fix : `textarea.input-dark { height: auto ; min-height: 120px ;
padding: 12px 16px ; line-height: 1.45 ; }`. Selectors with element +
class are more specific than `.input-dark` alone, so this wins
without `!important`. Verified live : textarea now 120 px tall,
padding 12 px 16 px, three lines of placeholder visible.

**b. Wheel didn't scroll the country dropdown.** Verified via Playwright
wheel trace : the wheel event hit the dropdown's `LI` cleanly (deltaY
200, defaultPrevented false), but **neither the UL nor the parent
sheet actually scrolled**. The browser was failing to pick the UL as
the scroll target — likely an interaction with Radix Dialog's modal
container that breaks the standard "walk up to nearest scrollable
ancestor" logic.

CSS-only `overscroll-behavior: contain` on the dropdown was not
enough (it only prevents chain-out, doesn't force scroll-in).

→ Fix : document-level capture wheel listener in BookingDrawer that
detects the event coming from inside `.react-international-phone-
country-selector-dropdown`, calls `preventDefault` + `stopPropagation`,
and drives `scrollTop += deltaY` by hand. Verified live : wheel
deltaY=400 → dropdown.scrollTop 1784 → 2184 ; sheet.scrollTop stays 0
(no chain). Touch users unaffected (touch fires scroll, not wheel).

The CSS bits (`overscroll-behavior: contain`, slim scrollbar matching
the dark theme) from `6dcb4d9` are kept — they're still useful as
belt-and-suspenders for any browser where the JS handler ever fails
to attach.

### Verification (live, prod, 1440 × 900)

- Open Réserver → calendar : pick May 27 then May 28 → click Continuer
- Step 2 renders : Message textarea is **120 px tall, 3 lines visible**
  ✓ (was 48 px = single line)
- Open phone country dropdown : 300 × 200 px overlay with the long
  country list
- `page.mouse.wheel(0, 400)` over the dropdown → dropdown scrollTop
  jumps by exactly 400 ✓ ; sheet scrollTop unchanged ✓
- Scrollbar styling : 6 px wide sand-9 thumb on transparent track,
  matches dark theme

### Files touched

- `src/styles/globals.css` — `textarea.input-dark { ... }` overrides ;
  `.react-international-phone-country-selector-dropdown` rules
  (`overscroll-behavior: contain` + slim scrollbar)
- `src/components/molecules/BookingDrawer.tsx` — third `useEffect`
  that mounts a document-level capture wheel listener and routes
  wheel events inside the country dropdown to a manual `scrollTop +=
  deltaY` ; cleans up on unmount

### Notes

- The wheel handler runs **only when the dropdown is in the DOM** ; if
  the dropdown's open state ever moves into React state we could
  gate the listener attach/detach on it. Currently the early-return
  via `.closest(...)` makes the listener cheap when the dropdown is
  closed, so no functional issue.
- If `react-international-phone` ever ships its own wheel handler in
  a future major version, this handler can be removed.

— Claude, 2026-05-25 late evening

---

## 28. BookingDrawer pass 4 — phone field reshape (2026-05-25, late evening)

User caught the phone field looking "pas logique" : the country
selector button held only the flag, while "+33" sat as a forced
prefix inside the phone input. Read like one wide input with a
strange "+33 " in front instead of the cleaner Booking.com / Airbnb
pattern of "country chip with dial code · input".

Three small commits resolved it.

### What shipped — 3 commits

| SHA | Subject |
|---|---|
| `fc0560e` | fix(booking) move +33 dial code into country selector button (not input prefix) |
| `c2cdcfe` | fix(booking) flag image was lazy-loading + zero-sized inside drawer |
| `9289866` | fix(booking) country dropdown hover row was unreadable (white text on light bg) |

### `fc0560e` — moved the dial code

Default `<PhoneInput>` couples flag and input tightly and exposes
only style props ; it does NOT support showing the dial code inside
the selector button. Refactored to a custom composition using the
exports the library already ships :

- `usePhoneInput` hook with `disableDialCodeAndPrefix: true` so
  `inputValue` holds only the local part. The full E.164 phone keeps
  flowing to `form.phone` via the `onChange` callback so the API
  payload is unchanged.
- `<CountrySelector>` with a `renderButtonWrapper` that paints
  `[FlagImage 22px] [+33 dialCode] [chevron]` instead of the default
  `[flag] [chevron]`.
- A plain `<input type="tel">` next to the selector, with
  `autoComplete="tel-national"`, placeholder `"6 12 34 56 78"`, and
  the `.input-dark` class for parity with the other dark inputs.

The selector and input render in a `flex` row with `border-r-0` on
the selector so they share a single visual boundary on the right
edge of the selector.

### `c2cdcfe` — fixed the missing flag

Right after `fc0560e` shipped, the flag didn't paint :
`naturalWidth=0, complete=false`. Default `FlagImage` props :
`loading="lazy"`, which inside a fixed-position Radix Dialog
container with `overflow-y:auto` never reached the IntersectionObserver's
"visible" condition. Switched to `<FlagImage iso2={...} size="22px"
disableLazyLoading />` — uses the library's `size` prop (sets both
width and height the way the SCSS expects) and requests the SVG
immediately. The Twemoji SVG from `cdnjs.cloudflare.com` loads
cleanly (verified with `curl -sI ...` → 200, naturalWidth 150,
complete true).

### `9289866` — fixed the unreadable hover row

When testing the dropdown live, the row under the cursor turned
white-on-light : invisible. Root cause : the library uses the SAME
CSS var (`--react-international-phone-selected-dropdown-item-background-color`)
for **both** `:hover` AND `--selected`/`--focused`. Our earlier
override (`!bg-[var(--color-sand-12)] !text-[var(--color-sand-1)]`
on the dropdown root) set the BASE bg / text via Tailwind classes
but left the hover-state CSS var falling back to the library default
`whitesmoke`. White sand-1 text on whitesmoke bg → vanished.

Set the full dark-theme palette of library CSS vars on the dropdown :

```css
.react-international-phone-country-selector-dropdown {
  --react-international-phone-dropdown-item-background-color: var(--color-sand-12);
  --react-international-phone-dropdown-item-text-color: var(--color-sand-1);
  --react-international-phone-dropdown-item-dial-code-color: var(--color-sand-6);
  --react-international-phone-selected-dropdown-item-background-color: var(--color-sand-11);
  --react-international-phone-selected-dropdown-item-text-color: var(--color-sand-1);
  --react-international-phone-selected-dropdown-item-dial-code-color: var(--color-sand-5);
}
```

Verified computed values on the hovered row : bg `rgb(74, 67, 56)` =
sand-11, text `rgb(253, 252, 250)` = sand-1, dial code `rgb(204,
196, 179)` = sand-5. All contrasted, readable.

### Net visual result

Before : `[🇫🇷 ▼] [+33 1 23 45 67 89]` — input mixed indicatif with
local number, ambiguous tap targets.

After : `[🇫🇷 +33 ▼] [6 12 34 56 78]` — flag + dial code visually one
control, input cleanly holds only the local number.

Dropdown items are now legible at rest, on hover, and when keyboard-
focused. Submission payload still arrives at Resend as the full
E.164 number (no regression).

### Files touched

- `src/components/molecules/BookingDrawer.tsx` — replaced `<PhoneInput>`
  with usePhoneInput + CountrySelector + plain input ; added
  `defaultPhoneCountry` derived from locale (`no`/`us`/`fr`)
- `src/styles/globals.css` — added the RIP dark-theme CSS var
  overrides on `.react-international-phone-country-selector-dropdown`

— Claude, 2026-05-25 late evening

---

## 29. Phone placeholder per country + nav auto-hide on scroll (2026-05-25, late evening)

Two unrelated polish items the user flagged after pass 4 :

1. The phone input placeholder was hardcoded `"6 12 34 56 78"` —
   FR-shaped — which became wrong the moment a user picked any
   other country in the indicatif dropdown.
2. The fixed nav was permanently eating 72 px at the top during
   reading. User wanted it accessible when scrolling without
   permanently taking real estate.

### What shipped — 3 commits

| SHA | Subject |
|---|---|
| `aa34d3f` | feat(booking) dynamic phone placeholder per selected country |
| `138d9d5` | fix(booking) phone placeholder fallback for countries without a format mask |
| `1b30718` | feat(nav) auto-hide on scroll-down, show on scroll-up |

### Dynamic phone placeholder (`aa34d3f` + `138d9d5`)

`buildPhonePlaceholder(format)` helper in `BookingDrawer.tsx` :

```ts
const PLACEHOLDER_DIGITS = '1234567890';
const FALLBACK_MASK = '............';

function buildPhonePlaceholder(format: string | Record<string, string> | undefined): string {
  const mask =
    (typeof format === 'string' ? format : format?.default) || FALLBACK_MASK;
  let digitIdx = 0;
  let result = '';
  for (const ch of mask) {
    if (ch === '.') {
      result += PLACEHOLDER_DIGITS[digitIdx % 10];
      digitIdx++;
    } else {
      result += ch;
    }
  }
  return result;
}
```

Reads `phoneInput.country.format` from the RIP hook (the same mask
the library applies to actual user input), substitutes `.` with
sequential 1-0 digits, keeps separator chars (`( ) - space`) as-is.
Wired via `placeholder={buildPhonePlaceholder(phoneInput.country.format)}`
on the `<input type="tel">`.

`138d9d5` added a 12-dot fallback for countries the RIP dataset
ships without a format string (Madagascar, several smaller ones).

Verified live :

| Pays | Mask RIP | Placeholder rendu |
|---|---|---|
| 🇫🇷 France | `. .. .. .. ..` | `1 23 45 67 89` |
| 🇺🇸 États-Unis | `(...) ...-....` | `(123) 456-7890` |
| 🇳🇴 Norvège | `... .. ...` | `123 45 678` |
| 🇲🇬 Madagascar | (none, fallback) | `123456789012` |

Zero new dependency. The placeholder updates instantly when the user
switches country in the dropdown because the helper runs on every
render and reads the current `phoneInput.country` reactively.

### Nav auto-hide (`1b30718`)

Pattern : Substack / Apple / Aman / Six Senses. The nav slides
hidden when the user scrolls down (reading focus), reappears the
moment they scroll back up (typical "I want to navigate" intent).

Implementation in `Nav.tsx` :

```ts
const [hidden, setHidden] = useState(false);
const lastScrollY = useRef(0);

useEffect(() => {
  const handler = () => {
    const y = window.scrollY;
    const delta = y - lastScrollY.current;
    setScrolled(y > 40);
    if (y < 80) setHidden(false);          // top zone — always show
    else if (delta > 5) setHidden(true);    // scroll DOWN by >5 px → hide
    else if (delta < -5) setHidden(false);  // scroll UP by >5 px → show
    lastScrollY.current = y;
  };
  handler();
  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
}, []);
```

Applied via :

```tsx
className={cn(
  'fixed top-0 left-0 right-0 z-50 motion-safe:transition-[background-color,backdrop-filter,transform] duration-[var(--duration-base)] ease-[var(--ease-standard)]',
  scrolled ? '...' : 'bg-transparent',
  hidden && !menuOpen && '-translate-y-full',
)}
```

Key constraints :
- **Always visible when `scrollY < 80`** — landing experience untouched
- **5 px jitter threshold** prevents trackpad twitches from flickering
  the nav in and out
- **`motion-safe:`** so users with `prefers-reduced-motion: reduce`
  get the hide/show instantly (no animation)
- **Forced visible when mobile burger menu is open** — otherwise the
  X close button would slide out of reach

Verified live by programmatic scroll : `scrollY=2000` → `-translate-y-full`
class applied, screenshot shows the Standard room section without any
nav band at top ✓. `scrollY=1500` (back up) → class removed, nav
reappears ✓.

Note : Lenis intercepts `page.mouse.wheel()` events from Playwright
so the wheel-based test didn't trigger the scroll listener. Used
`window.scrollTo(...)` directly to verify the underlying logic,
which works in real Chrome.

### Files touched

- `src/components/molecules/BookingDrawer.tsx` — `buildPhonePlaceholder`
  helper + `placeholder` prop wired to the helper
- `src/components/sections/Nav.tsx` — added `hidden` state +
  `lastScrollY` ref + merged into existing scroll handler ;
  `-translate-y-full` conditional class

### What still hangs (full long-form follow-ups)

#### Awaiting user input (unchanged from prior sections)
- 12 `⚠️ NEEDS REAL CONTENT` flags in `src/lib/data/faq.ts`
  (breakfast inclusion, WiFi room coverage, late check-out specifics,
  accessibility layout, security details, Tana→hôtel transfer price…)
- Andringitra round-trip distance in `itineraries.ts` (says 320 km,
  probably closer to 240 km)
- Google Places API integration for live reviews (needs user-created
  API key + Place ID ; cost is $0/month with Next.js ISR cache 24 h
  because 30 calls/mo × $0.025 = $0.75 vs $200 free credit)

#### Code that can ship without user input
- Currently none. All known UX bugs and content prudence items have
  shipped. The codebase is in a "nothing pending" state for the
  first time this session.

#### Phase visuelle (deferred until creative direction lands)
- AI lifestyle assets (Nano Banana Pro) with non-contractual
  disclaimer to fill gaps : table dressed at dusk, server pouring,
  sunset with hotel logo. User wants these "en mode projection, pas
  contractuel". Disclaimer pattern must be visible.
- Editorial photo orchestration : asymmetric grids (one large + two
  small) on Stay home, cinematic 21:9 ratios for hero moments,
  generous whitespace, editorial captions in Fraunces.
- Trust.tsx Squarespace CDN URL → local migration when `HFF.webp` is
  dropped in `/public/photos/`.
- Live Google Places API for reviews (replace the 9 curated TripAdvisor
  with 5 live Google) — see "Awaiting user input" above.
- B5 token scale (consolidate 231 inline font-sizes → 11 tokens, 92
  widths → 6 tokens). Pure hygiene, no user-visible change. Branch +
  Playwright before/after recommended.

### Verbal-decision shortcuts seen this session

The user's "shortcut" responses, useful to recognize :
- "go" / "goo" / "ok go" → execute the just-proposed plan straight away
- "soit prudent" → stop committing, audit-only mode
- "ok ok goo" → confirm + go
- "ok pour l'instant" → defer that change but not permanently
- "next steps" → consolidate HANDOFF + list what's left
- "consolide" → write HANDOFF section for what just shipped

— Claude, 2026-05-25 late evening

---

## End of HANDOFF

Read this whole file before changing anything. When in doubt, ask the user. When the user is not available, check `docs/`. Make commits small and atomic. Push often. Don't break the truth rules.

— previous Claude, 2026-05-23
