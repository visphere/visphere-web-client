/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractPopulateField } from '~/shared-mod/context/abstract-populate-field';

@Injectable()
export class PopulateFormGroupService extends AbstractPopulateField<FormGroup> {
  private _formDisabled$ = new BehaviorSubject<boolean>(false);

  setFormDisabled(formDisabled: boolean): void {
    this._formDisabled$.next(formDisabled);
  }

  get formDisabled$(): Observable<boolean> {
    return this._formDisabled$.asObservable();
  }
}
