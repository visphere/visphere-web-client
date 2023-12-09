/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { FormGroup } from '@angular/forms';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { UserAccountDetailsModel } from '../model/user-account-details.model';
import { MyAccountSettingsService } from '../services/my-account-settings/my-account-settings.service';
import { UpdatableModalType } from '../types/updatable-modal.type';

export abstract class AbstractUpdatableModalProvider extends AbstractReactiveProvider {
  protected activeModal$ = this._absMyAccountSettingsService.activeModal$;
  protected alreadyFired = false;

  protected formGroup?: FormGroup;
  protected accountDetails?: UserAccountDetailsModel;
  protected isLoading$ = this._absMyAccountSettingsService.isLoading$;

  constructor(
    private readonly _absMyAccountSettingsService: MyAccountSettingsService
  ) {
    super();
  }

  protected wrapOnActive$(
    type: UpdatableModalType
  ): Observable<UserAccountDetailsModel> {
    return this.wrapAsObservable$(
      combineLatest([
        this.activeModal$,
        this._absMyAccountSettingsService.accountDetails$,
      ]).pipe(
        filter(([activeModal]) => activeModal === type || !this.alreadyFired),
        map(([, accountDetails]) => {
          this.alreadyFired = true;
          return accountDetails as UserAccountDetailsModel;
        })
      )
    );
  }

  protected closeModal(): void {
    this._absMyAccountSettingsService.activateModal('none');
    this.formGroup?.reset();
  }

  protected checkIfContentsAreIdentical(fieldName: string): boolean {
    if (this.accountDetails) {
      return (
        this.formGroup?.get(fieldName)?.value ===
        this.accountDetails[fieldName as keyof UserAccountDetailsModel]
      );
    }
    return false;
  }
}
