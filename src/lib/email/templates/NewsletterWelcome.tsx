import { Section, Text } from '@react-email/components';
import { Shell, styles, type EmailLocale } from './_shared';

const signature = {
  fontSize: '15px',
  lineHeight: 1.5,
  color: styles.SAND_12,
  margin: '32px 0 0',
  fontStyle: 'italic' as const,
};

const COPY = {
  fr: {
    preview: "Bienvenue dans la lettre saisonnière d'Ambalakely.",
    heading: 'Bienvenue.',
    p1: "Vous recevrez une lettre courte d'Hasina à chaque saison. Le jardin, les nouvelles du restaurant, les voyageurs qui sont passés, parfois une note depuis la RN7.",
    p2: "Pas d'offres commerciales, pas de promotions. Une lettre, quatre fois par an.",
    closing: 'À très vite,',
    signedBy: 'Hasina',
  },
  en: {
    preview: "Welcome to Ambalakely's seasonal letter.",
    heading: 'Welcome.',
    p1: "You'll receive a short letter from Hasina each season. The garden, the kitchen, the travellers who came through, sometimes a note from the RN7.",
    p2: 'No commercial offers, no promotions. One letter, four times a year.',
    closing: 'See you soon,',
    signedBy: 'Hasina',
  },
  no: {
    preview: "Velkommen til Ambalakelys sesongbrev.",
    heading: 'Velkommen.',
    p1: 'Du vil motta et kort brev fra Hasina hver sesong. Hagen, kjøkkenet, de reisende som var innom, av og til en note fra RN7.',
    p2: 'Ingen kommersielle tilbud, ingen kampanjer. Ett brev, fire ganger i året.',
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

/** Email subject per locale, used by the API route. */
export const NEWSLETTER_SUBJECT: Record<EmailLocale, string> = {
  fr: "Bienvenue dans la lettre saisonnière d'Ambalakely",
  en: "Welcome to Ambalakely's seasonal letter",
  no: 'Velkommen til Ambalakelys sesongbrev',
};
