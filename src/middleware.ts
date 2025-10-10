import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import {
  languages,
  headerName,
  fallbackLng,
  cookieName,
} from './translations/settings';

acceptLanguage.languages(languages);

// export const config = {
//   // Avoid matching for static files, API routes, etc.
//   matcher: [
//     '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)',
//   ],
// };
//
// export function middleware(req: NextRequest) {
//   const { nextUrl, cookies, headers: reqHeaders } = req;
//
//   // Ignore icons/chrome requests
//   if (
//     nextUrl.pathname.includes('icon') ||
//     nextUrl.pathname.includes('chrome')
//   ) {
//     return NextResponse.next();
//   }
//
//   let lng;
//
//   // Get language from cookie
//   if (cookies.has(cookieName)) {
//     lng = acceptLanguage.get(cookies.get(cookieName)?.value);
//   }
//
//   // If no cookie, try Accept-Language header
//   if (!lng) {
//     lng = acceptLanguage.get(reqHeaders.get('accept-language'));
//   }
//
//   // If still nothing, fallback
//   if (!lng) lng = fallbackLng;
//
//   // See if language already in path
//   const lngInPath = languages.find((loc) =>
//     nextUrl.pathname.startsWith(`/${loc}`)
//   );
//
//   // Prepare headers to forward
//   const headers = new Headers(reqHeaders);
//   headers.set(headerName, lngInPath || lng);
//
//   // Redirect if language missing in path
//   if (!lngInPath && !nextUrl.pathname.startsWith('/_next')) {
//     return NextResponse.redirect(
//       new URL(`/${lng}${nextUrl.pathname}${nextUrl.search}`, req.url)
//     );
//   }
//
//   // Handle referer → set cookie
//   const response = NextResponse.next({ request: { headers } });
//   if (reqHeaders.has('referer')) {
//     const refererUrl = new URL(reqHeaders.get('referer')!);
//     const lngInReferer = languages.find((l) =>
//       refererUrl.pathname.startsWith(`/${l}`)
//     );
//     if (lngInReferer) {
//       response.cookies.set(cookieName, lngInReferer);
//     }
//   }
//
//   return response;
// }

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|.*\\.(?:png|jpg|jpeg|gif|webp|svg)).*)',
  ],
};

export function middleware(req: NextRequest) {
  const { nextUrl, cookies, headers: reqHeaders } = req;

  // Ignore icons/chrome requests
  if (
    nextUrl.pathname.includes('icon') ||
    nextUrl.pathname.includes('chrome')
  ) {
    return NextResponse.next();
  }

  // Check if language is already in the path
  const lngInPath = languages.find((loc) =>
    nextUrl.pathname.startsWith(`/${loc}`)
  );

  // Determine the language to use
  let lng: any = lngInPath;

  if (!lng) {
    if (cookies.has(cookieName)) {
      lng = acceptLanguage.get(cookies.get(cookieName)?.value);
    }
  }

  if (!lng) {
    lng = acceptLanguage.get(reqHeaders.get('accept-language'));
  }

  if (!lng) lng = fallbackLng;

  const headers = new Headers(reqHeaders);
  headers.set(headerName, lng);

  // Redirect if language missing in path
  if (!lngInPath && !nextUrl.pathname.startsWith('/_next')) {
    const res = NextResponse.redirect(
      new URL(`/${lng}${nextUrl.pathname}${nextUrl.search}`, req.url)
    );
    // Disable caching
    res.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    return res;
  }

  // Set cookie to match language
  const response = NextResponse.next({ request: { headers } });
  response.cookies.set(cookieName, lng, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  }); // 1 year

  // Disable caching
  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );

  return response;
}
