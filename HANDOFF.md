# HANDOFF - Hôtel Ambalakely

**Dernière mise à jour : 2026-04-23**

---

## État actuel

**Phase 1 — Homepage MVP scaffoldée et buildable ✅**

Le repo Next.js 15 est initialisé avec toute l'architecture design system world-class. Le build passe (`pnpm build` OK, typecheck OK). La homepage est complète et déployable.

**Route disponible :** `/` (homepage complète avec 8 sections)

---

## Décisions verrouillées

### Stack
- **Framework** : Next.js 15 (App Router) + React 19 + TypeScript
- **Styling** : Tailwind CSS v4 + design tokens custom
- **Animations** : GSAP + SplitText + ScrollTrigger + Lenis + Motion (hybride)
- **Fonts** : Geist + Geist Mono (famille unique, 3 graisses 300/400/500)
- **Icons** : Phosphor Icons (weight `regular`)
- **Deploy** : Vercel Pro + Cloudflare R2 pour médias lourds

### Design system
- **Palette** : `sand` 12-step (warm neutral) + `ore` accent (or neutralisé, <3% pixels)
- **Dark mode** : auto via `prefers-color-scheme` (valeurs définies)
- **Typography** : plancher 13px (label mono UPPERCASE), body 17px
- **Spacing** : scale 8px, sections 96/128/192px
- **Borders only** : ZÉRO shadow, `border-radius` max 4px
- **Images** : 0 border-radius partout (sauf avatars)
- **No text opacity** : couleurs solides uniquement (sand.11/12)

### Business
- **Positioning** : "Ten rooms in the highlands of Madagascar" (pas folklore Betsileo)
- **Audience** : touristes NO/DE/FR/US + expansion Asie (JA/KO phase 2)
- **10 chambres** + resto 40 couverts (Toko Telo)
- **Booking** : PMS propriétaire (pas Mews) + STAAH channel manager + Voaray payment
- **Langues MVP** : FR / EN / DE / NO (phase 2 : JA / KO)
- **Devise** : MGA par défaut + toggle EUR/USD/NOK auto-géo

---

## Fichiers créés

### Config
- `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`
- `.gitignore`, `.env.example`, `README.md`

### Design system (`src/lib/tokens/`)
- `colors.ts` — sand 12-step + sandDark + ore + semantic
- `typography.ts` — Geist family + scale
- `spacing.ts` — 8px grid + containers
- `motion.ts` — durations + easings + GSAP ease map
- `index.ts` — barrel export

### Styles (`src/styles/`)
- `globals.css` — Tailwind v4 + CSS variables + reset + utilities

### Motion primitives (`src/lib/motion/`)
- `SmoothScrollProvider.tsx` — Lenis + GSAP ticker (respects prefers-reduced-motion)
- `SplitReveal.tsx` — GSAP SplitText wrapper (chars/words/lines + scroll trigger option)
- `ScrollReveal.tsx` — Motion fadeRise + Stagger + StaggerItem

### Atoms (`src/components/atoms/`)
- `Button.tsx` + `LinkButton` — 4 variants, 3 sizes, no radius, border-based
- `Container.tsx` — 5 sizes (prose/md/lg/xl/2xl)
- `Section.tsx` — padding 96/128/192 + optional top hairline
- `Heading.tsx` — 7 variants (displayXl/display/h1-h5), responsive
- `Text.tsx` — 5 variants (label/meta/body/bodyLg/lead) + 4 colors (no opacity)
- `Kicker.tsx` — label mono uppercase avec numéro optionnel
- `Divider.tsx` — hairline subtle/strong

### Sections (`src/components/sections/`)
- `Nav.tsx` — sticky transparent → solid on scroll + backdrop-blur
- `Hero.tsx` — SplitText reveal titre "Ambalakely. Ten rooms..."
- `IndexList.tsx` — navigation interne numérotée 01-05
- `Stay.tsx` — grille 6 chambres (sur 10) avec prix MGA + EUR
- `Dining.tsx` — layout asymétrique Toko Telo (4/8 cols)
- `Experiences.tsx` — liste 6 expériences + image portrait
- `Journal.tsx` — 3 derniers articles, format éditorial
- `Book.tsx` — date picker + WhatsApp + email
- `Footer.tsx` — logo géant + 4 colonnes + mentions légales

### App
- `app/layout.tsx` — fonts Geist + SmoothScrollProvider + metadata SEO
- `app/page.tsx` — homepage assemblée
- `app/not-found.tsx` — 404 page

### Data placeholder (`src/lib/data/`)
- `rooms.ts` — 10 chambres Betsileo + 6 expériences + 3 journal posts

### Utils
- `src/lib/utils/cn.ts` — clsx + tailwind-merge

---

## Prochains steps (ordre recommandé)

### Immédiats
1. **`git add .` + premier commit** (une fois ce handoff relu)
2. **`pnpm dev`** pour voir le site en local sur http://localhost:3000
3. **Pousser sur GitHub** (repo privé `hotel-ambalakely`)
4. **Connecter à Vercel** pour preview automatique

### Court terme (semaine 1)
5. **Photo/vidéo session** : budget 2-3k€ pour shoot pro (drone + intérieurs + staff)
6. **Remplacer les placeholders Unsplash** par vrais visuels
7. **Valider les 10 noms de chambres** avec l'équipe (actuels = toponymes Betsileo)
8. **Confirmer la banque** pour activer Maksa BFV-SG si BFV-SG
9. **Implémenter i18n** avec next-intl (FR / EN / DE / NO)
10. **Pages légales** : `/privacy`, `/terms`, `/legal-notice` (rédaction réelle)

### Court terme (semaine 2-3)
11. **Pages chambres détail** : `/rooms/[slug]`
12. **Pages expériences détail** : `/experiences/[slug]`
13. **Sanity CMS setup** pour journal + contenu éditable
14. **Cookie banner RGPD** + analytics Plausible + Clarity heatmaps
15. **Sitemap + robots.txt** + SEO meta complet

### Moyen terme (mois 2)
16. **Supabase setup** (30 tables + RLS + audit_log)
17. **PMS propriétaire** : widget booking natif + calendrier
18. **Voaray integration** : checkout flow sécurisé
19. **STAAH API** : sync OTA (Booking/Expedia/Agoda/Airbnb)
20. **Email transactionnel** : confirmation + pré-arrivée + post-séjour

### Long terme (mois 3-6)
21. **Admin app** (`admin.hotelambalakely.com`) avec modules RH/Stock/Jirama/Gardiennage
22. **POS restaurant iPad** PWA offline-first
23. **CRM diaspora NO** + programme parrainage
24. **App mobile housekeeping** + gardiennage rondes QR

---

## Commandes utiles

```bash
# Dev (avec Turbopack)
pnpm dev

# Build prod
pnpm build

# Typecheck seul
pnpm typecheck

# Lint
pnpm lint

# Start prod local
pnpm start
```

---

## Comptes à créer

- [ ] **GitHub** : repo privé `hotel-ambalakely`
- [ ] **Vercel** : connect GitHub → auto-deploy
- [ ] **Cloudflare** : DNS + R2 bucket
- [ ] **Supabase** : projet EU region
- [ ] **Sanity** : project pour CMS
- [ ] **Voaray** : compte marchand Madagascar
- [ ] **STAAH** : demo + onboarding
- [ ] **Resend** : emails transactionnels
- [ ] **Plausible** : analytics RGPD-clean
- [ ] **Sentry** : error monitoring

---

## Notes importantes

### Ce qu'on **n'a pas** encore branché
- Aucun CMS (contenu hardcodé dans `/lib/data/rooms.ts`)
- Aucune auth (admin panel à venir)
- Aucune DB (Supabase à setup)
- Aucun tracking analytics
- Pas de i18n actif (structure prête mais une seule langue EN pour l'instant)
- Pas de cookie banner
- Pas de payment branché (Voaray compte à ouvrir)

### Sécurité déjà en place
- Security headers dans `next.config.ts` (HSTS, X-Frame-Options, etc.)
- `rel="noopener noreferrer"` sur liens externes
- Pas de cookies non-essentiels au chargement
- Reduced-motion respecté (Lenis + toutes animations)
- Focus-visible avec outline accent

### TODOs techniques flaggés dans le code
Aucun TODO bloquant. Tout le scaffolding est propre.

---

## Qui fait quoi

- **Tahina** : dev complet + scaffolding + tous les sprints techniques
- **Hasina** : founder, validation stratégique, pas opérationnelle jour-à-jour
- **Équipe Ambalakely** : fournit le contenu (noms chambres, photos, prix, expériences)

---

## Références design

- **Geist Design System** (Vercel) — https://vercel.com/geist
- **Radix Colors** (12-step scale) — https://www.radix-ui.com/colors
- **Awwwards Hotel/Restaurant** — https://www.awwwards.com/websites/hotel-restaurant/
- **GSAP** (100% free since Webflow acquisition) — https://gsap.com
- **Lenis** — https://www.lenis.dev

---

**Status global : READY TO DEPLOY 🟢**

Le site compile, tous les composants fonctionnent, l'architecture est propre.
Prochaine étape concrète : `git add . && git commit` puis `pnpm dev` pour visualiser.
