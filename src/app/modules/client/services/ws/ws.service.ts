/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { RxStomp } from '@stomp/rx-stomp';
import {
  Observable,
  ReplaySubject,
  combineLatest,
  filter,
  first,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { MessagePayloadResDto } from '~/client-mod/model/message.model';
import { environment } from '~/env/environment';
import { StorageKeys } from '~/shared-mod/models/identity.model';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { GuildService } from '../guild/guild.service';

@Injectable()
export class WsService extends AbstractReactiveProvider implements OnDestroy {
  private readonly _infraApiPath = environment.infraApiGatewayUrl;
  private readonly _isProd = environment.production as unknown as boolean;

  private _textChannelId$ = new ReplaySubject<number>(1);

  private _rxStomp: RxStomp;
  private _spaceKeyPressed = false;

  constructor(
    private readonly _guildService: GuildService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _store: Store<SharedReducer>
  ) {
    super();
    this._rxStomp = new RxStomp();
  }

  ngOnDestroy(): void {
    this.disconnectWithSocket();
    this.unmountAllSubscriptions();
  }

  initSocket$(paramMap$: Observable<ParamMap>): Observable<null> {
    return combineLatest([paramMap$, this._guildService.guildDetails$]).pipe(
      map(([paramMap, guildDetails]) => ({
        textChannelId: paramMap.get('textChannelId'),
        guildDetails,
      })),
      filter(({ guildDetails }) => !!guildDetails),
      first(),
      tap(({ textChannelId, guildDetails }) => {
        const wsPath = this.createWsPath();
        this.disconnectWithSocket();
        this._rxStomp.configure({
          brokerURL: wsPath,
          connectHeaders: {
            'X-Token':
              this._localStorageService.get<StorageKeys>('loggedUser')
                ?.refreshToken || '',
            'X-GuildId': String(guildDetails!.id),
          },
          heartbeatOutgoing: 30000, // 30s
        });
        this._rxStomp.activate();
        this._textChannelId$.next(Number(textChannelId));
        this.logOnDev(
          `Connected with socket: ${wsPath}, guild: '${
            guildDetails!.id
          }', text channel: '${textChannelId}'`
        );
      }),
      map(() => null)
    );
  }

  observableMessagesStream$(): Observable<MessagePayloadResDto> {
    return this._textChannelId$.pipe(
      switchMap(textChannelId =>
        this._rxStomp.watch({
          destination: `/topic/outbound.${textChannelId}`,
        })
      ),
      map(message => JSON.parse(message.body) as MessagePayloadResDto)
    );
  }

  sendMessage$(message: string): Observable<null> {
    return of(null).pipe(
      switchMap(() =>
        combineLatest([
          this._store.select(NgrxSelector_SHA.selectLoggedUser),
          this._textChannelId$,
        ])
      ),
      first(),
      tap(([loggedUser, textChannelId]) => {
        this._rxStomp.publish({
          destination: `/vsph/inbound/${textChannelId}/user/${loggedUser?.id}`,
          body: JSON.stringify({
            fullName: loggedUser?.fullName,
            profileImageUrl: loggedUser?.profileUrl,
            message,
          }),
        });
      }),
      map(() => null)
    );
  }

  sendMessageOnKeyPress(event: KeyboardEvent, callback: () => void): void {
    if (event.key === ' ' && !this._spaceKeyPressed) {
      this._spaceKeyPressed = true;
      event.preventDefault();
    } else if (event.key === 'Enter' && this._spaceKeyPressed) {
      callback();
      this._spaceKeyPressed = false;
      event.preventDefault();
    }
  }

  private logOnDev(message: string): void {
    if (!this._isProd) {
      console.log(message);
    }
  }

  private disconnectWithSocket(): void {
    this._rxStomp.deactivate();
    this.logOnDev('Disconnected with socket');
  }

  private createWsPath(): string {
    const secured = this._isProd ? 's' : '';
    return (
      this._infraApiPath!.replace(`http${secured}`, `ws${secured}`) + '/chat/ws'
    );
  }
}
