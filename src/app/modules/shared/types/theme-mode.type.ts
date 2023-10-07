/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
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
    i18nKey: 'vsph.common.theme.lightTheme',
    icon: 'lightModeIcon',
  },
  {
    id: 'dark',
    i18nKey: 'vsph.common.theme.darkTheme',
    icon: 'darkModeIcon',
  },
  {
    id: 'device',
    i18nKey: 'vsph.common.theme.deviceTheme',
    icon: 'systemModeIcon',
  },
];
