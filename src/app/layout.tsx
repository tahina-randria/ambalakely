/**
 * Root layout — passthrough only.
 *
 * Next requires a layout at /app, but with next-intl all real routes
 * live under /app/[locale]/. The `<html>` and `<body>` are owned by
 * `src/app/[locale]/layout.tsx`. Non-locale paths (api, sitemap,
 * robots, opengraph-image, icons) bypass this entirely.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
