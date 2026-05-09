# Arborescence + Content Map — Hotel Ambalakely

**Last updated** : 2026-05-08
**Scope** : Layer 1 (site public). Layer 2 admin = voir `VISION.md`.

---

## Principes

- **URL slugs en anglais** par defaut (canonical EN). FR/NO = sous-arbre `/fr/*` `/no/*` (Phase i18n).
- **Slugs ASCII only** (pas d'accent dans l'URL). `/rooms/superieure` pas `/rooms/supérieure`.
- **Hub & spoke** : homepage = hub avec preview de tous les spokes. Spokes = detail pages.
- **Pas de page sans contenu reel** : on ne cree pas de route si on n'a pas le copy + photos. Reduit le 404 / placeholder.

---

## Arborescence URL complete

### Live actuellement (13 pages)

```
/                                        ← homepage hub
├── /rooms                               ← overview + comparison grid
│   ├── /rooms/superieure                ← cinematic detail (SSG)
│   ├── /rooms/confort                   ← cinematic detail (SSG)
│   └── /rooms/standard                  ← cinematic detail (SSG)
├── /dining                              ← Toko Telo (Restaurant JSON-LD)
├── /plan-your-trip                      ← 3 itineraires
├── /journal                             ← overview articles
│   └── /journal/koselig-in-the-highlands  ← 1 article (Hasina, 700 mots)
├── /about                               ← Mamy & Hasina, founders, timeline, hope
├── /faq                                 ← 6 categories, ~25 entries
├── /sitemap.xml
├── /robots.txt
└── /opengraph-image                     ← dynamic OG (edge)
```

### A construire (Phase 1 reste)

```
/hope-for-the-future                     ← page dediee Hope (move from /about#hope)
/experiences                             ← list des 6 experiences (Ranomafana, rice fields, cooking, Sahambavy, Andringitra, Hope visit)
/experiences/[slug]                      ← detail per experience (optionnel)
/press                                   ← press kit (logos, photos HD, factsheet PDF)
/legal                                   ← mentions legales
/privacy                                 ← politique confidentialite
/terms                                   ← CGV
/booking-received                        ← post-submit confirmation (avec Resend)
/api/booking                             ← server route (avec Resend)
/404                                     ← custom 404 elegant
```

### Phase i18n (FR + NO mirrors)

```
/fr/*     ← toutes les pages EN dupliquees en FR
/no/*     ← idem norvegien (audience Hasina/Oslo)
```

### Phase 2 back-office (admin only)

```
/admin                                   ← dashboard
/admin/login
/admin/cms/articles                      ← CRUD journal
/admin/cms/photos                        ← library
/admin/cms/pages                         ← edit FAQ, plan-your-trip, copy
/admin/pms/calendar                      ← reservations
/admin/pms/guests                        ← profiles
/admin/ops/employees                     ← RH (3 employes)
/admin/ops/stock                         ← inventaire cuisine
/admin/ops/orders                        ← commandes
/admin/ops/utilities                     ← Jirama (eau, electricite)
/admin/ops/security                      ← gardiennage
/admin/finance/payments                  ← Voaray
/admin/finance/reports                   ← occupation, RevPAR, ADR
/admin/growth/email                      ← newsletters
/admin/growth/crm                        ← repeat guests
/admin/growth/reviews                    ← TripAdvisor + Booking aggregation
/admin/growth/partners                   ← press + partners
/admin/channels/staah                    ← OTA sync config
```

---

## Inventaire des pages live (status + contenu actuel)

### `/` Homepage (LIVE, ~80% polish)

**Goal** : conversion + first impression
**Meta** : "Ambalakely. Ten rooms in the highlands of Madagascar"
**OG** : edge dynamic (sand monochrome)

**Sections actuelles (a auditer)** :
1. Hero — full viewport exterieur.jpg + 3-line mask reveal title + "Check availability" CTA
2. Stay — refondu (no cards, hairline list 3 categories)
3. Dining — sticky scrub Toko Telo
4. Experiences — list 6 items (no link, dead routes retires)
5. Story — Mamy + Hasina (a auditer pour aligner sur new editorial)
6. Reviews — single rotating quote (audit ?)
7. Trust — Hope for the Future preview (link a updater vers /hope-for-the-future)
8. Location — Mapbox + distances + 3 transport modes
9. Journal — list articles cliquables (now linked to real /journal/[slug])
10. Book — section avec form (REDONDANT avec BookingDrawer ?)
11. Footer

**A faire** :
- [ ] Audit Story section (aligner editorial)
- [ ] Decider Reviews : 1 quote ou plusieurs ?
- [ ] Trust : update link vers /hope-for-the-future quand cree
- [ ] Decider Book section : virer / fusionner / simplifier
- [ ] Experiences : si pas de detail page, remplacer par link vers /experiences une fois creee

### `/rooms` (LIVE, polish OK)
**Goal** : aider a choisir
**Sections** : PageHero / intro / comparison grid 12 criteres / 3 chapitres photo-essay / Reserve CTA

**A faire** : rien

### `/rooms/[category]` (LIVE, cinematic OK)
**Goal** : conversion par chambre
**Sections** : PageHero parallax + StickyReserveBar / opening prose + specs italique / StickyScrubImage / continuation / image / concierge note signed / asymmetric pair / dark CTA / continue list

**A faire** :
- [ ] Ajouter pull review near booking CTA (utilisater reviews data)
- [ ] Possibilite : photo gallery lightbox sur les images (clic ouvre modal)

### `/dining` (LIVE, polish OK)
**Goal** : trust + booking dinner pour day visitors
**Sections** : PageHero / intro + facts italique / image full-bleed / menu 3 sections / concierge Hasina / drinks / Reserve

**A faire** :
- [ ] Ajouter une review specifique food (Polly P. mentions food)

### `/plan-your-trip` (LIVE)
**Goal** : SEO long tail + bloggers + decision-helping
**Sections** : PageHero / intro / quick nav 3 itineraries / 3 chapters day-by-day / Booking CTA

**A faire** :
- [ ] Ajouter visuel map de la RN7 (statique ?)
- [ ] Photos hero per itineraire (besoin photos reelles)

### `/journal` + `/journal/[slug]` (LIVE 1 article)
**Goal** : SEO content + voice + bloggers
**Sections overview** : PageHero / intro / list articles full-bleed / link
**Sections article** : PageHero / byline / body / pull quote / body / signature / Booking CTA / other articles

**A faire** :
- [ ] **2 articles a ecrire** :
  - "What the garden gives in April" par Mamy (~600-800 mots)
  - "Ten years of Hope for the Future" par Hasina ou Mamy (~800-1000 mots)
- [ ] Apres : updater Journal section homepage qui affichera 3 vrais articles

### `/about` (LIVE)
**Goal** : trust, story, conversion
**Sections** : PageHero / intro / founders split / timeline 4 milestones / pull quote / Hope for the Future / Booking CTA / Continue link

**A faire** :
- [ ] Quand /hope-for-the-future est creee, la section Hope ici devient un teaser link
- [ ] Possibly : ajouter section "Press / featured in" si on a des mentions

### `/faq` (LIVE)
**Goal** : reduce friction, SEO long-tail rich results
**Sections** : PageHero / intro / 6 categories sticky-label / Reserve CTA

**A faire** :
- [ ] Possible ajouts au fil du temps : kids, pregnancy, business travelers
- [ ] FR translation Phase i18n

---

## Pages a construire (Phase 1 reste)

### `/hope-for-the-future` (NEW)

**Goal** : sustainability story + bloggers + journalists
**Slug** : `/hope-for-the-future` (pas `/hope` car trop generic)

**Structure proposee** :
1. PageHero — image programme, caption "Community", title "Hope for the Future."
2. Intro lede — "Ten years in the villages around Fianarantsoa."
3. The numbers — section avec chiffres (ecoles, enfants, villages)
4. Image essay — 3-4 photos full-bleed
5. The school — paragraphe long sur les 130 enfants de Tanambao
6. Visit — comment les guests peuvent visiter (Tuesdays/Thursdays half-day)
7. Pull quote signed Mamy
8. How a stay supports — explanation portion of stay
9. CTA Booking
10. Continue link vers /about

**Content a rediger** : ~600-800 mots prose
**Photos needed** : 3-4 vraies photos du programme (bloque sur user)

### `/experiences` (NEW)

**Goal** : SEO + content + decision aid
**Slug** : `/experiences`

**Decision** : full page liste seule, OU page liste + detail per experience ?
**Reco** : page liste seule pour Phase 1 (les 6 experiences en 6 chapitres avec image + prose courte). Phase 2 si besoin = detail per experience.

**Structure** :
1. PageHero — caption "Experiences", title "What this land gives."
2. Intro lede
3. List of 6 experiences en chapter blocks :
   - Ranomafana National Park (full day, lemurs)
   - Rice field walk (2h, around the village)
   - Cooking with Hasina (4h, garden produce)
   - Sahambavy tea estate (half day)
   - Andringitra trek (3 days)
   - Hope for the Future visit (2h, Tuesdays/Thursdays)
4. Booking CTA + arranged by hotel note

**Content** : ~150-200 mots per experience (~1000-1200 total)

### `/press` (NEW, optionnel)

**Goal** : journalists, bloggers, partners can grab assets
**Slug** : `/press`
**Structure** :
- Logos zip download
- Hi-res photos zip
- Fact sheet PDF
- Boilerplate copy 100 / 250 / 500 mots
- Contact press

### `/legal` `/privacy` `/terms` (NEW)

**Goal** : legal compliance
**Slugs** : `/legal` `/privacy` `/terms`

**Content** : templates standards + adaptations Madagascar
**Reco** : Phase i18n FR (juridique compte tenu hotel domicilie MG)

### `/404` custom

**Goal** : graceful error
**Structure** : sand background + "Off the path" hero + link back to /

### `/booking-received` (Phase tech, avec Resend)

**Goal** : confirmation post-submit
**Structure** : minimal page, sand-12, "Reserved." massive + details + email confirmation note

---

## Content writing checklist

### A rediger en priorite

| Page | What to write | Length | Author voice |
|------|---------------|--------|--------------|
| `/journal/garden-in-april` | Article Mamy sur le jardin en avril | ~600-800 mots | Mamy |
| `/journal/ten-years-of-hope` | Article Hope for the Future | ~800-1000 mots | Mamy ou Hasina |
| `/hope-for-the-future` | Page complete sustainability | ~600-800 mots | Mamy |
| `/experiences` | 6 experiences x ~150-200 mots | ~1000-1200 mots | hotel voice neutre |

### Optionnel / plus tard

| Page | What | Length |
|------|------|--------|
| `/press` boilerplate | 100 / 250 / 500 mots versions | mixed |
| `/legal /privacy /terms` | templates juridiques | template |
| Articles journal additional | seasonal updates, recipe stories | ongoing |

### Photos a fournir (bloque user)

- Photos chambres dressing : matin / soir per categorie (currently Squarespace 1500w only)
- Photos jardin : different saisons
- Photos Hasina kitchen + plating
- Photos Mamy gardening / land
- Photos Hope for the Future programme (ecole, enfants, ateliers)
- Photos exterieures hotel sunset
- Photo team groupe (3 employes)
- Photos plats specifiques (Zebu Marengo, Kjottkaker, Krumkake, ravitoto)
- Photos transferts / RN7 / paysages
- Photos Toko Telo dining room intimate

---

## Internal linking strategy

### Hub homepage → spokes
- Stay section → `/rooms` + `/rooms/{cat}`
- Dining section → `/dining`
- Experiences → `/experiences` (when built)
- Story → `/about`
- Trust → `/hope-for-the-future` (when built) au lieu de `/about#hope`
- Journal → `/journal` + featured articles
- Book → BookingDrawer (event open-booking)
- Location → no link (just info)

### Spoke → spokes (cross-linking)
- `/rooms/[category]` :
  - Concierge mention "kitchen" → `/dining`
  - Continue link → `/rooms/{others}`
  - Booking CTA → BookingDrawer
- `/about` :
  - Hasina kitchen mention → `/dining` (deja fait)
  - Reference rooms → `/rooms`
  - Hope mention → `/hope-for-the-future` (when built)
- `/dining` :
  - Hasina story → `/about#founders`
  - Stay night link → `/rooms`
- `/journal/[slug]` :
  - Author bio → `/about#founders`
  - Booking CTA → BookingDrawer
- `/plan-your-trip` :
  - Each itinerary mentions Ambalakely as base → `/rooms`
  - Drivers/guides mention → desk arrangement
- `/faq` :
  - "Reserve dinner" → `/dining`
  - "Read the rooms" → `/rooms`
  - "Visit Hope" → `/hope-for-the-future`

### Footer
4 columns deja en place (Stay / Discover / About / Contact).
Updater quand nouvelles pages :
- Discover : ajouter `/experiences` quand creee
- About : ajouter `/hope-for-the-future` quand creee, deja FAQ ajoute

---

## i18n Phase considerations

Quand on cable next-intl :
- Default locale `en` (route `/*`)
- Locale `fr` (route `/fr/*`) — public majoritaire francophone
- Locale `no` (route `/no/*`) — reseau Hasina Oslo
- Locale `mg` malgache — optionnel, public local plus rare

Toutes les pages doivent etre traduites :
- Static text via `useTranslations('faq')` etc
- Data files (categories, faq, articles, itineraries) doivent porter `{ en, fr, no }` per field
- Slugs traduits ?
  - EN : `/rooms/superieure`
  - FR : `/fr/chambres/superieure` (slugs FR)
  - NO : `/no/rom/superieure`
- Hreflang tags dans layout `<head>`

**Decision** : on traduit les VALEURS texte mais on garde les slugs en EN canonique pour simplicite (`/fr/rooms/superieure`). Sauf pour les routes top-level on peut localiser : `/fr/chambres` au lieu de `/fr/rooms`.

---

## Status snapshot

| URL | Status | Author voice | Length | Photos |
|-----|--------|--------------|--------|--------|
| `/` | LIVE 80% | mixed | ~1500 mots | Squarespace OK |
| `/rooms` | LIVE 100% | hotel | ~400 mots + comparison | OK |
| `/rooms/superieure` | LIVE 100% | Mamy concierge | ~250 mots | OK |
| `/rooms/confort` | LIVE 100% | Hasina concierge | ~250 mots | OK |
| `/rooms/standard` | LIVE 100% | Mamy concierge | ~250 mots | OK |
| `/dining` | LIVE 100% | Hasina concierge | ~600 mots | OK |
| `/about` | LIVE 90% | mixed | ~800 mots | OK |
| `/plan-your-trip` | LIVE 100% | hotel | ~1500 mots | OK |
| `/journal` | LIVE 50% (1 article) | mixed | varies | OK |
| `/journal/koselig-in-the-highlands` | LIVE 100% | Hasina | ~700 mots | OK |
| `/faq` | LIVE 100% | hotel | ~2000 mots | not needed |
| `/hope-for-the-future` | TODO | Mamy | ~700 mots | needed |
| `/experiences` | TODO | hotel | ~1200 mots | needed |
| `/journal/garden-in-april` | TODO | Mamy | ~700 mots | needed |
| `/journal/ten-years-of-hope` | TODO | Hasina | ~900 mots | needed |
| `/press` | OPTIONAL | corp | template | needed |
| `/legal /privacy /terms` | TODO | legal | template | not needed |
| `/404` | TODO | hotel | minimal | optional |

---

## Roadmap front (next steps ranges par impact)

### Semaine 1 — homepage coherence + content depth
1. Audit + polish homepage Story section (align editorial language)
2. Polish Reviews / Trust / Book sections (fusion ou simplification)
3. Build `/hope-for-the-future` page complete
4. Build `/experiences` page complete
5. Updater Trust section homepage pour pointer `/hope-for-the-future`

### Semaine 2 — content depth supplementaire
6. Ecrire 2 nouveaux articles (jardin + Hope) → `/journal/garden-in-april` + `/journal/ten-years-of-hope`
7. Updater Journal section homepage pour afficher 3 articles
8. Build `/legal /privacy /terms` (templates)
9. Build custom `/404`

### Semaine 3 — polish technique
10. Page transitions entre routes (sand fade)
11. Image lightbox sur galleries
12. Image LQIP blur placeholders
13. Mobile audit
14. Accessibility audit (focus, aria, keyboard nav)
15. Lighthouse + perf fixes

### Semaine 4 — i18n FR
16. Cabler next-intl, structure data files multi-locales
17. Traduire toutes les pages EN → FR
18. Hreflang tags + sitemap multi-locales
19. LangSwitcher dans Nav

### Apres → Phase tech (Resend, custom domain) → Phase 2 (Supabase admin)

---

## Decisions a prendre

- [ ] **Book section homepage** : on garde / fusionne avec BookingDrawer / supprime ?
- [ ] **Reviews section homepage** : single rotating ou multiple inline ?
- [ ] **Experiences detail pages** : page liste seule, ou liste + detail per experience ?
- [ ] **/hope-for-the-future url** : `/hope-for-the-future` ou `/community` ou `/the-school` ?
- [ ] **Slugs i18n** : `/fr/rooms/superieure` ou `/fr/chambres/superieure` ?
- [ ] **Articles journal** : Mamy ou Hasina pour Hope for the Future article ?
