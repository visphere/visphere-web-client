'use strict';
/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
const webpackProdConfig = require('./webpack-prod.config.cjs');

module.exports = webpackProdConfig({
  landingPageBaseUrl: `http://localhost:${process.env.ENV_VSPH_LANDING_PAGE_PORT}`,
  clientBaseUrl: `http://localhost:${process.env.ENV_VSPH_WEB_CLIENT_PORT}`,
  cdnBaseUrl: `http://localhost:${process.env.ENV_VSPH_STATIC_S3_API_PORT}`,
  infraApiGatewayUrl: `http://localhost:${process.env.ENV_VSPH_INFRA_API_GATEWAY_PORT}`,
});
