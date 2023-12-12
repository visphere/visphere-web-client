/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MessageWithResourcePathResDto,
  ProfileImageDetailsResDto,
  UpdateProfileColorReqDto,
} from '~/settings-mod/model/profile-settings.module';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class ProfileSettingsHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getProfileImageDetails$(): Observable<ProfileImageDetailsResDto> {
    return this._httpClient.get<ProfileImageDetailsResDto>(
      `${this._infraApiPath}/api/v1/multimedia/profile/image/details`
    );
  }

  getProfileDefaultColors$(): Observable<string[]> {
    return this._httpClient.get<string[]>(
      `${this._infraApiPath}/api/v1/multimedia/profile/color/all`
    );
  }

  updateProfileColor$(
    reqDto: UpdateProfileColorReqDto
  ): Observable<MessageWithResourcePathResDto> {
    return this._httpClient.patch<MessageWithResourcePathResDto>(
      `${this._infraApiPath}/api/v1/multimedia/profile/color`,
      reqDto
    );
  }

  updateProfileImageToCustom$(
    customImage: File
  ): Observable<MessageWithResourcePathResDto> {
    const formData = new FormData();
    formData.append('image', customImage, customImage.name);
    return this._httpClient.post<MessageWithResourcePathResDto>(
      `${this._infraApiPath}/api/v1/multimedia/profile/image/custom`,
      { formData }
    );
  }

  updateProfileImageToIdenticon$(): Observable<MessageWithResourcePathResDto> {
    return this._httpClient.post<MessageWithResourcePathResDto>(
      `${this._infraApiPath}/api/v1/multimedia/profile/image/identicon`,
      null
    );
  }

  deleteCustomProfileImage$(): Observable<MessageWithResourcePathResDto> {
    return this._httpClient.delete<MessageWithResourcePathResDto>(
      `${this._infraApiPath}/api/v1/multimedia/profile/image`
    );
  }
}
