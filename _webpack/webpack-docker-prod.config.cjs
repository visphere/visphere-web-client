'use strict';
/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
const webpackProdConfig = require('./webpack-prod.config.cjs');

module.exports = webpackProdConfig({
  landingPageBaseUrl: `https://${process.env.ENV_MSPH_PROD_LANDING_PAGE_DOMAIN}`,
  clientBaseUrl: `https://${process.env.ENV_MSPH_PROD_WEB_CLIENT_DOMAIN}`,
  cdnBaseUrl: `https://${process.env.ENV_MSPH_PROD_CONTENT_DISTRIBUTOR_DOMAIN}`,
  javaApiEurekaUrl: `https://${process.env.ENV_MSPH_PROD_JAVA_API_EUREKA_DOMAIN}`,
});
