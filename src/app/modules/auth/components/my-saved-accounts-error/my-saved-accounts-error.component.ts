/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input, OnInit } from '@angular/core';
import {
  MySavedAccountErrors,
  MySavedAccountsErrorType,
} from '~/auth-mod/types/my-saved-accounts.type';
import { environment } from '~/env/environment';

@Component({
  selector: 'msph-my-saved-accounts-error',
  templateUrl: './my-saved-accounts-error.component.html',
})
export class MySavedAccountsErrorComponent implements OnInit {
  @Input() type: MySavedAccountsErrorType = 'fetchError';

  topImage = '';
  i18nSuffix = '';
  cdnPath = environment.contentDistributorBaseUrl;

  private _valuesMap: MySavedAccountErrors = {
    fetchError: {
      topImage: 'confounded-face',
      i18nSuffix: 'failedFetchAccountsMessage',
    },
    noAccounts: {
      topImage: 'user-id',
      i18nSuffix: 'noAccountsMessage',
    },
  };

  ngOnInit(): void {
    this.topImage = this._valuesMap[this.type].topImage;
    this.i18nSuffix = this._valuesMap[this.type].i18nSuffix;
  }
}
