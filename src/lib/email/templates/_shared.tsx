import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { ReactNode } from 'react';

const SAND_1 = '#fafaf9';
const SAND_5 = '#a3a39e';
const SAND_7 = '#6c6c6c';
const SAND_11 = '#27272a';
const SAND_12 = '#0c0a09';

const main = {
  backgroundColor: SAND_1,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  color: SAND_12,
  margin: 0,
  padding: 0,
};

const container = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '48px 32px',
};

const heading = {
  fontSize: '28px',
  lineHeight: 1.15,
  letterSpacing: '-0.02em',
  fontWeight: 300,
  margin: '0 0 24px',
  color: SAND_12,
};

const paragraph = {
  fontSize: '15px',
  lineHeight: 1.6,
  color: SAND_11,
  margin: '0 0 16px',
};

const caption = {
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: SAND_7,
  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
  margin: '0 0 8px',
};

const hr = {
  borderColor: '#e7e5e4',
  borderWidth: '1px 0 0 0',
  borderStyle: 'solid',
  margin: '32px 0',
};

const footer = {
  fontSize: '13px',
  lineHeight: 1.5,
  color: SAND_7,
  margin: 0,
};

export const styles = {
  main,
  container,
  heading,
  paragraph,
  caption,
  hr,
  footer,
  SAND_1,
  SAND_5,
  SAND_7,
  SAND_11,
  SAND_12,
};

export type EmailLocale = 'fr' | 'en' | 'no';

export function Shell({
  preview,
  lang = 'fr',
  children,
}: {
  preview: string;
  lang?: EmailLocale;
  children: ReactNode;
}) {
  return (
    <Html lang={lang}>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={caption}>Hôtel Ambalakely</Text>
          </Section>
          {children}
          <Hr style={hr} />
          <Section>
            <Text style={footer}>
              Hôtel Ambalakely · RN7, Ambalakely, Fianarantsoa, Madagascar
              <br />
              hello@hotelambalakely.com · +261 34 11 254 34
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
