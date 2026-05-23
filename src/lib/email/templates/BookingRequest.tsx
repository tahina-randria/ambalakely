import { Section, Text } from '@react-email/components';
import { Shell, styles } from './_shared';

export type BookingRequestData = {
  arrival: string;
  departure: string;
  guests: number;
  roomType?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
};

const row = {
  fontSize: '14px',
  lineHeight: 1.6,
  color: styles.SAND_12,
  margin: '0 0 6px',
};

const label = {
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: styles.SAND_7,
  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
  margin: '24px 0 6px',
};

const value = {
  fontSize: '15px',
  lineHeight: 1.5,
  color: styles.SAND_12,
  margin: 0,
};

const messageBox = {
  fontSize: '15px',
  lineHeight: 1.6,
  color: styles.SAND_11,
  margin: 0,
  padding: '16px 20px',
  backgroundColor: '#f5f5f4',
  borderLeft: `2px solid ${styles.SAND_12}`,
  whiteSpace: 'pre-wrap' as const,
};

export function BookingRequest({
  arrival,
  departure,
  guests,
  roomType,
  name,
  email,
  phone,
  message,
}: BookingRequestData) {
  return (
    <Shell preview={`Demande de réservation — ${name}, ${guests} pers.`}>
      <Section>
        <Text style={styles.heading}>Nouvelle demande de réservation</Text>
        <Text style={styles.paragraph}>
          {name} souhaite séjourner du <strong>{formatDate(arrival)}</strong> au{' '}
          <strong>{formatDate(departure)}</strong> pour {guests}{' '}
          {guests > 1 ? 'personnes' : 'personne'}.
        </Text>
      </Section>

      <Section>
        <Text style={label}>Arrivée</Text>
        <Text style={value}>{formatDate(arrival)}</Text>

        <Text style={label}>Départ</Text>
        <Text style={value}>{formatDate(departure)}</Text>

        <Text style={label}>Voyageurs</Text>
        <Text style={value}>{guests}</Text>

        {roomType ? (
          <>
            <Text style={label}>Type de chambre</Text>
            <Text style={value}>{roomType}</Text>
          </>
        ) : null}

        <Text style={label}>Contact</Text>
        <Text style={row}>{name}</Text>
        <Text style={row}>{email}</Text>
        {phone ? <Text style={row}>{phone}</Text> : null}
      </Section>

      {message ? (
        <Section style={{ marginTop: '24px' }}>
          <Text style={label}>Message</Text>
          <Text style={messageBox}>{message}</Text>
        </Section>
      ) : null}
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
