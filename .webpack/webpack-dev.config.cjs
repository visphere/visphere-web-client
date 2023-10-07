'use strict';
/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
const path = require('path');
const { merge } = require('webpack-merge');
const { SourceMapDevToolPlugin } = require('webpack');
const { commonWebpackConfig } = require('./webpack-common.config.cjs');

const landingPageBaseUrl = `http://localhost:${process.env.ENV_VSPH_LANDING_PAGE_DEV_PORT}`;
const clientBaseUrl = `http://localhost:${process.env.ENV_VSPH_WEB_CLIENT_DEV_PORT}`;
const cdnBaseUrl = `http://localhost:${process.env.ENV_VSPH_STATIC_S3_API_PORT}`;
const infraApiGatewayUrl = `http://localhost:${process.env.ENV_VSPH_INFRA_API_GATEWAY_DEV_PORT}`;

module.exports = merge(
  commonWebpackConfig({
    landingPageBaseUrl,
    clientBaseUrl,
    cdnBaseUrl,
    infraApiGatewayUrl,
    isProdMode: false,
  }),
  {
    mode: 'development',
    devtool: false,
    stats: 'normal',
    devServer: {
      hot: false,
      historyApiFallback: true,
      port: process.env.ENV_VSPH_WEB_CLIENT_DEV_PORT || 6053,
      static: [
        path.resolve(__dirname, '..', '..', 'visphere-base', 'tailwind'),
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
