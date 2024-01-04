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
  withLatestFrom,
} from 'rxjs';
import { MessagePayloadResDto } from '~/client-mod/model/message.model';
import { environment } from '~/env/environment';
import { StorageKeys } from '~/shared-mod/models/identity.model';
import { FaviconBadgeNotificatorService } from '~/shared-mod/services/favicon-badge-notificator/favicon-badge-notificator.service';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import { selectLoggedUser } from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { GuildService } from '../guild/guild.service';

@Injectable()
export class WsService extends AbstractReactiveProvider implements OnDestroy {
  private readonly _infraApiPath = environment.infraApiGatewayUrl;
  private readonly _isProd = environment.production as unknown as boolean;

  private _textChannelId$ = new ReplaySubject<number>(1);

  private _rxStomp: RxStomp;

  constructor(
    private readonly _guildService: GuildService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _store: Store<SharedReducer>,
    private readonly _faviconBadgeNotificatorService: FaviconBadgeNotificatorService
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
      withLatestFrom(this._store.select(selectLoggedUser)),
      map(([{ body }, loggedUser]) => {
        const message = JSON.parse(body) as MessagePayloadResDto;
        if (message.userId !== loggedUser?.id) {
          this._faviconBadgeNotificatorService.showNotify();
        }
        return message;
      })
    );
  }

  observableRemoveMessagesStream$(): Observable<string> {
    return this._textChannelId$.pipe(
      switchMap(textChannelId =>
        this._rxStomp.watch({
          destination: `/topic/outbound.${textChannelId}.delete.message`,
        })
      ),
      map(({ body }) => JSON.parse(body) as string)
    );
  }

  sendMessage$(message: string): Observable<null> {
    return of(null).pipe(
      switchMap(() =>
        combineLatest([
          this._store.select(selectLoggedUser),
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

  get textChannelId$(): Observable<number> {
    return this._textChannelId$.asObservable();
  }
}
