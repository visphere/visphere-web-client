/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuildJoinLinksService } from '~/settings-mod/services/guild-join-links/guild-join-links.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { SpinnerListElementType } from '~/shared-mod/types/spinner-list-element.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-create-join-link-modal',
  templateUrl: './create-join-link-modal.component.html',
  providers: [PopulateFormGroupService],
})
export class CreateJoinLinkModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  createJoinLinkForm: FormGroup;
  timestamps: SpinnerListElementType[] = [];
  neverExpires = false;

  activeModal$ = this._guildJoinLinksService.activeModal$;
  isLoading$ = this._guildJoinLinksService.isLoading$;
  isFetching$ = this._guildJoinLinksService.isFetching$;

  readonly defaultPrefix =
    'clientCommon.settingsPage.category.guildSettings.subpage.joinLinks';

  constructor(
    private readonly _guildJoinLinksService: GuildJoinLinksService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
    this.createJoinLinkForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      expiredAfter: new FormControl<string>('MIN30'),
    });
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.createJoinLinkForm);
    this.wrapAsObservable$(
      this._guildJoinLinksService.fetchJoinLinkTimestamps$()
    ).subscribe(timestamps => (this.timestamps = timestamps));
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitCreateJoinLink(): void {
    this.wrapAsObservable$(
      this._guildJoinLinksService.createGuildJoinLink$(
        this.createJoinLinkForm.getRawValue()
      )
    ).subscribe({ next: () => this.handleCloseModal() });
  }

  handleCloseModal(): void {
    this._guildJoinLinksService.closeModal();
  }

  patchValue(patchingData: SpinnerListElementType | null): void {
    const control = this.createJoinLinkForm.get('expiredAfter');
    if (control) {
      this.neverExpires = patchingData?.id === 'NEVER';
      control.patchValue(patchingData ? patchingData.id : null);
      control.markAsDirty();
    }
  }

  getFormControlValue(): string | undefined {
    const control = this.createJoinLinkForm.get('expiredAfter');
    if (control && control.value) {
      return control.value;
    }
    return undefined;
  }
}
