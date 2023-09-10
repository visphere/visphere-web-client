'use strict';
/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

module.exports = {
  presets: [
    require('../moonsphere-base/tailwind/_tailwind.config.cjs')({
      cdnBaseUrl: process.env.CDN_TAILWIND_PATH,
      loadableModules: [
        'auth',
        'common',
        'footer',
        'snackbar',
        'modal',
        'pageLoader',
        'buttonSpinner',
      ],
    }),
  ],
  content: ['./src/**/*.{ejs,ts,html}'],
};
