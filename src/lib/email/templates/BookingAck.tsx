import { Section, Text } from '@react-email/components';
import { Shell, styles, type EmailLocale } from './_shared';
import type { BookingRequestData } from './BookingRequest';

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
    preview: 'Nous avons bien reçu votre demande de réservation.',
    heading: (firstName: string) => `Merci, ${firstName}.`,
    p1: "Nous avons bien reçu votre demande de réservation à l'Hôtel Ambalakely. Votre chambre est tenue pendant 48 h — Hasina ou Mamy vous confirmera personnellement votre séjour.",
    p2: "Si votre voyage est imminent, n'hésitez pas à nous joindre directement au +261 34 11 254 34 (WhatsApp ou téléphone).",
    summaryTitle: 'Récapitulatif',
    referenceLabel: 'Référence',
    arrivalLabel: 'Arrivée',
    departureLabel: 'Départ',
    guestsLabel: 'Voyageurs',
    closing: 'Bienvenue, déjà.',
    signedBy: 'Hasina et Mamy',
    dateLocale: 'fr-FR',
  },
  en: {
    preview: 'We have received your booking request.',
    heading: (firstName: string) => `Thank you, ${firstName}.`,
    p1: "We've received your booking request for Hôtel Ambalakely. Your room is held for 48 hours — Hasina or Mamy will personally confirm your stay.",
    p2: 'If your trip is imminent, reach us directly on +261 34 11 254 34 (WhatsApp or phone).',
    summaryTitle: 'Summary',
    referenceLabel: 'Reference',
    arrivalLabel: 'Arrival',
    departureLabel: 'Departure',
    guestsLabel: 'Guests',
    closing: 'Welcome already.',
    signedBy: 'Hasina and Mamy',
    dateLocale: 'en-US',
  },
  no: {
    preview: 'Vi har mottatt din bookingforespørsel.',
    heading: (firstName: string) => `Takk, ${firstName}.`,
    p1: 'Vi har mottatt din bestilling for Hôtel Ambalakely. Rommet ditt holdes av i 48 timer — Hasina eller Mamy bekrefter oppholdet ditt personlig.',
    p2: 'Hvis reisen din er nært forestående, kan du ta direkte kontakt på +261 34 11 254 34 (WhatsApp eller telefon).',
    summaryTitle: 'Oppsummering',
    referenceLabel: 'Referanse',
    arrivalLabel: 'Ankomst',
    departureLabel: 'Avreise',
    guestsLabel: 'Reisende',
    closing: 'Allerede velkommen.',
    signedBy: 'Hasina og Mamy',
    dateLocale: 'nb-NO',
  },
} as const;

export function BookingAck({
  arrival,
  departure,
  guests,
  name,
  locale = 'fr',
  reference,
}: BookingRequestData & { locale?: EmailLocale; reference?: string }) {
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
          {reference ? (
            <>
              {c.referenceLabel} : {reference}
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

/** Email subject per locale, used by the API route. */
export const BOOKING_ACK_SUBJECT: Record<EmailLocale, string> = {
  fr: 'Demande de réservation bien reçue · Hôtel Ambalakely',
  en: 'Booking request received · Hôtel Ambalakely',
  no: 'Bookingforespørsel mottatt · Hôtel Ambalakely',
};
