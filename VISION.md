# Hotel Ambalakely — Vision & Architecture

**Last updated** : 2026-05-08
**Status** : Layer 1 (public site) en developpement, Layer 2 (back-office) prevu Phase 2-3

---

## Principes directeurs

### 1. Design : world-class editorial
- Reference : Aman, Singita, Belmond, Soneva, Nihi
- Photo-essay, magazine flow, single-column prose
- Zero AI slop, zero em-dash, zero card UI templated
- Geist font, sand-12 palette, ore accent uniquement
- Negative space radical (160-240px entre sections)
- Note signee Mamy/Hasina = differenciateur

### 2. Aucune donnee statique
**Principe critique** : tout le contenu doit venir de la base de donnees.

Actuellement encore en static (a migrer en Phase 2) :
- `src/lib/data/hotel.ts` → table `hotel_settings`
- `src/lib/data/categories.ts` → tables `room_categories` + `room_features`
- `src/lib/data/comparison.ts` → table `comparison_rows`
- `src/lib/data/rooms.ts` → tables `rooms`, `experiences`, `journal_posts`, `reviews`

Mamy/Hasina doivent pouvoir editer titres, prix, photos, articles sans toucher au code.

### 3. Madagascar-first
- Voaray pour paiements (pas Stripe, pas dispo MG)
- STAAH pour channel manager OTA
- Currency MGA (Ariary) display, EUR seulement en JSON-LD pour SEO
- WhatsApp comme canal contact principal (Madagascar = WhatsApp)
- Norvegien comme audience secondaire (reseau Hasina)

---

## Architecture en 2 layers

### Layer 1 — Site public (`hotelambalakely.com`)

Public-facing, optimise SEO + conversion.

**Stack actuel**
- Next.js 15 App Router + TypeScript + Tailwind v4
- GSAP + ScrollTrigger + Lenis smooth scroll
- Mapbox GL pour la carte
- Vercel hosting + Analytics + Speed Insights
- Resend (a integrer) pour emails transactionnels

**Pages**
- `/` (homepage one-pager)
- `/rooms` (overview + comparison grid)
- `/rooms/[category]` (Superieure / Confort / Standard)
- `/about` (Mamy & Hasina, Hope for the Future)
- `/dining` (Toko Telo menu + signed concierge note)
- `/faq` (a faire — concierge level)
- `/plan-your-trip` (a faire — itineraires 3/5/7 jours)
- `/journal/[slug]` (a faire — articles longs)
- `/booking-received` (a faire — confirmation post-submit)
- i18n FR + NO + EN (next-intl deja installe)

**Hub & spoke** :
- Hub = homepage avec sections Hero / Stay / Dining / Story / Reviews / Trust / Location / Journal / Book
- Spokes = detail pages

---

### Layer 2 — Back-office admin (Phase 2/3)

Plateforme privee, auth Mamy/Hasina + comptable. Route `/admin/*` protegee.

#### A. CMS — Content management
- **Articles journal** : CRUD avec editor riche (Tiptap/Lexical). Meta + slug + cover + SEO.
- **Photos library** : upload, tags (chambre/jardin/diner/equipe), variantes (hero/gallery/og), CDN.
- **Edit copy live** : titres, prix, descriptions, FAQ entries sans toucher au code.
- **Pages editables** : /faq, /plan-your-trip, /journal CRUD complet.
- **Reviews moderation** : importer depuis TripAdvisor/Booking, valider, afficher au front.
- **Translations** : edit FR + EN + NO cote a cote.

#### B. PMS — Reservations
- **Calendar dispo** des 10 chambres, vue mois/semaine/jour.
- **Reservations entrantes** : depuis form site + sync STAAH (Booking.com, Expedia, Airbnb).
- **Profils invites** : historique sejours, preferences, langue, notes Mamy/Hasina.
- **Confirmations** : email auto post-booking, rappels J-3 + J-1.
- **Modifications/annulations** : interface simple.
- **Pricing** : tarifs saisonniers + groupes + last-minute.

#### C. Operations — RH + stock + commandes
- **RH** :
  - 3 employes (cuisine, menage, jardinier-gardien), contrats CDI/CDD scan
  - Payroll Ariary mensuel, tracking heures + jours conges
  - Planning shifts hebdo + rotations
  - Fiches paie generees PDF
- **Stock cuisine** :
  - Inventaire produits (frais/sec/conserves)
  - Suivi peremption + alertes auto
  - Lien automatique avec menu hebdo (Hasina ecrit le menu, le stock se decremente)
- **Commandes fournisseurs** :
  - Catalogue : marche Tuesdays, boucher, tea Sahambavy, vins Soavita, rhum Dzama
  - Bons de commande generes
  - Reception + reconciliation factures
- **Jirama** :
  - Saisie mensuelle conso eau + electricite
  - Photos compteurs
  - Tracking consommation vs occupation chambres
  - Alerte si depassement
- **Gardiennage** :
  - Planning rotation 2 gardiens nuit
  - Tracking presence
- **Maintenance** :
  - Planning entretien chambres (peinture, voamboana, plomberie)
  - Travaux jardin saisonniers

#### D. Finance — Paiements + compta
- **Paiements** :
  - Voaray API integration (mobile money Madagascar)
  - Encaissements directs + via OTA
  - Rapprochements manuels possibles
- **Comptabilite** :
  - Saisie depenses (RH, stock, Jirama, maintenance)
  - Recettes (par chambre, par OTA, par segment)
  - Marge restaurant separee
  - Export Excel mensuel/annuel
- **Reports** :
  - Occupation % par mois, par categorie
  - RevPAR (Revenue Per Available Room)
  - ADR (Average Daily Rate)
  - Marge brute resto
  - Coats salariaux vs revenu
  - Cash flow

#### E. Growth — Marketing + CRM
- **Email marketing** :
  - Newsletter trimestriel (jardin saison, nouveautes menu Hasina)
  - Listes : ex-guests / prospects / partenaires / journalistes
  - Templates Resend
- **CRM repeat guests** :
  - Suivi reservations repeated
  - Segmentation : norvegiens, francophones, drivers RN7
  - Notes manuelles "Polly P. preference cafe ground"
  - Birthday/anniversaire alertes
- **Reviews aggregation** :
  - Pull TripAdvisor + Booking + Google reviews via APIs
  - Dashboard note moyenne par source + trends
  - Alertes negative review (auto reply suggested)
- **Partners & press** :
  - Catalogue blogueurs / agences voyage / journalistes
  - Press kit downloadable (logos, photos HD, fact sheet)
  - Affiliate tracking si programme partner
- **Source tracking** :
  - UTM tracking sur tous les liens marketing
  - Conversion funnel : impression → click → booking
  - Cost per acquisition par canal (Booking.com vs direct vs Instagram)
- **Pricing optimization** :
  - Dynamic pricing suggestions basees sur occupation + saison
  - Comparaison tarifs concurrents Fianarantsoa
- **Loyalty** :
  - Repeat-guest discount auto (5% au 2e sejour, 10% au 3e+)
  - Code referrer pour ex-guests qui ramenent du monde

#### F. Channel manager — STAAH
- **STAAH API integration** :
  - Sync stock dispo auto vers Booking.com / Expedia / Airbnb
  - Pull reservations OTA → PMS interne
  - Eviter overbooking
  - Update prix en temps reel sur tous canaux
- **Mapping** : cat Sup/Conf/Std → variantes par OTA
- **Commission tracking** : margin par canal

---

## Stack technologique propose Phase 2

### Base
- **Supabase** : auth + Postgres + Storage + Row Level Security (RLS)
- **Next.js admin** : meme codebase, routes `/admin/*` protegees server-side
- **Tiptap ou Lexical** : rich text editor pour CMS
- **react-hook-form + Zod** : forms + validation

### Integrations
- **Resend** : emails transactionnels + marketing
- **Voaray** : paiements MG (mobile money + cartes locales)
- **STAAH** : channel manager OTA
- **Mapbox** : deja integre
- **Anthropic API** (optionnel) : auto-traduction FR ↔ EN ↔ NO en CMS

### Storage
- **Supabase Storage** : images uploaded
- **Image variants** : Next.js Image + remotePatterns

### Authentification
- **Supabase Auth** : email + magic links
- **Row Level Security** : Mamy/Hasina = admin full, comptable = RO sur RH/finance, employes = RO sur leur planning

---

## Roadmap Phase

### Phase 1 — Site public (en cours, ~80%)
- [x] Pages public (rooms, about, dining, homepage)
- [x] Design system editorial
- [x] SEO foundations (sitemap, robots, JSON-LD, OG)
- [x] Cinematic motion (parallax, sticky scrub, sticky reserve bar)
- [ ] /faq + /plan-your-trip + /journal articles
- [ ] Resend email integration sur BookingDrawer
- [ ] Custom domain hotelambalakely.com
- [ ] i18n FR
- [ ] Real photo session (bloque cote utilisateur)

### Phase 2 — Back-office MVP (~3-4 semaines)
- [ ] Supabase setup + auth admin
- [ ] Schema DB tables (hotel/rooms/categories/features/comparison/articles/photos/reservations/employees/stock/orders/payments)
- [ ] Migration data static → DB
- [ ] CMS basique (articles + photos + copy)
- [ ] PMS basique (calendar + reservations entrantes form site)
- [ ] Resend emails confirmations

### Phase 3 — Operations + Finance + Growth (~6-8 semaines)
- [ ] RH module (employes + payroll + planning)
- [ ] Stock + commandes
- [ ] Jirama tracking
- [ ] Gardiennage planning
- [ ] Voaray paiements
- [ ] Comptabilite + reports
- [ ] CRM repeat guests
- [ ] Email marketing
- [ ] Reviews aggregation

### Phase 4 — Channel manager + Optimization (~3-4 semaines)
- [ ] STAAH integration
- [ ] Dynamic pricing
- [ ] Source tracking + UTM funnels
- [ ] Loyalty program

---

## Decisions techniques notables

- **Zero static data en Phase 2** : tout le contenu via DB, edit possible via /admin
- **Light mode only** : pas de dark mode (decision design)
- **Geist font partout** : pas de Satoshi ni autre
- **Pas d'em-dash** : remplace par period/comma/and
- **Pas de promesse de delai** : retire "we reply within 2 hours" (engagement risque)
- **EUR retire de l'UI** : Ariary uniquement, EUR seulement en JSON-LD SEO
- **Photo-essay flow** : pas de cards, pas de grids 2/3/4-col pour contenu
- **Concierge note signee** : differenciateur vs Aman/Singita/Belmond

---

## Inventaire actuel (snapshot)

### Pages live
- `/` (homepage 11 sections)
- `/rooms` (overview + comparison)
- `/rooms/superieure`, `/confort`, `/standard`
- `/about`
- `/dining`
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image`

### Composants atoms
BookingButton, Container, Divider, FeatureIcon, Heading, JsonLd, Kicker, PriceDisplay, ScrollProgress, Section, Text

### Composants molecules
BookingDrawer, MapboxMap, PageHero, RoomComparison, StickyReserveBar, StickyScrubImage

### Composants sections
Book, Dining, Experiences, Footer, Hero, Journal, Location, Nav, Reviews, Stay, Story, Trust

### Donnees statiques (a migrer)
hotel.ts, categories.ts, comparison.ts, rooms.ts (rooms + experiences + journal_posts + reviews)

### Stack actuel
Next.js 15.5.15, React 19, Tailwind v4, GSAP, Lenis, Phosphor Icons, Mapbox GL, next-intl (installe non-cable), Vercel Analytics, Speed Insights

---

## Contact

- **Founders** : Mamy & Hasina Randriamahazo
- **Email** : reservation@hotelambalakely.com
- **Phone/WhatsApp** : +261 34 02 654 70
- **Location** : Ambalakely, RN7, Fianarantsoa 301, Haute Matsiatra, Madagascar
- **Coordinates** : 21°27′15″S · 47°05′10″E

---

## Note importante

Cette vision est **directrice mais flexible**. Quand on construit le back-office, on commence simple (CRUD basique), on itere selon les besoins reels de Mamy/Hasina, on n'over-engineer pas.

Le but est qu'ils gerent leur hotel sans dependre de devs externes pour chaque change copy.
