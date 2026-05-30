import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { getAvailability } from '@/lib/db/availability';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // dispo temps réel — jamais mis en cache

const Query = z
  .object({
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'format AAAA-MM-JJ attendu'),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'format AAAA-MM-JJ attendu'),
    guests: z.coerce.number().int().min(1).max(20).default(1),
  })
  .refine((d) => Date.parse(d.checkOut) > Date.parse(d.checkIn), {
    message: 'check_out doit être après check_in',
    path: ['checkOut'],
  });

export async function GET(req: NextRequest) {
  const parsed = Query.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'paramètres invalides', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const availability = await getAvailability(db, parsed.data);
    return NextResponse.json(
      { checkIn: parsed.data.checkIn, checkOut: parsed.data.checkOut, availability },
      { headers: { 'cache-control': 'no-store' } },
    );
  } catch (err) {
    console.error('[api/availability]', err);
    return NextResponse.json({ error: 'erreur de disponibilité' }, { status: 500 });
  }
}
