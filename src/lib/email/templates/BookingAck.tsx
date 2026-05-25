import { Section, Text } from '@react-email/components';
import { Shell, styles } from './_shared';
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

export function BookingAck({
  arrival,
  departure,
  guests,
  name,
}: BookingRequestData) {
  return (
    <Shell preview="Nous avons bien reçu votre demande de réservation.">
      <Section>
        <Text style={styles.heading}>Merci, {name.split(' ')[0]}.</Text>
        <Text style={styles.paragraph}>
          Nous avons bien reçu votre demande de séjour à l'Hôtel Ambalakely.
          Hasina ou Mamy vous répondra personnellement avec la disponibilité et
          un devis détaillé.
        </Text>
        <Text style={styles.paragraph}>
          Si votre voyage est imminent, n'hésitez pas à nous joindre directement
          au +261 34 11 254 34 (WhatsApp ou téléphone).
        </Text>
      </Section>

      <Section style={{ marginTop: '24px' }}>
        <Text style={summary}>
          <strong>Récapitulatif</strong>
          <br />
          Arrivée : {formatDate(arrival)}
          <br />
          Départ : {formatDate(departure)}
          <br />
          Voyageurs : {guests}
        </Text>
      </Section>

      <Section>
        <Text style={signature}>
          Bienvenue, déjà.
          <br />
          Hasina et Mamy
        </Text>
      </Section>
    </Shell>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}
