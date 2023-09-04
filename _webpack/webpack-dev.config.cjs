'use strict';
/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: webpack-dev.config.cjs
 *   Created at: 2023-08-11, 02:54:35
 *   Last updated at: 2023-08-14, 01:54:04
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
const path = require('path');
const { merge } = require('webpack-merge');
const { SourceMapDevToolPlugin } = require('webpack');
const { commonWebpackConfig } = require('./webpack-common.config.cjs');

const landingPageBaseUrl = `http://localhost:${process.env.ENV_MSPH_LANDING_PAGE_DEV_PORT}`;
const clientBaseUrl = `http://localhost:${process.env.ENV_MSPH_WEB_CLIENT_DEV_PORT}`;
const cdnBaseUrl = `http://localhost:${process.env.ENV_MSPH_CONTENT_DISTRIBUTOR_PORT}`;
const javaApiEurekaUrl = `http://localhost:${process.env.ENV_MSPH_JAVA_API_EUREKA_DEV_PORT}`;

module.exports = merge(
  commonWebpackConfig({
    landingPageBaseUrl,
    clientBaseUrl,
    cdnBaseUrl,
    javaApiEurekaUrl,
    isProdMode: false,
  }),
  {
    mode: 'development',
    devtool: false,
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
    plugins: [
      new SourceMapDevToolPlugin({
        filename: '[file].map',
        exclude: path.resolve(__dirname, '..', 'node_modules'),
      }),
    ],
  }
);
