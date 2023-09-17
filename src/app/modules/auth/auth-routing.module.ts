/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRootComponent } from '~/auth-mod/auth-root.component';
import { activateAccountGuard } from '~/auth-mod/guards/activate-account/activate-account.guard';
import { AuthActivateAccountPageComponent } from '~/auth-mod/pages/auth-activate-account-page/auth-activate-account-page.component';
import { AuthChangePasswordPageComponent } from '~/auth-mod/pages/auth-change-password-page/auth-change-password-page.component';
import { AuthLoginPageComponent } from '~/auth-mod/pages/auth-login-page/auth-login-page.component';
import { AuthMyAccountsPageComponent } from '~/auth-mod/pages/auth-my-accounts-page/auth-my-accounts-page.component';
import { AuthRegisterPageComponent } from '~/auth-mod/pages/auth-register-page/auth-register-page.component';
import { AuthResetPasswordPageComponent } from '~/auth-mod/pages/auth-reset-password-page/auth-reset-password-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthRootComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: AuthLoginPageComponent,
        title: 'authLoginPage',
      },
      {
        path: 'register',
        component: AuthRegisterPageComponent,
        title: 'authRegisterPage',
      },
      {
        path: 'reset-password',
        component: AuthResetPasswordPageComponent,
        title: 'authResetPasswordPage',
      },
      {
        path: 'change-password/:token',
        component: AuthChangePasswordPageComponent,
        title: 'authChangePasswordPage',
      },
      {
        path: 'activate-account',
        component: AuthActivateAccountPageComponent,
        title: 'authActivateAccountPage',
        canActivate: [activateAccountGuard],
      },
      {
        path: 'activate-account/:token',
        component: AuthActivateAccountPageComponent,
        title: 'authActivateAccountPage',
        canActivate: [activateAccountGuard],
      },
      {
        path: 'my-accounts',
        component: AuthMyAccountsPageComponent,
        title: 'authMyAccountsPage',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
