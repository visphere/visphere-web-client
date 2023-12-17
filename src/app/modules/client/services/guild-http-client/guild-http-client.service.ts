/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddGuildResDto,
  CreateGuildReqDto,
  SphereGuildCategory,
  UserGuildResDto,
} from '~/client-mod/model/guild.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class GuildHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getAllGuildsForUser$(): Observable<UserGuildResDto[]> {
    return this._httpClient.get<UserGuildResDto[]>(
      `${this._infraApiPath}/api/v1/sphere/guild/all`
    );
  }

  getSphereCategories$(): Observable<SphereGuildCategory[]> {
    return this._httpClient.get<SphereGuildCategory[]>(
      `${this._infraApiPath}/api/v1/sphere/guild/categories`
    );
  }

  createNewGuild$(reqDto: CreateGuildReqDto): Observable<AddGuildResDto> {
    return this._httpClient.post<AddGuildResDto>(
      `${this._infraApiPath}/api/v1/sphere/guild/new`,
      reqDto
    );
  }

  joinViaCode$(code: string): Observable<AddGuildResDto> {
    return this._httpClient.post<AddGuildResDto>(
      `${this._infraApiPath}/api/v1/sphere/guild/join`,
      { code }
    );
  }
}
