/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { MfaAuthenticatorDataResDto } from '~/auth-mod/models/mfa-data.model';
import { MfaFirstSetupService } from '~/auth-mod/services/mfa-first-setup/mfa-first-setup.service';
import { MfaFirstSetupFormStage } from '~/auth-mod/types/form-stage.type';
import { environment } from '~/env/environment';
import { FetchingState } from '~/shared-mod/types/fetching-state.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-first-mfa-setup',
  templateUrl: './first-mfa-setup.component.html',
  providers: [MfaFirstSetupService],
})
export class FirstMfaSetupComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  fetchingState$: Observable<FetchingState> =
    this._mfaFirstSetupService.isFetchingState$;
  stepperStage$: Observable<MfaFirstSetupFormStage> =
    this._mfaFirstSetupService.stepperStage$;

  mfaData!: MfaAuthenticatorDataResDto;
  cdnPath = environment.contentDistributorBaseUrl;

  constructor(private readonly _mfaFirstSetupService: MfaFirstSetupService) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable(this._mfaFirstSetupService.loadMfaData()).subscribe(
      mfaData => {
        if (mfaData) {
          this.mfaData = mfaData;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleMoveStepper(stage: MfaFirstSetupFormStage): void {
    this._mfaFirstSetupService.setStepperStage(stage);
  }

  handleSaveToFile(): void {
    saveAs(
      new Blob([this.mfaData.secret], {
        type: 'text/plain;charset=utf-8',
      }),
      'secret.txt'
    );
  }
}
