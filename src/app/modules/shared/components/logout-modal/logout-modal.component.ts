/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IdentityService } from '~/shared-mod/services/identity/identity.service';
import { actionUpdateLogoutModalState } from '~/shared-mod/store/actions';
import { selectLogoutModalIsOpen } from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-logout-modal',
  templateUrl: './logout-modal.component.html',
})
export class LogoutModalComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  isModalOpen$ = this._store.select(selectLogoutModalIsOpen);

  isLoading = false;

  constructor(
    private readonly _store: Store<SharedReducer>,
    private readonly _identityService: IdentityService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleLogout(): void {
    this.isLoading = true;
    this.wrapAsObservable$(this._identityService.logout$()).subscribe({
      next: async () => {
        this.handleCloseModal();
        await this._router.navigateByUrl('/auth/login');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  handleCloseModal(): void {
    this._store.dispatch(actionUpdateLogoutModalState({ isOpen: false }));
  }
}
