/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TextChannelService } from '~/client-mod/services/text-channel/text-channel.service';
import { actionCloseModal } from '~/client-mod/store/actions';
import { selectIsAddTextChannelModalOpen } from '~/client-mod/store/selectors';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { regex } from '~/shared-mod/validators/regex.constant';

@Component({
  selector: 'vsph-create-text-channel-modal',
  templateUrl: './create-text-channel-modal.component.html',
  providers: [PopulateFormGroupService],
})
export class CreateTextChannelModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  isLoading$ = this._textChannelService.isLoading$;
  isModalOpen$ = this._store.select(selectIsAddTextChannelModalOpen);

  textChannelForm: FormGroup;
  guildId?: number;

  readonly defaultPrefix = 'vsph.clientCommon.client.modals.createTextChannel';

  constructor(
    private readonly _store: Store<ClientReducer>,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _textChannelService: TextChannelService,
    private readonly _route: ActivatedRoute,
    private readonly _formHelperService: FormHelperService
  ) {
    super();
    this.textChannelForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(regex.TEXT_CHANNEL_NAME),
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {
    this.guildId = this._formHelperService.extractNumberValueParam(
      this._route,
      'guildId'
    );
    this._populateFormGroupService.setField(this.textChannelForm);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleEmitOnClose(): void {
    this._store.dispatch(actionCloseModal());
  }

  handleSubmitCreateTextChannel(): void {
    const { name } = this.textChannelForm.getRawValue();
    if (this.guildId) {
      this.wrapAsObservable$(
        this._textChannelService.createTextChannel$(this.guildId, name)
      ).subscribe({
        next: () => this._store.dispatch(actionCloseModal()),
      });
    }
  }
}
