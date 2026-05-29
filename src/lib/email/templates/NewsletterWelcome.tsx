import { Section, Text } from '@react-email/components';
import { Shell, styles, type EmailLocale } from './_shared';

const signature = {
  fontSize: '15px',
  lineHeight: 1.5,
  color: styles.SAND_12,
  margin: '32px 0 0',
  fontStyle: 'italic' as const,
};

// §36 pivot (2026-05-27 evening) — soft editorial + privileged-access
// angle, 5-8 letters a year. Kept the editorial soul but added the
// conversion lever the user asked for : "parfois une nuit en avant-
// première, parfois un tarif réservé aux lecteurs". The previous "no
// commercial offers, no promotions" stance was actively anti-conversion.
const COPY = {
  fr: {
    preview: "Bienvenue dans la lettre d'Ambalakely.",
    heading: 'Bienvenue.',
    p1: "Vous recevrez une lettre courte d'Hasina à chaque saison. Le jardin, les nouvelles du restaurant, les voyageurs qui sont passés, parfois une note depuis la RN7.",
    p2: "Et de temps en temps, une chambre disponible avant la mise en ligne, ou un tarif réservé à nos lecteurs. Cinq à huit envois par an, jamais plus.",
    closing: 'À très vite,',
    signedBy: 'Hasina',
  },
  en: {
    preview: "Welcome to Ambalakely's letter.",
    heading: 'Welcome.',
    p1: "You'll receive a short letter from Hasina each season. The garden, the kitchen, the travellers who came through, sometimes a note from the RN7.",
    p2: "And from time to time, a room before it goes online, or a rate kept for our readers. Five to eight letters a year, never more.",
    closing: 'See you soon,',
    signedBy: 'Hasina',
  },
  no: {
    preview: "Velkommen til Ambalakelys brev.",
    heading: 'Velkommen.',
    p1: 'Du vil motta et kort brev fra Hasina hver sesong. Hagen, kjøkkenet, de reisende som var innom, av og til en note fra RN7.',
    p2: 'Og av og til, et rom før det legges ut, eller en pris forbeholdt leserne. Fem til åtte brev i året, aldri mer.',
    closing: 'Vi ses,',
    signedBy: 'Hasina',
  },
} as const;

export function NewsletterWelcome({ locale = 'fr' }: { locale?: EmailLocale } = {}) {
  const c = COPY[locale];
  return (
    <Shell preview={c.preview} lang={locale}>
      <Section>
        <Text style={styles.heading}>{c.heading}</Text>
        <Text style={styles.paragraph}>{c.p1}</Text>
        <Text style={styles.paragraph}>{c.p2}</Text>
        <Text style={signature}>
          {c.closing}
          <br />
          {c.signedBy}
        </Text>
      </Section>
    </Shell>
  );
}

/** Email subject per locale, used by the API route. §36 pivoted away
 * from "seasonal letter" framing to plain "letter" — the body sets
 * the cadence (5-8x/year) so the subject doesn't need to. */
export const NEWSLETTER_SUBJECT: Record<EmailLocale, string> = {
  fr: "Bienvenue dans la lettre d'Ambalakely",
  en: "Welcome to Ambalakely's letter",
  no: 'Velkommen til Ambalakelys brev',
};
