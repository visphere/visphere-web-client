/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';

@Component({
  selector: 'vsph-auth-mfa-page',
  templateUrl: './auth-mfa-page.component.html',
  host: { class: 'flex-grow flex flex-col' },
})
export class AuthMfaPageComponent {
  isInitialMfaSetup$ = this._store.select(NgrxSelector_ATH.isFirstTimeMfaSetup);

  constructor(private readonly _store: Store<AuthReducer>) {}
}
