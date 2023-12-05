/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoggedUser } from '~/shared-mod/models/logged-user.model';
import { AbstractLoadableProvider } from '~/shared-mod/services/abstract-loadable-provider';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

export abstract class AbstractUserSettingsProvider extends AbstractLoadableProvider {
  protected _loggedUser$: Observable<LoggedUser | null> = this._absStore.select(
    NgrxSelector_SHA.selectLoggedUser
  );

  constructor(private readonly _absStore: Store<SharedReducer>) {
    super();
  }

  protected showSuccessSnackbar(message: string): void {
    this._absStore.dispatch(
      NgrxAction_SHA.__addSnackbar({
        content: {
          placeholder: message,
          omitTransformation: true,
        },
        severity: 'success',
      })
    );
  }
}
