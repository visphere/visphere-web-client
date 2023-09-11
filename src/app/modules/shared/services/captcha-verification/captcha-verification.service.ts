/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
import { ModalUtilsService } from '../modal-utils/modal-utils.service';
import { SharedHttpClientService } from '../shared-http-client/shared-http-client.service';

@Injectable()
export class CaptchaVerificationService
  extends AbstractLazyProvider<BaseMessageModel>
  implements OnDestroy
{
  private _isVerified$ = new BehaviorSubject(false);
  private _isCaptchaVisible$ = new BehaviorSubject(false);
  private _isModalOpen$ = new BehaviorSubject(false);
  private _clientIpAddress = '';

  constructor(
    private readonly _sharedHttpClientService: SharedHttpClientService,
    private readonly _store: Store<SharedReducer>,
    private readonly _modalUtilsService: ModalUtilsService,
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

  setModalVisibility(isOpen: boolean): void {
    this._modalUtilsService.blockBodyScroll(isOpen);
    this._isModalOpen$.next(isOpen);
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
          this.setModalVisibility(false);
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
          this.setModalVisibility(false);
        })
      );
  }

  get isVerified$(): Observable<boolean> {
    return this._isVerified$.asObservable();
  }
  get isCaptchaVisible$(): Observable<boolean> {
    return this._isCaptchaVisible$.asObservable();
  }
  get isModalOpen$(): Observable<boolean> {
    return this._isModalOpen$.asObservable();
  }
}
