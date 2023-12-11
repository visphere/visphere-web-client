/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UnlockAccountService } from '~/auth-mod/services/unlock-account/unlock-account.service';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-locked-account-modal',
  templateUrl: './locked-account-modal.component.html',
  providers: [UnlockAccountService],
})
export class LockedAccountModalComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  isLoading$ = this._unlockAccountService.isLoading$;
  isModalActive$ = this._store.select(
    NgrxSelector_SHA.selectDisabledAccountModalIsOpen
  );

  constructor(
    private readonly _store: Store<SharedReducer>,
    private readonly _unlockAccountService: UnlockAccountService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  async handleCloseModalAndExit(): Promise<void> {
    this._unlockAccountService.closeModal();
    await this._router.navigateByUrl('/auth/login');
  }

  handleUnlockAccount(): void {
    this.wrapAsObservable$(
      this._unlockAccountService.unlockAccount$()
    ).subscribe({
      complete: async () => {
        this._unlockAccountService.closeModal();
        await this._router.navigateByUrl('/auth/login');
      },
    });
  }
}
