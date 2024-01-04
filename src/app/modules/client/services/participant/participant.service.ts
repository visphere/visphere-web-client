/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  catchError,
  combineLatest,
  filter,
  first,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  GuildParticipantDetailsResDto,
  GuildParticipantsResDto,
} from '~/client-mod/model/participant.model';
import { actionCloseDevastateMemberModal } from '~/client-mod/store/actions';
import { selectDevastateDetails } from '~/client-mod/store/selectors';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractWsWebhookProvider } from '~/shared-mod/services/abstract-ws-webhook.provider';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { GuildService } from '../guild/guild.service';
import { ParticipantHttpClientService } from '../participant-http-client/participant-http-client.service';

@Injectable()
export class ParticipantService extends AbstractWsWebhookProvider<ClientReducer> {
  constructor(
    private readonly _participantHttpClientService: ParticipantHttpClientService,
    private readonly _guildService: GuildService,
    private readonly _store: Store<ClientReducer>,
    private readonly _passwordConfirmationService: PasswordConfirmationService
  ) {
    super(_store);
  }

  fetchGuildParticipants$(): Observable<GuildParticipantsResDto> {
    return combineLatest([
      this._guildService.guildDetails$,
      this._onChangeObserver$,
    ]).pipe(
      tap(() => this.setFetching(true)),
      filter(([guildDetails]) => !!guildDetails),
      map(([guildDetails]) => guildDetails!.id),
      switchMap(guildId =>
        this._participantHttpClientService.getGuildParticipants$(guildId)
      ),
      tap(() => this.setFetching(false)),
      catchError(err => {
        this.setFetching(false);
        return throwError(() => err);
      })
    );
  }

  getParticipantDetails$(
    guildId: number,
    userId: number
  ): Observable<GuildParticipantDetailsResDto> {
    return this._participantHttpClientService.getGuildParticipantDetails$(
      guildId,
      userId
    );
  }

  leaveGuild$(deleteAllMessages: boolean): Observable<BaseMessageModel> {
    return this.performObservableAction$(
      id =>
        this._participantHttpClientService.leaveGuild$(id, deleteAllMessages),
      false
    );
  }

  kickFromGuild$(
    guildId: number,
    deleteAllMessages: boolean
  ): Observable<BaseMessageModel> {
    return this.performObservableAction$(
      id =>
        this._participantHttpClientService.kickFromGuild$(
          guildId,
          id,
          deleteAllMessages
        ),
      true
    );
  }

  banFromGuild$(
    guildId: number,
    deleteAllMessages: boolean
  ): Observable<BaseMessageModel> {
    return this.performObservableAction$(
      id =>
        this._participantHttpClientService.banFromGuild$(
          guildId,
          id,
          deleteAllMessages
        ),
      true
    );
  }

  delegateGuildProprietyToUser$(
    passwordOrMfaCode: string
  ): Observable<BaseMessageModel> {
    return of(null).pipe(
      tap(() => this._passwordConfirmationService.setLoading(true)),
      switchMap(() =>
        combineLatest([
          this._guildService.guildDetails$,
          this._store.select(selectDevastateDetails),
        ])
      ),
      filter(
        ([guildDetails, devastateDetails]) =>
          !!guildDetails && !!devastateDetails
      ),
      map(([guildDetails, devastateDetails]) => ({
        guildId: guildDetails!.id,
        userId: devastateDetails!.id,
      })),
      first(),
      switchMap(({ guildId, userId }) =>
        this._participantHttpClientService.delegateGuildProprietyToUser$(
          guildId,
          userId,
          this._passwordConfirmationService.formatToConfirmationDto(
            passwordOrMfaCode
          )
        )
      ),
      tap(({ message }) => {
        this._passwordConfirmationService.setLoading(false);
        this.updateWsSignalValue();
        this.showSuccessSnackbar(message);
        this._store.dispatch(actionCloseDevastateMemberModal());
      }),
      catchError(err => {
        this._passwordConfirmationService.setLoading(false);
        return throwError(() => err);
      })
    );
  }

  private performObservableAction$(
    initHttp$: (id: number) => Observable<BaseMessageModel>,
    refetch: boolean
  ): Observable<BaseMessageModel> {
    return of(null).pipe(
      tap(() => this.setLoading(true)),
      switchMap(() => this._store.select(selectDevastateDetails)),
      first(),
      filter(devastateDetails => !!devastateDetails),
      switchMap(devastateDetails => initHttp$(devastateDetails!.id)),
      tap(({ message }) => {
        this.setLoading(false);
        this.showSuccessSnackbar(message);
        if (refetch) {
          this.updateWsSignalValue();
        } else {
          this._guildService.resetGuildDetails();
        }
        this._store.dispatch(actionCloseDevastateMemberModal());
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
