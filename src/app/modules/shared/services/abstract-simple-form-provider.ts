/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: abstract-simple-form-provider.ts
 *   Created at: 2023-08-26, 18:30:19
 *   Last updated at: 2023-08-26, 18:30:19
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */
import { FormGroup } from '@angular/forms';
import { AbstractLazyProvider } from './abstract-lazy-provider';

export abstract class AbstractSimpleFormProvider extends AbstractLazyProvider {
  protected _rootForm!: FormGroup;

  setReactiveForm(formGroup: FormGroup): void {
    this._rootForm = formGroup;
  }

  listenChanges<T>(onChange: (event: T) => void): void {
    this.wrapAsObservable(this._rootForm.valueChanges).subscribe(value => {
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
