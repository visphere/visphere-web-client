/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractWsWebhookProvider } from '~/shared-mod/services/abstract-ws-webhook.provider';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { ProfileImageUpdatableModalType } from '../types/updatable-modal.type';

export abstract class AbstractProfileImageProvider<
  T,
> extends AbstractWsWebhookProvider<SharedReducer> {
  protected _activeLoading$ = new BehaviorSubject<T | 'none'>('none');

  private _activeModal$ = new BehaviorSubject<ProfileImageUpdatableModalType>(
    'none'
  );

  constructor(_absStore: Store<SharedReducer>) {
    super(_absStore);
  }

  openModal(type: ProfileImageUpdatableModalType): void {
    this._activeModal$.next(type);
  }

  closeModal(): void {
    this._activeModal$.next('none');
  }

  get activeLoading$(): Observable<T | 'none'> {
    return this._activeLoading$.asObservable();
  }
  get activeModal$(): Observable<ProfileImageUpdatableModalType> {
    return this._activeModal$.asObservable();
  }
}
