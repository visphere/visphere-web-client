/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TextChannelDetailsResDto } from '~/settings-mod/model/guild-management.model';
import { TextChannelService } from '~/settings-mod/services/text-channel/text-channel.service';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import { selectSettingsReturnUrl } from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-text-channel-settings-entry-point-page',
  templateUrl: './text-channel-settings-entry-point-page.component.html',
  providers: [TextChannelService],
})
export class TextChannelSettingsEntryPointPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  textChannelDetails?: TextChannelDetailsResDto;
  isModalOpen = false;

  guildId?: number;
  textChannelId?: number;

  activeLoading$ = this._textChannelService.activeLoading$;
  settingsReturnUrl$ = this._store.select(selectSettingsReturnUrl);

  readonly defaultPrefix =
    'vsph.clientCommon.settingsPage.category.textChannelSettings';
  readonly modalPrefix =
    'vsph.clientCommon.settingsPage.modal.devastate.deleteTextChannel';

  constructor(
    private readonly _store: Store<SharedReducer>,
    private readonly _textChannelService: TextChannelService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _formHelperService: FormHelperService
  ) {
    super();
  }

  ngOnInit(): void {
    this.guildId = this._formHelperService.extractNumberValueParam(
      this._route,
      'guildId'
    );
    this.textChannelId = this._formHelperService.extractNumberValueParam(
      this._route,
      'textChannelId'
    );
    this.wrapAsObservable$(
      this._textChannelService.fetchTextChannelDetails$(this._route)
    ).subscribe({
      next: textChannelDetails =>
        (this.textChannelDetails = textChannelDetails),
      error: async () =>
        await this._router.navigateByUrl(`/guild/${this.guildId}`),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleToggleModalToDeleteTextChannel(isActive: boolean): void {
    this.isModalOpen = isActive;
  }

  handleDeleteTextChannel(): void {
    if (this.guildId && this.textChannelId) {
      this.wrapAsObservable$(
        this._textChannelService.deleteTextChannel$(this.textChannelId)
      ).subscribe({
        next: async () => this._router.navigateByUrl(`/guild/${this.guildId}`),
      });
    }
  }
}
