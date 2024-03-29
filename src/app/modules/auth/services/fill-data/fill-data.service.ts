/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import {
  UpdateUserAccountDataReqDto,
  UpdateUserAccountDataReqFormModel,
  UserDataFillFormResDto,
} from '~/auth-mod/models/oauth2-data.model';
import { LoginResDtoModel } from '~/shared-mod/models/identity.model';
import { AbstractSimpleFormProvider } from '~/shared-mod/services/abstract-simple-form-provider';
import { LazyPageLoaderService } from '~/shared-mod/services/lazy-page-loader/lazy-page-loader.service';
import {
  actionAddSnackbar,
  actionSetLoggedUserDetails,
} from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { oAuth2Suppliers } from '~/shared-mod/types/oauth2-supplier.type';
import { Oauth2HttpClientService } from '../oauth2-http-client/oauth2-http-client.service';

@Injectable()
export class FillDataService extends AbstractSimpleFormProvider<LoginResDtoModel> {
  private _userData$ = new BehaviorSubject<UserDataFillFormResDto | null>(null);
  private _accessToken = '';

  constructor(
    private readonly _oauth2HttpClientService: Oauth2HttpClientService,
    private readonly _router: Router,
    private readonly _lazyPageLoaderService: LazyPageLoaderService,
    private readonly _store: Store<SharedReducer>
  ) {
    super();
  }

  async setRouteParams(route: ActivatedRoute): Promise<void> {
    this._accessToken = route.snapshot.queryParamMap.get('token') || '';
    const supplier = route.snapshot.queryParamMap.get('supplier') || '';
    if (!oAuth2Suppliers.some(s => s === supplier)) {
      await this._router.navigateByUrl('/auth/login');
    }
  }

  checkIfFormIsInvalid(): boolean {
    const agreeTermsControl = this._rootForm.get('agreeTerms');
    if (!agreeTermsControl) {
      return true;
    }
    return this._rootForm.invalid || !agreeTermsControl.value;
  }

  loadUserData$(): Observable<UserDataFillFormResDto> {
    this._lazyPageLoaderService.setLoading();
    return this._oauth2HttpClientService
      .getUserDataForFillForm$(this._accessToken)
      .pipe(
        map(res => {
          this._userData$.next(res);
          this._store.dispatch(
            actionAddSnackbar({
              content: {
                placeholder: res.message,
                omitTransformation: true,
              },
              severity: 'success',
            })
          );
          this._lazyPageLoaderService.disableLoading();
          return res;
        }),
        catchError(err => {
          this._lazyPageLoaderService.disableLoading();
          return throwError(() => err);
        })
      );
  }

  override abstractSubmitForm$(): Observable<LoginResDtoModel> {
    const data = this.parseFormValues<UpdateUserAccountDataReqFormModel>();
    return this._oauth2HttpClientService
      .updateUserAccountData$(
        this._accessToken,
        this.mapToUpdateUserAccountReqDto(data)
      )
      .pipe(
        tap(async res => {
          this._store.dispatch(
            actionSetLoggedUserDetails({
              details: res,
            })
          );
          this.setLoading(false);
          await this._router.navigateByUrl('/');
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  private mapToUpdateUserAccountReqDto(
    formData: UpdateUserAccountDataReqFormModel
  ): UpdateUserAccountDataReqDto {
    return {
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: moment(formData.birthDate).format('DD/MM/YYYY'),
      allowNotifs: formData.allowNotifs,
    };
  }

  get userData$(): Observable<UserDataFillFormResDto | null> {
    return this._userData$.asObservable();
  }
}
