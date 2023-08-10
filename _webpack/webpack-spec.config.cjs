/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: webpack-spec.config.cjs
 *   Created at: 2023-08-06, 18:55:38
 *   Last updated at: 2023-08-10, 02:44:48
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

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { AngularWebpackPlugin } = require('@ngtools/webpack');
const { DefinePlugin } = require('webpack');
const {
  commonResolveConfig,
  postCssConfig,
} = require('./webpack-common.config.cjs');
const webpackUtils = require('../../moonsphere-base/webpack/webpack-utils.cjs');

const envPath = path.resolve(__dirname, '..', '..', 'moonsphere-base', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const landingPageBaseUrl = `http://localhost:${process.env.ENV_MSPH_LANDING_PAGE_DEV_PORT}`;
const clientBaseUrl = `http://localhost:${process.env.ENV_MSPH_WEB_CLIENT_DEV_PORT}`;
const cdnBaseUrl = `http://localhost:${process.env.ENV_MSPH_CONTENT_DISTRIBUTOR_PORT}`;

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: commonResolveConfig,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: path.resolve(__dirname, '..', 'node_modules', '@angular'),
      },
      {
        test: /\.ts?$/,
        exclude: [/\.e2e\.ts$/],
        use: webpackUtils.angularCommonWebpackTsLoaders,
      },
      {
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: {
          system: true,
        },
      },
      webpackUtils.angularCommonWebpackScssLoader({
        includePath: path.resolve(__dirname, '..', 'src'),
        excludePath: path.resolve(__dirname, '..', 'src', 'styles'),
        postCssConfig,
      }),
    ],
  },
  performance: {
    hints: false,
  },
  plugins: [
    new DefinePlugin({
      'process.env.IS_PRODUCTION_MODE': JSON.stringify(false),
      'process.env.BASE_LANDING_PAGE_URL': JSON.stringify(landingPageBaseUrl),
      'process.env.BASE_CLIENT_URL': JSON.stringify(clientBaseUrl),
      'process.env.BASE_CDN_URL': JSON.stringify(cdnBaseUrl),
    }),
    new AngularWebpackPlugin({
      tsconfig: path.resolve(
        __dirname,
        '..',
        '_tsconfig',
        'tsconfig.spec.json'
      ),
      jitMode: false,
      directTemplateLoading: true,
    }),
  ],
};
