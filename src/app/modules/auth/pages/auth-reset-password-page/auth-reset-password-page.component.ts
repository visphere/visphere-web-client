/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { ResetPasswordService } from '~/auth-mod/services/reset-password/reset-password.service';

@Component({
  selector: 'vsph-auth-reset-password-page',
  templateUrl: './auth-reset-password-page.component.html',
  host: { class: 'flex-grow flex flex-col' },
  providers: [ResetPasswordService],
})
export class AuthResetPasswordPageComponent {
  activeStage$ = this._resetPasswordService.currentStage$;

  constructor(private readonly _resetPasswordService: ResetPasswordService) {}
}
