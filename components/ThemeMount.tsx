'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Client-side companion to the inline pre-paint script in app/layout.tsx.
 *
 * The inline script handles initial page load (no FOUC). This hook handles
 * client-side navigation between dark and light routes — toggling the
 * `theme-light` class on the <html> element when the user moves into
 * or out of /insights without a full page load.
 */
export function ThemeMount() {
  const pathname = usePathname();
  useEffect(() => {
    const isLight = pathname.startsWith('/insights');
    const root = document.documentElement;
    if (isLight) root.classList.add('theme-light');
    else root.classList.remove('theme-light');
  }, [pathname]);
  return null;
}
