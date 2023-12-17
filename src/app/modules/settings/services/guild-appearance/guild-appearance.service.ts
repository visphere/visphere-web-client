/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GuildManagementHttpClientService } from '../guild-management-http-client/guild-management-http-client.service';

@Injectable()
export class GuildAppearanceService {
  private _isFetching$ = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly _guildManagementHttpClientService: GuildManagementHttpClientService
  ) {}

  get isFetching$(): Observable<boolean> {
    return this._isFetching$.asObservable();
  }
}
