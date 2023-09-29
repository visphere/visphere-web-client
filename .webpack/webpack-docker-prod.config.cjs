'use strict';
/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
const webpackProdConfig = require('./webpack-prod.config.cjs');

module.exports = webpackProdConfig({
  landingPageBaseUrl: `https://${process.env.ENV_MSPH_PROD_LANDING_PAGE_DOMAIN}`,
  clientBaseUrl: `https://${process.env.ENV_MSPH_PROD_WEB_CLIENT_DOMAIN}`,
  cdnBaseUrl: `https://${process.env.ENV_MSPH_PROD_STATIC_S3_API_DOMAIN}`,
  infraApiGatewayUrl: `https://${process.env.ENV_MSPH_PROD_INFRA_API_GATEWAY_DOMAIN}`,
});
