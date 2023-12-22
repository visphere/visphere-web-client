/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuildJoinLinkDetails } from '~/settings-mod/model/guild-join-links.model';
import { GuildJoinLinksService } from '~/settings-mod/services/guild-join-links/guild-join-links.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-update-join-link-modal',
  templateUrl: './update-join-link-modal.component.html',
  providers: [PopulateFormGroupService],
})
export class UpdateJoinLinkModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  updateJoinLinkForm: FormGroup;
  memorizedJoinLink?: GuildJoinLinkDetails;

  activeModal$ = this._guildJoinLinksService.activeModal$;
  isLoading$ = this._guildJoinLinksService.isLoading$;
  isFetching$ = this._guildJoinLinksService.fetchingJoinLinkDetails$;

  readonly defaultPrefix =
    'vsph.clientCommon.settingsPage.category.guildSettings.subpage.joinLinks.updateJoinLinkModal';

  constructor(
    private readonly _guildJoinLinksService: GuildJoinLinksService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
    this.updateJoinLinkForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.updateJoinLinkForm);
    this.wrapAsObservable$(
      this._guildJoinLinksService.getGuildJoinLinkDetails$()
    ).subscribe(joinLink => {
      this.memorizedJoinLink = joinLink;
      this.updateJoinLinkForm.get('name')?.patchValue(joinLink.name);
    });
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitUpdateJoinLink(): void {
    const { name } = this.updateJoinLinkForm.getRawValue();
    if (this.memorizedJoinLink) {
      this.wrapAsObservable$(
        this._guildJoinLinksService.updateGuildJoinLink$(
          this.memorizedJoinLink?.id,
          { name }
        )
      ).subscribe({ next: () => this.handleCloseModal() });
    }
  }

  handleCloseModal(): void {
    this._guildJoinLinksService.closeModal();
  }

  get contentsAreIdentical(): boolean {
    return (
      this.updateJoinLinkForm?.get('name')?.value ===
      this.memorizedJoinLink?.name
    );
  }
}
