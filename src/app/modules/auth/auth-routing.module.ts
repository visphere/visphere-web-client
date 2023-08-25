/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-routing.module.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:56:31
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRootComponent } from '~/auth-mod/auth-root.component';
import { activateAccountGuard } from '~/auth-mod/guards/activate-account/activate-account.guard';
import { AuthActivateAccountPageComponent } from '~/auth-mod/pages/auth-activate-account-page/auth-activate-account-page.component';
import { AuthChangePasswordPageComponent } from '~/auth-mod/pages/auth-change-password-page/auth-change-password-page.component';
import { AuthLoginPageComponent } from '~/auth-mod/pages/auth-login-page/auth-login-page.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
