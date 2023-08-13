'use strict';
/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: karma.conf.cjs
 *   Created at: 2023-08-13, 00:20:56
 *   Last updated at: 2023-08-14, 01:54:53
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
    webpack: require('./_webpack/webpack-spec.config.cjs'),
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
