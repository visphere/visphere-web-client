/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextChannelService } from '~/settings-mod/services/text-channel/text-channel.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { regex } from '~/shared-mod/validators/regex.constant';

@Component({
  selector: 'vsph-updatable-text-channel-form',
  templateUrl: './updatable-text-channel-form.component.html',
  providers: [PopulateFormGroupService],
})
export class UpdatableTextChannelFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  textChannelId?: number;
  textChannelForm?: FormGroup;
  memorizedName = '';

  isLoading$ = this._textChannelService.isLoading$;

  readonly commonPrefix =
    'clientCommon.settingsPage.category.textChannelSettings.subpage.overview';

  constructor(
    private readonly _textChannelService: TextChannelService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
    this.wrapAsObservable$(
      this._textChannelService.textChannelDetails$
    ).subscribe(textChannelDetails => {
      this.textChannelForm = new FormGroup({
        name: new FormControl(textChannelDetails?.name || '', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.TEXT_CHANNEL_NAME),
        ]),
      });
      this.memorizedName = textChannelDetails.name;
      this._populateFormGroupService.setField(this.textChannelForm);
    });
  }

  ngOnInit(): void {
    this.wrapAsObservable$(this._textChannelService.textChannelId$).subscribe(
      textChannelId => (this.textChannelId = textChannelId)
    );
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleRevertPreviousName(): void {
    this.textChannelForm?.get('name')?.patchValue(this.memorizedName);
  }

  handleSubmitUpdateTextChannel(): void {
    if (this.textChannelForm && this.textChannelId) {
      const { name } = this.textChannelForm.getRawValue();
      this.wrapAsObservable$(
        this._textChannelService.updateTextChannel$(this.textChannelId, name)
      ).subscribe();
    }
  }

  get nameFieldIsExact(): boolean {
    return this.textChannelForm?.get('name')?.value === this.memorizedName;
  }
}
