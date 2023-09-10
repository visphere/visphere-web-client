/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type RegisterFormStage = 'first' | 'second';

export type LoginFormStage = 'login' | 'password';

export type ResetPasswordFormStage = 'login' | 'token';

export type ChangePasswordFormStage = 'change' | 'success';

export type ActivateAccountFormStage = 'activate' | 'success';
