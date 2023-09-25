/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export const environment = {
  production: process.env['IS_PRODUCTION_MODE'],
  baseLandingUrl: process.env['BASE_LANDING_PAGE_URL'],
  clientBaseUrl: process.env['BASE_CLIENT_URL'],
  contentDistributorBaseUrl: process.env['BASE_CDN_URL'],
  hCaptchaSiteKey: process.env['HCAPTCHA_SITE_KEY'],
  infraApiGatewayUrl: process.env['INFRA_API_GATEWAY_URL'],
};
