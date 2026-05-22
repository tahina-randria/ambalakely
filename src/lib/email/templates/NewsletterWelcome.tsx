import { Section, Text } from '@react-email/components';
import { Shell, styles } from './_shared';

const signature = {
  fontSize: '15px',
  lineHeight: 1.5,
  color: styles.SAND_12,
  margin: '32px 0 0',
  fontStyle: 'italic' as const,
};

export function NewsletterWelcome() {
  return (
    <Shell preview="Bienvenue dans la lettre saisonnière d'Ambalakely.">
      <Section>
        <Text style={styles.heading}>Bienvenue.</Text>
        <Text style={styles.paragraph}>
          Vous recevrez une lettre courte d'Hasina à chaque saison. Le jardin,
          les nouvelles du restaurant, les voyageurs qui sont passés, parfois
          une note depuis la RN7.
        </Text>
        <Text style={styles.paragraph}>
          Pas d'offres commerciales, pas de promotions. Une lettre, quatre fois
          par an.
        </Text>
        <Text style={signature}>
          À très vite,
          <br />
          Hasina
        </Text>
      </Section>
    </Shell>
  );
}
