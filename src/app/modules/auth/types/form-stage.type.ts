/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type RegisterFormStage = 'first' | 'second';

export type LoginFormStage = 'login' | 'password';

export type ResetPasswordFormStage = 'login' | 'token';

export type ChangePasswordFormStage = 'change' | 'success';

export type ActivateAccountFormStage = 'activate' | 'success';

export type MfaFirstSetupFormStage = 'qrcode' | 'confirm' | 'code';
