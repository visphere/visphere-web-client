'use strict';
/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    files: [
      {
        pattern: './src/spec.ts',
        watched: false,
      },
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-mocha-reporter'),
    ],
    preprocessors: {
      './src/spec.ts': ['webpack', 'sourcemap'],
    },
    webpack: require('./.webpack/webpack-spec.config.cjs'),
    webpackMiddleware: {
      logLevel: 'warn',
      stats: {
        chunks: false,
      },
    },
    reporters: ['mocha', 'progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: process.env.ENV_KARMA_TYPE === 'watch',
    browsers: ['ChromeHeadless'],
    singleRun: process.env.ENV_KARMA_TYPE === 'single',
    restartOnFileChange: process.env.ENV_KARMA_TYPE === 'single',
    client: {
      clearContext: false,
      captureConsole: false,
    },
  });
};
