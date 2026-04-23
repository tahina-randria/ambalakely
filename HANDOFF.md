# HANDOFF — Ambalakely

Dernière mise à jour : 2026-04-23 12:35

## Live

- **Prod (stable)** : https://ambalakely.vercel.app (ancien deploy, HTTP 200)
- **GitHub** : https://github.com/tahina-randria/ambalakely (privé)
- **Vercel** : projet `ambalakely` dans scope `tahinas-projects-0021cf78`, auto-deploy GitHub activé
- **Local dev** : `pnpm dev` sur http://localhost:3000

## ⚠️ Problème en cours : Vercel deploy failing

Depuis ~12h20, tous les deploys sur Vercel retournent `Unexpected error · "" · deploy_failed` avec `Builds: . [0ms]` (build ne démarre même pas). Status page Vercel dit "All Systems Operational" mais c'est un blip platform-side. Le build local passe nickel (5s, 173 KB First Load JS).

**Action quand tu reprends** : `vercel --prod --yes --force` dans le dossier. Ou push un micro commit sur `main` pour retrigger l'auto-deploy.

Le code local contient des améliorations pas encore en prod :
- Loader retiré
- Hero en CSS animations pure (text toujours visible)
- Dining allégé (menu du soir au lieu de stats)
- Contact section complet (form + méthodes directes)
- Group booking flow dans Book (5+ guests)
- Selection color en alpha ore

## Ce qui est fait (code local + git committé)

### Foundations
- Next.js 15 + Turbopack + TypeScript strict + Tailwind v4
- Design tokens : sand 12-step, ore accent, Geist triple (display/body/mono)
- Security headers (HSTS, nosniff, frame DENY)
- Fonts loaded via next/font (Geist + Geist_Mono)
- Monorepo-ready structure (src/app, src/components, src/lib)

### Sections homepage
1. Hero (CSS animations : line rise + bg zoom-out)
2. IndexList (01-06 + arrow hover)
3. Stay (grille 6 chambres placeholders Betsileo)
4. Dining (FullBleedToSide + menu du soir 3 plats)
5. Experiences (FullBleedShrink + liste 6 expériences)
6. Reviews (4.9 · 127 reviews + 4 testimonials)
7. Trust (stats + featured/recognition/payments + PCI mention)
8. Location (carte topo SVG custom + 5 points)
9. Journal (3 articles éditoriaux)
10. Contact (split layout avec form complet)
11. Book (dark theme + calendar blanc + group flow 5+)

### Motion primitives
- SmoothScrollProvider (Lenis lerp 0.055, single RAF via GSAP ticker)
- SplitReveal (GSAP SplitText par mots/lignes/caractères)
- ScrollReveal + Stagger (fade+rise + clearProps onComplete)
- FullBleedShrink (image pinned + scale GPU → contained, scrub 1.8)
- FullBleedToSide (image + info panel scale+translate GPU, scrub 1.8)

### UX details
- Nav mix-blend-mode difference (hero) → solid avec backdrop-blur (scroll)
- Selection color alpha-ore (lisible light + dark content)
- Hovers : transition scopée `[color,transform]` (plus de flicker)
- Inputs : `.input-base` (light) + `.input-dark` (dark) avec chevron custom
- Date input : filter invert(1) en dark mode + color-scheme dark
- Images : 0 border-radius par défaut (radius-on-scroll autorisé sur FullBleed*)
- 0 shadow partout — borders only

## Backlog

### Critique
- [ ] Session photo/vidéo pro (2-3k€, 2-3 jours) — remplace tous placeholders Unsplash
- [ ] Debug deploy Vercel (probablement self-resolve quand platform se réveille)

### Phase 2
- [ ] I18n FR / DE / NO (EN actuel seulement) — next-intl déjà en dépendance
- [ ] Pages détail : `/rooms/[slug]`, `/experiences/[slug]`, `/about`, `/journal/[slug]`, `/dining`
- [ ] Sanity CMS integration (schemas prévus : hotel, room, experience, journalPost, package, review, teamMember, page)
- [ ] Custom domain `hotelambalakely.com` sur Vercel (DNS records côté registrar)

### Phase 3 — Opérations
- [ ] Supabase PMS schema (30 tables + RLS + audit_log + pgcrypto)
- [ ] Voaray payment gateway integration (Mada : cartes intl + MVola/Orange/Airtel)
- [ ] STAAH channel manager API (sync Booking/Expedia/Agoda/Airbnb)
- [ ] Back-office : RH/paie MGA+CNaPS, stock+HACCP, Jirama tracker, housekeeping mobile PWA, gardiennage QR rounds
- [ ] POS restaurant iPad custom (offline-first, KDS cuisine)

## Décisions clés verrouillées

- **PMS 100% propriétaire** (pas de Mews) — build interne Next.js + Supabase
- **STAAH** comme channel manager standalone (~50€/mo)
- **Voaray** comme payment gateway principal (pas de Stripe, Mada non supporté)
- **Devise MGA** par défaut + toggle EUR/USD/NOK géo-détecté à l'affichage
- **Hébergement** : Vercel Pro (app) + Cloudflare R2/Stream (médias lourds) + Supabase (BDD)
- **Font** : Geist mono-famille (display 300/400/500 + Mono) — pas de duo Geist+Satoshi
- **Design** : sand warm neutral 12-step + ore accent très discret, 0 shadows, radius max 4px, Geist typography

## Prochain step

1. Réessayer deploy Vercel quand platform revient à la normale
2. Continuer sur pages détail OU i18n OU Sanity selon priorité
