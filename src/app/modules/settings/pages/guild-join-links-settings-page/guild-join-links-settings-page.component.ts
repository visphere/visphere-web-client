/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as copy from 'copy-to-clipboard';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { combineLatest } from 'rxjs';
import { environment } from '~/env/environment';
import { GuildJoinLink } from '~/settings-mod/model/guild-join-links.model';
import { GuildJoinLinksService } from '~/settings-mod/services/guild-join-links/guild-join-links.service';
import { JoinLinkUpdatableModalType } from '~/settings-mod/types/updatable-modal.type';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-guild-join-links-settings-page',
  templateUrl: './guild-join-links-settings-page.component.html',
  providers: [GuildJoinLinksService],
})
export class GuildJoinLinksSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  joinLinks: GuildJoinLink[] = [];
  persistedLink?: GuildJoinLink;
  isPrivate = false;

  isFetching$ = this._guildJoinLinksService.isFetching$;
  activeModal$ = this._guildJoinLinksService.activeModal$;
  modifiedJoinLink$ = this._guildJoinLinksService.modifiedJoinLink$;
  selectedLang$ = this._languageSwitcherService.selectedLang$;

  readonly path = environment.contentDistributorBaseUrl;
  readonly defaultPrefix =
    'vsph.clientCommon.settingsPage.category.guildSettings.subpage.joinLinks';
  readonly tooltipProps: NgxTippyProps = {
    placement: 'bottom',
    theme: 'vsph-auth',
    animation: 'scale-subtle',
  };

  constructor(
    private readonly _guildJoinLinksService: GuildJoinLinksService,
    private readonly _router: Router,
    private readonly _store: Store<SharedReducer>,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      combineLatest([
        this._guildJoinLinksService.fetchAllGuildJoinLinks$(),
        this._guildJoinLinksService.modifiedJoinLink$,
      ])
    ).subscribe({
      next: ([joinLinksDetails, persistedLink]) => {
        this.joinLinks = joinLinksDetails.joinLinks;
        this.isPrivate = joinLinksDetails.isPrivate;
        this.persistedLink = persistedLink;
      },
      error: async () => await this._router.navigateByUrl('/'),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleToggleModalVisibility(
    type: JoinLinkUpdatableModalType,
    link: GuildJoinLink | undefined
  ): void {
    this._guildJoinLinksService.setModifiedJoinLink(link);
    this._guildJoinLinksService.openModal(type);
  }

  handleUpdateJoinLinkActivity(linkId: number, isActive: boolean): void {
    this.wrapAsObservable$(
      this._guildJoinLinksService.updateGuildJoinLinkActivity$(linkId, isActive)
    ).subscribe({
      next: () => {
        const joinLink = this.joinLinks.find(({ id }) => id === linkId);
        if (joinLink) {
          joinLink.active = isActive;
        }
      },
    });
  }

  handleDeleteLink(): void {
    if (this.persistedLink) {
      this.wrapAsObservable$(
        this._guildJoinLinksService.deleteGuildJoinLink$(this.persistedLink.id)
      ).subscribe({
        next: () => {
          this._guildJoinLinksService.setModifiedJoinLink(undefined);
          this._guildJoinLinksService.closeModal();
        },
      });
    }
  }

  handleCopyLinkToClipboard(joinLink: GuildJoinLink): void {
    copy(joinLink.joinLinkUrl);
    this._store.dispatch(
      NgrxAction_SHA.__addSnackbar({
        content: {
          i18nPrefix: this.defaultPrefix,
          placeholder: '.successfullyCopiedLink',
        },
        severity: 'success',
      })
    );
  }
}
