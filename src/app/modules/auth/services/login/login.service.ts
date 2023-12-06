/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { LoginFormModel } from '~/auth-mod/models/login-form.model';
import { MySavedAccountModel } from '~/auth-mod/models/my-saved-account.model';
import { LoginFormStage } from '~/auth-mod/types/form-stage.type';
import { LoginResDtoModel } from '~/shared-mod/models/identity.model';
import { LoggedUser } from '~/shared-mod/models/logged-user.model';
import { AbstractMultistageFormProvider } from '~/shared-mod/services/abstract-multistage-form-provider';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import { LoginFlowService } from '../login-flow/login-flow.service';

@Injectable()
export class LoginService
  extends AbstractMultistageFormProvider<LoginFormStage, LoggedUser>
  implements OnDestroy
{
  private _isNextButtonEnabled$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _loginFlowService: LoginFlowService
  ) {
    super('login');
  }

  onValueChange(): void {
    this.listenChanges<LoginFormModel>((formValues: LoginFormModel) => {
      this._isNextButtonEnabled$.next(
        formValues.usernameOrEmailAddress.length !== 0
      );
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  moveForward(): void {
    this._currentStage$.next('password');
  }

  moveBackward(): void {
    this._currentStage$.next('login');
    this._rootForm.get('password')?.reset();
  }

  override abstractSubmitForm$(): Observable<LoggedUser> {
    const { usernameOrEmailAddress, password, rememberAccount } =
      this.parseFormValues<LoginFormModel>();
    return this._loginFlowService.performLoginFlow$(
      usernameOrEmailAddress,
      password,
      () => this.setLoading(false),
      res => {
        if (rememberAccount) {
          this.rememberAccount(res);
        }
      }
    );
  }

  private rememberAccount(res: LoginResDtoModel): void {
    const { username, profileUrl } = res;
    const accountAlreadyExist = this._localStorageService
      .get<MySavedAccountModel[]>('mySavedAccounts')
      ?.some(account => account.usernameOrEmailAddress === username);
    if (!accountAlreadyExist) {
      this._localStorageService.push<MySavedAccountModel>('mySavedAccounts', {
        accountId: uuidv4(),
        usernameOrEmailAddress: username,
        thumbnailUrl: profileUrl,
        verified: true,
      });
    }
  }

  get isNextButtonEnabled$(): Observable<boolean> {
    return this._isNextButtonEnabled$.asObservable();
  }
}
