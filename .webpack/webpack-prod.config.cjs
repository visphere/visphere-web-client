'use strict';
/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
const { merge } = require('webpack-merge');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {
  JavaScriptOptimizerPlugin,
} = require('@angular-devkit/build-angular/src/tools/webpack/plugins/javascript-optimizer-plugin');
const {
  TransferSizePlugin,
} = require('@angular-devkit/build-angular/src/tools/webpack/plugins/transfer-size-plugin');
const {
  CssOptimizerPlugin,
} = require('@angular-devkit/build-angular/src/tools/webpack/plugins/css-optimizer-plugin');
const { commonWebpackConfig } = require('./webpack-common.config.cjs');

module.exports = ({
  landingPageBaseUrl,
  clientBaseUrl,
  cdnBaseUrl,
  infraApiGatewayUrl,
}) =>
  merge(
    commonWebpackConfig({
      landingPageBaseUrl,
      clientBaseUrl,
      cdnBaseUrl,
      infraApiGatewayUrl,
      isProdMode: true,
    }),
    {
      mode: 'production',
      stats: 'normal',
      plugins: [
        new CleanWebpackPlugin({
          verbose: true,
        }),
      ],
      optimization: {
        runtimeChunk: 'single',
        minimizer: [
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css)$/,
          }),
          new JavaScriptOptimizerPlugin({
            advanced: true,
            define: {
              ngDevMode: false,
              ngI18nClosureMode: false,
              ngJitMode: false,
            },
            sourcemap: false,
            keepIdentifierNames: false,
            removeLicenses: true,
          }),
          new TransferSizePlugin(),
          new CssOptimizerPlugin(),
          new CssMinimizerWebpackPlugin({
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: {
                    removeAll: true,
                  },
                },
              ],
            },
          }),
          new TerserWebpackPlugin({
            terserOptions: {
              mangle: true,
              compress: true,
              output: {
                comments: false,
              },
            },
          }),
        ],
      },
    }
  );
