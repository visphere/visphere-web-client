/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type TranslationRow = {
  lang: string;
  landingPrefix: string;
  name: string;
};

export const AVAILABLE_TRANSLATIONS: TranslationRow[] = [
  { lang: 'pl', landingPrefix: '', name: 'Polski' },
  { lang: 'en-US', landingPrefix: '/en', name: 'English, US' },
];
