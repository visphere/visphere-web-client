'use strict';
/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
const webpackProdConfig = require('./webpack-prod.config.cjs');

module.exports = webpackProdConfig({
  landingPageBaseUrl: `http://localhost:${process.env.ENV_MSPH_LANDING_PAGE_PORT}`,
  clientBaseUrl: `http://localhost:${process.env.ENV_MSPH_WEB_CLIENT_PORT}`,
  cdnBaseUrl: `http://localhost:${process.env.ENV_MSPH_CONTENT_DISTRIBUTOR_PORT}`,
  javaApiEurekaUrl: `http://localhost:${process.env.ENV_MSPH_JAVA_API_EUREKA_PORT}`,
});
