// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // List of locales your app supports. Adjust these codes as needed.
  locales: ['cs', 'en'],
  // Fallback locale if no valid locale is detected
  defaultLocale: 'cs'
});

export const {Link, redirect, usePathname, useRouter, getPathname} = 
  createNavigation(routing);