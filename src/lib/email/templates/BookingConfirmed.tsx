import { Section, Text } from '@react-email/components';
import { Shell, styles, type EmailLocale } from './_shared';

export type BookingConfirmedData = {
  arrival: string; // 'YYYY-MM-DD'
  departure: string;
  guests: number;
  name: string;
  reference: string;
  room?: string;
};

const summary = {
  fontSize: '14px',
  lineHeight: 1.6,
  color: styles.SAND_11,
  margin: 0,
  padding: '20px',
  backgroundColor: '#f5f5f4',
};

const signature = {
  fontSize: '15px',
  lineHeight: 1.5,
  color: styles.SAND_12,
  margin: '32px 0 0',
  fontStyle: 'italic' as const,
};

const COPY = {
  fr: {
    preview: 'Votre séjour est confirmé.',
    heading: (firstName: string) => `C'est confirmé, ${firstName}.`,
    p1: "Votre séjour à l'Hôtel Ambalakely est confirmé. Nous avons hâte de vous accueillir.",
    p2: "Une question avant l'arrivée ? Écrivez-nous ou appelez le +261 34 11 254 34 (WhatsApp ou téléphone).",
    summaryTitle: 'Votre réservation',
    referenceLabel: 'Référence',
    arrivalLabel: 'Arrivée',
    departureLabel: 'Départ',
    guestsLabel: 'Voyageurs',
    roomLabel: 'Chambre',
    closing: 'À très bientôt.',
    signedBy: 'Hasina et Mamy',
    dateLocale: 'fr-FR',
  },
  en: {
    preview: 'Your stay is confirmed.',
    heading: (firstName: string) => `It's confirmed, ${firstName}.`,
    p1: 'Your stay at Hôtel Ambalakely is confirmed. We look forward to welcoming you.',
    p2: 'Any question before arrival? Write to us or call +261 34 11 254 34 (WhatsApp or phone).',
    summaryTitle: 'Your reservation',
    referenceLabel: 'Reference',
    arrivalLabel: 'Arrival',
    departureLabel: 'Departure',
    guestsLabel: 'Guests',
    roomLabel: 'Room',
    closing: 'See you soon.',
    signedBy: 'Hasina and Mamy',
    dateLocale: 'en-US',
  },
  no: {
    preview: 'Oppholdet ditt er bekreftet.',
    heading: (firstName: string) => `Det er bekreftet, ${firstName}.`,
    p1: 'Oppholdet ditt på Hôtel Ambalakely er bekreftet. Vi gleder oss til å ta imot deg.',
    p2: 'Har du spørsmål før ankomst? Skriv til oss eller ring +261 34 11 254 34 (WhatsApp eller telefon).',
    summaryTitle: 'Din reservasjon',
    referenceLabel: 'Referanse',
    arrivalLabel: 'Ankomst',
    departureLabel: 'Avreise',
    guestsLabel: 'Reisende',
    roomLabel: 'Rom',
    closing: 'Vi sees snart.',
    signedBy: 'Hasina og Mamy',
    dateLocale: 'nb-NO',
  },
} as const;

export function BookingConfirmed({
  arrival,
  departure,
  guests,
  name,
  reference,
  room,
  locale = 'fr',
}: BookingConfirmedData & { locale?: EmailLocale }) {
  const c = COPY[locale];
  const firstName = name.split(' ')[0];
  return (
    <Shell preview={c.preview} lang={locale}>
      <Section>
        <Text style={styles.heading}>{c.heading(firstName)}</Text>
        <Text style={styles.paragraph}>{c.p1}</Text>
        <Text style={styles.paragraph}>{c.p2}</Text>
      </Section>

      <Section style={{ marginTop: '24px' }}>
        <Text style={summary}>
          <strong>{c.summaryTitle}</strong>
          <br />
          {c.referenceLabel} : {reference}
          <br />
          {room ? (
            <>
              {c.roomLabel} : {room}
              <br />
            </>
          ) : null}
          {c.arrivalLabel} : {formatDate(arrival, c.dateLocale)}
          <br />
          {c.departureLabel} : {formatDate(departure, c.dateLocale)}
          <br />
          {c.guestsLabel} : {guests}
        </Text>
      </Section>

      <Section>
        <Text style={signature}>
          {c.closing}
          <br />
          {c.signedBy}
        </Text>
      </Section>
    </Shell>
  );
}

function formatDate(iso: string, locale: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

/** Email subject per locale, used by the confirm action. */
export const BOOKING_CONFIRMED_SUBJECT: Record<EmailLocale, string> = {
  fr: 'Votre séjour est confirmé · Hôtel Ambalakely',
  en: 'Your stay is confirmed · Hôtel Ambalakely',
  no: 'Oppholdet ditt er bekreftet · Hôtel Ambalakely',
};
