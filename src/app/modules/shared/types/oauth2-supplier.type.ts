/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type OAuth2Supplier = 'google' | 'facebook';

export type ExtendedOAuth2Supplier = 'google' | 'facebook' | 'local';

export const oAuth2Suppliers: OAuth2Supplier[] = ['google', 'facebook'];
