# HANDOFF — Ambalakely

Dernière mise à jour : 2026-04-23

## Statut

**Live :** https://ambalakely.vercel.app
**Stack verrouillée :** Next.js 15 · Tailwind v4 · TypeScript · GSAP · Lenis · Motion · Phosphor · Geist

## Ce qui est fait

### Foundations
- Monorepo-friendly layout (`src/app`, `src/components`, `src/lib`)
- Design tokens complets (sand 12-step, ore accent, Geist triple, spacing 8px)
- Tailwind v4 preset avec tokens CSS variables
- Security headers (HSTS, CSP-ready, nosniff, frame DENY)
- Cookie banner + pages légales skeleton
- Typecheck vert

### Composants
- Atoms : Button, Container, Heading, Text, Icon, Divider, Kicker, Section
- Loader d'entrée (curtain + compteur 000→100)
- Sections : Nav (blend-mode difference), Hero (3-line mask reveal + bg zoom), IndexList, Stay, Dining, Experiences, Reviews, Trust, Location, Journal, Book (dark theme), Footer

### Motion
- SmoothScrollProvider (Lenis lerp 0.055, single RAF via GSAP ticker)
- SplitReveal (GSAP SplitText par mots/lignes/caractères)
- ScrollReveal + Stagger/StaggerItem (fade+rise avec clearProps onComplete)
- FullBleedShrink (image full-bleed → contained, scale GPU-only, scrub 1.8)
- FullBleedToSide (image + info panel, scale + translate GPU, scrub 1.8)

### Trust & conversion
- Reviews section : 4.9 · 127 reviews + 4 témoignages éditoriaux
- Trust section : 18 staff · 97% local + featured/recognition/payments + PCI DSS mention
- Location section : carte topo SVG custom + 5 points géographiques + 3 modes transport

### Deploy
- Vercel production active
- Nom projet : ambalakely (scope tahinas-projects-0021cf78)

## En attente

- Git commit + push GitHub + auto-deploy pipeline
- Custom domain `hotelambalakely.com` (DNS à configurer côté registrar)
- I18n FR/DE/NO (phase 2, en plus de EN actuel)
- Pages détail : `/rooms/[slug]`, `/experiences/[slug]`, `/about`, `/journal/[slug]`
- Session photo/vidéo pro (remplacer les placeholders Unsplash)
- Sanity CMS integration (schemas déjà prévus)
- Supabase PMS schema (30 tables, RLS, audit_log, à builder)
- Voaray payment gateway integration
- STAAH channel manager integration

## Décisions clés prises

- PMS 100% propriétaire (pas de Mews) — option C
- STAAH comme channel manager standalone (~50€/mo)
- Voaray comme payment gateway principal (cartes intl + MVola/Orange/Airtel)
- Pas de Stripe (Madagascar non supporté)
- Devise MGA par défaut + toggle EUR/USD/NOK géo-détecté
- Images : 0 border-radius par défaut (animation radius sur scroll autorisée)
- 0 shadow — borders only pour toutes les séparations
- Font Geist mono-famille (display + body + mono) — pas de duo

## Prochain step

Selon priorité :
1. Git push GitHub + lier Vercel pour auto-deploy
2. Ajouter Sanity CMS pour que l'équipe édite sans dev
3. Session photo pro (2-3k€, remplace tous les placeholders)
4. Pages détail rooms/experiences
