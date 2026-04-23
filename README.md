# Hôtel Ambalakely

Site web world-class pour l'Hôtel Ambalakely à Fianarantsoa, Madagascar.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** avec design tokens custom
- **GSAP** + **SplitText** + **ScrollTrigger** (animations cinématiques)
- **Lenis** (smooth scroll physics-based)
- **Motion** (ex Framer Motion, pour composants React simples)
- **Phosphor Icons** (weight regular, cohérence absolue)
- **Geist + Geist Mono** (font family unique, 3 graisses)

## Design principles

1. **Borders-only separation.** Zéro shadow. `border-radius` max 4px.
2. **Images: 0 radius.** Sharp edges partout.
3. **Typography minimum 13px** (labels mono uppercase), body 17px.
4. **No opacity on text.** Couleurs solides uniquement (sand.11 / sand.12).
5. **One accent only** (ore, or neutralisé, <3% des pixels).
6. **Section padding 96/128/192px.** Le silence est un luxe.
7. **Motion: no spring, no bounce.** Durations 120-880ms max.

Voir `src/lib/tokens/` pour le système complet.

## Getting started

```bash
pnpm install
pnpm dev
```

Ouvre http://localhost:3000

## Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout + fonts + Lenis
│   └── page.tsx           # Homepage
├── components/
│   ├── atoms/             # Button, Container, Heading, Text, Kicker, Divider
│   └── sections/          # Nav, Hero, Stay, Dining, Experiences, Journal, Book, Footer
├── lib/
│   ├── tokens/            # Design system (colors, typography, spacing, motion)
│   ├── motion/            # SmoothScrollProvider, SplitReveal, ScrollReveal
│   ├── data/              # Placeholder content (rooms, experiences, journal)
│   └── utils/             # cn() helper
└── styles/
    └── globals.css        # Tailwind v4 + tokens
```

## Phases

### Phase 1 — Vitrine (actuelle)
- [x] Homepage design system
- [ ] Pages chambres détail
- [ ] Pages expériences détail
- [ ] Journal (Sanity CMS)
- [ ] Pages légales (/privacy, /terms, /legal-notice)
- [ ] Multilingue (FR / EN / DE / NO via next-intl)
- [ ] SEO complet + sitemap + robots

### Phase 2 — Booking
- [ ] PMS propriétaire (Next.js + Supabase)
- [ ] Widget booking natif intégré
- [ ] Voaray payment gateway (MGA + cartes intl + mobile money)
- [ ] STAAH channel manager (sync OTA)
- [ ] Email transactionnel (Resend)

### Phase 3 — Back-office
- [ ] Admin app `admin.hotelambalakely.com`
- [ ] Modules : RH, Paie MGA, Housekeeping, Gardiennage QR, Stock, Jirama
- [ ] POS restaurant (iPad PWA offline-first)
- [ ] Fiche police auto
- [ ] KPI dashboard unifié

### Phase 4 — CRM + Automations
- [ ] CRM diaspora NO + parrainages
- [ ] Email séquences post-séjour
- [ ] Pipeline reviews Google/TripAdvisor

## Sécurité (voir `/docs/security.md`)

- PCI DSS via Voaray
- RGPD + loi malgache n° 2014-038
- Supabase RLS sur toutes les tables
- 2FA obligatoire staff
- Audit log append-only
- Backups 3-2-1 (PITR + S3 + R2 cold)
- Passport scans : purge auto J+30

## Hébergement

- **Vercel Pro** pour le site
- **Cloudflare R2** pour médias lourds (vidéos, images HD)
- **Supabase EU** pour DB + auth + storage sensible

## Licence

Propriétaire · Tous droits réservés
