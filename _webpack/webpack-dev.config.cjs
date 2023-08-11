/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: webpack-dev.config.cjs
 *   Created at: 2023-08-06, 18:55:38
 *   Last updated at: 2023-08-10, 02:44:16
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This is a project
 * completing a engineers degree in computer science at Silesian University of Technology.
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

'use scrict';

const path = require('path');
const { merge } = require('webpack-merge');
const { commonWebpackConfig } = require('./webpack-common.config.cjs');

const landingPageBaseUrl = `http://localhost:${process.env.ENV_MSPH_LANDING_PAGE_DEV_PORT}`;
const clientBaseUrl = `http://localhost:${process.env.ENV_MSPH_WEB_CLIENT_DEV_PORT}`;
const cdnBaseUrl = `http://localhost:${process.env.ENV_MSPH_CONTENT_DISTRIBUTOR_PORT}`;

module.exports = merge(
  commonWebpackConfig({
    landingPageBaseUrl,
    clientBaseUrl,
    cdnBaseUrl,
    tsConfigFileSuffix: 'app',
    isProdMode: false,
  }),
  {
    mode: 'development',
    devtool: 'eval',
    stats: 'normal',
    devServer: {
      hot: false,
      historyApiFallback: true,
      port: process.env.ENV_MSPH_WEB_CLIENT_DEV_PORT || 6053,
      static: [
        path.resolve(__dirname, '..', '..', 'moonsphere-base', 'tailwind'),
        path.resolve(__dirname, '..'),
      ],
    },
  }
);
