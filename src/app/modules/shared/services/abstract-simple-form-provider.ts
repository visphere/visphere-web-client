/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { FormGroup } from '@angular/forms';
import { AbstractLazyProvider } from './abstract-lazy-provider';

export abstract class AbstractSimpleFormProvider<
  T,
> extends AbstractLazyProvider<T> {
  protected _rootForm!: FormGroup;

  setReactiveForm(formGroup: FormGroup): void {
    this._rootForm = formGroup;
  }

  listenChanges<T>(onChange: (event: T) => void): void {
    this.wrapAsObservable$(this._rootForm.valueChanges).subscribe(value => {
      onChange(value as T);
    });
  }

  parseFormValues<T>(): T {
    return this._rootForm.getRawValue() as T;
  }

  get rootForm(): FormGroup {
    return this._rootForm;
  }
}
