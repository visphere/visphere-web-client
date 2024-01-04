/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DevastateDetails } from '~/client-mod/model/participant.model';
import { ParticipantService } from '~/client-mod/services/participant/participant.service';
import { actionCloseDevastateMemberModal } from '~/client-mod/store/actions';
import {
  selectActiveModal,
  selectDevastateDetails,
} from '~/client-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-delegate-guild-modal',
  templateUrl: './delegate-guild-modal.component.html',
})
export class DelegateGuildModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  devastateDetails?: DevastateDetails;
  i18nParams = {};

  selectedOpenModal$ = this._store.select(selectActiveModal);
  isLoading$ = this._participantService.isLoading$;

  readonly defaultPrefix = 'vsph.clientCommon.client.modals.delegateGuild';

  constructor(
    private readonly _participantService: ParticipantService,
    private readonly _store: Store<SharedReducer>,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._store.select(selectDevastateDetails)
    ).subscribe(devastateDetails => {
      this.i18nParams = {
        name: devastateDetails?.name,
      };
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleCloseModal(): void {
    this._store.dispatch(actionCloseDevastateMemberModal());
  }

  handleDelegateDetails(usernameOrMfaCode: string): void {
    this.wrapAsObservable$(
      this._participantService.delegateGuildProprietyToUser$(usernameOrMfaCode)
    ).subscribe({ next: async () => await this._router.navigateByUrl('/') });
  }
}
