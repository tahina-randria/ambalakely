import { ImageResponse } from 'next/og';

export const runtime = 'edge';
// Static — OG image generates at edge, cannot easily call Sanity from here.
// If hotel branding changes, update this string + the rendered headline below.
export const alt = 'Ambalakely — Dix chambres dans les hautes terres de Madagascar.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * OG image dynamique. Editorial monochrome (sand tones).
 * Genere a la build, mis en cache par Vercel.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#F5F1EA',
          color: '#1A1815',
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top kicker */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#7A7468',
          }}
        >
          <span>Hôtel Ambalakely</span>
          <span>Est. 2014</span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: 8,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              maxWidth: 1000,
            }}
          >
            Ten rooms in the highlands of Madagascar.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 20,
            color: '#4A4438',
            borderTop: '1px solid #D9D2C5',
            paddingTop: 24,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ color: '#7A7468', fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Location
            </span>
            <span>Fianarantsoa, Madagascar</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'right' }}>
            <span style={{ color: '#7A7468', fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              On the RN7
            </span>
            <span>21°27′S · 47°05′E</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
