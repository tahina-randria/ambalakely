import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { Kicker } from '@/components/atoms/Kicker';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center py-48">
      <Container size="md">
        <Kicker>404</Kicker>
        <Heading variant="h1" className="mt-6">
          This page doesn&apos;t exist.
        </Heading>
        <Text variant="bodyLg" color="muted" className="mt-8">
          The page you were looking for may have been moved, or never existed.
        </Text>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]"
        >
          ← Back home
        </Link>
      </Container>
    </main>
  );
}
