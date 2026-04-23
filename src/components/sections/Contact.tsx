'use client';

import { useState } from 'react';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight, WhatsappLogo, Envelope, MapPin } from '@phosphor-icons/react/dist/ssr';

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Section id="contact" divider>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: title + blurb + direct contacts */}
          <ScrollReveal className="lg:col-span-5">
            <Kicker>Contact</Kicker>
            <h2 className="mt-6 font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[36px] leading-[1.05] md:text-[48px] md:leading-[1.05] balance">
              Not ready to book? <br />
              Write to us.
            </h2>
            <p className="mt-8 text-[17px] leading-[1.6] text-[var(--color-text-muted)] max-w-[420px]">
              A question about the road, the weather, a particular stay — Hasina and the
              team reply within two hours during the day.
            </p>

            <ul className="mt-12 flex flex-col gap-5">
              <li>
                <a
                  href="https://wa.me/261000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]"
                >
                  <WhatsappLogo size={20} weight="regular" />
                  <span className="font-body text-[17px]">WhatsApp +261 · · ·</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@hotelambalakely.com"
                  className="group inline-flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]"
                >
                  <Envelope size={20} weight="regular" />
                  <span className="font-body text-[17px]">hello@hotelambalakely.com</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-[var(--color-text-muted)]">
                <MapPin size={20} weight="regular" />
                <span className="font-body text-[17px]">Ambalakely · Fianarantsoa</span>
              </li>
            </ul>
          </ScrollReveal>

          {/* Right: form */}
          <ScrollReveal delay={0.05} className="lg:col-span-7">
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    Name
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="input-base"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="input-base"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Subject
                </span>
                <select defaultValue="general" className="input-base">
                  <option value="general">General question</option>
                  <option value="stay">About a future stay</option>
                  <option value="experience">About an experience</option>
                  <option value="press">Press &amp; partnerships</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Message
                </span>
                <textarea
                  required
                  rows={5}
                  placeholder="Write here."
                  className="input-base resize-y py-3 leading-[1.5]"
                  style={{ height: 'auto', minHeight: 128 }}
                />
              </label>

              <div className="mt-2 flex items-center justify-between gap-6 flex-wrap">
                <button
                  type="submit"
                  disabled={sent}
                  className="group inline-flex items-center gap-3 h-12 px-7 bg-[var(--color-sand-12)] text-[var(--color-sand-1)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-11)] disabled:opacity-60 disabled:cursor-default"
                >
                  {sent ? 'Received — we’ll reply soon' : 'Send message'}
                  {!sent ? (
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                    />
                  ) : null}
                </button>
                <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Replies within 2 hours · 7am — 7pm
                </span>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
