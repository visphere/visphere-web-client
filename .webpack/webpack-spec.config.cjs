'use strict';
/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
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
const cdnBaseUrl = `http://localhost:${process.env.ENV_MSPH_STATIC_S3_API_PORT}`;
const infraApiGatewayUrl = `http://localhost:${process.env.ENV_MSPH_INFRA_API_GATEWAY_DEV_PORT}`;

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: commonResolveConfig(false),
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
      'process.env.HCAPTCHA_SITE_KEY': JSON.stringify(
        process.env.ENV_DEV_HCAPTCHA_SITE_KEY
      ),
      'process.env.INFRA_API_GATEWAY_URL': JSON.stringify(infraApiGatewayUrl),
    }),
    new AngularWebpackPlugin({
      tsconfig: path.resolve(
        __dirname,
        '..',
        '.tsconfig',
        'tsconfig.spec.json'
      ),
      jitMode: false,
      directTemplateLoading: true,
    }),
  ],
};
