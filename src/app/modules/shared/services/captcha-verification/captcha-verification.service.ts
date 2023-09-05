/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: captcha-verification.service.ts
 *   Created at: 2023-09-04, 12:39:25
 *   Last updated at: 2023-09-04, 12:39:26
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
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '~/env/environment';
import { flattedErrorResponse } from '~/root-mod/modules/shared/utils/flatted-error-response';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractLazyProvider } from '../abstract-lazy-provider';
import { ModalService } from '../modal/modal.service';
import { SharedHttpClientService } from '../shared-http-client/shared-http-client.service';

@Injectable()
export class CaptchaVerificationService
  extends AbstractLazyProvider<BaseMessageModel>
  implements OnDestroy
{
  private _isVerified$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _isCaptchaVisible$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  private _clientIpAddress = '';

  constructor(
    private readonly _sharedHttpClientService: SharedHttpClientService,
    private readonly _modalService: ModalService,
    private readonly _store: Store<SharedReducer>,
    @Inject(DOCUMENT) private readonly _document: Document
  ) {
    super();
    this.wrapAsObservable(
      this._sharedHttpClientService.getClientIpAddress()
    ).subscribe(res => (this._clientIpAddress = res.ip));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  toggleCaptchaVisibility(isVisible: boolean): void {
    this._isCaptchaVisible$.next(isVisible);
  }

  override abstractSubmitForm(): Observable<BaseMessageModel> {
    const { value } = this._document.querySelector(
      '[name=h-captcha-response]'
    ) as HTMLTextAreaElement;
    return this._sharedHttpClientService
      .verifyCaptcha({
        response: value,
        remoteIp: this._clientIpAddress,
        siteKey: environment.hCaptchaSiteKey || '',
      })
      .pipe(
        delay(500),
        tap(({ message }) => {
          this._store.dispatch(
            NgrxAction_SHA.__addSnackbar({
              content: {
                placeholder: message,
                omitTransformation: true,
              },
              severity: 'success',
            })
          );
        }),
        catchError(err => {
          this.setLoading(false);
          this._modalService.setIsOpen(false);
          this._store.dispatch(
            NgrxAction_SHA.__addSnackbar({
              content: flattedErrorResponse(err.error),
              severity: 'danger',
            })
          );
          return throwError(() => err);
        }),
        delay(1000),
        tap(() => {
          this.setLoading(false);
          this._modalService.setIsOpen(false);
        })
      );
  }

  get isVerified$(): Observable<boolean> {
    return this._isVerified$.asObservable();
  }
  get isCaptchaVisible$(): Observable<boolean> {
    return this._isCaptchaVisible$.asObservable();
  }
}
