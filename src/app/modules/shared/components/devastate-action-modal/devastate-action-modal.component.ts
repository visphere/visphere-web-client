/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '~/env/environment';
import { authWindowFadeAndMove } from '~/shared-mod/animations/auth-window.animation';

@Component({
  selector: 'vsph-devastate-action-modal',
  templateUrl: './devastate-action-modal.component.html',
  animations: [authWindowFadeAndMove],
})
export class DevastateActionModalComponent {
  @Input() i18nPrefix = '';
  @Input() isActive = false;
  @Input() isLoading = false;
  @Input() size: 'sm' | 'xl' = 'xl';

  @Output() emitOnClose = new EventEmitter<void>();
  @Output() emitDevstateAction = new EventEmitter<void>();

  cdnPath = environment.contentDistributorBaseUrl;
}
