/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import * as NgrxAction_ATH from '~/auth-mod/store/actions';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { LoginResDtoModel } from '~/shared-mod/models/identity.model';
import { AbstractSimpleFormProvider } from '~/shared-mod/services/abstract-simple-form-provider';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { ThemeType } from '~/shared-mod/types/theme-mode.type';
import { MfaStateModel } from '../models/mfa-data.model';
import { AuthReducer } from '../types/ngrx-store.type';

export abstract class AbstractMfaFormProvider extends AbstractSimpleFormProvider<LoginResDtoModel> {
  protected _mfaState!: MfaStateModel;

  constructor(
    private readonly _absStore: Store<AuthReducer | SharedReducer>,
    private readonly _absLocalStorageService: LocalStorageService,
    private readonly _absRouter: Router,
    private readonly _absThemeSwitcherService: ThemeSwitcherService,
    private readonly _absLanguageSwitcherService: LanguageSwitcherService
  ) {
    super();
    this.wrapAsObservable(
      this._absStore.select(NgrxSelector_ATH.selectMfaState)
    ).subscribe(state => {
      if (state) {
        this._mfaState = state;
      }
    });
  }

  protected verifyCodeAndPerformLogin(
    pipingObject: Observable<LoginResDtoModel>
  ): Observable<LoginResDtoModel> {
    return pipingObject.pipe(
      tap(async res => {
        this.setLoading(false);
        this._absLocalStorageService.save('loggedUser', {
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        });
        if (res.lang) {
          this._absLanguageSwitcherService.changeLangByName(res.lang);
        }
        if (res.theme) {
          this._absThemeSwitcherService.changeTheme(res.theme as ThemeType);
        }
        this._absStore.dispatch(
          NgrxAction_SHA.__setLoggedUserDetails({
            details: {
              fullName: res.fullName,
              profileUrl: res.profileUrl,
              lang: res.lang,
              theme: res.theme,
            },
          })
        );
        this._absStore.dispatch(NgrxAction_ATH.__removeMfaState());
        await this._absRouter.navigateByUrl('/');
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
