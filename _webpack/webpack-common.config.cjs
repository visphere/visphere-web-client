'use strict';
/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: webpack-common.config.cjs
 *   Created at: 2023-08-11, 00:23:03
 *   Last updated at: 2023-08-14, 01:53:52
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
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { execSync } = require('child_process');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const { AngularWebpackPlugin } = require('@ngtools/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const webpackUtils = require('../../moonsphere-base/webpack/webpack-utils.cjs');

const envPath = path.resolve(__dirname, '..', '..', 'moonsphere-base', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const commonResolveConfig = {
  extensions: ['.js', '.ts'],
  alias: {
    '~/env': path.resolve(__dirname, 'src', 'environments'),
    '~/root-mod': path.resolve(__dirname, 'src', 'app'),
    '~/auth-mod': path.resolve(__dirname, 'src', 'app', 'modules', 'auth'),
    '~/client-mod': path.resolve(__dirname, 'src', 'app', 'modules', 'client'),
    '~/shared-mod': path.resolve(__dirname, 'src', 'app', 'modules', 'shared'),
  },
};

const postCssConfig = {
  postcssOptions: {
    plugins: [
      require('autoprefixer'),
      require('postcss-preset-env'),
      require('tailwindcss'),
    ],
  },
};

const determinateAngularVersion = () => {
  const angularVersion = execSync(
    'npm list @angular/core --depth=0 --json'
  ).toString();
  return `Angular ${
    JSON.parse(angularVersion).dependencies['@angular/core'].version
  }`;
};

const commonWebpackConfig = ({
  landingPageBaseUrl,
  clientBaseUrl,
  cdnBaseUrl,
  isProdMode,
}) =>
  webpackUtils.webpackProxyInjector(
    { cdnBaseUrl },
    {
      context: path.resolve(__dirname, '..'),
      entry: {
        polyfills: [path.resolve(__dirname, '..', 'src', 'polyfills.ts')],
        main: [path.resolve(__dirname, '..', 'src', 'main.ts')],
        vendor: [path.resolve(__dirname, '..', 'src', 'styles', 'vendor.scss')],
        custom: [
          path.resolve(__dirname, '..', 'src', 'styles', 'combined.scss'),
        ],
      },
      output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: `js/__msph.[${
          isProdMode ? 'contenthash:10' : 'name'
        }].bundle.js`,
        chunkFilename: `js/__msph.[${
          isProdMode ? 'contenthash:10' : 'name'
        }].chunk.js`,
        clean: true,
        publicPath: '/',
      },
      resolve: commonResolveConfig,
      module: {
        rules: [
          {
            test: /\.[cm]?[tj]s?$/,
            use: webpackUtils.angularCommonWebpackTsLoaders,
          },
          webpackUtils.angularCommonWebpackScssLoader({
            includePath: path.resolve(__dirname, '..', 'src', 'app'),
            excludePath: path.resolve(__dirname, '..', 'src', 'styles'),
            postCssConfig,
          }),
          webpackUtils.tailwindGlobalSassLoader({
            stylesPath: path.resolve(__dirname, '..', 'src', 'styles'),
            postCssConfig,
            miniCssLoader: MiniCssExtractPlugin.loader,
            cdnBaseUrl,
          }),
        ],
      },
      optimization: {
        minimize: isProdMode,
        splitChunks: webpackUtils.commonNodeModulesChunkSplitting,
      },
      plugins: [
        new RemoveEmptyScriptsPlugin(),
        new DefinePlugin({
          'process.env.IS_PRODUCTION_MODE': JSON.stringify(isProdMode),
          'process.env.BASE_LANDING_PAGE_URL':
            JSON.stringify(landingPageBaseUrl),
          'process.env.BASE_CLIENT_URL': JSON.stringify(clientBaseUrl),
          'process.env.BASE_CDN_URL': JSON.stringify(cdnBaseUrl),
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '..', 'src', 'index.ejs'),
          title: 'MoonSphere',
          inject: 'body',
          scriptLoading: 'blocking',
          templateParameters: {
            externalCdnBasePath: cdnBaseUrl,
            externalClientBasePath: clientBaseUrl,
            frontEndGenerator: determinateAngularVersion(),
          },
          minify: {
            minifyCSS: isProdMode,
            minifyJS: isProdMode,
            html5: isProdMode,
            removeComments: false,
            collapseWhitespace: true,
          },
        }),
        new MiniCssExtractPlugin({
          filename: `css/__msph.[${
            isProdMode ? 'contenthash:10' : 'name'
          }].bundle.css`,
          chunkFilename: `css/__msph.[${
            isProdMode ? 'contenthash:10' : 'name'
          }].chunk.css`,
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, '..', 'src', 'assets', 'manifest'),
              to: path.resolve(__dirname, '..', 'dist', 'assets', 'manifest'),
              transform(content, _) {
                return Buffer.from(
                  content
                    .toString()
                    .replace(/__CDN_BASE_URL__/g, cdnBaseUrl)
                    .replace(/__CLIENT_BASE_URL__/g, clientBaseUrl)
                );
              },
            },
            {
              from: path.resolve(__dirname, '..', '.htaccess'),
              to: path.resolve(__dirname, '..', 'dist'),
            },
          ],
        }),
        new MomentLocalesPlugin(webpackUtils.webpackMomentLocalesCommonConfig),
        new AngularWebpackPlugin({
          tsconfig: path.resolve(
            __dirname,
            '..',
            '_tsconfig',
            'tsconfig.app.json'
          ),
          sourceMap: !isProdMode,
          jitMode: false,
          directTemplateLoading: true,
        }),
      ],
    }
  );

module.exports = {
  commonResolveConfig,
  postCssConfig,
  commonWebpackConfig,
};
