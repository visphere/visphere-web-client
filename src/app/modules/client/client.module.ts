/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFile,
  faFileAlt,
  faFileArchive,
  faFileAudio,
  faFileCode,
  faFileExcel,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
} from '@fortawesome/free-solid-svg-icons';
import * as BtsIcon from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { NgxFloatUiModule } from 'ngx-float-ui';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { ClientRootComponent } from '~/client-mod/client-root.component';
import { ClientRoutingModule } from '~/client-mod/client-routing.module';
import { CreateOrJoinSphereModalComponent } from '~/client-mod/components/create-or-join-sphere-modal/create-or-join-sphere-modal.component';
import { CreateSphereFormComponent } from '~/client-mod/components/create-sphere-form/create-sphere-form.component';
import { CreateTextChannelModalComponent } from '~/client-mod/components/create-text-channel-modal/create-text-channel-modal.component';
import { DelegateGuildModalComponent } from '~/client-mod/components/delegate-guild-modal/delegate-guild-modal.component';
import { DevastateMemberActionModalComponent } from '~/client-mod/components/devastate-member-action-modal/devastate-member-action-modal.component';
import { ImageViewerModalComponent } from '~/client-mod/components/image-viewer-modal/image-viewer-modal.component';
import { InputTextAreaComponent } from '~/client-mod/components/input-text-area/input-text-area.component';
import { JoinSphereFormComponent } from '~/client-mod/components/join-sphere-form/join-sphere-form.component';
import { LeftNavigationBarComponent } from '~/client-mod/components/left-navigation-bar/left-navigation-bar.component';
import { LoggedUserPopupComponent } from '~/client-mod/components/logged-user-popup/logged-user-popup.component';
import { SphereGuildParticipantComponent } from '~/client-mod/components/sphere-guild-participant/sphere-guild-participant.component';
import { SphereGuildParticipantsPanelComponent } from '~/client-mod/components/sphere-guild-participants-panel/sphere-guild-participants-panel.component';
import { SphereMessagesContentComponent } from '~/client-mod/components/sphere-messages-content/sphere-messages-content.component';
import { SphereTextChannelsPanelComponent } from '~/client-mod/components/sphere-text-channels-panel/sphere-text-channels-panel.component';
import { AppEntryPointPageComponent } from '~/client-mod/pages/app-entry-point-page/app-entry-point-page.component';
import { ClientEntryPointPageComponent } from '~/client-mod/pages/client-entry-point-page/client-entry-point-page.component';
import { JoinToGuildPageComponent } from '~/client-mod/pages/join-to-guild-page/join-to-guild-page.component';
import { SphereGuildEntryPageComponent } from '~/client-mod/pages/sphere-guild-entry-page/sphere-guild-entry-page.component';
import { SphereGuildPageComponent } from '~/client-mod/pages/sphere-guild-page/sphere-guild-page.component';
import { SphereTextChannelPageComponent } from '~/client-mod/pages/sphere-text-channel-page/sphere-text-channel-page.component';
import { SharedModule } from '../shared/shared.module';
import { clientReduxStore } from './store/reducer';

@NgModule({
  declarations: [
    AppEntryPointPageComponent,
    ClientEntryPointPageComponent,
    ClientRootComponent,
    CreateOrJoinSphereModalComponent,
    CreateSphereFormComponent,
    CreateTextChannelModalComponent,
    DelegateGuildModalComponent,
    DevastateMemberActionModalComponent,
    ImageViewerModalComponent,
    InputTextAreaComponent,
    JoinToGuildPageComponent,
    JoinSphereFormComponent,
    LeftNavigationBarComponent,
    LoggedUserPopupComponent,
    SphereGuildEntryPageComponent,
    SphereGuildPageComponent,
    SphereGuildParticipantComponent,
    SphereGuildParticipantsPanelComponent,
    SphereMessagesContentComponent,
    SphereTextChannelPageComponent,
    SphereTextChannelsPanelComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NgxFloatUiModule.forRoot({
      hideOnClickOutside: true,
      applyClass: 'absolute,z-50',
    }),
    EffectsModule.forFeature([]),
    FormsModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    NgIconsModule.withIcons({
      addIcon: BtsIcon.bootstrapPlus,
      exploreIcon: BtsIcon.bootstrapCompass,
      participantsIcon: BtsIcon.bootstrapPeople,
      textChannelIcon: BtsIcon.bootstrapChatDots,
      appendFileIcon: BtsIcon.bootstrapPlusCircle,
      sendMessageIcon: BtsIcon.bootstrapSend,
    }),
    NgxTippyModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature(
      clientReduxStore.reducerName,
      clientReduxStore.reducerFunction
    ),
    TranslateModule,
  ],
})
export class ClientModule {
  constructor() {
    library.add(
      faFile,
      faFileAlt,
      faFileArchive,
      faFileAudio,
      faFileCode,
      faFileExcel,
      faFilePdf,
      faFilePowerpoint,
      faFileVideo,
      faFileWord
    );
  }
}
