import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { isStaffEmail } from '@/lib/auth/staff';

/**
 * Refreshes the Supabase session cookie and gates /admin.
 *
 * Runs in middleware (Edge) for every /admin* request. Calls getUser() (which
 * validates the JWT against Supabase, not just decodes it) and enforces the
 * staff allowlist. Unauthenticated or non-staff → bounced to /admin/login.
 * Login + auth-callback paths are exempt so a visitor can actually sign in.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const onLogin = path === '/admin/login';
  const onAuthFlow = path.startsWith('/admin/auth');
  const isStaff = !!user && isStaffEmail(user.email);

  // Protected admin surface: anything under /admin except the login + callback.
  if (!onLogin && !onAuthFlow && !isStaff) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.search = '';
    return NextResponse.redirect(url);
  }

  // Already signed in as staff but sitting on the login page → go to the desk.
  if (onLogin && isStaff) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return response;
}
