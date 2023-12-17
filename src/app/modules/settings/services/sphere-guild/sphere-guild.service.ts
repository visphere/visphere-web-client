/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractGuildManagementProvider } from '../abstract-guild-management.provider';
import { GuildManagementHttpClientService } from '../guild-management-http-client/guild-management-http-client.service';
import { PasswordConfirmationService } from '../password-confirmation/password-confirmation.service';

@Injectable()
export class SphereGuildService extends AbstractGuildManagementProvider {
  constructor(
    private readonly _store: Store<SharedReducer>,
    private readonly _guildManagementHttpClientService: GuildManagementHttpClientService,
    private readonly _passwordConfirmationService: PasswordConfirmationService
  ) {
    super(_store);
  }

  deleteGuild$(
    guildId: number,
    passwordOrMfaCode: string
  ): Observable<BaseMessageModel> {
    const reqDto =
      this._passwordConfirmationService.formatToConfirmationDto(
        passwordOrMfaCode
      );
    this._passwordConfirmationService.setLoading(true);
    return this._guildManagementHttpClientService
      .deleteGuild$(guildId, reqDto)
      .pipe(
        tap(({ message }) => {
          this._passwordConfirmationService.setLoading(false);
          this._store.dispatch(
            NgrxAction_SHA.__addSnackbar({
              content: {
                placeholder: message,
                omitTransformation: true,
              },
              severity: 'success',
            })
          );
          this._store.dispatch(NgrxAction_SHA.__removeUserDetails());
        }),
        catchError(err => {
          this._passwordConfirmationService.setLoading(false);
          this._passwordConfirmationService.setStage('password');
          return throwError(() => err);
        })
      );
  }
}
