/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type ThemeModeType = {
  id: ThemeType;
  i18nKey: string;
  icon: string;
};

export type ThemeType = 'light' | 'dark' | 'device';

export const themeModes: ThemeModeType[] = [
  {
    id: 'light',
    i18nKey: 'msph.common.theme.lightTheme',
    icon: 'lightModeIcon',
  },
  {
    id: 'dark',
    i18nKey: 'msph.common.theme.darkTheme',
    icon: 'darkModeIcon',
  },
  {
    id: 'device',
    i18nKey: 'msph.common.theme.deviceTheme',
    icon: 'systemModeIcon',
  },
];
