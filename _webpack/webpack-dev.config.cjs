'use strict';
/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
