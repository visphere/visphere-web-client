/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

declare global {
  interface Window {
    VSPH_IS_PRODUCTION_MODE: string;
    VSPH_BASE_LANDING_URL: string;
    VSPH_BASE_CLIENT_URL: string;
    VSPH_BASE_STATIC_CDN_URL: string;
    VSPH_INFRA_API_GATEWAY_URL: string;
    VSPH_HCAPTCHA_SITE_KEY: string;
  }
}

export const environment = {
  production: window.VSPH_IS_PRODUCTION_MODE === 'prod',
  baseLandingUrl: window.VSPH_BASE_LANDING_URL,
  clientBaseUrl: window.VSPH_BASE_CLIENT_URL,
  contentDistributorBaseUrl: window.VSPH_BASE_STATIC_CDN_URL,
  infraApiGatewayUrl: window.VSPH_INFRA_API_GATEWAY_URL,
  hCaptchaSiteKey: window.VSPH_HCAPTCHA_SITE_KEY,
};
