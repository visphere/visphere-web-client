'use strict';
/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

module.exports = {
  presets: [
    require('../visphere-base/tailwind/_tailwind.config.cjs')({
      cdnBaseUrl: process.env.CDN_TAILWIND_PATH,
      loadableModules: [
        'auth',
        'common',
        'footer',
        'snackbar',
        'modal',
        'pageLoader',
        'myAccounts',
        'buttonSpinner',
        'tooltip',
      ],
    }),
  ],
  content: ['./src/**/*.{ejs,ts,html}'],
};
